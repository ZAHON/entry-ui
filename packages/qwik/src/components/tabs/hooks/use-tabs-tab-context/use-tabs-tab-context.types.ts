import type { Signal } from '@qwik.dev/core';

/**
 * The value returned by the `useTabsTabContext` hook.
 *
 * Provides access to the specific tab's readonly signals for descendant components.
 */
export interface UseTabsTabContextReturnValue {
  /**
   * A readonly signal containing the unique value associated with the tab.
   * This value connects the tab to its corresponding panel.
   */
  value: Readonly<Signal<string>>;

  /**
   * A readonly signal whose value indicates whether the tab is currently active,
   * meaning its associated panel is being displayed.
   */
  active: Readonly<Signal<boolean>>;

  /**
   * A readonly signal that indicates whether the tab is disabled.
   * Its value is `true` if the tab is disabled, preventing user interaction.
   */
  disabled: Readonly<Signal<boolean>>;
}
