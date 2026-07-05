import type { Signal } from '@qwik.dev/core';

/**
 * The value returned by the `useDialogCloseContext` hook.
 *
 * Provides access to the close button's readonly signal for descendant components.
 */
export interface UseDialogCloseContextReturnValue {
  /**
   * A readonly signal that indicates whether the close button is disabled.
   * Its value is `true` if the button is disabled, preventing user interaction.
   */
  disabled: Readonly<Signal<boolean>>;
}
