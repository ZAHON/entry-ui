import type { CollapsiblePanelProps } from '../../collapsible-panel.types';
import { component$, useStyles$, Slot } from '@qwik.dev/core';
import { useControllable } from '@/hooks/use-controllable';
import { CollapsiblePanel } from '../../collapsible-panel';

interface CollapsiblePanelCssAnimationProps extends CollapsiblePanelProps {
  triggerDataTestId?: string;
}

export const CollapsiblePanelCssAnimation = component$<Partial<CollapsiblePanelCssAnimationProps>>((props) => {
  const { open: _open, heightVariableName, triggerDataTestId, ...others } = props;

  const { state: open, setState$: setOpen$ } = useControllable({ defaultValue: _open ?? false });

  useStyles$(`
    .collapsible-panel-css-animation {
      height: var(--height);
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
        height: var(--height);
      }
    }

    @keyframes collapsible-panel-up {
      0% {
        height: var(--height);
      }
      100% {
        height: 0;
      }
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
