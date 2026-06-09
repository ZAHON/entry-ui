import type { ReadonlySignal } from '@qwik.dev/core';

/**
 * The value returned by the `useDialogTriggerContext` hook.
 *
 * Provides access to the trigger's readonly signal for descendant components.
 */
export interface UseDialogTriggerContextReturnValue {
  /**
   * A readonly signal that indicates whether the trigger is disabled.
   * Its value is `true` if the trigger is disabled, preventing user interaction.
   */
  disabled: ReadonlySignal<boolean>;
}
