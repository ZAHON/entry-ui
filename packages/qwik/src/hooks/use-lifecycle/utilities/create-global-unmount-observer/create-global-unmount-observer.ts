import type { CreateGlobalUnmountObserverReturnValue } from './create-global-unmount-observer.types';
import type { QRL } from '@qwik.dev/core';
import { isDev } from '@qwik.dev/core/build';
import { error } from '@/_internal/utilities/error';

/**
 * An internal utility that creates a centralized observer to manage element unmounting across the application.
 *
 * This factory utility returns an object with methods to track `HTMLElement` instances and execute
 * their associated cleanup QRL functions when those elements are removed from the DOM. It solves Qwik's
 * "lost cleanup" problem across the server-to-browser boundary by sharing a single `MutationObserver`
 * instance to minimize DOM monitoring overhead.
 *
 * The observer is lazily initialized upon tracking the first element and automatically disconnects
 * when no elements remain. To ensure optimal performance, it filters DOM mutations to run removal
 * checks only when nodes are actually detached, using an internal `WeakMap` to associate elements
 * with their cleanup tasks without mutating the DOM nodes directly.
 */
export const createGlobalUnmountObserver = (): CreateGlobalUnmountObserverReturnValue => {
  // Flag indicating whether the `MutationObserver` has been instantiated and attached to `document.body`.
  // Prevents redundant observer creation calls when registering multiple elements sequentially.
  let isInitialized = false;

  // Shared DOM `MutationObserver` instance monitoring document removals.
  // Managed lazily and set to `undefined` when no elements remain in tracking set.
  let mutationObserver: MutationObserver | undefined = undefined;

  // `WeakMap` mapping tracked `HTMLElement` instances to their set of registered cleanup `QRL` closures.
  // Provides clean association between DOM nodes and teardown tasks without mutating element instances.
  const qrlMap = new WeakMap<HTMLElement, Set<QRL<() => void> | QRL<() => Promise<void>>>>();

  // Strong reference `Set` of currently monitored `HTMLElement` instances.
  // Allows efficient iteration during DOM detachment checks using `document.contains()`.
  const elements = new Set<HTMLElement>();

  // Scans all monitored DOM elements to detect detached nodes and execute associated cleanup `QRL` closures.
  // Handles both synchronous cleanup functions and asynchronous `Promise` resolutions cleanly.
  const processRemovedElements = () => {
    // Accumulates elements detached from `document.body` for subsequent cleanup processing.
    // Isolates collected references to avoid modifying the `elements` set while iterating over it.
    const toRemove: HTMLElement[] = [];

    // Snapshot `elements` set into an indexable array to optimize iteration performance.
    // Bypasses iterator allocation overhead during frequent mutation checks.
    const elementsArray = Array.from(elements);

    // Iterate through tracked elements to evaluate presence in the active document tree.
    // Identifies elements removed via parent node mutations or direct DOM manipulation.
    for (let i = 0; i < elementsArray.length; i++) {
      // Extract target `HTMLElement` reference from `elementsArray` snapshot for DOM presence verification.
      // Avoids iterator overhead when checking element detachment status in loop.
      const element = elementsArray[i];

      // Verify if the monitored element is no longer part of the live document tree using `document.contains()`.
      // Pushes detached nodes into the `toRemove` batch for teardown invocation.
      if (!document.contains(element)) {
        toRemove.push(element);
      }
    }

    // Execute cleanup `QRL` closures and purge state mappings for all identified removed elements.
    // Processes synchronous callbacks and collects async `Promise` instances for error handling.
    for (let i = 0; i < toRemove.length; i++) {
      // Retrieve current detached `HTMLElement` reference from `toRemove` collection for teardown processing.
      // Guarantees deterministic execution order for each removed element in batch.
      const element = toRemove[i];

      // Fetch registered cleanup `QRL` set associated with target removed `element` from `qrlMap` (`WeakMap`).
      // Contains all teardown callbacks scheduled for execution upon element detachment.
      const qrls = qrlMap.get(element);

      // Verify cleanup `QRL` set (`qrls`) exists before executing registered teardown callbacks.
      // Prevents runtime execution errors if element mapping was already cleared or empty.
      if (qrls) {
        // Collect `Promise` instances returned by async unmount `QRL` callbacks.
        // Allows centralized error logging and prevents unhandled promise rejections.
        const promises: Promise<void>[] = [];

        // Convert `QRL` set (`qrls`) into an indexable array (`qrlsArray`) to optimize execution loop performance.
        // Prevents iterator overhead when invoking multiple cleanup closures for the same node.
        const qrlsArray = Array.from(qrls);

        // Invoke each registered cleanup closure associated with the removed element.
        // Captures promise returns for async execution tracking and error reporting.
        for (let j = 0; j < qrlsArray.length; j++) {
          // Invoke individual cleanup `QRL` closure bound to removed element instance.
          // Captures return value (`result`) to evaluate whether cleanup operation is synchronous or asynchronous.
          const result = qrlsArray[j]();

          // Check if returned execution `result` is a `Promise` instance representing asynchronous cleanup task.
          // Collects active promise reference into `promises` for combined async tracking and error handling.
          if (result instanceof Promise) {
            promises.push(result);
          }
        }

        // Handle asynchronous cleanup errors in development mode (`isDev`) when `Promise.all()` rejects.
        // Prevents rejected cleanup promises from silently failing or crashing execution context.
        if (promises.length > 0) {
          Promise.all(promises).catch((err) => {
            if (isDev) {
              error([
                `An error occurred during the 'onUnmount$' lifecycle execution in 'useLifecycle' hook.`,
                `Check the cleanup logic in your 'onUnmount$' QRL. `,
                `One or more promises rejected during the element removal process: ${err instanceof Error ? err.message : String(err)}`,
              ]);
            }
          });
        }

        // Clear all executed `QRL` instances from the element's `qrls` `Set`.
        // Prevents duplicate cleanup execution if state references linger briefly.
        qrls.clear();
      }

      // Purge element mapping from internal `qrlMap` (`WeakMap`) after executing registered cleanup callbacks.
      // Removes stored `QRL` set references associated with processed DOM node.
      qrlMap.delete(element);

      // Remove detached `element` from active `elements` set following successful unmount processing.
      // Prevents duplicate unmount checks on subsequent `MutationObserver` trigger cycles.
      elements.delete(element);
    }
  };

  // Disconnects active `MutationObserver` instance when no monitored elements remain.
  // Frees system resources and resets initialization state for future registration calls.
  const cleanupObserver = () => {
    // Check if `mutationObserver` instance exists and all tracked `elements` have been cleared.
    // Safely disconnects DOM monitoring when application tracking requirements hit zero.
    if (mutationObserver && elements.size === 0) {
      // Disconnect underlying DOM `MutationObserver` instance (`mutationObserver`) from `document.body`.
      // Halts DOM mutation monitoring to conserve CPU resources when no elements are tracked.
      mutationObserver.disconnect();

      // Reset `mutationObserver` reference pointer back to `undefined` state.
      // Ensures clean garbage collection of disconnected `MutationObserver` instance.
      mutationObserver = undefined;

      // Reset `isInitialized` status flag to `false` following observer disconnection.
      // Allows future registration calls to lazily recreate `MutationObserver` instance.
      isInitialized = false;
    }
  };

  // Lazily initializes `MutationObserver` and attaches it to `document.body` subtree.
  // Listens for DOM node removal mutations to trigger detachment processing.
  const initMutationObserver = () => {
    // Guard against redundant initialization (`isInitialized`) or environments where `MutationObserver` is unsupported.
    // Ensures safe execution in non-browser environments or SSR contexts.
    if (isInitialized || typeof MutationObserver === 'undefined') {
      return;
    }

    // Mark `isInitialized` state flag as `true` to block duplicate setup calls.
    // Maintains single observer instance guarantee across multiple registration points.
    isInitialized = true;

    // Instantiate `MutationObserver` callback with fast-path removal checking.
    // Evaluates mutation records and delegates removal processing when nodes detach.
    mutationObserver = new MutationObserver((mutationsList) => {
      // Track whether current DOM mutation batch (`mutationsList`) contains any `removedNodes` records.
      // Acts as fast-path flag (`hasRemovals`) to bypass costly `document.contains()` traversals when idle.
      let hasRemovals = false;

      // Iterate through `mutationsList` records to verify if any `removedNodes` exist in the batch.
      // Bypasses heavy `document.contains()` checks when mutations only modify attributes or add nodes.
      for (let i = 0; i < mutationsList.length; i++) {
        if (mutationsList[i].removedNodes.length > 0) {
          // Mark `hasRemovals` flag as `true` upon encountering at least one detached node in mutation record.
          // Signals that DOM node removal occurred and requires `processRemovedElements()` evaluation.
          hasRemovals = true;

          // Abort mutation record evaluation loop early via `break` once node removal is confirmed.
          // Avoids checking remaining mutation entries in batch to optimize callback performance.
          break;
        }
      }

      // Exit early if current mutation batch contains no node removals (`hasRemovals` is `false`).
      // Reduces CPU overhead by avoiding unnecessary DOM hierarchy traversals.
      if (!hasRemovals) {
        return;
      }

      // Trigger scan across monitored `elements` to identify detached nodes and run cleanup `QRL` closures.
      // Executes unmount tasks for all elements removed in current mutation batch via `processRemovedElements()`.
      processRemovedElements();

      // Evaluate remaining tracked element count in `elements` and disconnect `MutationObserver` via `cleanupObserver()` if empty.
      // Automatically cleans up observer resources when last tracked element is removed.
      cleanupObserver();
    });

    // Attach observer to `document.body` to monitor all child tree modifications.
    // Captures DOM element removals anywhere in the document hierarchy.
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  // Registers a target DOM `element` and its cleanup `QRL` closure for unmount tracking.
  // Lazily initializes DOM observer and immediately processes pre-detached elements.
  const add = (params: { element: HTMLElement; qrl: QRL<() => void> | QRL<() => Promise<void>> }) => {
    const { element, qrl } = params;

    // Initialize new `QRL` `Set` for `element` inside `qrlMap` (`WeakMap`) if no entry exists yet.
    // Enables mapping multiple cleanup functions to a single `HTMLElement` instance.
    if (!qrlMap.has(element)) {
      qrlMap.set(element, new Set());
    }

    // Retrieve active cleanup `QRL` set (`qrls`) associated with target `element`.
    // Guarantees non-null `Set` instance for storing new `QRL` reference.
    const qrls = qrlMap.get(element)!;

    // Append provided cleanup `QRL` closure (`qrl`) to element's registered teardown task set (`qrls`).
    // Supports binding multiple independent cleanup callbacks to single DOM node.
    qrls.add(qrl);

    // Register target `element` (`HTMLElement`) inside strong reference `elements` (`Set`) for active DOM presence checks.
    // Ensures element is included in `document.contains()` scans during removal mutations.
    elements.add(element);

    // Evaluate detachment immediately via `processRemovedElements()` if observer is not yet initialized (`!isInitialized`).
    // Handles edge cases where element was already removed prior to registration.
    if (!isInitialized) {
      processRemovedElements();
    }

    // Ensure `MutationObserver` is active and listening for DOM removals via `initMutationObserver()`.
    // Lazily starts DOM tracking upon first element registration.
    initMutationObserver();
  };

  // Unregisters a specific cleanup `QRL` from a tracked DOM `element`.
  // Cleans up internal tracking maps and disconnects observer when empty.
  const remove = (params: { element: HTMLElement; qrl: QRL<() => void> | QRL<() => Promise<void>> }) => {
    const { element, qrl } = params;

    // Fetch registered cleanup `QRL` set (`qrls`) associated with `element` from internal `qrlMap` (`WeakMap`).
    // Returns `Set` containing active cleanup closures or `undefined` if `element` is unmonitored.
    const qrls = qrlMap.get(element);

    // Guard against unregistering `element` that has no active `QRL` registrations (`!qrls`).
    // Safely aborts removal operation if element was never added or already cleaned up.
    if (!qrls) {
      return;
    }

    // Delete target `qrl` (`QRL` closure) from element's registered cleanup set (`qrls`).
    // Cancels execution of specified cleanup logic upon future element removal.
    qrls.delete(qrl);

    // Purge element from tracking maps when no remaining cleanup `QRL` closures exist (`qrls.size === 0`).
    // Disconnects observer if all tracked elements across the application have been cleared.
    if (qrls.size === 0) {
      // Remove target `element` entry from `qrlMap` (`WeakMap`) once its registered `QRL` set becomes empty.
      // Prevents stale empty `Set` instances from lingering in memory map.
      qrlMap.delete(element);

      // Remove `element` from active `elements` set to stop inclusion in DOM removal scans.
      // Frees `element` reference from strong `Set` to permit garbage collection.
      elements.delete(element);

      // Evaluate remaining tracked element count and tear down `MutationObserver` via `cleanupObserver()` if zero.
      // Disconnects observer immediately when last registered element is manually removed.
      cleanupObserver();
    }
  };

  // Return public controller interface exposing element tracking registration methods.
  // Provides `add` and `remove` handle methods bound to centralized observer instance.
  return { add, remove };
};
