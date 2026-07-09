import type { AccordionRootProps } from './accordion-root.types';
import { component$, useComputed$, $, useContextProvider, Slot } from '@qwik.dev/core';
import { isDev } from '@qwik.dev/core/build';
import { useControllable } from '@/hooks/use-controllable';
import { warn } from '@/_internal/utilities/warn';
import { Primitive } from '@/_internal/components/primitive';
import { AccordionRootContext } from '../../contexts/accordion-root-context';

/**
 * Groups all parts of the accordion.
 *
 * Renders a `<div>` element.
 */
export const AccordionRoot = component$<AccordionRootProps>((props) => {
  const {
    as = 'div',
    defaultValue,
    value: _value,
    onValueChange$,
    multiple = false,
    hiddenUntilFound: _hiddenUntilFound = false,
    disabled: _disabled = false,
    ...others
  } = props;

  const { state: value, setState$: setValue$ } = useControllable({
    defaultValue: defaultValue ?? [],
    controlledSignal: _value,
    onChange$: onValueChange$,
  });

  const hiddenUntilFound = useComputed$(() => _hiddenUntilFound);
  const disabled = useComputed$(() => _disabled);

  if (isDev && !multiple && value.value.length > 1) {
    warn([
      `The 'Accordion.Root' component is in single-selection mode,`,
      `but received ${value.value.length} open items in 'value' or 'defaultValue'.`,
      `This may lead to unpredictable behavior.`,
    ]);
  }

  const onItemOpen$ = $((itemValue: string) => {
    if (!multiple) {
      setValue$([itemValue]);
    }

    if (multiple) {
      setValue$([...value.value, itemValue]);
    }
  });

  const onItemClose$ = $((itemValue: string) => {
    if (!multiple) {
      setValue$([]);
    }

    if (multiple) {
      setValue$(value.value.filter((value) => value !== itemValue));
    }
  });

  useContextProvider(AccordionRootContext, {
    value,
    setValue$,
    hiddenUntilFound,
    disabled,
    onItemOpen$,
    onItemClose$,
  });

  return (
    <Primitive.div
      as={as}
      data-entry-ui-qwik-accordion-root=""
      data-disabled={disabled.value ? '' : undefined}
      {...others}
    >
      <Slot />
    </Primitive.div>
  );
});
