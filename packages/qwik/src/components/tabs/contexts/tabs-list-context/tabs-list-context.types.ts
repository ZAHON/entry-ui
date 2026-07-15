import type { Signal, QRL } from '@qwik.dev/core';

/**
 * The value provided by the `TabsListContext` context.
 *
 * Contains the readonly signals and `QRL` function shared with descendant components.
 */
export interface TabsListContextValue {
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

  /**
   * A readonly signal holding a reference to the container element of the tab list.
   * This reference is used to query and manage the tab elements during keyboard navigation.
   */
  listRef: Readonly<Signal<HTMLElement | undefined>>;

  /**
   * A readonly signal whose value determines whether tabs are activated
   * automatically on focus or manually on click/selection.
   */
  activationMode: Readonly<Signal<'automatic' | 'manual'>>;

  /**
   * A readonly signal indicating whether the keyboard navigation within the tab list should wrap around
   * when reaching the first or last tab button.
   */
  loopFocus: Readonly<Signal<boolean>>;
}
