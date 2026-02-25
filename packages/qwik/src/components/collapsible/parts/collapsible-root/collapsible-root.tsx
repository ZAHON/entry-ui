import type { CollapsibleRootProps } from './collapsible-root.types';
import { component$, useComputed$, useContextProvider, Slot } from '@qwik.dev/core';
import { useControllable } from '@/hooks/use-controllable';
import { useIdManager } from '@/_internal/hooks/use-id-manager';
import { Primitive } from '@/_internal/components/primitive';
import { CollapsibleRootContext } from '../../contexts/collapsible-root-context';

/**
 * Groups all parts of the collapsible.
 *
 * Renders a `<div>` element.
 */
export const CollapsibleRoot = component$<CollapsibleRootProps>((props) => {
  const { as = 'div', defaultOpen, open: _open, onOpenChange$, disabled: _disabled = false, ...others } = props;

  const { state: open, setState$: setOpen$ } = useControllable({
    defaultValue: defaultOpen ?? false,
    controlledSignal: _open,
    onChange$: onOpenChange$,
  });

  const disabled = useComputed$(() => _disabled);

  const triggerId = useIdManager({ prefix: 'entry-ui-qwik-collapsible-trigger-' });
  const panelId = useIdManager({ prefix: 'entry-ui-qwik-collapsible-panel-' });

  useContextProvider(CollapsibleRootContext, { open, setOpen$, disabled, triggerId, panelId });

  return (
    <Primitive.div
      as={as}
      data-entry-ui-qwik-collapsible-root=""
      data-state={open.value ? 'open' : 'closed'}
      data-disabled={disabled.value ? '' : undefined}
      {...others}
    >
      <Slot />
    </Primitive.div>
  );
});
