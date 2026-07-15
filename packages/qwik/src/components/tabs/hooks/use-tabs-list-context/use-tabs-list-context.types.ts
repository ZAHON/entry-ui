import type { Signal, QRL } from '@qwik.dev/core';

/**
 * The value returned by the `useTabsListContext` hook.
 *
 * Provides access to the tab list's readonly signal and `QRL` function for descendant components.
 */
export interface UseTabsListContextReturnValue {
  /**
   * A readonly signal whose value is a string representing the value of the tab that currently holds the tab stop.
   * This signal tracks which tab button is focusable within the tab list.
   */
  currentTabStopId: Readonly<Signal<string>>;

  /**
   * A `QRL` function used to programmatically set the active tab stop.
   * This function takes a string representing the value of the tab button that should become focusable.
   */
  setCurrentTabStopId$: QRL<(value: string) => void>;
}
