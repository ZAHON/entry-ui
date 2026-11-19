import type { AccordionItemPanelProps } from '../../parts/accordion-item-panel';
import { component$, useStyles$, Slot } from '@qwik.dev/core';
import { AccordionItemPanel } from '../../parts/accordion-item-panel';

export const AccordionItemPanelCssTransition = component$<AccordionItemPanelProps>((props) => {
  const { class: className, ...others } = props;

  useStyles$(`
    .accordion-item-panel-css-transition {
      height: var(--entry-ui-qwik-accordion-item-panel-height);
      overflow: hidden;
      transition: height 100ms linear;
    }

    .accordion-item-panel-css-transition[data-starting-style],
    .accordion-item-panel-css-transition[data-ending-style] {
      height: 0;
    }
    `);

  return (
    <AccordionItemPanel class={['accordion-item-panel-css-transition', className]} {...others}>
      <Slot />
    </AccordionItemPanel>
  );
});
