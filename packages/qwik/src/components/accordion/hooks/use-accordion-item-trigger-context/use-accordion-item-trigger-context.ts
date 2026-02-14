import type { UseAccordionItemTriggerContextReturnValue } from './use-accordion-item-trigger-context.types';
import { useContext } from '@qwik.dev/core';
import { AccordionItemTriggerContext } from '../../contexts/accordion-item-trigger-context';

/**
 * A hook that provides access to the `Accordion.ItemTrigger` component's internal state.
 * It exposes a readonly signal to synchronize with the trigger's availability,
 * reflecting its effective disabled or enabled status.
 */
export const useAccordionItemTriggerContext = (): UseAccordionItemTriggerContextReturnValue => {
  const { disabled } = useContext(AccordionItemTriggerContext);

  return { disabled };
};
