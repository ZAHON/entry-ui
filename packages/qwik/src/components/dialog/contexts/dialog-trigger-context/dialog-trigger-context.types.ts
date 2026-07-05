import type { Signal } from '@qwik.dev/core';

/**
 * The value provided by the `DialogTriggerContext` context.
 *
 * Contains the readonly signal shared with descendant components.
 */
export interface DialogTriggerContextValue {
  /**
   * A readonly signal that indicates whether the trigger is disabled.
   * Its value is `true` if the trigger is disabled, preventing user interaction.
   */
  disabled: Readonly<Signal<boolean>>;
}
