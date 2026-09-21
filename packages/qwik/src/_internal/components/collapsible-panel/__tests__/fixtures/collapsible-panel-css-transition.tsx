import type { CollapsiblePanelProps } from '../../collapsible-panel.types';
import { component$, useStyles$, Slot } from '@qwik.dev/core';
import { useControllable } from '@/hooks/use-controllable';
import { CollapsiblePanel } from '../../collapsible-panel';

interface CollapsiblePanelCssTransitionProps extends CollapsiblePanelProps {
  triggerDataTestId?: string;
}

export const CollapsiblePanelCssTransition = component$<Partial<CollapsiblePanelCssTransitionProps>>((props) => {
  const { open: _open, heightVariableName, triggerDataTestId, ...others } = props;

  const { state: open, setState$: setOpen$ } = useControllable({ defaultValue: _open ?? false });

  useStyles$(`
    .collapsible-panel-css-transition {
      height: var(--height);
      overflow: hidden;
      transition: height 100ms linear;
    }

    .collapsible-panel-css-transition[data-starting-style],
    .collapsible-panel-css-transition[data-ending-style] {
      height: 0;
    }
    `);

  return (
    <>
      <button data-testid={triggerDataTestId} onClick$={() => setOpen$(!open.value)} />

      <CollapsiblePanel
        componentName="CollapsiblePanel"
        heightVariableName="--collapsible-panel-height"
        open={open.value}
        setOpen$={setOpen$}
        style={{ '--height': `var(${heightVariableName})` }}
        {...others}
      >
        <Slot />
      </CollapsiblePanel>
    </>
  );
});
