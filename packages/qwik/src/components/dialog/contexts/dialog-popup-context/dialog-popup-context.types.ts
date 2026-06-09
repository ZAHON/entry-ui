import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * The value provided by the `DialogPopupContext` context.
 *
 * Contains identifier management for sub-elements like title and description
 * to ensure proper accessibility (WAI-ARIA) within the dialog popup.
 */
export interface DialogPopupContextValue {
  /**
   * An object containing the identifier state and management `QRL` functions for the title element.
   * This is used to link the dialog content to its title via `aria-labelledby`.
   */
  titleId: {
    /**
     * A readonly signal representing the unique identifier of the dialog title.
     */
    id: ReadonlySignal<string | undefined>;

    /**
     * A `QRL` function to manually set or update the title's identifier.
     */
    set$: QRL<(value: string | undefined) => void>;

    /**
     * A `QRL` function to clear the title's identifier.
     */
    delete$: QRL<() => void>;
  };

  /**
   * An object containing the identifier state and management `QRL` functions for the description element.
   * This is used to link the dialog content to its description via `aria-describedby`.
   */
  descriptionId: {
    /**
     * A readonly signal representing the unique identifier of the dialog description.
     */
    id: ReadonlySignal<string | undefined>;

    /**
     * A `QRL` function to manually set or update the description's identifier.
     */
    set$: QRL<(value: string | undefined) => void>;

    /**
     * A `QRL` function to clear the description's identifier.
     */
    delete$: QRL<() => void>;
  };
}
