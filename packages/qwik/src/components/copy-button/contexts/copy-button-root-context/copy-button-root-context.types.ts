import type { ReadonlySignal } from '@qwik.dev/core';

/**
 * The value provided by the `CopyButtonRootContext` context.
 * Contains the readonly signals shared with descendant components.
 */
export interface CopyButtonRootContextValue {
  /**
   * A readonly signal whose value indicates whether the text was successfully copied.
   * It is `true` immediately after a successful copy operation and reverts to `false`
   * after the specified timeout.
   */
  copied: ReadonlySignal<boolean>;

  /**
   * A readonly signal representing the current error state of the clipboard operation.
   * It returns `"NOT_SUPPORTED"` if the API is unavailable, `"COPY_FAILED"` if the
   * operation was rejected, or `null` if the last operation was successful.
   */
  error: ReadonlySignal<'NOT_SUPPORTED' | 'COPY_FAILED' | null>;

  /**
   * A readonly signal whose value indicates the copy button's current disabled state.
   * It is `true` when the button is prevented from user interaction.
   */
  disabled: ReadonlySignal<boolean>;
}
