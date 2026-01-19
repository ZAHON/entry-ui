export interface WarnParams {
  /**
   * A string that identifies the origin or category of the warning.
   * Usually displayed at the beginning of the log message for easier filtering.
   */
  prefix: string;

  /**
   * An array of message segments that will be joined together into a single string.
   * Allows for clean passing of multiple log parts.
   */
  messages: string[];
}
