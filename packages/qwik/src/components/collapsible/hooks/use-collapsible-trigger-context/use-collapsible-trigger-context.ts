import type { UseCollapsibleTriggerContextReturnValue } from './use-collapsible-trigger-context.types';
import { useContext } from '@qwik.dev/core';
import { CollapsibleTriggerContext } from '../../contexts/collapsible-trigger-context';

/**
 * A hook that provides access to the `<Collapsible.Trigger>` component's internal state.
 *
 * It exposes readonly signal to interact with the trigger's state,
 * allowing descendant components to react to its disabled/enabled state.
 */
export const useCollapsibleTriggerContext = (): UseCollapsibleTriggerContextReturnValue => {
  const { disabled } = useContext(CollapsibleTriggerContext);

  return { disabled };
};

export namespace useCollapsibleTriggerContext {
  /**
   * The value returned by the `useCollapsibleTriggerContext` hook.
   *
   * Provides access to the trigger's readonly signal for descendant components.
   */
  export type ReturnValue = UseCollapsibleTriggerContextReturnValue;
}
