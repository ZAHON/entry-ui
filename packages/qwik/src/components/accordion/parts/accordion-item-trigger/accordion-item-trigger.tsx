import type { AccordionItemTriggerProps } from './accordion-item-trigger.types';
import type { EntryUIQwikEventState } from '@/types';
import { component$, useSignal, useComputed$, $, useContextProvider, Slot } from '@qwik.dev/core';
import { useLifecycle } from '@/hooks/use-lifecycle';
import { mergeRefs } from '@/utilities/merge-refs';
import { Primitive } from '@/_internal/components/primitive';
import { useAccordionItemContext } from '../../contexts/accordion-item-context';
import { AccordionItemTriggerContext } from '../../contexts/accordion-item-trigger-context';

/**
 * A button that opens and closes the corresponding panel.
 *
 * Renders a `<button>` element.
 */
export const AccordionItemTrigger = component$<AccordionItemTriggerProps>((props) => {
  const { as = 'button', ref: _ref, id, disabled: _disabled, onClick$, ...others } = props;

  const { open, setOpen$, disabled: itemDisabled, triggerId, panelId } = useAccordionItemContext();

  const ref = useSignal<HTMLElement | undefined>(undefined);

  // The trigger's disabled state prioritizes its own `disabled` prop,
  // falling back to the accordion item's disabled state if not explicitly provided.
  const disabled = useComputed$(() => _disabled ?? itemDisabled.value);

  useLifecycle({
    element: ref,
    onMount$: $(() => triggerId.set$(id)),
    onUnmount$: $(() => triggerId.delete$()),
  });

  const handleClick$ = $((event: PointerEvent) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented && !disabled.value) {
      setOpen$(!open.value);
    }
  });

  useContextProvider(AccordionItemTriggerContext, { disabled });

  return (
    <Primitive.button
      as={as}
      ref={mergeRefs([_ref, ref])}
      type="button"
      id={triggerId.id.value}
      disabled={disabled.value}
      aria-controls={panelId.id.value && open.value ? panelId.id.value : undefined}
      aria-expanded={panelId.id.value ? open.value : undefined}
      data-entry-ui-qwik-accordion-item-trigger=""
      data-state={open.value ? 'open' : 'closed'}
      // Present when the accordion item component is in a disabled state.
      data-disabled={itemDisabled.value ? '' : undefined}
      onClick$={[onClick$, handleClick$]}
      {...others}
    >
      <Slot />
    </Primitive.button>
  );
});
