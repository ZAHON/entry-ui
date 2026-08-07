import type { QRL } from '@qwik.dev/core';

/**
 * Represents the object returned by the `useScrollLock` hook.
 *
 * This interface defines the toggle methods required to manage document scrolling.
 * It provides the execution handles necessary to disable or enable layout interaction,
 * adjusting document styling, injecting layout-shift variables, and resolving platform-specific
 * scroll boundaries to preserve layout continuity during overlay presentation.
 */
export interface UseScrollLockReturnValue {
  /**
   * A `QRL` function that activates the scroll lock.
   * When executed in a browser environment, it disables background scrolling.
   * It evaluates `Window` and `Document` contexts, as well as `<html>` and `<body>` elements,
   * handles platform-specific inconsistencies, and manages layout shifts to prevent content "jumping".
   */
  lock$: QRL<() => Promise<void>>;

  /**
   * A `QRL` function that deactivates the scroll lock.
   * It invokes the release callback associated with the current scroll lock session,
   * restoring original `Document` context and viewport styles.
   */
  unlock$: QRL<() => void>;
}
