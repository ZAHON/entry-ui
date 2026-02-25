import type { CollapsiblePanelProps } from './collapsible-panel.types';
import { component$, useSignal, $, Slot } from '@qwik.dev/core';
import { useLifecycle } from '@/hooks/use-lifecycle';
import { mergeRefs } from '@/utilities/merge-refs';
import { CollapsiblePanel as InternalCollapsiblePanel } from '@/_internal/components/collapsible-panel';
import { useCollapsibleRootContext } from '../../contexts/collapsible-root-context';

/**
 * A panel with the collapsible contents.
 *
 * Renders a `<div>` element.
 */
export const CollapsiblePanel = component$<CollapsiblePanelProps>((props) => {
  const { as = 'div', ref: _ref, id, hiddenUntilFound = false, ...others } = props;

  const { open, setOpen$, disabled, panelId, triggerId } = useCollapsibleRootContext();

  const ref = useSignal<HTMLElement | undefined>(undefined);

  useLifecycle({
    element: ref,
    onMount$: $(() => panelId.set$(id)),
    onUnmount$: $(() => panelId.delete$()),
  });

  return (
    <InternalCollapsiblePanel
      as={as}
      componentName="Collapsible.Panel"
      heightVariableName="--entry-ui-qwik-collapsible-panel-height"
      open={open.value}
      setOpen$={setOpen$}
      hiddenUntilFound={hiddenUntilFound}
      disabled={disabled.value}
      ref={mergeRefs([_ref, ref])}
      id={panelId.id.value}
      role={triggerId.id.value ? 'group' : undefined}
      aria-labelledby={triggerId.id.value}
      data-entry-ui-qwik-collapsible-panel=""
      {...others}
    >
      <Slot />
    </InternalCollapsiblePanel>
  );
});
