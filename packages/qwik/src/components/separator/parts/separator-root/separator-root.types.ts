import type { Component, PropsOf } from '@qwik.dev/core';

/**
 * Props for the `Separator.Root` component.
 * Extends the standard HTML attributes for a `div` element.
 */
export interface SeparatorRootProps extends PropsOf<'div'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "div"
   */
  as?: string | Component;

  /**
   * The orientation of the separator.
   *
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Whether or not the component is purely decorative. When `true`, accessibility-related
   * attributes are updated so that the rendered element is removed from the accessibility tree.
   *
   * @default false
   */
  decorative?: boolean;
}
