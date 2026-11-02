import type { Signal, QRL } from '@qwik.dev/core';

/**
 * The value returned by the `useToggleRootContext` hook.
 *
 * Provides access to the toggle button's readonly signals and `QRL` function for descendant components.
 */
export interface UseToggleRootContextReturnValue {
  /**
   * A readonly signal that indicates whether the toggle button is pressed.
   * Its value is `true` if the toggle button is pressed, and `false` otherwise.
   */
  pressed: Readonly<Signal<boolean>>;

  /**
   * A `QRL` function used to programmatically set the pressed state of the toggle button.
   * When invoked with `true`, the toggle button will be pressed; with `false`, it will be unpressed.
   */
  setPressed$: QRL<(pressed: boolean) => void>;

  /**
   * A readonly signal that indicates whether the toggle button is disabled.
   * Its value is `true` if the toggle button is disabled, preventing user interaction.
   */
  disabled: Readonly<Signal<boolean>>;
}
