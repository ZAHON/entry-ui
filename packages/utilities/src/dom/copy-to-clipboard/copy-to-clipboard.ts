import type { CopyToClipboardParams, CopyToClipboardError } from './copy-to-clipboard.types';

/**
 * Asynchronously transfers text to the system clipboard using the native Clipboard API.
 *
 * This utility wraps `navigator.clipboard.writeText` in a structured interface,
 * providing failure handling and granular error types to gracefully distinguish between
 * environments lacking clipboard support and runtime execution errors.
 *
 * @example
 * ```ts
 * // Safely attempt to copy a string to the clipboard with handleable callbacks.
 * copyToClipboard({
 *   value: "Hello World",
 *   onSuccess: () => console.log("Text successfully copied to clipboard"'),
 *   onError: (err) => console.error(`Copy operation failed: ${err.type}`, err.message),
 * });
 * ```
 */
export const copyToClipboard = async (params: CopyToClipboardParams) => {
  const { value, onSuccess, onError } = params;

  try {
    // Verify that the native `navigator.clipboard.writeText` API is supported in the current environment.
    // Handles cases where the Clipboard API is unavailable (e.g., non-secure HTTP origins or unsupported browsers).
    if (!window.navigator.clipboard?.writeText) {
      // Dispatch a structured error payload indicating that clipboard operations are unsupported.
      // Notifies the caller about environment constraints so they can update UI or log a warning.
      onError?.({ type: 'NOT_SUPPORTED' });

      // Halt further function execution immediately after signaling the unsupported state.
      // Prevents runtime exceptions caused by attempting to invoke undefined native API methods.
      return;
    }

    // Execute the native asynchronous write operation to commit the target string into the clipboard.
    // Awaits promise resolution before signaling successful completion to downstream consumer code.
    await window.navigator.clipboard.writeText(value);

    // Trigger the optional success callback once the clipboard write operation completes without errors.
    // Provides a predictable hook for consumers to trigger visual feedback (e.g., UI toasts or state changes).
    onSuccess?.();
  } catch (error) {
    // Safely normalize uncaught exceptions into a standardized string representation.
    // Distinguishes between native JavaScript `Error` instances and arbitrary thrown values.
    const message = error instanceof Error ? error.message : String(error);

    // Forward the operational failure details to the consumer-defined error handler.
    // Enforces a uniform error payload structure for runtime execution failures.
    onError?.({ type: 'COPY_FAILED', message });
  }
};

export namespace copyToClipboard {
  /**
   * Represents the configuration parameters required by the `copyToClipboard` utility.
   *
   * This interface defines the essential payload fields needed to programmatically transfer text
   * to the system clipboard. It enforces a unified parameter structure across the codebase by pairing
   * a target text string with configurable lifecycle callbacks for success notification and error handling.
   */
  export type Params = CopyToClipboardParams;

  /**
   * Represents the error payload structure returned by the `copyToClipboard` utility when an operation fails.
   *
   * This interface defines the essential diagnostic fields needed to gracefully handle clipboard failures.
   * It enforces a unified error shape across the codebase by classifying the failure type and providing
   * optional descriptive error details for runtime rejections.
   */
  export type Error = CopyToClipboardError;
}
