import type { CollapsiblePanelProps } from '../../collapsible-panel.types';
import { component$, useStyles$, Slot } from '@qwik.dev/core';
import { useControllable } from '@/hooks/use-controllable';
import { CollapsiblePanel } from '../../collapsible-panel';

interface CollapsiblePanelCssTransitionAndAnimationProps extends CollapsiblePanelProps {
  triggerDataTestId?: string;
}

export const CollapsiblePanelCssTransitionAndAnimation = component$<
  Partial<CollapsiblePanelCssTransitionAndAnimationProps>
>((props) => {
  const { open: _open, heightVariableName, triggerDataTestId, class: className, ...others } = props;

  const { state: open, setState$: setOpen$ } = useControllable({ defaultValue: _open ?? false });

  useStyles$(`
    .collapsible-panel-css-transition-and-animation {
      height: var(--height);
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
        class={['collapsible-panel-css-transition-and-animation', className]}
        style={{ '--height': `var(${heightVariableName})` }}
        {...others}
      >
        <Slot />
      </CollapsiblePanel>
    </>
  );
});
