import type { Signal, QRL } from '@qwik.dev/core';

/**
 * Props for the `Dialog.Root` component.
 */
export interface DialogRootProps {
  /**
   * The controlled open state of the dialog.
   * Must be used in conjunction with `onOpenChange$`.
   *
   * The value of this signal must be initialized as `false` (or the prop itself `undefined`).
   * The `Dialog` component uses the native HTML `<dialog>` element, which cannot be reliably rendered
   * or initialized in an open state.
   *
   * @default undefined
   */
  open?: Signal<boolean>;

  /**
   * A `QRL` callback function that is called when the open state of the dialog changes.
   *
   * @default undefined
   */
  onOpenChange$?: QRL<(open: boolean) => void>;
}
