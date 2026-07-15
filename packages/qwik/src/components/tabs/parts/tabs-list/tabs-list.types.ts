import type { Component, PropsOf } from '@qwik.dev/core';

/**
 * Props for the `Tabs.List` component.
 *
 * Extends the standard HTML attributes for a `<div>` element.
 */
export interface TabsListProps extends PropsOf<'div'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "div"
   */
  as?: string | Component;

  /**
   * Whether the tabs should be activated automatically on focus or manually on click.
   *
   * - When `"automatic"`, tabs are activated when receiving focus.
   * - When `"manual"`, tabs are activated only when clicked or via keyboard selection (`Enter` or `Space`).
   *
   * @default "automatic"
   */
  activationMode?: 'automatic' | 'manual';

  /**
   * When `true`, keyboard navigation will loop from last tab to first, and vice versa.
   *
   * @default true
   */
  loopFocus?: boolean;
}
