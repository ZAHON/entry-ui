import { FlushBeforePaintParams } from './flush-before-paint.types';

/**
 * An internal module-level queue that accumulates pending callbacks registered within the active microtask checkpoint.
 *
 * Serves as a shared state buffer for `flushBeforePaint`, coalescing concurrent execution units into a unified batch.
 * It collects callbacks registered during the same tick and clears its reference once execution is delegated
 * to the synchronous flush adapter before the browser paints.
 */
let pendingCallbacks: (() => void)[] | null = null;

/**
 * An internal utility that batches state updates or DOM mutations to execute synchronously before the next paint.
 *
 * This utility mitigates intermediate visual flickering or layout shifting by coalescing multiple callbacks that
 * resolve within the same microtask checkpoint (such as concurrent animation completions). It leverages a
 * microtask queue to bundle pending executions and delegates the actual synchronous commit to a provided
 * `flushUpdate` adapter (e.g., React's `flushSync`). This guarantees that all batched updates are applied
 * together in a single, uninterrupted commit sequence, preventing the browser from rendering incomplete or
 * fragmented intermediate frames.
 */
export const flushBeforePaint = (params: FlushBeforePaintParams) => {
  const { callback, flushUpdate } = params;

  // Check if a batch sequence is currently uninitialized for the active microtask checkpoint.
  // Spawns a new queue and schedules a single microtask flush if no batching context exists.
  if (!pendingCallbacks) {
    // Create a fresh array instance to collect all callbacks queued within this microtask window.
    // Acts as an isolated bucket that preserves invocation order across queued subscribers.
    const callbacks: (() => void)[] = [];

    // Assign the local array to the module-level pending callbacks tracker.
    // Signals that subsequent calls within the same microtask should append to this active batch.
    pendingCallbacks = callbacks;

    // Schedule the synchronous batch execution at the end of the current microtask queue.
    // Guarantees that all synchronous code finishes before flushing accumulated callbacks.
    queueMicrotask(() => {
      // Clear the module-level tracker to allow new batches to form in future microtasks.
      // Ensures that subsequent operations start a fresh queue once this flush begins.
      pendingCallbacks = null;

      // Execute the batch processing block inside the provided synchronous flush wrapper.
      // Triggers framework-level sync commits (e.g., `ReactDOM.flushSync`) to avoid intermediate paints.
      flushUpdate(() => {
        // Cache the total number of queued callbacks to optimize the execution loop performance.
        // Prevents re-evaluating the array length property during each iteration cycle.
        const callbacksLength = callbacks.length;

        // Iterate through each queued callback sequentially using a high-performance index loop.
        // Preserves strict FIFO order when executing batched component or layout updates.
        for (let i = 0; i < callbacksLength; i++) {
          // Retrieve the callback function at the current index position.
          // Prepares the function reference for safe invocation checks.
          const queuedCallback = callbacks[i];

          // Skip execution if the retrieved callback is `undefined` or malformed.
          // Protects against potential sparse array access or runtime type discrepancies.
          if (!queuedCallback) {
            continue;
          }

          // Execute the individual queued callback synchronously.
          // Applies state or DOM changes directly within the active batch flush wrapper.
          queuedCallback();
        }
      });
    });
  }

  // Push the current callback into the active microtask batch queue.
  // Appends the execution unit to be flushed alongside all other concurrent requests.
  pendingCallbacks.push(callback);
};
