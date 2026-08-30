import type { PropsOf, Component } from '@qwik.dev/core';
import type { IntrinsicTagName } from '@/types';

/**
 * Props for the `<Dialog.Close>` component.
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
  as?: IntrinsicTagName | Component | undefined;

  /**
   * When `true`, prevents the user from interacting with the close button.
   *
   * @default false
   */
  disabled?: boolean | undefined;
}
