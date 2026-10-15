import type { CollapsiblePanelProps } from '../../parts/collapsible-panel';
import { component$, useStyles$, Slot } from '@qwik.dev/core';
import { CollapsiblePanel } from '../../parts/collapsible-panel';

export const CollapsiblePanelCssTransition = component$<CollapsiblePanelProps>((props) => {
  useStyles$(`
    .collapsible-panel-css-transition {
      height: var(--entry-ui-qwik-collapsible-panel-height);
      overflow: hidden;
      transition: height 100ms linear;
    }

    .collapsible-panel-css-transition[data-starting-style],
    .collapsible-panel-css-transition[data-ending-style] {
      height: 0;
    }
    `);

  return (
    <CollapsiblePanel {...props}>
      <Slot />
    </CollapsiblePanel>
  );
});
