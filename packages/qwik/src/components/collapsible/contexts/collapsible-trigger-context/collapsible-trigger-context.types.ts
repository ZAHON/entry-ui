import type { ReadonlySignal } from '@qwik.dev/core';

/**
 * The value provided by the `CollapsibleTriggerContext` context.
 * Contains the readonly signal shared with descendant components.
 */
export interface CollapsibleTriggerContextValue {
  /**
   * A readonly signal representing the effective disabled state of the trigger.
   * This value is computed by prioritizing the trigger's own `disabled` prop,
   * falling back to the `Collapsible.Root` disabled state if not explicitly set.
   */
  disabled: ReadonlySignal<boolean>;
}
