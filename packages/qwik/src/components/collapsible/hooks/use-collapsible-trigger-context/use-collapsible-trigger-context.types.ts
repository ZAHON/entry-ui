import type { ReadonlySignal } from '@qwik.dev/core';

/**
 * The value returned by the `useCollapsibleTriggerContext` hook.
 * Provides access to the trigger's readonly signal for descendant components.
 */
export interface UseCollapsibleTriggerContextReturnValue {
  /**
   * A readonly signal representing the effective disabled state of the trigger.
   * This value is computed by prioritizing the trigger's own `disabled` prop,
   * falling back to the `Collapsible.Root` disabled state if not explicitly set.
   */
  disabled: ReadonlySignal<boolean>;
}
