import type { CopyToClipboardParams } from './copy-to-clipboard.types';

/**
 * Asynchronously transfers text to the system clipboard using the Clipboard API.
 *
 * This utility provides a structured wrapper around `navigator.clipboard.writeText`,
 * offering specific error types to distinguish between unsupported environments
 * and runtime failures.
 *
 * This function expects a browser environment where `window` or
 * `document` is globally available.
 *
 * @example
 * ```ts
 * copyToClipboard({
 * 	value: "Hello World",
 * 	onSuccess: () => console.log("Text copied!"),
 * 	onError: (err) => console.error(`Copy failed: ${err.type}, ${err.message}`),
 * });
 * ```
 */
export const copyToClipboard = async (params: CopyToClipboardParams) => {
  const { value, onSuccess, onError } = params;

  const win = document.defaultView || window;

  try {
    if (!win.navigator.clipboard?.writeText) {
      onError?.({ type: 'NOT_SUPPORTED' });
      return;
    }

    await win.navigator.clipboard.writeText(value);
    onSuccess?.();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    onError?.({ type: 'COPY_FAILED', message });
  }
};
