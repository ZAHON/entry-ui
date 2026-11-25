import type { CollapsiblePanelProps } from '../../parts/collapsible-panel';
import { component$, useStyles$, Slot } from '@qwik.dev/core';
import { CollapsiblePanel } from '../../parts/collapsible-panel';

export const CollapsiblePanelCssTransitionAndAnimation = component$<CollapsiblePanelProps>((props) => {
  const { class: className, ...others } = props;

  useStyles$(`
    .collapsible-panel-css-transition-and-animation {
      height: var(--entry-ui-qwik-collapsible-panel-height);
      overflow: hidden;
      transition: height 100ms linear;
    }

    .collapsible-panel-css-transition-and-animation[data-starting-style],
    .collapsible-panel-css-transition-and-animation[data-ending-style] {
      height: 0;
    }

    .collapsible-panel-css-transition-and-animation[data-open] {
      animation: collapsible-panel-down 100ms linear;
    }

    .collapsible-panel-css-transition-and-animation[data-closed] {
      animation: collapsible-panel-up 100ms linear;
    }

    @keyframes collapsible-panel-down {
      0% {
        height: 0;
      }
      100% {
        height: var(--entry-ui-qwik-collapsible-panel-height);
      }
    }

    @keyframes collapsible-panel-up {
      0% {
        height: var(--entry-ui-qwik-collapsible-panel-height);
      }
      100% {
        height: 0;
      }
    }
    `);

  return (
    <CollapsiblePanel class={['collapsible-panel-css-transition-and-animation', className]} {...others}>
      <Slot />
    </CollapsiblePanel>
  );
});
