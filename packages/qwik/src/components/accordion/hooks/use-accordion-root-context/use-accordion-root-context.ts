import type { UseAccordionRootContextReturnValue } from './use-accordion-root-context.types';
import { useContext } from '@qwik.dev/core';
import { AccordionRootContext } from '../../contexts/accordion-root-context';

/**
 * A hook that provides access to the `Accordion.Root` component's internal state.
 * It exposes readonly signals and a `QRL` function to interact with the accordion's state,
 * allowing descendant components to synchronize with or programmatically control
 * which items are currently expanded.
 */
export const useAccordionRootContext = (): UseAccordionRootContextReturnValue => {
  const { value, setValue$, disabled } = useContext(AccordionRootContext);

  return { value, setValue$, disabled };
};
