import type { ReadonlySignal } from '@qwik.dev/core';

/**
 * The value provided by the `RovingFocusGroupItemContext` context.
 * Contains the readonly signals shared with descendant components.
 */
export interface RovingFocusGroupItemContextValue {
  /**
   * A readonly signal whose value is the unique identifier for the specific roving focus item.
   * This ID is used to track and manage the item's active state within the group.
   */
  tabStopId: ReadonlySignal<string>;

  /**
   * A readonly signal whose value indicates whether this specific item is currently the active tab stop.
   * When `true`, the item's `tabIndex` is set to `0`, allowing it to receive keyboard focus.
   */
  active: ReadonlySignal<boolean>;

  /**
   * A readonly signal specifying if the item is capable of receiving focus.
   * When `false`, the item is skipped during navigation and cannot be activated by the user.
   */
  focusable: ReadonlySignal<boolean>;
}
