import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * Configuration parameters for the `useClipboard` hook.
 */
export interface UseClipboardParams {
  /**
   * The duration in milliseconds before the `copied` signal automatically reverts
   * to `false` and the `error` state is cleared after a successful copy operation.
   *
   * @default 3000
   */
  timeoutMs?: number;

  /**
   * An optional `QRL` callback invoked whenever the clipboard operation status changes.
   * It provides a detailed object containing the current `copied` state and any
   * associated `error`. This callback is triggered upon a successful copy,
   * when an error occurs, or when the state is reset (either automatically
   * after `timeoutMs` or manually via `reset$`).
   *
   * @default undefined
   */
  onStatusChange$?: QRL<(details: { copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null }) => void>;
}

/**
 * Represents the object returned by the `useClipboard` hook.
 */
export interface UseClipboardReturnValue {
  /**
   * A readonly signal that indicates whether a text string was successfully copied.
   * This value is set to `true` immediately after a successful copy operation
   * and automatically reverts to `false` after the specified `timeoutMs` duration
   * has elapsed or if the state is manually reset.
   */
  copied: ReadonlySignal<boolean>;

  /**
   * A readonly signal representing the current error state of the clipboard operation.
   * Returns `"NOT_SUPPORTED"` if the Clipboard API is unavailable in the environment,
   * `"COPY_FAILED"` if the operation was rejected (e.g., due to lack of permissions),
   * or `null` if the last operation was successful or has been reset.
   */
  error: ReadonlySignal<'NOT_SUPPORTED' | 'COPY_FAILED' | null>;

  /**
   * A `QRL` function that asynchronously transfers a provided string to the system clipboard.
   * This function must be invoked in a browser environment, typically as a result
   * of a user gesture (like a click), and updates the `copied` and `error` signals
   * based on the outcome of the operation.
   */
  copy$: QRL<(value: string) => Promise<void>>;

  /**
   * A `QRL` function that restores the hook's state to its initial values.
   * It sets `copied` to `false`, clears any active `error`, and cancels any
   * pending timeout scheduled to reset the success state.
   */
  reset$: QRL<() => void>;
}
