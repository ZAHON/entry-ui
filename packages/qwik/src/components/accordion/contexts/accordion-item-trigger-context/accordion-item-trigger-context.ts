import type { AccordionItemTriggerContextValue } from './accordion-item-trigger-context.types';
import { createContextId } from '@qwik.dev/core';

/**
 * Provides the context for the `Accordion.ItemTrigger` component, allowing descendant
 * components to access readonly signal without prop drilling.
 */
export const AccordionItemTriggerContext = createContextId<AccordionItemTriggerContextValue>(
  'entry-ui-qwik-accordion-item-trigger-context'
);
