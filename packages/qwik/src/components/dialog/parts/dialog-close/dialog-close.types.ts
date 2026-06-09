import { PropsOf, Component } from '@qwik.dev/core';

/**
 * Props for the `Dialog.Close` component.
 *
 * Extends the standard HTML attributes for a `<button>` element.
 */
export interface DialogCloseProps extends PropsOf<'button'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "button"
   */
  as?: string | Component;

  /**
   * When `true`, prevents the user from interacting with the close button.
   *
   * @default false
   */
  disabled?: boolean;
}
