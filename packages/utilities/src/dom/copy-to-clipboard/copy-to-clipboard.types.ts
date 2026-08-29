/**
 * Represents the configuration parameters required by the `copyToClipboard` utility.
 *
 * This interface defines the essential payload fields needed to programmatically transfer text
 * to the system clipboard. It enforces a unified parameter structure across the codebase by pairing
 * a target text string with configurable lifecycle callbacks for success notification and error handling.
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
  onSuccess?: () => void | undefined;

  /**
   * An optional callback executed when the copy operation fails or is not supported.
   * It provides structured error information to distinguish between environment
   * limitations (`"NOT_SUPPORTED"`) and unexpected runtime rejections (`"COPY_FAILED"`).
   *
   * @default undefined
   */
  onError?: (error: CopyToClipboardError) => void | undefined;
}

/**
 * Represents the error payload structure returned by the `copyToClipboard` utility when an operation fails.
 *
 * This interface defines the essential diagnostic fields needed to gracefully handle clipboard failures.
 * It enforces a unified error shape across the codebase by classifying the failure type and providing
 * optional descriptive error details for runtime rejections.
 */
export interface CopyToClipboardError {
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
  message?: string | undefined;
}
