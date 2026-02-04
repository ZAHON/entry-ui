import type { CollapsibleRootProps } from './collapsible-root.types';
import { component$, useComputed$, useContextProvider, Slot } from '@qwik.dev/core';
import { useControllable } from '@/hooks/use-controllable';
import { useIdManager } from '@/_internal/hooks/use-id-manager';
import { mergeStyles } from '@/utilities/merge-styles';
import { Primitive } from '@/_internal/components/primitive';
import { CollapsibleRootContext } from '../../contexts/collapsible-root-context';

/**
 * Groups all parts of the collapsible.
 *
 * Renders a `<div>` element.
 */
export const CollapsibleRoot = component$<CollapsibleRootProps>((props) => {
  const { as = 'div', defaultOpen, open: _open, onOpenChange$, disabled: _disabled = false, style, ...others } = props;

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
      style={mergeStyles([
        {
          // Performance optimization
          // The `contain: layout style;` CSS property is used here to improve rendering performance.
          // `contain: layout;` tells the browser that the internal layout of this component
          // is self-contained and does not affect the layout of elements outside of it. This prevents
          // costly re-calculations of the entire page layout when the collapsible panel expands or collapses,
          // which is especially beneficial during animations.
          // `contain: style;` ensures that CSS properties that can affect the rest of the page,
          // like counters, are isolated to this element.
          // Together, these properties create a performance "bubble," allowing the browser to optimize
          // rendering by treating the collapsible component as an independent unit.
          contain: 'layout style',
        },
        style,
      ])}
      {...others}
    >
      <Slot />
    </Primitive.div>
  );
});
