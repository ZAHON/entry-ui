import type { ErrorParams } from './error.types';

/**
 * Logs a formatted error message to the console with a specific prefix.
 *
 * This utility helps maintain consistent error reporting by joining multiple
 * message segments and tagging them with a clear origin identifier.
 *
 * @example
 * ```ts
 * error({ prefix: "[Parser]", messages: ["Failed to", "process", "the style string."] });
 * // Console outputs: [Parser] Failed to process the style string.
 * ```
 */
export const error = (params: ErrorParams) => {
  const { prefix, messages } = params;

  const message = messages.join(' ');

  console.error(`${prefix} ${message}`);
};
