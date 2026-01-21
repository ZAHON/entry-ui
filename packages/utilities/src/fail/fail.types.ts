export interface FailParams {
  /**
   * A string that identifies the origin or category of the failure.
   * This prefix is prepended to the thrown error message to help pinpoint the source of the exception.
   */
  prefix: string;

  /**
   * An array of message segments that will be joined by a single space.
   * Allows for dynamic construction of a comprehensive error message from multiple strings.
   */
  messages: string[];
}
