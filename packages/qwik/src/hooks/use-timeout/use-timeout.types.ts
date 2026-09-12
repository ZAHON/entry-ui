import type { QRL } from '@qwik.dev/core';

/**
 * Represents the controller API returned by the `useTimeout` hook.
 *
 * This interface defines the operational contract for scheduling, canceling, and inspecting delayed task executions
 * within Qwik's reactive runtime. It encapsulates a suite of QRL-serialized methods that safely wrap an underlying
 * client-side timer controller, ensuring proper lifecycle cleanup and server-side safety across execution boundaries.
 */
export interface UseTimeoutReturnValue {
  /**
   * A `QRL` function that schedules a delayed execution of the provided callback after a specified duration.
   * If a timer is already active when invoked, it automatically cancels the pending execution before scheduling
   * the new task, guaranteeing single-execution statefulness.
   */
  start$: QRL<(params: { callback: QRL<() => unknown>; delayMs: number }) => void>;

  /**
   * A `QRL` function that immediately cancels any currently active or scheduled timer execution.
   * Performs a safe no-op if no timer is currently running, ensuring deterministic cleanup without runtime errors.
   */
  clear$: QRL<() => void>;

  /**
   * A `QRL` function that evaluates whether a timer execution is currently pending.
   * Returns `true` if a timer has been scheduled and is awaiting execution, otherwise `false`.
   */
  isStarted$: QRL<() => boolean>;
}
