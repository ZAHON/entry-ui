import type { CopyToClipboardParams } from './copy-to-clipboard.types';

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
    if (!window.navigator.clipboard?.writeText) {
      onError?.({ type: 'NOT_SUPPORTED' });
      return;
    }

    await window.navigator.clipboard.writeText(value);
    onSuccess?.();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    onError?.({ type: 'COPY_FAILED', message });
  }
};
