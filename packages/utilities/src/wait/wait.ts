/**
 * Pauses the execution of the current asynchronous function for a specified duration.
 *
 * This function utilizes a Promise-based wrapper around `setTimeout` to create
 * a non-blocking delay, allowing for cleaner asynchronous control flows using
 * async/await syntax.
 *
 * @example
 * ```ts
 * const performTask = async () => {
 * 	console.log("Starting task...");
 * 	await wait(2000); // Pauses execution for 2 seconds
 * 	console.log("Task resumed after 2 seconds.");
 * };
 * ```
 */
export const wait = (delayMs: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
};
