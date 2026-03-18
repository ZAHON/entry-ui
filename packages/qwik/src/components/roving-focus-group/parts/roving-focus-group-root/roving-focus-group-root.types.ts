import type { Component, Signal, QRL, PropsOf } from '@qwik.dev/core';

/**
 * Props for the `RovingFocusGroup.Root` component.
 * Extends the standard HTML attributes for a `div` element.
 */
export interface RovingFocusGroupRootProps extends PropsOf<'div'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "div"
   */
  as?: string | Component;

  /**
   * The ID of the item that should be active when initially rendered.
   * Use when you do not need to control the state of the active item.
   *
   * @default undefined
   */
  defaultCurrentTabStopId?: string;

  /**
   * The controlled value of the item ID to activate.
   * Must be used in conjunction with `onCurrentTabStopIdChange$`.
   *
   * @default undefined
   */
  currentTabStopId?: Signal<string>;

  /**
   * A `QRL` callback function that is called when the active tab stop changes.
   *
   * @default undefined
   */
  onCurrentTabStopIdChange$?: QRL<(tabStopId: string) => void>;

  /**
   * Whether the keyboard focus should wrap around to the first or last item
   * when navigating past the boundaries of the group.
   *
   * @default false
   */
  loopFocus?: boolean;

  /**
   * The reading direction of the group.
   * When set to `"rtl"`, the behavior of the left and right arrow keys is swapped.
   *
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl';

  /**
   * The orientation of the group, which determines which arrow keys can be used for navigation.
   *
   * - `"horizontal"`: Only `ArrowLeft` and `ArrowRight` are active.
   * - `"vertical"`: Only `ArrowUp` and `ArrowDown` are active.
   * - `"both"`: All arrow keys are active.
   *
   * @default "both"
   */
  orientation?: 'horizontal' | 'vertical' | 'both';
}
