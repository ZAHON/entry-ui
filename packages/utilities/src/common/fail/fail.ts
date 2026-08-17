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
 * fail({ prefix: "[Core]", messages: ["Critical", "failure", "detected."] });
 * // Throws: Error: [Core] Critical failure detected.
 * ```
 */
export const fail = (params: FailParams) => {
  const { prefix, messages } = params;

  const message = messages.join(' ');

  throw new Error(`${prefix} ${message}`);
};
