import type { ReadonlySignal } from '@qwik.dev/core';

/**
 * The value provided by the `DialogCloseContext` context.
 *
 * Contains the readonly signal shared with descendant components.
 */
export interface DialogCloseContextValue {
  /**
   * A readonly signal that indicates whether the close button is disabled.
   * Its value is `true` if the button is disabled, preventing user interaction.
   */
  disabled: ReadonlySignal<boolean>;
}
