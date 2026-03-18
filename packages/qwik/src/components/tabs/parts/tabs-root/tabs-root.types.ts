import type { Component, PropsOf, Signal, QRL } from '@qwik.dev/core';

/**
 * Props for the `Tabs.Root` component.
 * Extends the standard HTML attributes for a `div` element.
 */
export interface TabsRootProps extends PropsOf<'div'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "div"
   */
  as?: string | Component;

  /**
   * The value of the tab that should be active when initially rendered.
   * Use when you do not need to control the state of the tabs.
   *
   * @default undefined
   */
  defaultValue?: string;

  /**
   * The controlled value of the tab to activate.
   * Should be used in conjunction with `onValueChange$`.
   *
   * @default undefined
   */
  value?: Signal<string>;

  /**
   * A `QRL` callback function that is called when the value changes.
   *
   * @default undefined
   */
  onValueChange$?: QRL<(value: string) => void>;

  /**
   * The reading direction of the tabs.
   * When set to `"rtl"`, keyboard navigation is reversed and visual alignment is adjusted for right-to-left languages.
   *
   * @default "ltr"
   */
  dir?: 'ltr' | 'rtl';

  /**
   * The orientation of the tabs.
   * This value determines whether the tabs are laid out horizontally or vertically,
   * and adjusts keyboard navigation (arrow keys) to match the visual orientation.
   *
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';
}
