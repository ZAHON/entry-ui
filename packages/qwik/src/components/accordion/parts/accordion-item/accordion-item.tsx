import type { AccordionItemProps } from './accordion-item.types';
import { component$, useComputed$, $, useContextProvider, Slot } from '@qwik.dev/core';
import { useId } from '@/_internal/hooks/use-id';
import { useIdManager } from '@/_internal/hooks/use-id-manager';
import { Primitive } from '@/_internal/components/primitive';
import { useAccordionRootContext } from '../../contexts/accordion-root-context';
import { AccordionItemContext } from '../../contexts/accordion-item-context';

/**
 * Groups all the parts of a collapsible section.
 *
 * Renders a `<div>` element.
 */
export const AccordionItem = component$<AccordionItemProps>((props) => {
  const { as = 'div', value: _value, disabled: _disabled = false, ...others } = props;

  const { value: rootValue, disabled: rootDisabled, onItemOpen$, onItemClose$ } = useAccordionRootContext();

  const fallbackValue = useId({ prefix: 'entry-ui-qwik-accordion-item-' });

  const value = useComputed$(() => _value ?? fallbackValue);
  const open = useComputed$(() => rootValue.value.includes(value.value));
  const disabled = useComputed$(() => _disabled || rootDisabled.value);

  const triggerId = useIdManager({ prefix: 'entry-ui-qwik-accordion-item-trigger-' });
  const panelId = useIdManager({ prefix: 'entry-ui-qwik-accordion-item-panel-' });

  const setOpen$ = $((open: boolean) => {
    if (open) {
      onItemOpen$(value.value);
    } else {
      onItemClose$(value.value);
    }
  });

  useContextProvider(AccordionItemContext, { value, open, setOpen$, disabled, triggerId, panelId });

  return (
    <Primitive.div
      as={as}
      data-entry-ui-qwik-accordion-item=""
      data-state={open.value ? 'open' : 'closed'}
      data-disabled={disabled.value ? '' : undefined}
      {...others}
    >
      <Slot />
    </Primitive.div>
  );
});
