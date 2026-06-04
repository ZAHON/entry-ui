import type { QRL } from '@qwik.dev/core';

/**
 * Represents the object returned by the `useScrollLock` hook.
 */
export interface UseScrollLockReturnValue {
  /**
   * A `QRL` function that activates the scroll lock.
   * When executed in a browser environment, it disables background scrolling by locking
   * the body element and calculating layout shifts to prevent content "jumping".
   * It handles platform-specific inconsistencies, such as iOS Safari's background
   * scrolling, and marks the `<body>` element with a `data-scroll-lock` attribute
   * to manage the lock state. Additionally, it sets a `--scrollbar-width` CSS
   * variable on the `<html>` (document element) for layout synchronization.
   */
  lock$: QRL<() => void>;

  /**
   * A `QRL` function that deactivates the scroll lock.
   * It restores the original styles of the `<body>`, removes the `data-scroll-lock`
   * attribute from it, and deletes the `--scrollbar-width` CSS variable from the
   * `<html>` element. On iOS, it also ensures the window is scrolled back to its
   * original position to maintain user context.
   */
  unlock$: QRL<() => void>;
}
