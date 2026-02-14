import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * The value returned by the `useAccordionItemContext` hook.
 * Provides access to the accordion item's readonly signals and `QRL` function for descendant components.
 */
export interface UseAccordionItemContextReturnValue {
  /**
   * A readonly signal whose value is the unique identifier for the specific accordion item.
   * This is used to identify the item and control its open/closed state within the accordion component.
   */
  value: ReadonlySignal<string>;

  /**
   * A readonly signal whose value indicates whether the accordion item is currently in an open (expanded) state.
   * A value of `true` means the item's panel is visible, while `false` means it's hidden.
   */
  open: ReadonlySignal<boolean>;

  /**
   * A `QRL` function used to programmatically set the open state of the accordion item.
   * This function toggles the item's visibility based on the provided boolean value.
   */
  setOpen$: QRL<(open: boolean) => void>;

  /**
   * A readonly signal whose value specifies if the accordion item is disabled.
   * When `true`, the item cannot be interacted with by the user, and its trigger might be visually
   * styled to reflect this inactive state.
   */
  disabled: ReadonlySignal<boolean>;
}
