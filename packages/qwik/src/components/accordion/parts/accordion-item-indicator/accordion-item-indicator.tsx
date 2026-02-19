import type { AccordionItemIndicatorProps } from './accordion-item-indicator.types';
import { component$, Slot } from '@qwik.dev/core';
import { Indicator } from '@/_internal/components/indicator';
import { useAccordionItemContext } from '../../contexts/accordion-item-context';

/**
 * An optional visual indicator that reflects the item's open or closed state.
 * It typically displays an icon or other visual cue to show the current status.
 *
 * Renders a `<span>` element.
 */
export const AccordionItemIndicator = component$<AccordionItemIndicatorProps>((props) => {
  const { as = 'span', ...others } = props;

  const { open, disabled } = useAccordionItemContext();

  return (
    <Indicator
      as={as}
      data-entry-ui-qwik-accordion-item-indicator=""
      data-state={open.value ? 'open' : 'closed'}
      data-disabled={disabled.value ? '' : undefined}
      {...others}
    >
      <Slot />
    </Indicator>
  );
});
