import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * The value returned by the `useToggleRootContext` hook.
 * Provides access to the toggle's readonly signals and `QRL` functions for descendant components.
 */
export interface UseToggleRootContextReturnValue {
  /**
   * A readonly signal whose value indicates the toggle's current pressed state.
   * It is `true` when the toggle is on, and `false` when off.
   */
  pressed: ReadonlySignal<boolean>;

  /**
   * A `QRL` function used to programmatically set the pressed state of the toggle.
   * When invoked with `true`, the toggle will be on; with `false`, it will be off.
   */
  setPressed$: QRL<(pressed: boolean) => void>;

  /**
   * A readonly signal that indicates whether the toggle is disabled.
   * Its value is `true` if the toggle is disabled, preventing user interaction.
   */
  disabled: ReadonlySignal<boolean>;
}
