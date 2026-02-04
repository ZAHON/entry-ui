import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * The value provided by the `CollapsibleRootContext` context.
 * Contains the readonly signals and `QRL` functions shared with descendant components.
 */
export interface CollapsibleRootContextValue {
  /**
   * A readonly signal whose value indicates the collapsible's current open state.
   * It is `true` when the collapsible is open, and `false` when closed.
   */
  open: ReadonlySignal<boolean>;

  /**
   * A `QRL` function used to programmatically set the open state of the collapsible.
   * When invoked with `true`, the collapsible will open; with `false`, it will close.
   */
  setOpen$: QRL<(open: boolean) => void>;

  /**
   * A readonly signal whose value indicates the collapsible's current disabled state.
   * It is `true` when the collapsible is prevented from user interaction.
   */
  disabled: ReadonlySignal<boolean>;

  /**
   * An object containing the identifier state and management `QRL` functions for the trigger element.
   * This is used to link the trigger and the collapsible panel for accessibility purposes (WAI-ARIA).
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
   * This ensures the content panel can be correctly referenced by the trigger's `aria-controls` attribute.
   */
  panelId: {
    /**
     * A readonly signal representing the unique identifier of the collapsible panel.
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
