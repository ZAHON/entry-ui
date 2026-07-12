import type { Signal, QRL } from '@qwik.dev/core';

/**
 * The value returned by the `useTabsRootContext` hook.
 *
 * Provides access to the tabs readonly signals and `QRL` function for descendant components.
 */
export interface UseTabsRootContextReturnValue {
  /**
   * A readonly signal whose value represents the unique identifier of the currently active tab.
   * This signal reflects the internal state and determines which tab panel is currently visible.
   */
  value: Readonly<Signal<string>>;

  /**
   * A `QRL` function used to programmatically set the active value of the tabs.
   * This function takes a string representing the value of the tab to be activated.
   */
  setValue$: QRL<(value: string) => void>;

  /**
   * A readonly signal whose value represents the orientation of the tabs.
   * This value (either `"horizontal"` or `"vertical"`) determines how keyboard navigation and focus management are handled.
   */
  orientation: Readonly<Signal<'horizontal' | 'vertical'>>;
}
