/**
 * Pauses the execution of the current asynchronous function for a specified duration.
 *
 * This utility wraps `setTimeout` within a native `Promise` to suspend asynchronous execution
 * without blocking the main event loop. It simplifies asynchronous control flows, delay-based
 * sequencing, and polling patterns when consumed with `async/await` syntax.
 *
 * @example
 * ```ts
 * // Pause execution for 2 seconds before proceeding with the task.
 * const performTask = async () => {
 *   await wait(2000);
 *   console.log("Task resumed after 2 seconds.");
 * };
 * ```
 */
export const wait = (delayMs: number) => {
  // Wrap `setTimeout` in a `Promise` that resolves after the specified duration in milliseconds (`delayMs`).
  // This enables non-blocking asynchronous delays when consumed with `async/await` syntax.
  return new Promise((resolve) => setTimeout(resolve, delayMs));
};
