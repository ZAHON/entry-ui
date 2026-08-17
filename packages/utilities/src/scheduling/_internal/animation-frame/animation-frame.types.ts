/**
 * The API controls returned by the `createAnimationFrame` factory utility.
 *
 * This interface encapsulates management methods for scheduling and cancelling single,
 * high-performance animation frame requests through a shared batch scheduler.
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
