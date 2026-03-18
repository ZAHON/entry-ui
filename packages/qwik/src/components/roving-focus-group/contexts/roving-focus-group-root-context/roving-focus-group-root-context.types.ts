import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * The value provided by the `RovingFocusGroupRootContext` context.
 * Contains the readonly signals and `QRL` functions shared with descendant components.
 */
export interface RovingFocusGroupRootContextValue {
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
   * A `QRL` function that retrieves an ordered array of focusable HTML elements within the group.
   * This is used to calculate the next or previous item during keyboard navigation, filtering out disabled elements.
   */
  getItems$: QRL<() => HTMLElement[]>;

  /**
   * A readonly signal indicating whether the keyboard navigation should wrap around
   * when reaching the first or last item in the group.
   */
  loopFocus: ReadonlySignal<boolean>;

  /**
   * A readonly signal representing the reading direction of the group.
   * This affects how horizontal arrow keys navigate through the items.
   */
  dir: ReadonlySignal<'ltr' | 'rtl'>;

  /**
   * A readonly signal specifying the allowed navigation axes.
   * It determines whether the group responds to horizontal, vertical, or both sets of arrow keys.
   */
  orientation: ReadonlySignal<'horizontal' | 'vertical' | 'both'>;
}
