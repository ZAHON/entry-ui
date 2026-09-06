import type { CreateAnimationFrameSchedulerReturnValue } from './create-animation-frame-scheduler.types';

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
export const createAnimationFrameScheduler = (): CreateAnimationFrameSchedulerReturnValue => {
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

    // Capture a reference snapshot of the active callbacks array to ensure safe iteration.
    // This prevents unexpected dynamic mutations or re-entrancy issues during batch execution.
    const currentCallbacks = callbacks;

    // Capture a snapshot of the current callback count to scope the iteration loop safely.
    // This locks the execution length and ignores any newly added items pushed during this tick.
    const currentCallbacksCount = callbacksCount;

    // Reset the main callbacks array to empty storage before executing the current batch.
    // This ensures any new callbacks registered during execution safely populate the next tick queue.
    callbacks = [];

    // Reset the active callback counter back to zero to track incoming queue entries.
    // This keeps the counter accurately synchronized with the newly initialized empty storage.
    callbacksCount = 0;

    // Update the starting ID baseline offset to match the current next available identifier.
    // This aligns relative array index calculations for any new tasks queued during this execution cycle.
    startId = nextId;

    // Check if there are any active, non-cancelled callbacks queued in the current snapshot batch.
    // This prevents unnecessary loop execution when all scheduled tasks have been cancelled.
    if (currentCallbacksCount > 0) {
      // Iterate through each slot in the snapshot callbacks array sequentially.
      // Ensures every registered handler is visited and processed for the current frame tick.
      for (let i = 0; i < currentCallbacks.length; i += 1) {
        // Invoke the callback function if it exists, safely skipping nullified (cancelled) entries.
        // Passes the high-resolution performance timestamp provided by the browser's animation frame.
        currentCallbacks[i]?.(timestamp);
      }
    }
  };

  const request = (callback: FrameRequestCallback) => {
    // Store assigned unique handle identifier and prepare sequence counter.
    // Generates sequential IDs mapped to internal array offset indices.
    const id = nextId;

    // Increment the unique identifier counter to ensure the next request gets a distinct task handle.
    // Prevents handle collisions and maintains sequential ordering across scheduler operations.
    nextId += 1;

    // Push the newly provided callback function into the internal array backing storage.
    // Enqueues the task to be processed sequentially during the next scheduled animation frame tick.
    callbacks.push(callback);

    // Increment the active callback counter to reflect the newly added pending task.
    // Keeps track of active entries to allow instant checks and early exits during execution.
    callbacksCount += 1;

    // A fake `requestAnimationFrame` (e.g. under fake timers in tests) can be swapped in without
    // any guarantee that the frame will actually run before it's swapped back, which would leave
    // `isScheduled` set without our `tick()` ever running. Detecting the swap lets us re-schedule
    // against the current `requestAnimationFrame` instead of getting stuck waiting on the old one.
    const didRAFChange = LAST_RAF !== requestAnimationFrame && ((LAST_RAF = requestAnimationFrame), true);

    // Check if the scheduler is currently idle or if the global animation frame reference changed.
    // Ensures a new frame is requested when no active tick is pending or when mock timers swap.
    if (!isScheduled || didRAFChange) {
      // Request a native browser animation frame using the internal tick handler.
      // Triggers the execution cycle for all currently accumulated batch tasks.
      requestAnimationFrame(tick);

      // Set the scheduling flag to true to indicate a native frame is currently pending.
      // Prevents duplicate native requests while multiple callbacks accumulate in the same batch.
      isScheduled = true;
    }

    // Return the unique task identifier generated for this request.
    // Allows the caller to cancel this specific frame execution prior to tick execution.
    return id;
  };

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

    // Replace the callback function reference at the calculated target index with a `null` value.
    // This achieves `O(1)` constant time cancellation without expensive array re-indexing or splicing.
    callbacks[index] = null;

    // Decrement the active callback counter to reflect the removal of the pending task.
    // Keeps the active task count accurate so the tick loop can skip empty states efficiently.
    callbacksCount -= 1;
  };

  const getNextId = () => {
    // Return the current value of the next identifier tracker sequence number.
    // Provides external read access to the unique task handle ID to be assigned next.
    return nextId;
  };

  const setNextId = (id: number) => {
    // Update the next identifier tracking sequence number with a provided value.
    // Enables external synchronization of ID allocation across state resets or instances.
    nextId = id;
  };

  const getStartId = () => {
    // Return the current baseline starting identifier offset for the active queue.
    // Provides external read access to the handle ID corresponding to array index zero.
    return startId;
  };

  const setStartId = (id: number) => {
    // Update the baseline starting identifier offset with a provided value.
    // Enables aligning relative array index calculations with global ID tracking during resets.
    startId = id;
  };

  const clearCallbacks = () => {
    // Re-assign the internal callbacks storage with a fresh empty array instance.
    // This effectively drops all currently pending tasks from the active queue payload.
    callbacks = [];

    // Reset the active task counter back to zero to reflect the cleared queue state.
    // This ensures the scheduler recognizes that no active callbacks remain to process.
    callbacksCount = 0;
  };

  // Return the complete scheduler controller API object with all exposed methods.
  // Encapsulates internal state while providing granular control over queuing, cancellation, and IDs.
  return { request, cancel, getNextId, setNextId, getStartId, setStartId, clearCallbacks };
};
