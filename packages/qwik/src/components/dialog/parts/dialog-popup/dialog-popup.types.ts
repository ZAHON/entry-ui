import { PropsOf, Component, QRL } from '@qwik.dev/core';

/**
 * Props for the `Dialog.Popup` component.
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
  as?: string | Component;

  /**
   * If `true`, prevents scrolling on the `<body>` element while the dialog is open.
   * This ensures that the user remains focused on the dialog content and
   * prevents layout shifting or background scrolling.
   *
   * @default true
   */
  preventScroll?: boolean;

  /**
   * If `true`, the dialog will close when the user presses the `Esc` key.
   *
   * @default true
   */
  closeOnEscapeKeyDown?: boolean;

  /**
   * If `true`, the dialog will close when the user clicks outside the dialog's
   * content area (e.g., on the backdrop).
   *
   * @default true
   */
  closeOnClickOutside?: boolean;

  /**
   * A `QRL` callback invoked once the popup's opening or closing transition has fully settled.
   * If CSS transitions or animations are present, it triggers after they finish;
   * otherwise, it executes immediately upon the state change.
   *
   * @default undefined
   */
  onOpenChangeComplete$?: QRL<(open: boolean) => void>;
}
