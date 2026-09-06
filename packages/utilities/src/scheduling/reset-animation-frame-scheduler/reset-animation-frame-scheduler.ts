import { createAnimationFrameScheduler } from '../_internal/create-animation-frame-scheduler';
import { getAnimationFrameScheduler, setAnimationFrameScheduler } from '../_internal/animation-frame-scheduler';

/**
 * Replaces the shared scheduler instance and drops all pending animation frame callbacks.
 *
 * This utility is designed specifically for test environments to prevent state pollution across test suites.
 * Since the scheduler is process-global, callbacks scheduled under mock timers or before test teardowns
 * could otherwise persist and execute unexpectedly in subsequent tests against stale context.
 *
 * @example
 * ```ts
 * // Reset global scheduler instance between unit test executions.
 * beforeEach(() => {
 *   resetAnimationFrameScheduler();
 * });
 * ```
 */
export const resetAnimationFrameScheduler = () => {
  // Create a fresh, empty scheduler instance using the factory utility to replace the stale state.
  // Initializes a clean backing queue environment for subsequent frame scheduling operations.
  const nextScheduler = createAnimationFrameScheduler();

  // Retrieve the current active process-global scheduler instance reference.
  // Allows inspecting and safely cleaning up the existing queue state before swapping.
  const previousScheduler = getAnimationFrameScheduler();

  // Capture the latest assigned identifier sequence number from the previous scheduler.
  // Preserves ID continuity across resets to prevent conflicting task handle allocations.
  const previousNextId = previousScheduler.getNextId();

  // Synchronize the next available task identifier tracker on the new scheduler instance.
  // Ensures unique handle generation continues seamlessly without resetting sequence numbering.
  nextScheduler.setNextId(previousNextId);

  // Align the baseline starting identifier offset on the new scheduler instance.
  // Matches the relative array index calculation base with the carried-over ID position.
  nextScheduler.setStartId(previousNextId);

  // Replace the active process-global scheduler instance reference with the new one.
  // Switches the global execution context to point to the clean scheduler.
  setAnimationFrameScheduler(nextScheduler);

  // Clear all pending callbacks and reset the counter on the old scheduler instance.
  // Effectively drops leftover tasks to prevent state pollution and unexpected asynchronous executions.
  previousScheduler.clearCallbacks();
};
