import type { WarnParams } from './warn.types';

/**
 * Logs a formatted warning message to the console with a specific prefix.
 *
 * This utility helps maintain consistent warning reporting by joining multiple
 * message segments and tagging them with a clear origin identifier.
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

  // Combine all individual message fragments into a single continuous string.
  // Each segment is separated by a space to construct a readable sentence.
  const message = messages.join(' ');

  // Output the formatted warning to the browser or Node.js console using `console.warn`.
  // The prefix is attached at the beginning to clearly indicate the warning source.
  console.warn(`${prefix} ${message}`);
};

export namespace warn {
  /**
   * Represents the configuration parameters required by the `warn` utility.
   *
   * This interface defines the essential payload fields needed to format and emit
   * consistent console warnings. It enforces a unified logging structure across the codebase
   * by pairing an explicit component prefix with an array of contextual message fragments.
   */
  export type Params = WarnParams;
}
