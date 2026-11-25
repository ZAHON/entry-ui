import type { AccordionItemPanelProps } from '../../parts/accordion-item-panel';
import { component$, useStyles$, Slot } from '@qwik.dev/core';
import { AccordionItemPanel } from '../../parts/accordion-item-panel';

export const AccordionItemPanelCssTransitionAndAnimation = component$<AccordionItemPanelProps>((props) => {
  const { class: className, ...others } = props;

  useStyles$(`
    .accordion-item-panel-css-transition-and-animation {
      height: var(--entry-ui-qwik-accordion-item-panel-height);
      overflow: hidden;
      transition: height 100ms linear;
    }

    .accordion-item-panel-css-transition-and-animation[data-starting-style],
    .accordion-item-panel-css-transition-and-animation[data-ending-style] {
      height: 0;
    }

    .accordion-item-panel-css-transition-and-animation[data-open] {
      animation: accordion-item-panel-down 100ms linear;
    }

    .accordion-item-panel-css-transition-and-animation[data-closed] {
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
    <AccordionItemPanel class={['accordion-item-panel-css-transition-and-animation', className]} {...others}>
      <Slot />
    </AccordionItemPanel>
  );
});
