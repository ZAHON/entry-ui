import type { WarnParams } from './warn.types';

/**
 * Logs a formatted warning message to the console.
 *
 * This function is a wrapper around `console.warn` that joins multiple
 * message segments into a single string and prepends the specified prefix
 * for clear identification in the console output.
 *
 * @example
 * ```ts
 * warn({ prefix: "[Validator]", messages: ["The property", "color", "is deprecated."] });
 * // Console outputs: "[Validator] The property color is deprecated."
 * ```
 */
export const warn = (params: WarnParams) => {
  const { prefix, messages } = params;

  const message = messages.join(' ');

  console.warn(`${prefix} ${message}`);
};
