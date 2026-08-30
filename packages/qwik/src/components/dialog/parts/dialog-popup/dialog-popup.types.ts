import type { PropsOf, Component, QRL } from '@qwik.dev/core';

/**
 * Props for the `<Dialog.Popup>` component.
 *
 * Extends the standard HTML attributes for a `<dialog>` element.
 */
export interface DialogPopupProps extends PropsOf<'dialog'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "dialog"
   */
  as?: string | Component | undefined;

  /**
   * If `true`, locks background scrolling while the dialog is open.
   * This ensures the user remains focused on the dialog content, prevents background movement,
   * and mitigates layout shifts.
   *
   * @default true
   */
  preventScroll?: boolean | undefined;

  /**
   * If `true`, the dialog will close when the user presses the `Esc` key.
   *
   * @default true
   */
  closeOnEscapeKeyDown?: boolean | undefined;

  /**
   * If `true`, the dialog will close when the user clicks outside the dialog's
   * content area (e.g., on the backdrop).
   *
   * @default true
   */
  closeOnClickOutside?: boolean | undefined;

  /**
   * A `QRL` callback invoked once the popup's opening or closing transition has fully settled.
   * If CSS transitions or animations are present, it triggers after they finish;
   * otherwise, it executes immediately upon the state change.
   *
   * @default undefined
   */
  onOpenChangeComplete$?: QRL<(open: boolean) => void> | undefined;
}
