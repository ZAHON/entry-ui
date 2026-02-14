import { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * The value provided by the `AccordionItemContext` context.
 * Contains the readonly signals and `QRL` functions shared with descendant components.
 */
export interface AccordionItemContextValue {
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

  /**
   * An object containing the identifier state and management `QRL` functions for the trigger element.
   * This is used to link the trigger and the accordion item panel for accessibility purposes (WAI-ARIA).
   */
  triggerId: {
    /**
     * A readonly signal representing the unique identifier of the trigger.
     */
    id: ReadonlySignal<string | undefined>;

    /**
     * A `QRL` function to manually set or update the trigger's identifier.
     */
    set$: QRL<(value: string | undefined) => void>;

    /**
     * A `QRL` function to clear the trigger's identifier.
     */
    delete$: QRL<() => void>;
  };

  /**
   * An object containing the identifier state and management functions for the panel element.
   * This ensures the content panel can be correctly referenced by the accordion item trigger's `aria-controls` attribute.
   */
  panelId: {
    /**
     * A readonly signal representing the unique identifier of the panel.
     */
    id: ReadonlySignal<string | undefined>;

    /**
     * A `QRL` function to manually set or update the panel's identifier.
     */
    set$: QRL<(value: string | undefined) => void>;

    /**
     * A `QRL` function to clear the panel's identifier.
     */
    delete$: QRL<() => void>;
  };
}
