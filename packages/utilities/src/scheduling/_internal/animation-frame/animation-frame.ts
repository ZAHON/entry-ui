import type { CreateAnimationFrameReturnValue } from './animation-frame.types';

/**
 * An internal cached reference to the active global `requestAnimationFrame` implementation.
 *
 * Used to detect dynamic timer reference swaps (e.g. mock timers during testing)
 * and trigger automatic re-scheduling when the underlying environment context changes.
 */
let LAST_RAF = globalThis.requestAnimationFrame;

/**
 * An internal factory utility that creates a low-level, batched animation frame scheduler.
 *
 * It uses an array as internal backing storage to achieve `O(1)` cancellation efficiency.
 * It also handles edge cases like mock timers swapping during test suites.
 */
export const createAnimationFrameScheduler = () => {
  // Uses an array backing store to enable `O(1)` callback cancellation via `null` insertion.
  // Avoids calling native `cancelAnimationFrame` when empty, optimizing request-cancel patterns
  // while safely converting leftover empty frames into `O(1)` no-ops via `callbacksCount`.
  let callbacks: (FrameRequestCallback | null)[] = [];

  // Tracks the number of active, non-null callbacks currently queued for execution.
  // Enables instant `O(1)` checks during tick to skip processing entirely when all items are cancelled.
  let callbacksCount = 0;

  // Maintains the auto-incrementing identifier assigned to the next requested frame callback.
  // Serves as the unique reference key required to locate and cancel specific tasks in `O(1)` time.
  let nextId = 1;

  // Holds the baseline identifier offset corresponding to index `0` of the callbacks array.
  // Allows mapping any target request ID directly to its relative array index via simple subtraction.
  let startId = 1;

  // Flags whether a native `requestAnimationFrame` frame has already been requested and is pending.
  // Prevents scheduling duplicate native frames while multiple callbacks accumulate in the same batch.
  let isScheduled = false;

  // Internal frame loop handler that executes all accumulated callbacks sequentially.
  // Clears internal state beforehand to allow recursive requests during callback execution.
  const tick = (timestamp: number) => {
    // Reset scheduling lock to allow queuing new frames during callback execution.
    // Preserves atomic batch processing for the current tick frame.
    isScheduled = false;

    // Capture snapshot of active callbacks to ensure safe iteration.
    // Prevents dynamic mutations of the callbacks array during execution.
    const currentCallbacks = callbacks;
    const currentCallbacksCount = callbacksCount;

    // Reset internal collections before running callbacks to accept new queue entries.
    // Callbacks invoked in this cycle will safely populate the next tick sequence.
    callbacks = [];
    callbacksCount = 0;
    startId = nextId;

    // Iterate and execute non-null callbacks when active tasks exist.
    // Ignores cancelled entries (`null`) in `O(1)` constant time per item.
    if (currentCallbacksCount > 0) {
      for (let i = 0; i < currentCallbacks.length; i += 1) {
        currentCallbacks[i]?.(timestamp);
      }
    }
  };

  /**
   * Registers a new frame request callback in the shared batch queue.
   * Enforces auto-rescheduling when global animation frame implementation changes.
   */
  const request = (callback: FrameRequestCallback) => {
    // Store assigned unique handle identifier and prepare sequence counter.
    // Generates sequential IDs mapped to internal array offset indices.
    const id = nextId;

    // Advance the internal identifier counter and queue the target callback.
    // Increments the active callback count to track pending batch operations.
    nextId += 1;
    callbacks.push(callback);
    callbacksCount += 1;

    // A fake `requestAnimationFrame` (e.g. under fake timers in tests) can be swapped in without
    // any guarantee that the frame will actually run before it's swapped back, which would leave
    // `isScheduled` set without our `tick()` ever running. Detecting the swap lets us re-schedule
    // against the current `requestAnimationFrame` instead of getting stuck waiting on the old one.
    const didRAFChange = LAST_RAF !== requestAnimationFrame && ((LAST_RAF = requestAnimationFrame), true);

    // Schedule native animation frame tick if idle or reference changed.
    // Prevents orphaned tasks when fake timer instances are swapped.
    if (!isScheduled || didRAFChange) {
      requestAnimationFrame(tick);
      isScheduled = true;
    }

    // Return the unique task identifier generated for this request.
    // Allows the caller to cancel this specific frame execution prior to tick execution.
    return id;
  };

  /**
   * Cancels a pending request in `O(1)` time by nullifying its array index.
   * Avoids expensive array re-indexing or native `cancelAnimationFrame` overhead.
   */
  const cancel = (id: number) => {
    // Calculate relative index offset within the active callbacks array.
    // Subtracts baseline start ID to translate target task handle into array index.
    const index = id - startId;

    // Validate if calculated index falls within active array boundaries.
    // Early exits on out-of-bounds indices to prevent corrupting state or executing no-ops.
    if (index < 0 || index >= callbacks.length) {
      return;
    }

    // Verify if the callback at the target index has already been nullified.
    // Prevents duplicate cancellation calls from incorrectly decrementing the active task counter.
    if (callbacks[index] === null) {
      return;
    }

    // Nullify callback slot to perform `O(1)` cancellation without array mutation.
    // Decrements active task counter to allow tick phase early-exits when queue empties.
    callbacks[index] = null;
    callbacksCount -= 1;
  };

  return {
    /**
     * Registers a new frame request callback in the shared batch queue.
     * Enforces auto-rescheduling when global animation frame implementation changes.
     */
    request,

    /**
     * Cancels a pending request in `O(1)` time by nullifying its array index.
     * Avoids expensive array re-indexing or native `cancelAnimationFrame` overhead.
     */
    cancel,

    /**
     * Accessor for reading the next unique identifier sequence number.
     * Indicates the target handle ID that will be assigned to the next requested frame task.
     */
    get nextId() {
      return nextId;
    },

    /**
     * Accessor for synchronizing the next unique identifier sequence number.
     * Enables continuous ID allocation across scheduler instances after environment resets.
     */
    set nextId(id: number) {
      nextId = id;
    },

    /**
     * Accessor for reading the starting identifier offset of the active queue.
     * Corresponds to the global task handle ID stored at index `0` of the internal array.
     */
    get startId() {
      return startId;
    },

    /**
     * Accessor for updating the starting identifier offset of the active queue.
     * Aligns array index calculations with global ID tracking during scheduler state resets.
     */
    set startId(id: number) {
      startId = id;
    },

    /**
     * Empties the pending queue in place to prevent orphan callback executions.
     * Ensures any leftover frame requested prior to a reset acts as an empty no-op.
     */
    clearCallbacks() {
      // Re-assign empty array and clear counter to drop active scheduled tasks.
      // Keeps active native frame request intact while stripping its payload.
      callbacks = [];
      callbacksCount = 0;
    },
  };
};

