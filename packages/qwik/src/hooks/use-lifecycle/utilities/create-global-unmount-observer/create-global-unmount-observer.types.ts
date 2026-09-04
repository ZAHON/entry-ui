import type { QRL } from '@qwik.dev/core';

/**
 * Represents the controller API returned by the `createGlobalUnmountObserver` internal utility.
 *
 * This interface defines the operational contract for managing centralized DOM element detachment tracking.
 * It encapsulates registration methods required to coordinate lifecycle cleanup execution across concurrent UI
 * components, custom hooks, and application runtime execution contexts.
 */
export interface CreateGlobalUnmountObserverReturnValue {
  /**
   * Registers a target DOM `element` and its associated cleanup `QRL` function for unmount tracking.
   *
   * If the shared `MutationObserver` is not yet active, this method initializes it lazily.
   * If the specified `element` is already being monitored, the provided cleanup `QRL` is appended
   * to its set of execution callbacks. If the `element` is already detached from the DOM
   * at the time of registration, the cleanup callback is processed immediately.
   */
  add: (params: { element: HTMLElement; qrl: QRL<() => void> | QRL<() => Promise<void>> }) => void;

  /**
   * Unregisters a specific cleanup `QRL` function from a tracked DOM `element`.
   *
   * If no remaining cleanup `QRL` functions are associated with the `element`, the `element` is removed
   * from tracking and memory maps. When the total set of monitored elements reaches zero, the underlying
   * `MutationObserver` is automatically disconnected to release system resources.
   */
  remove: (params: { element: HTMLElement; qrl: QRL<() => void> | QRL<() => Promise<void>> }) => void;
}
