import type { PropsOf, Component } from '@qwik.dev/core';

/**
 * Props for the `RovingFocusGroup.Item` component.
 * Extends the standard HTML attributes for a `div` element.
 */
export interface RovingFocusGroupItemProps extends PropsOf<'div'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "div"
   */
  as?: string | Component;

  /**
   * A unique value that identifies this item within the roving focus group.
   * If no value is provided, a unique ID will be generated automatically.
   *
   * @default undefined
   */
  tabStopId?: string;

  /**
   * When `false`, prevents the item from becoming active and skips it
   * during keyboard navigation.
   *
   * @default true
   */
  focusable?: boolean;
}
