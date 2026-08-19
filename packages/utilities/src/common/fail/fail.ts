import type { FailParams } from './fail.types';

/**
 * Throws a formatted error message with a specific prefix to immediately terminate execution.
 *
 * This utility ensures consistent error handling by joining multiple message
 * segments and prepending a clear origin identifier. It is used to immediately
 * terminate the execution flow when a critical issue occurs.
 *
 * @example
 * ```ts
 * // Standard usage with a component prefix and multiple message parts.
 * fail({ prefix: "[Core]", messages: ["Critical", "failure", "detected."] });
 * // Throws: Error: [Core] Critical failure detected.
 *
 * // Throwing an error with a single message element.
 * fail({ prefix: "[Auth]", messages: ["Unauthorized access attempt."] });
 * // Throws: Error: [Auth] Unauthorized access attempt.
 *
 * // Passing an empty messages array for a minimal header exception.
 * fail({ prefix: "[Database]", messages: [] });
 * // Throws: Error: [Database]
 * ```
 */
export const fail = (params: FailParams) => {
  const { prefix, messages } = params;

  // Combine all individual message fragments into a single continuous string.
  // Each segment is separated by a space to construct a readable failure description.
  const message = messages.join(' ');

  // Instantiate and throw a native `Error` containing the formatted prefix and message.
  // This immediately halts execution and propagates the exception up the call stack.
  throw new Error(`${prefix} ${message}`);
};
