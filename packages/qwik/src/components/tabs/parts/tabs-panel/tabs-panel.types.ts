import type { Component, PropsOf } from '@qwik.dev/core';

/**
 * Props for the `Tabs.Panel` component.
 * Extends the standard HTML attributes for a `div` element.
 */
export interface TabsPanelProps extends PropsOf<'div'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "div"
   */
  as?: string | Component;

  /**
   * A unique value that associates the panel with a tab.
   */
  value: string;

  /**
   * When `true`, indicates the panel contains focusable elements (like inputs or links).
   * This removes the panel from the tab order (`tabIndex`) to avoid redundant focus stops,
   * allowing focus to move directly to the internal content.
   *
   * @default false
   */
  containsFocusableContent?: boolean;
}
