import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * The value returned by the `useRovingFocusGroupRootContext` hook.
 * Provides access to the roving focus group's readonly signals and `QRL` function for descendant components.
 */
export interface UseRovingFocusGroupRootContextReturnValue {
  /**
   * A readonly signal whose value is a string representing the ID of the item that is currently active.
   * This signal reflects the internal state of which item within the group holds the tab stop.
   */
  currentTabStopId: ReadonlySignal<string>;

  /**
   * A `QRL` function used to programmatically set the active tab stop.
   * This function takes a string representing the ID of the item that should become focusable.
   */
  setCurrentTabStopId$: QRL<(tabStopId: string) => void>;

  /**
   * A readonly signal specifying the allowed navigation axes.
   * It determines whether the group responds to horizontal, vertical, or both sets of arrow keys.
   */
  orientation: ReadonlySignal<'horizontal' | 'vertical' | 'both'>;
}
