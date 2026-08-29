import type { GetScrollLockerReturnValue } from './get-scroll-locker.types';
import { createTimeout } from '../../scheduling/create-timeout';
import { isIos } from '../../platform/is-ios';
import { isViewportScrollLocked } from '../_internal/is-viewport-scroll-locked';
import { hasInsetScrollbars } from '../_internal/has-inset-scrollbars';
import { preventScrollOverlayScrollbars } from '../_internal/prevent-scroll-overlay-scrollbars';
import { preventScrollInsetScrollbars } from '../_internal/prevent-scroll-inset-scrollbars';

/**
 * An internal factory utility that creates an isolated, reference-counted viewport scroll locker instance.
 *
 * This factory utility manages viewport scroll prevention across concurrent components. It prevents dynamic layout shifts,
 * respects external lock states using mutation observers, and defers lock and unlock execution to the next event
 * loop tick to batch DOM state changes.
 */
export const createScrollLocker = () => {
  // Track total active scroll lock requests across the application runtime.
  // Internal scroll locking is only triggered when this counter transitions from `0` to `1`.
  let lockCount = 0;

  // Active restoration callback reference returned by underlying scroll-prevention utilities.
  // Holds `null` when idle, or holds teardown/cleanup logic when a scroll lock is active.
  let restore = null as (() => void) | null;

  // Deferred timer controller used to schedule scroll lock activation asynchronously.
  // Prevents multiple rapid state mutations within the same execution frame from thrashing styles.
  const timeoutLock = createTimeout();

  // Deferred timer controller used to schedule scroll lock release asynchronously.
  // Guarantees teardown runs deterministically after all active lock references complete.
  const timeoutUnlock = createTimeout();

  /**
   * Evaluates current DOM viewport conditions and applies optimal scroll prevention rules.
   * Handles external lock synchronization via `MutationObserver` and device-specific strategies.
   */
  const lock = (params: { win: typeof window; doc: Document; html: HTMLElement; body: HTMLElement }) => {
    const { win, doc, html, body } = params;

    // Check execution guard conditions to avoid duplicate or invalid locking operations.
    // Ignores locking if reference counter drops to zero or if cleanup state is already active.
    if (lockCount === 0 || restore !== null) {
      return;
    }

    // The page is already locked, either by the site author or by a non-Entry UI overlay that
    // hasn't cleaned up yet. Leave it alone and wait for the lock to clear before taking over,
    // otherwise we'd snapshot the locked state and restore it after our own lock is released.
    if (isViewportScrollLocked({ win, html, body })) {
      // Create a `MutationObserver` to watch for removal of external scroll lock styles or attributes.
      // Defers taking over the lock to avoid snapshotting an already-modified baseline style state.
      const observer = new win.MutationObserver(() => {
        // Re-evaluate lock condition on every DOM attribute change; continue waiting if still locked.
        // Prevents premature lock acquisition while third-party scripts complete their teardown.
        if (isViewportScrollLocked({ win, html, body })) {
          return;
        }

        // Stop watching DOM mutations once external scroll lock has been cleared.
        // Prevents memory leaks and unnecessary callback triggers on subsequent DOM updates.
        observer.disconnect();

        // Clear the temporary restoration reference pointing to the mutation observer teardown.
        // Prepares the locker state to register the primary scroll restoration cleanup function.
        restore = null;

        // Re-invoke lock execution now that the external lock constraint has ended.
        // Takes over scroll control and applies native or overlay lock rules safely.
        lock({ win, doc, html, body });
      });

      // Configure observer options to watch all element attribute modifications.
      // Detects scroll locks applied via inline styles, classes, or attributes like `data-scroll-locked` added by other external scripts.
      const options: MutationObserverInit = { attributes: true };

      // Attach the mutation observer to the root `<html>` element of the document.
      // Monitors class, style, and data-attribute modifications applied at the document level.
      observer.observe(html, options);

      // Attach the mutation observer to the document `<body>` element.
      // Captures overflow and style changes applied directly to body by third-party modal scripts.
      observer.observe(body, options);

      // Store observer disconnect handle inside the restoration reference.
      // Allows teardown to safely abort DOM mutation observation if unlocked prematurely.
      restore = () => observer.disconnect();

      // Halt current locking execution until observed elements are freed from external lock.
      // Prevents snapshotting locked dimensions as baseline styles during active external locking.
      return;
    }

    // Determine if scrollbars act as overlays (iOS/macOS) or consume physical layout width.
    // Guides strategy selection between simple overflow suppression and inset gutter calculations.
    const hasOverlayScrollbars = isIos() || !hasInsetScrollbars({ win, doc });

    // On iOS, scroll locking does not work if the navbar is collapsed. Due to numerous
    // side effects and bugs that arise on iOS, it must be researched extensively before
    // being enabled to ensure it doesn't cause the following issues:
    // - Textboxes must scroll into view when focused, nor cause a glitchy scroll animation.
    // - The navbar must not force itself into view and cause layout shift.
    // - Scroll containers must not flicker upon closing a popup when it has an exit animation.
    restore = hasOverlayScrollbars
      ? preventScrollOverlayScrollbars({ html, body })
      : preventScrollInsetScrollbars({ win, html, body });
  };

  /**
   * Internal unlock handler executed after reference counts drop to zero.
   * Invokes active restoration logic and purges internal cleanup pointers.
   */
  const unlock = () => {
    // Confirm reference count is zero and active restoration function exists before executing teardown.
    // Safely invokes cleanup logic and restores internal state pointer back to `null`.
    if (lockCount === 0 && restore) {
      restore?.();
      restore = null;
    }
  };

  /**
   * Decrements reference count and schedules scroll restoration if no active locks remain.
   * Serves as the session cleanup callback returned upon invoking `acquire()`.
   */
  const release = () => {
    // Decrement reference count tracking active scroll lock consumers.
    // Ensures scroll lock stays applied until every acquiring subscriber invokes release.
    lockCount -= 1;

    // Schedule deferred unlock task when all lock consumers have released their session.
    // Uses `timeoutUnlock` to allow synchronous re-acquisitions within the same tick.
    if (lockCount === 0 && restore) {
      timeoutUnlock.start({ callback: unlock, delayMs: 0 });
    }
  };

  /**
   * Acquires a viewport scroll lock session and increments reference counter.
   * Schedules lock execution on first acquire call and returns a release callback.
   */
  const acquire = (params: { win: typeof window; doc: Document; html: HTMLElement; body: HTMLElement }) => {
    // Increment active lock reference counter for each acquiring consumer call.
    // Enables concurrent UI components to share a single global scroll lock session.
    lockCount += 1;

    // Schedule initial scroll lock task on first active request when no lock process exists.
    // Defers execution via `timeoutLock` to batch multiple synchronous acquisition calls.
    if (lockCount === 1 && restore === null) {
      timeoutLock.start({ callback: () => lock(params), delayMs: 0 });
    }

    // Return session release function bound to this locker controller instance.
    // Consumers execute this cleanup handle when unmounting or closing overlays.
    return release;
  };

  return { acquire };
};

