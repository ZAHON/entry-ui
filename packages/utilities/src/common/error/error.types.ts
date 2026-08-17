/**
 * Represents the configuration parameters required by the `error` utility.
 *
 * This interface defines the essential payload fields needed to format and emit consistent console errors.
 * It enforces a unified logging structure across the codebase by pairing an explicit component prefix
 * with an array of contextual message fragments.
 */
export interface ErrorParams {
  /**
   * A string that identifies the origin or category of the error.
   * Prepended to the logged error message to provide context about where the issue occurred.
   */
  prefix: string;

  /**
   * An array of message segments that will be joined with a space.
   * Useful for constructing a detailed error description from multiple parts.
   */
  messages: string[];
}
