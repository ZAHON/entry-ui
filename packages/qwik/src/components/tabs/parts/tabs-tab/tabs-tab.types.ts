import type { PropsOf, Component } from '@qwik.dev/core';

/**
 * Props for the `Tabs.Tab` component.
 * Extends the standard HTML attributes for a `button` element.
 */
export interface TabsTabProps extends PropsOf<'button'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "button"
   */
  as?: string | Component;

  /**
   * A unique value that associates the tab with a panel.
   */
  value: string;

  /**
   * When `true`, prevents the user from interacting with the tab.
   *
   * @default false
   */
  disabled?: boolean;
}