/**
 * An internal singleton scroll locker instance shared across the application runtime.
 *
 * This instance encapsulates the shared reference counting state and coordinates viewport
 * scroll prevention across independent UI components and hooks.
 */
const scrollLocker = createScrollLocker();

/**
 * Retrieves the shared reference-counted viewport scroll locker singleton instance.
 *
 * This utility provides a unified global handle to the underlying reference-counted scroll controller.
 * It guarantees that independent UI components, custom hooks, and overlapping overlays share a single
 * synchronized state machine to prevent unwanted page scrolling and dynamic layout shifts.
 *
 * @example
 * ```ts
 * // Acquire a scroll lock session when mounting a modal overlay.
 * const releaseScroll = getScrollLocker().acquire({
 *   win: window,
 *   doc: document,
 *   html: document.documentElement,
 *   body: document.body,
 * });
 *
 * // Later, release the lock session when the modal unmounts or closes.
 * releaseScroll();
 * ```
 */
export const getScrollLocker = (): GetScrollLockerReturnValue => {
  return scrollLocker;
};

export namespace getScrollLocker {
  /**
   * Represents the controller API returned by the `getScrollLocker` utility.
   *
   * This interface defines the operational contract for acquiring reference-counted viewport scroll locks.
   * It encapsulates management methods required to coordinate viewport scroll prevention across concurrent UI
   * components, custom hooks, and application runtime execution contexts.
   */
  export type ReturnValue = GetScrollLockerReturnValue;
}
