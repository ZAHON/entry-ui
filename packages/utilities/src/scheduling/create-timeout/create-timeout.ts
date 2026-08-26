import type { CreateTimeoutReturnValue } from './create-timeout.types';

/**
 * Creates an isolated, stateful timer controller instance.
 *
 * This factory utility encapsulates native timeout scheduling logic into a safe controller interface.
 * It prevents overlapping executions by automatically clearing any pending timer when a new execution
 * is scheduled, and exposes explicit methods for cancellation and state inspection.
 *
 * @example
 * ```ts
 * // Create a standalone timer instance for managing delayed executions.
 * const timer = createTimeout();
 *
 * // Schedule a task after 500ms.
 * timer.start({
 *   callback: () => console.log("Executed!"),
 *   delayMs: 500,
 * });
 *
 * // Inspect whether the timer is currently waiting to execute.
 * timer.isStarted();
 *
 * // Cancel execution if needed.
 * timer.clear();
 * ```
 */
export const createTimeout = (): CreateTimeoutReturnValue => {
  // Hold internal reference to the currently active native timeout handle.
  // Initialized to `0` to represent an idle state with no pending executions.
  let currentId: number = 0;

  const clear = () => {
    // Check if an active timer handle exists before attempting cancellation.
    // Clears the scheduled execution and restores the internal state back to idle.
    if (currentId !== 0) {
      // Cancel the currently scheduled native execution to prevent it from firing in the background.
      // This ensures that any scheduled callback is safely aborted before it can be triggered.
      clearTimeout(currentId);

      // Reset the internal handle reference back to zero to signify that the controller is idle.
      // This state change ensures that subsequent status checks correctly report no active timer.
      currentId = 0;
    }
  };

  const start = (params: { callback: () => void; delayMs: number }) => {
    const { callback, delayMs } = params;

    // Immediately cancel any previously active timer to avoid duplicate or overlapping executions.
    // Calling clear resets internal state and prepares the controller for the new scheduling process.
    clear();

    // Schedule the target callback execution after the specified millisecond delay.
    // Resets internal state right before executing the callback and casts handle for type safety.
    currentId = setTimeout(() => {
      // Mark the controller as idle immediately before executing the target callback.
      // Resetting the handle to zero ensures that `isStarted` returns `false` during execution.
      currentId = 0;

      // Invoke the user-provided callback function after the delay has successfully elapsed.
      // Executes the scheduled task once the timer cycle is fully completed.
      callback();
    }, delayMs) as unknown as number; // Reconcile Node.js Timeout type with DOM browser handle type
  };

  const isStarted = () => {
    // Evaluate whether the internal handle currently holds an active timer ID.
    // Returns `true` when execution is pending, and `false` when idle or cleared.
    return currentId !== 0;
  };

  // Return the controller API exposing methods to schedule, cancel, and inspect the timer instance.
  // Encapsulates the internal timer handle state within a clean, stateful interface.
  return { start, clear, isStarted };
};

export namespace createTimeout {
  /**
   * Represents the controller API returned by the `createTimeout` factory utility.
   *
   * This interface defines the operational contract for managing an isolated, stateful timer controller.
   * It encapsulates methods for scheduling, canceling, and inspecting delayed callback executions while
   * providing built-in lifecycle management to prevent overlapping timers and memory leaks.
   */
  export type ReturnValue = CreateTimeoutReturnValue;
}
