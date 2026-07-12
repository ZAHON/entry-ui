import type { QRL } from '@qwik.dev/core';

/**
 * Represents the object returned by the `createGlobalUnmountObserver` internal utility.
 *
 * This interface defines the registration methods required to monitor element detachment.
 * It provides a centralized mechanism to track individual DOM elements and execute their
 * corresponding cleanup closures, utilizing a single, shared observer instance to minimize
 * resource consumption and prevent memory leaks.
 */
export interface CreateGlobalUnmountObserverReturnValue {
  /**
   * Registers an element and its cleanup logic to be monitored.
   * If the `MutationObserver` is not yet active, it will be initialized.
   * If the element is already being tracked, the new `QRL` will be added
   * to the existing set of cleanup tasks for that element.
   */
  add: (params: { element: HTMLElement; qrl: QRL<() => void> | QRL<() => Promise<void>> }) => void;

  /**
   * Unregisters a specific cleanup QRL from an element.
   * If no more `QRL`s are associated with the element, the element is removed
   * from tracking. If no elements are left in the tracking set, the
   * `MutationObserver` is disconnected to free up system resources.
   */
  remove: (params: { element: HTMLElement; qrl: QRL<() => void> | QRL<() => Promise<void>> }) => void;
}
