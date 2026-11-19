import type { AccordionItemPanelProps } from '../../parts/accordion-item-panel';
import { component$, useStyles$, Slot } from '@qwik.dev/core';
import { AccordionItemPanel } from '../../parts/accordion-item-panel';

export const AccordionItemPanelCssAnimation = component$<AccordionItemPanelProps>((props) => {
  const { class: className, ...others } = props;

  useStyles$(`
    .accordion-item-panel-css-animation {
      overflow: hidden;
    }

    .accordion-item-panel-css-animation[data-open] {
      animation: accordion-item-panel-down 100ms linear;
    }

    .accordion-item-panel-css-animation[data-closed] {
      animation: accordion-item-panel-up 100ms linear;
    }

    @keyframes accordion-item-panel-down {
      0% {
        height: 0;
      }
      100% {
        height: var(--entry-ui-qwik-accordion-item-panel-height);
      }
    }

    @keyframes accordion-item-panel-up {
      0% {
        height: var(--entry-ui-qwik-accordion-item-panel-height);
      }
      100% {
        height: 0;
      }
    }
    `);

  return (
    <AccordionItemPanel class={['accordion-item-panel-css-animation', className]} {...others}>
      <Slot />
    </AccordionItemPanel>
  );
});
