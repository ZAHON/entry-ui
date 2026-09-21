import type { CollapsiblePanelProps } from '../../collapsible-panel.types';
import { component$, Slot } from '@qwik.dev/core';
import { CollapsiblePanel } from '../../collapsible-panel';

export const CollapsiblePanelTest = component$<Partial<CollapsiblePanelProps>>((props) => {
  return (
    <CollapsiblePanel componentName="CollapsiblePanel" heightVariableName="--collapsible-panel-height" {...props}>
      <Slot />
    </CollapsiblePanel>
  );
});
