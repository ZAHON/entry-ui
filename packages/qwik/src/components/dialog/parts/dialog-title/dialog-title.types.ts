import { PropsOf, Component } from '@qwik.dev/core';

/**
 * Props for the `Dialog.Title` component.
 *
 * Extends the standard HTML attributes for an `<h2>` element.
 */
export interface DialogTitleProps extends PropsOf<'h2'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "h2"
   */
  as?: string | Component;
}
