import type { ReadonlySignal } from '@qwik.dev/core';

/**
 * The value returned by the `useAccordionItemTriggerContext` hook.
 * Provides access to the accordion item trigger's readonly signal for descendant components.
 */
export interface UseAccordionItemTriggerContextReturnValue {
  /**
   * A readonly signal representing the effective disabled state of the trigger.
   * This value is computed by prioritizing the trigger's own `disabled` prop,
   * falling back to the `Accordion.Item` disabled state if not explicitly set.
   */
  disabled: ReadonlySignal<boolean>;
}
