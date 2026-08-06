/**
 * The API controls returned by the `createTimeout` factory utility.
 *
 * This interface encapsulates management methods for scheduling, executing,
 * clearing, and inspecting an isolated, stateful timer instance. It provides
 * a clean abstraction over native global timeouts, preventing race conditions
 * and accidental multiple timer overlaps.
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
