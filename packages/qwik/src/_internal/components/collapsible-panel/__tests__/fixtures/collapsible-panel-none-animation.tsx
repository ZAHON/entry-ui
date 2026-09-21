import type { CollapsiblePanelProps } from '../../collapsible-panel.types';
import { component$, Slot } from '@qwik.dev/core';
import { useControllable } from '@/hooks/use-controllable';
import { CollapsiblePanel } from '../../collapsible-panel';

interface CollapsiblePanelNoneAnimationProps extends CollapsiblePanelProps {
  triggerDataTestId?: string;
}

export const CollapsiblePanelNoneAnimation = component$<Partial<CollapsiblePanelNoneAnimationProps>>((props) => {
  const { open: _open, triggerDataTestId, ...others } = props;

  const { state: open, setState$: setOpen$ } = useControllable({ defaultValue: _open ?? false });

  return (
    <>
      <button data-testid={triggerDataTestId} onClick$={() => setOpen$(!open.value)} />

      <CollapsiblePanel
        componentName="CollapsiblePanel"
        heightVariableName="--collapsible-panel-height"
        open={open.value}
        setOpen$={setOpen$}
        {...others}
      >
        <Slot />
      </CollapsiblePanel>
    </>
  );
});
