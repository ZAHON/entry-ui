import type { ErrorParams } from './error.types';

/**
 * Logs a formatted error message to the console with a specific prefix.
 *
 * This utility helps maintain consistent error reporting by joining multiple
 * message segments and tagging them with a clear origin identifier.
 *
 * @example
 * ```ts
 * // Standard usage with a component prefix and multiple message parts.
 * error({ prefix: "[Parser]", messages: ["Failed to", "process", "the style string."] });
 * // Console outputs: [Parser] Failed to process the style string.
 *
 * // Formatting an error message with a single message element.
 * error({ prefix: "[Auth]", messages: ["Invalid token provided."] });
 * // Console outputs: [Auth] Invalid token provided.
 *
 * // Passing an empty messages array for a minimal header notice.
 * error({ prefix: "[Database]", messages: [] });
 * // Console outputs: [Database]
 * ```
 */
export const error = (params: ErrorParams) => {
  const { prefix, messages } = params;

  // Combine all individual message fragments into a single continuous string.
  // Each segment is separated by a space to construct a readable sentence.
  const message = messages.join(' ');

  // Output the formatted error to the browser or Node.js console using `console.error`.
  // The prefix is attached at the beginning to clearly indicate the error source.
  console.error(`${prefix} ${message}`);
};
