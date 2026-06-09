import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * The value returned by the `useDialogRootContext` hook.
 *
 * Provides access to the dialog's readonly signal and `QRL` function for descendant components.
 */
export interface UseDialogRootContextReturnValue {
  /**
   * A readonly signal whose value indicates the dialog's current open state.
   * It is `true` when the dialog is open, and `false` when closed.
   */
  open: ReadonlySignal<boolean>;

  /**
   * A `QRL` function used to programmatically set the open state of the dialog.
   * When invoked with `true`, the dialog will open; with `false`, it will close.
   */
  setOpen$: QRL<(open: boolean) => void>;
}
