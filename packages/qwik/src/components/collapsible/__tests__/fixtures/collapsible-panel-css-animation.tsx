import type { CollapsiblePanelProps } from '../../parts/collapsible-panel';
import { component$, useStyles$, Slot } from '@qwik.dev/core';
import { CollapsiblePanel } from '../../parts/collapsible-panel';

export const CollapsiblePanelCssAnimation = component$<CollapsiblePanelProps>((props) => {
  useStyles$(`
    .collapsible-panel-css-animation {
      height: var(--entry-ui-qwik-collapsible-panel-height);
      overflow: hidden;
    }

    .collapsible-panel-css-animation[data-open] {
      animation: collapsible-panel-down 100ms linear;
    }

    .collapsible-panel-css-animation[data-closed] {
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
    <CollapsiblePanel {...props}>
      <Slot />
    </CollapsiblePanel>
  );
});
