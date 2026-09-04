import type { UseLifecycleParams } from './use-lifecycle.types';
import { useTask$, $, useOnDocument } from '@qwik.dev/core';
import { isDev, isBrowser } from '@qwik.dev/core/build';
import { error } from '@/_internal/utilities/error';
import { createGlobalUnmountObserver } from './utilities/create-global-unmount-observer';

/**
 * An internal global unmount observer instance used to track DOM element removals across the application.
 *
 * This singleton ensures that all `useLifecycle` hook instances share a single underlying `MutationObserver`,
 * minimizing DOM overhead and memory footprint. It acts as a bridge for server-rendered components,
 * enabling them to seamlessly register cleanup logic upon browser resumption.
 */
const globalUnmountObserver = createGlobalUnmountObserver();

/**
 * A hook that manages component lifecycle events with reliable server-to-browser continuity.
 *
 * This hook addresses Qwik's resumability limitations where server-rendered cleanup closures are not
 * serialized across the network boundary. Unlike `useVisibleTask$`, which forces eager JavaScript execution
 * and degrades performance, `useLifecycle` leverages a centralized `MutationObserver` paired with the
 * `qresume` event to guarantee teardown execution without unnecessary client overhead.
 *
 * Lifecycle synchronization is coordinated through two distinct phases:
 * - **Mounting**: Executes the `onMount$` QRL during the initial `useTask$` scope across both server and client environments.
 * - **Unmounting**: Registers the target `element` reference with a shared global observer upon DOM attachment or application
 * resumption, ensuring `onUnmount$` runs reliably when the node leaves the document tree.
 *
 * @remarks
 * Inspired by and adapted from the `useMountTask$` implementation in the **Qwik Design System (QDS)**.
 * @see {@link https://www.npmjs.com/package/@qds.dev/base @qds.dev/base package on npm}
 */
export const useLifecycle = (params: UseLifecycleParams) => {
  const { element, onMount$, onUnmount$ } = params;

  // Register primary Qwik task responsible for executing mounting logic and declaring task cleanup hooks.
  // Executes initially during component instantiation across both server-side rendering and client environments.
  useTask$(async ({ cleanup }) => {
    // Verify whether an `onMount$` QRL callback was provided in hook configuration.
    // Prevents redundant `Promise` wrapping and execution logic when no mounting handler is specified.
    if (onMount$) {
      try {
        // Execute `onMount$` callback wrapped in `Promise.resolve()` to support sync and async operations seamlessly.
        // Catches thrown errors or promise rejections during initial component mounting phase.
        await Promise.resolve(onMount$());
      } catch (err) {
        // Check if application is running in development mode (`isDev`) before logging formatted error message.
        // Utilizes internal error utility to provide actionable debugging details without polluting production console.
        if (isDev) {
          error([
            `An error occurred during the 'onMount$' lifecycle execution in 'useLifecycle' hook.`,
            `The mount task failed.`,
            `Check your 'onMount$' logic: ${err instanceof Error ? err.message : String(err)}`,
          ]);
        }
      }
    }

    // Register task cleanup callback executed when component scope gets destroyed.
    // Handles unregistration from global observer and triggers `onUnmount$` QRL in browser contexts.
    cleanup(async () => {
      // Ensure cleanup logic executes exclusively in browser environment when `onUnmount$` QRL is defined.
      // Prevents server-side execution where DOM references and browser observers are unavailable.
      if (isBrowser && onUnmount$) {
        // Extract underlying `HTMLElement` instance from target `Signal` reference.
        // Resolves direct DOM reference required for observer unregistration and teardown execution.
        const elementRef = element.value;

        // Verify element reference exists before attempting removal from global unmount observer.
        // Removes tracked element-QRL pair from observer to prevent duplicate execution upon DOM detachment.
        if (elementRef) {
          globalUnmountObserver.remove({ element: elementRef, qrl: onUnmount$ });
        }

        try {
          // Execute `onUnmount$` teardown callback safely wrapped in `Promise.resolve()`.
          // Handles both synchronous and asynchronous cleanup logic while capturing runtime errors.
          await Promise.resolve(onUnmount$());
        } catch (err) {
          // Log detailed error diagnostic in development environment ('isDev') when `onUnmount$` callback fails.
          // Formats multi-line error details to assist developers in debugging lifecycle teardown failures.
          if (isDev) {
            error([
              `An error occurred during the 'onUnmount$' lifecycle execution in 'useLifecycle'.`,
              `The cleanup task failed.`,
              `Check your 'onUnmount$' logic: ${err instanceof Error ? err.message : String(err)}`,
            ]);
          }
        }
      }
    });
  });

  // Listen for Qwik's `qresume` event dispatched on document root upon application resumption.
  // Re-establishes client-side tracking for server-rendered components that bypass standard task cleanup setup.
  useOnDocument(
    'qresume',
    $(() => {
      // Check whether `onUnmount$` teardown callback is configured before registering resumption listener logic.
      // Bypasses global observer registration if component does not require unmount tracking.
      if (onUnmount$) {
        // Resolve current `HTMLElement` instance from target `Signal` reference upon application resume.
        // Ensures element is rendered and present in DOM before attempting global observer registration.
        const elementRef = element.value;

        // Register element reference and `onUnmount$` QRL with global unmount observer.
        // Establishes `MutationObserver` tracking to reliably trigger teardown for SSR-resumed components.
        if (elementRef) {
          globalUnmountObserver.add({ element: elementRef, qrl: onUnmount$ });
        }
      }
    })
  );
};

export namespace useLifecycle {
  /**
   * Represents the configuration parameters accepted by the `useLifecycle` hook.
   *
   * This interface defines the essential options needed to establish reliable lifecycle synchronization
   * across the server-to-browser continuity gap. It establishes a unified structure for binding target DOM
   * node references to global mutation tracking and registering serialized initialization and teardown
   * callbacks that safeguard against lost cleanup during component unmounting.
   */
  export type Params = UseLifecycleParams;
}
