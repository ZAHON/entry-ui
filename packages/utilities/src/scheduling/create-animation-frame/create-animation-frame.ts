import type { CreateAnimationFrameReturnValue } from './create-animation-frame.types';
import { getAnimationFrameScheduler } from '../_internal/animation-frame-scheduler';

/**
 * Creates an isolated, stateful animation frame handle instance.
 *
 * This factory utility provides an intuitive interface for scheduling single execution frame tasks.
 * It automatically cancels any pending frame execution whenever a new frame is requested on the same handle,
 * protecting against overlapping executions and layout thrashing.
 *
 * @example
 * ```ts
 * // Create a standalone animation frame handle instance.
 * const anim = createAnimationFrame();
 *
 * // Schedule a task to run on the next frame.
 * anim.request(() => {
 *   console.log("Executed on animation frame!");
 * });
 *
 * // Cancel the pending frame if needed.
 * anim.cancel();
 * ```
 */
export const createAnimationFrame = (): CreateAnimationFrameReturnValue => {
  // Hold active scheduling ID for this specific controller instance.
  // Mapped to `null` when no animation frame is currently scheduled.
  let currentId: number | null = null;

  // Immediately cancels any pending frame execution on this handle instance.
  // Clears internal active handle reference back to idle `null` state.
  const cancel = () => {
    // Check if a frame execution is currently scheduled for this instance.
    // Prevents redundant cancellation calls when the controller is idle.
    if (currentId !== null) {
      // Unregister the frame callback handle from the global batch scheduler.
      // Nullifies the queued callback in `O(1)` time without resetting scheduler state.
      getAnimationFrameScheduler().cancel(currentId);

      // Reset internal tracking reference back to idle state.
      // Ensures subsequent cancellation checks safely return `false` until rescheduled.
      currentId = null;
    }
  };

  // Schedules `callback` on the next frame, cancelling any previously scheduled request on this handle.
  // Guarantees that only a single frame callback remains active at any given moment.
  const request = (callback: () => void) => {
    // Cancel active scheduled frame to maintain single-execution rule.
    // Schedules new callback in global batching scheduler and saves assigned handle ID.
    cancel();

    // Register callback with global batch scheduler and record generated task handle.
    // Stores unique ID to allow cancellation before frame execution.
    currentId = getAnimationFrameScheduler().request(() => {
      // Clear handle reference prior to executing target callback logic.
      // Reset allows synchronous scheduling of new frames inside callback body.
      currentId = null;

      // Execute target callback logic scheduled for current animation frame.
      // Invokes queued user function within active frame tick execution cycle.
      callback();
    });
  };

  // Return the controller API exposing methods to schedule and cancel animation frame callbacks.
  // Encapsulates the internal frame handle state within a clean, stateful interface.
  return { request, cancel };
};

export namespace createAnimationFrame {
  /**
   * Represents the controller API returned by the `createAnimationFrame` factory utility.
   *
   * This interface defines the operational contract for managing an isolated, stateful animation frame handle.
   * It encapsulates methods for scheduling and canceling frame execution callbacks managed by a shared,
   * low-level batch scheduler to maximize rendering performance and avoid layout thrashing.
   */
  export type ReturnValue = CreateAnimationFrameReturnValue;
}
