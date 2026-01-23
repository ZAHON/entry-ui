import type { Component, PropsOf } from '@qwik.dev/core';

/**
 * Props for the `Alert.Root` component.
 * Extends the standard HTML attributes for a `div` element.
 */
export interface AlertRootProps extends PropsOf<'div'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "div"
   */
  as?: string | Component;
}
