import type { AccordionRootContextValue } from './accordion-root-context.types';
import { createContextId, useContext } from '@qwik.dev/core';

/**
 * Provides the context for the `Accordion.Root` component, allowing descendant
 * components to access readonly signals and `QRL` functions without prop drilling.
 */
export const AccordionRootContext = createContextId<AccordionRootContextValue>('entry-ui-qwik-accordion-root-context');

/**
 * A hook that provides access to the `Accordion.Root` component's internal state.
 * It exposes readonly signals and `QRL` functions to interact with the component's state,
 */
export const useAccordionRootContext = () => {
  const context = useContext(AccordionRootContext);

  return context;
};
