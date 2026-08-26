/**
 * Represents the controller API returned by the `createTimeout` factory utility.
 *
 * This interface defines the operational contract for managing an isolated, stateful timer controller.
 * It encapsulates methods for scheduling, canceling, and inspecting delayed callback executions while
 * providing built-in lifecycle management to prevent overlapping timers and memory leaks.
 */
export interface CreateTimeoutReturnValue {
  /**
   * Schedules a delayed callback execution after the specified duration.
   * If a timer is already active when this method is invoked, it automatically
   * cancels the pending execution before scheduling the new task, guaranteeing
   * single-execution statefulness.
   */
  start: (params: { callback: () => void; delayMs: number }) => void;

  /**
   * Immediately cancels any currently active or scheduled timer execution.
   * If no timer is active at the time of invocation, this method safely performs
   * a no-op, ensuring deterministic cleanup without throwing runtime errors.
   */
  clear: () => void;

  /**
   * Evaluates whether a timer execution is currently pending.
   * Returns `true` if a timer has been scheduled and is awaiting execution, otherwise `false`.
   */
  isStarted: () => boolean;
}
