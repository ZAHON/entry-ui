import type { UseClipboardParams, UseClipboardReturnValue } from './use-clipboard.types';
import { useSignal, $ } from '@qwik.dev/core';
import { copyToClipboard } from '@entry-ui/utilities/copy-to-clipboard';
import { fail } from '@/_internal/utilities/fail';
import { error as logError } from '@/_internal/utilities/error';
import { isDev, isServer } from '@qwik.dev/core/build';

/**
 * A hook that provides an interface for interacting with the system clipboard.
 *
 * This hook encapsulates the complexity of the asynchronous Clipboard API, exposing
 * its state through readonly signals for predictable data flow. It manages both
 * success and error states, ensuring that UI feedback remains consistent across
 * different browser environments.
 *
 * It features a built-in auto-reset mechanism via the `timeoutMs` parameter,
 * which automatically clears the `copied` and `error` states after a specified duration.
 * An optional `onStatusChange$` callback allows reacting to changes in the
 * operation status from outside the hook.
 *
 * To ensure stability and security, the hook includes development-time checks
 * to prevent server-side execution, as clipboard operations strictly require
 * a browser environment and typically a user gesture.
 */
export const useClipboard = (params: UseClipboardParams = {}): UseClipboardReturnValue => {
  const { timeoutMs = 3000, onStatusChange$ } = params;

  const error = useSignal<'NOT_SUPPORTED' | 'COPY_FAILED' | null>(null);
  const copied = useSignal(false);
  const copyTimeout = useSignal(-1);

  const copy$ = $(async (value: string) => {
    if (isDev && isServer) {
      fail([
        `The 'copy$' QRL function from the 'useClipboard' hook cannot be called during server-side rendering (SSR).`,
        `Clipboard API is only available in the browser.`,
        `Ensure it's only invoked in the browser environment.`,
      ]);
    }

    const win = document.defaultView || window;

    await copyToClipboard({
      value,
      onSuccess: () => {
        win.clearTimeout(copyTimeout.value);

        copyTimeout.value = win.setTimeout(() => {
          copied.value = false;
          error.value = null;

          onStatusChange$?.({ copied: false, error: null });
        }, timeoutMs);

        copied.value = true;
        error.value = null;

        onStatusChange$?.({ copied: true, error: null });
      },
      onError: (err) => {
        const { type, message } = err;

        copied.value = false;
        error.value = type;

        onStatusChange$?.({ copied: false, error: type });

        if (isDev) {
          if (type === 'NOT_SUPPORTED') {
            logError([
              `An error occurred during the 'copy$' QRL function execution in 'useClipboard' hook.`,
              `Clipboard API is not supported in this browser.`,
              `Consider using a modern browser with Clipboard API support.`,
            ]);
          }

          if (type === 'COPY_FAILED') {
            logError([
              `An error occurred during the 'copy$' QRL function execution in 'useClipboard' hook.`,
              `The copy operation failed.`,
              ...(message ? [`Check clipboard permissions: ${message}`] : []),
            ]);
          }
        }
      },
    });
  });

  const reset$ = $(() => {
    copied.value = false;
    error.value = null;

    const win = document.defaultView || window;

    win.clearTimeout(copyTimeout.value);

    onStatusChange$?.({ copied: false, error: null });
  });

  return { copied, error, copy$, reset$ };
};
