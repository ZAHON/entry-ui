import type { QRL } from '@qwik.dev/core';

/**
 * Represents the object returned by the `createGlobalUnmountObserver` utility.
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
