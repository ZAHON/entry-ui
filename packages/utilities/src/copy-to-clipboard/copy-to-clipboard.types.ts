/**
 * Represents a structured error object returned when a clipboard operation fails.
 *
 * This interface provides a uniform error shape to distinguish between
 * environment-level limitations and unexpected runtime failures,
 * allowing consumers to handle each case appropriately.
 */
export interface ClipboardError {
  /**
   * The classification of the failure.
   * - `"NOT_SUPPORTED"`: The browser lacks `navigator.clipboard.writeText` support.
   * - `"COPY_FAILED"`: The operation was rejected (e.g., lack of permissions).
   */
  type: 'NOT_SUPPORTED' | 'COPY_FAILED';

  /**
   * A descriptive message detailing the cause of the failure.
   * This field is populated exclusively when the error `type` is `"COPY_FAILED"`,
   * typically containing the message from the native `Error` object.
   */
  message?: string;
}

/**
 * Configuration object for the `copyToClipboard` utility.
 *
 * This interface encapsulates the parameters required to perform a clipboard write operation.
 * It allows the caller to define custom behavior for both successful data persistence
 * and potential browser-level restrictions or runtime failures through dedicated
 * callback handlers.
 */
export interface CopyToClipboardParams {
  /**
   * The plaintext string to be transferred to the system clipboard.
   * This value is processed as a standard UTF-16 string by the Clipboard API.
   */
  value: string;

  /**
   * An optional callback executed immediately after the value has been successfully
   * written to the clipboard. Use this to trigger UI feedback like "Copied!" toasts
   * or success state updates.
   *
   * @default undefined
   */
  onSuccess?: () => void;

  /**
   * An optional callback executed when the copy operation fails or is not supported.
   * It provides structured error information to distinguish between environment
   * limitations (`"NOT_SUPPORTED"`) and unexpected runtime rejections (`"COPY_FAILED"`).
   *
   * @default undefined
   */
  onError?: (error: ClipboardError) => void;
}