/**
 * An internal global instance of the animation frame batch scheduler.
 *
 * Coordinates execution across all standalone `createAnimationFrame` handles, batching
 * callbacks into unified browser frame ticks for optimal rendering performance.
 */
let animationFrameScheduler = createAnimationFrameScheduler();

/**
 * Replaces the shared scheduler instance and drops all pending animation frame callbacks.
 *
 * Designed specifically for test environments to prevent state pollution across test suites.
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
  // Capture snapshot reference of active scheduler instance prior to teardown.
  // Ensures pending ticks can be safely targeted and drained during reset phase.
  const previousAnimationFrameScheduler = animationFrameScheduler;

  // Instantiate fresh scheduler instance to handle subsequent frame requests.
  // Replaces global instance reference to isolate state between test runs.
  animationFrameScheduler = createAnimationFrameScheduler();

  // Continue the id sequence so `cancel()` calls from `AnimationFrame` instances created before the
  // reset cannot cancel callbacks scheduled after it.
  animationFrameScheduler.nextId = previousAnimationFrameScheduler.nextId;
  animationFrameScheduler.startId = previousAnimationFrameScheduler.nextId;

  // A frame requested before the reset may still be pending and holds the previous scheduler's
  // `tick`; empty its queue in place so that frame runs nothing when it eventually fires.
  previousAnimationFrameScheduler.clearCallbacks();
};

/**
 * Creates an isolated, stateful animation frame handle instance.
 *
 * This factory function provides an intuitive interface for scheduling single execution frame tasks.
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
 *   console.log('Executed on animation frame!');
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
      animationFrameScheduler.cancel(currentId);

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
    currentId = animationFrameScheduler.request(() => {
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
