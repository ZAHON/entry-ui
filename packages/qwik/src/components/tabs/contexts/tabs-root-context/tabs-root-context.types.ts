import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * The value provided by the `TabsRootContext` context.
 * Contains the readonly signals and `QRL` function shared with descendant components.
 */
export interface TabsRootContextValue {
  /**
   * A readonly signal whose value represents the unique identifier of the currently active tab.
   * This signal reflects the internal state and determines which tab panel is currently visible.
   */
  value: ReadonlySignal<string>;

  /**
   * A `QRL` function used to programmatically set the active value of the tabs.
   * This function takes a string representing the value of the tab to be activated.
   */
  setValue$: QRL<(value: string) => void>;

  /**
   * A unique identifier for the tabs.
   * This ID is used to generate consistent, unique sub-identifiers for child components
   * (e.g., tabs and panels) to ensure proper WAI-ARIA accessibility mapping.
   */
  id: string;

  /**
   * A readonly signal whose value represents the reading direction of the tabs.
   * This value (either `"ltr"` or `"rtl"`) affects keyboard navigation and visual layout.
   */
  dir: ReadonlySignal<'ltr' | 'rtl'>;

  /**
   * A readonly signal whose value represents the orientation of the tabs.
   * This value (either `"horizontal"` or `"vertical"`) determines how keyboard navigation and focus management are handled.
   */
  orientation: ReadonlySignal<'horizontal' | 'vertical'>;
}
