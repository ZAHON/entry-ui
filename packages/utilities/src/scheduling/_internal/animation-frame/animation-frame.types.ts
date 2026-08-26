/**
 * Represents the controller API returned by the `createAnimationFrame` factory utility.
 *
 * This interface defines the operational contract for managing an isolated, stateful animation frame handle.
 * It encapsulates methods for scheduling and canceling frame execution callbacks managed by a shared,
 * low-level batch scheduler to maximize rendering performance and avoid layout thrashing.
 */
export interface CreateAnimationFrameReturnValue {
  /**
   * Schedules a callback to be executed on the next browser animation frame.
   * Automatically cancels any previously scheduled frame for this specific handle instance.
   */
  request: (callback: () => void) => void;

  /**
   * Immediately cancels any currently active or pending animation frame request.
   * Performs a safe no-op if no frame is currently scheduled for this instance.
   */
  cancel: () => void;
}
