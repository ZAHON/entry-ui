import type { UseAccordionItemContextReturnValue } from './use-accordion-item-context.types';
import { useContext } from '@qwik.dev/core';
import { AccordionItemContext } from '../../contexts/accordion-item-context';

/**
 * A hook that provides access to the `Accordion.Item` component's internal state.
 * It exposes readonly signals and a `QRL` function to synchronize with a specific
 * item's state, managing its expanded status and disabled availability.
 */
export const useAccordionItemContext = (): UseAccordionItemContextReturnValue => {
  const { value, open, setOpen$, disabled } = useContext(AccordionItemContext);

  return { value, open, setOpen$, disabled };
};
