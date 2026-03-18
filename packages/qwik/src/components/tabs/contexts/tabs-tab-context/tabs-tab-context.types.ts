import type { ReadonlySignal } from '@qwik.dev/core';

/**
 * The value provided by the `TabsTabContext` context.
 * Contains the readonly signals shared with descendant components.
 */
export interface TabsTabContextValue {
  /**
   * A readonly signal containing the unique value associated with the tab.
   * This value connects the tab to its corresponding panel.
   */
  value: ReadonlySignal<string>;

  /**
   * A readonly signal whose value indicates whether the tab is currently active,
   * meaning its associated panel is being displayed.
   */
  active: ReadonlySignal<boolean>;

  /**
   * A readonly signal that indicates whether the tab is disabled.
   * Its value is `true` if the tab is disabled, preventing user interaction.
   */
  disabled: ReadonlySignal<boolean>;
}
