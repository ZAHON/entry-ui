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
 * // Standard usage with a component prefix and multiple message parts.
 * warn({ prefix: "[Validator]", messages: ["The property", "color", "is deprecated."] });
 * // Console outputs: [Validator] The property color is deprecated.
 *
 * // Formatting a warning message with a single message element.
 * warn({ prefix: "[Deprecation]", messages: ["Feature will be removed in v2.0."] });
 * // Console outputs: [Deprecation] Feature will be removed in v2.0.
 *
 * // Passing an empty messages array for a minimal header notice.
 * warn({ prefix: "[Config]", messages: [] });
 * // Console outputs: [Config]
 * ```
 */
export const warn = (params: WarnParams) => {
  const { prefix, messages } = params;

  const message = messages.join(' ');

  console.warn(`${prefix} ${message}`);
};
