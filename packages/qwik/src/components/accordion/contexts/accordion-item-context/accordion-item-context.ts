import type { AccordionItemContextValue } from './accordion-item-context.types';
import { createContextId, useContext } from '@qwik.dev/core';

/**
 * Provides the context for the `Accordion.Item` component, allowing descendant
 * components to access readonly signals and `QRL` functions without prop drilling.
 */
export const AccordionItemContext = createContextId<AccordionItemContextValue>('entry-ui-qwik-accordion-item-context');

/**
 * A hook that provides access to the `Accordion.Item` component's internal state.
 * It exposes readonly signals and `QRL` functions to interact with the component's state,
 */
export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);

  return context;
};
