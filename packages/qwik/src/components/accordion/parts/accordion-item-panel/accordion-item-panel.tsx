import type { AccordionItemPanelProps } from './accordion-item-panel.types';
import { component$, useSignal, $, Slot } from '@qwik.dev/core';
import { useLifecycle } from '@/hooks/use-lifecycle';
import { mergeRefs } from '@/utilities/merge-refs';
import { CollapsiblePanel } from '@/_internal/components/collapsible-panel';
import { useAccordionRootContext } from '../../contexts/accordion-root-context';
import { useAccordionItemContext } from '../../contexts/accordion-item-context';

/**
 * A collapsible panel with the accordion item contents.
 *
 * Renders a `<div>` element.
 */
export const AccordionItemPanel = component$<AccordionItemPanelProps>((props) => {
  const { as = 'div', ref: _ref, id, hiddenUntilFound: hiddenUntilFound = false, ...others } = props;

  const { hiddenUntilFound: rootHiddenUntilFound } = useAccordionRootContext();
  const { open, setOpen$, disabled, panelId, triggerId } = useAccordionItemContext();

  const ref = useSignal<HTMLElement | undefined>(undefined);

  useLifecycle({
    element: ref,
    onMount$: $(() => panelId.set$(id)),
    onUnmount$: $(() => panelId.delete$()),
  });

  return (
    <CollapsiblePanel
      as={as}
      componentName="Accordion.ItemPanel"
      heightVariableName="--entry-ui-qwik-accordion-item-panel-height"
      open={open.value}
      setOpen$={setOpen$}
      hiddenUntilFound={hiddenUntilFound || rootHiddenUntilFound.value}
      disabled={disabled.value}
      ref={mergeRefs([_ref, ref])}
      id={panelId.id.value}
      role={triggerId.id.value ? 'region' : undefined}
      aria-labelledby={triggerId.id.value}
      data-entry-ui-qwik-accordion-item-panel=""
      {...others}
    >
      <Slot />
    </CollapsiblePanel>
  );
});
