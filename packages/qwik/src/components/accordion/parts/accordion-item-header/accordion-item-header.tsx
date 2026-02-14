import type { AccordionItemHeaderProps } from './accordion-item-header.types';
import { component$, Slot } from '@qwik.dev/core';
import { Primitive } from '@/_internal/components/primitive';
import { useAccordionItemContext } from '../../contexts/accordion-item-context';

/**
 * A heading that labels the corresponding panel.
 *
 * It provides a semantic structure to the collapsible section,
 * ensuring it follows accessibility best practices by wrapping
 * the interactive trigger in a heading element.
 *
 * Renders an `<h3>` element.
 */
export const AccordionItemHeader = component$<AccordionItemHeaderProps>((props) => {
  const { as = 'h3', ...others } = props;

  const { open, disabled } = useAccordionItemContext();

  return (
    <Primitive.h3
      as={as}
      data-entry-ui-qwik-accordion-item-header=""
      data-state={open.value ? 'open' : 'closed'}
      data-disabled={disabled.value ? '' : undefined}
      {...others}
    >
      <Slot />
    </Primitive.h3>
  );
});
