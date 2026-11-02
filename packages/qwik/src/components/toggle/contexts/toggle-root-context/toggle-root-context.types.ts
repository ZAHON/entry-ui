import type { Signal, QRL } from '@qwik.dev/core';

/**
 * The value provided by the `ToggleRootContext` context.
 *
 * Contains the readonly signals and `QRL` function shared with descendant components.
 */
export interface ToggleRootContextValue {
  /**
   * A readonly signal that indicates whether the toggle button is pressed.
   * Its value is `true` if the toggle button is pressed, and `false` otherwise.
   */
  pressed: Readonly<Signal<boolean>>;

  /**
   * A `QRL` function used to programmatically set the pressed state of the toggle button.
   * When invoked with `true`, the toggle button will be on; with `false`, it will be off.
   */
  setPressed$: QRL<(pressed: boolean) => void>;

  /**
   * A readonly signal that indicates whether the toggle button is disabled.
   * Its value is `true` if the toggle button is disabled, preventing user interaction.
   */
  disabled: Readonly<Signal<boolean>>;
}
