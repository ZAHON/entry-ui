/**
 * Represents the controller API returned by the `createAnimationFrameScheduler` internal factory utility.
 *
 * This interface defines the operational contract for a low-level, batched animation frame scheduler,
 * exposing methods to queue callbacks, cancel pending tasks in `O(1)` time, manage internal identifier state,
 * and clear active queues.
 */
export interface CreateAnimationFrameSchedulerReturnValue {
  /**
   * Registers a new frame request callback in the shared batch queue.
   * Enforces auto-rescheduling when global animation frame implementation changes.
   */
  request: (callback: FrameRequestCallback) => number;

  /**
   * Cancels a pending request in `O(1)` time by nullifying its array index.
   * Avoids expensive array re-indexing or native `cancelAnimationFrame` overhead.
   */
  cancel: (id: number) => void;

  /**
   * Accessor for reading the next unique identifier sequence number.
   * Indicates the target handle ID that will be assigned to the next requested frame task.
   */
  getNextId: () => number;

  /**
   * Accessor for synchronizing the next unique identifier sequence number.
   * Enables continuous ID allocation across scheduler instances after environment resets.
   */
  setNextId: (id: number) => void;

  /**
   * Accessor for reading the starting identifier offset of the active queue.
   * Corresponds to the global task handle ID stored at index `0` of the internal array.
   */
  getStartId: () => number;

  /**
   * Accessor for updating the starting identifier offset of the active queue.
   * Aligns array index calculations with global ID tracking during scheduler state resets.
   */
  setStartId: (id: number) => void;

  /**
   * Empties the pending queue in place to prevent orphan callback executions.
   * Ensures any leftover frame requested prior to a reset acts as an empty no-op.
   */
  clearCallbacks: () => void;
}
