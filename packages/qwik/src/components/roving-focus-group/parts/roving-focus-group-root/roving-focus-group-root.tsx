import type { RovingFocusGroupRootProps } from './roving-focus-group-root.types';
import { component$, useSignal, useComputed$, $, useContextProvider, Slot } from '@qwik.dev/core';
import { useControllable } from '@/hooks/use-controllable';
import { mergeRefs } from '@/utilities/merge-refs';
import { Primitive } from '@/_internal/components/primitive';
import { RovingFocusGroupRootContext } from '../../contexts/roving-focus-group-root-context';

/**
 * Groups all parts of the roving focus group.
 *
 * Renders a `<div>` element.
 */
export const RovingFocusGroupRoot = component$<RovingFocusGroupRootProps>((props) => {
  const {
    as = 'div',
    ref: _ref,
    defaultCurrentTabStopId,
    currentTabStopId: _currentTabStopId,
    onCurrentTabStopIdChange$,
    loopFocus: _loopFocus = false,
    dir: _dir = 'ltr',
    orientation: _orientation = 'both',
    ...others
  } = props;

  const { state: currentTabStopId, setState$: setCurrentTabStopId$ } = useControllable({
    defaultValue: defaultCurrentTabStopId ?? '',
    controlledSignal: _currentTabStopId,
    onChange$: onCurrentTabStopIdChange$,
  });

  const ref = useSignal<HTMLElement | undefined>(undefined);
  const loopFocus = useComputed$(() => _loopFocus);
  const dir = useComputed$(() => _dir);
  const orientation = useComputed$(() => _orientation);

  const getItems$ = $(() => {
    const rootRef = ref.value;

    if (!rootRef) return [];

    const ITEM_SELECTOR = '[data-entry-ui-qwik-roving-focus-group-item]';

    const orderedNodes = Array.from(rootRef.querySelectorAll<HTMLElement>(ITEM_SELECTOR));
    const items = orderedNodes.filter((item) => !(item.hasAttribute('disabled') || item.hasAttribute('data-disabled')));

    return items;
  });

  useContextProvider(RovingFocusGroupRootContext, {
    currentTabStopId,
    setCurrentTabStopId$,
    getItems$,
    loopFocus,
    dir,
    orientation,
  });

  return (
    <Primitive.div
      as={as}
      ref={mergeRefs([_ref, ref])}
      dir={dir.value}
      data-entry-ui-qwik-roving-focus-group-root=""
      data-orientation={orientation.value}
      {...others}
    >
      <Slot />
    </Primitive.div>
  );
});
