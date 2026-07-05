import type { Signal, QRL } from '@qwik.dev/core';

/**
 * The value provided by the `DialogRootContext` context.
 *
 * Contains the readonly signals and `QRL` function shared with descendant components.
 */
export interface DialogRootContextValue {
  /**
   * A readonly signal whose value indicates the dialog's current open state.
   * It is `true` when the dialog is open, and `false` when closed.
   */
  open: Readonly<Signal<boolean>>;

  /**
   * A `QRL` function used to programmatically set the open state of the dialog.
   * When invoked with `true`, the dialog will open; with `false`, it will close.
   */
  setOpen$: QRL<(open: boolean) => void>;

  /**
   * A signal whose value holds a reference to the HTML element that serves as the dialog's trigger.
   * It is used to manage focus and accessibility when opening or closing the dialog.
   */
  triggerRef: Signal<HTMLElement | undefined>;

  /**
   * An object containing the identifier state and management `QRL` functions for the trigger element.
   * This is used to link the trigger and the dialog popup for accessibility purposes (WAI-ARIA).
   */
  triggerId: {
    /**
     * A readonly signal representing the unique identifier of the trigger.
     */
    id: Readonly<Signal<string | undefined>>;

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
   * An object containing the identifier state and management functions for the popup element.
   * This ensures the content popup can be correctly referenced by the trigger's `aria-controls` attribute.
   */
  popupId: {
    /**
     * A readonly signal representing the unique identifier of the dialog popup.
     */
    id: Readonly<Signal<string | undefined>>;

    /**
     * A `QRL` function to manually set or update the popup's identifier.
     */
    set$: QRL<(value: string | undefined) => void>;

    /**
     * A `QRL` function to clear the popup's identifier.
     */
    delete$: QRL<() => void>;
  };
}
