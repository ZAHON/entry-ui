import type { UseClipboardParams, UseClipboardReturnValue } from './use-clipboard.types';
import { useSignal, $ } from '@qwik.dev/core';
import { copyToClipboard } from '@entry-ui/utilities/copy-to-clipboard';
import { fail } from '@/_internal/utilities/fail';
import { error as logError } from '@/_internal/utilities/error';
import { isDev, isServer, isBrowser } from '@qwik.dev/core/build';

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

  // Holds the error state of the last copy operation.
  // Set to `null` when no error is present or after reset.
  const error = useSignal<'NOT_SUPPORTED' | 'COPY_FAILED' | null>(null);

  // Tracks whether the text has been successfully copied.
  // Reverts to `false` automatically after the timeout elapses.
  const copied = useSignal(false);

  // Stores the active timer handle for auto-resetting the state.
  // Initialized to `-1` when no active timer is running.
  const copyTimeout = useSignal(-1);

  const copy$ = $(async (value: string) => {
    // Check if function is executed on the server during development.
    // Throws a helpful error message when SSR invocation is detected.
    if (isDev && isServer) {
      fail([
        `The 'copy$' QRL function from the 'useClipboard' hook cannot be called during server-side rendering (SSR).`,
        `Clipboard API is only available in the browser.`,
        `Ensure it's only invoked in the browser environment.`,
      ]);
    }

    // Ensure the clipboard API is accessed only in client environments.
    // Prevents execution errors during server-side rendering phases.
    if (isBrowser) {
      await copyToClipboard({
        value,
        onSuccess: () => {
          // Clear any active timeout handle from previous execution.
          // Prevents conflicting state resets when triggered repeatedly.
          if (copyTimeout.value !== -1) {
            clearTimeout(copyTimeout.value);
          }

          // Schedule auto-reset of reactive states after configured delay.
          // Reverts signals back to initial state automatically.
          copyTimeout.value = setTimeout(() => {
            copied.value = false;
            error.value = null;

            copyTimeout.value = -1;

            // Notify external listeners about automated state reset.
            // Dispatches status event when timer elapses.
            onStatusChange$?.({ copied: false, error: null });
          }, timeoutMs) as unknown as number; // Reconcile Node.js `Timeout` type with DOM browser handle type.

          // Update state signals to reflect a successful copy action.
          // Clears prior errors and sets copied flag to true.
          copied.value = true;
          error.value = null;

          // Dispatch status change event to external subscriber.
          // Informs parent components about operation success.
          onStatusChange$?.({ copied: true, error: null });
        },
        onError: (err) => {
          const { type, message } = err;

          // Update state signals to reflect execution failure.
          // Sets copied to false and records the error code.
          copied.value = false;
          error.value = type;

          // Notify external subscriber about execution failure.
          // Passes error detail context to handler function.
          onStatusChange$?.({ copied: false, error: type });

          // Log detailed troubleshooting messages in development mode.
          // Helps developers diagnose missing browser APIs or permissions.
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
    }
  });

  const reset$ = $(() => {
    // Revert state signals back to default values.
    // Clears copied status and erases current error.
    copied.value = false;
    error.value = null;

    // Clear any pending timeout instance actively running.
    // Prevents scheduled state resets from firing.
    if (copyTimeout.value !== -1) {
      clearTimeout(copyTimeout.value);
      copyTimeout.value = -1;
    }

    // Notify external listeners about manual state reset.
    // Signals subscribers that state was cleared.
    onStatusChange$?.({ copied: false, error: null });
  });

  return { copied, error, copy$, reset$ };
};

export namespace useClipboard {
  /**
   * Configuration parameters for the `useClipboard` hook.
   *
   * This interface encapsulates the parameters required to fine-tune the clipboard interaction layer.
   * It allows the caller to define temporal thresholds for automated success state retention
   * and bind serialized status listeners to monitor asynchronous write lifecycles and runtime failures.
   */
  export type Params = UseClipboardParams;

  /**
   * Represents the object returned by the `useClipboard` hook.
   *
   * This interface exposes a comprehensive API to interact with the system clipboard and monitor its operation.
   * It provides the consuming component with immutable, reactive states representing the transaction outcomes
   * alongside serialized asynchronous command dispatchers to execute write actions and explicitly reset the hook's lifecycle.
   */
  export type ReturnValue = UseClipboardReturnValue;
}
