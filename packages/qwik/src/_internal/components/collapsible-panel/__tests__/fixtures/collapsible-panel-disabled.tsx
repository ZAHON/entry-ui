import type { CollapsiblePanelProps } from '../../collapsible-panel.types';
import { component$, Slot } from '@qwik.dev/core';
import { useControllable } from '@/hooks/use-controllable';
import { CollapsiblePanel } from '../../collapsible-panel';

interface CollapsiblePanelDisabledProps extends CollapsiblePanelProps {
  triggerDataTestId?: string;
}

export const CollapsiblePanelDisabled = component$<Partial<CollapsiblePanelDisabledProps>>((props) => {
  const { disabled: _disabled, triggerDataTestId, ...others } = props;

  const { state: disabled, setState$: setDisabled$ } = useControllable({ defaultValue: _disabled ?? false });

  return (
    <>
      <button data-testid={triggerDataTestId} onClick$={() => setDisabled$(!disabled.value)} />

      <CollapsiblePanel
        componentName="CollapsiblePanel"
        heightVariableName="--collapsible-panel-height"
        disabled={disabled.value}
        {...others}
      >
        <Slot />
      </CollapsiblePanel>
    </>
  );
});
