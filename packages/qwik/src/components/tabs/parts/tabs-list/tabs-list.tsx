import type { TabsListProps } from './tabs-list.types';
import { component$, useSignal, useComputed$, useTask$, useContextProvider, Slot } from '@qwik.dev/core';
import { Primitive } from '@/_internal/components/primitive';
import { useControllable } from '@/hooks/use-controllable';
import { mergeRefs } from '@/utilities/merge-refs';
import { useTabsRootContext } from '../../contexts/tabs-root-context';
import { TabsListContext } from '../../contexts/tabs-list-context';

/**
 * Groups the individual tab buttons.
 *
 * Renders a `<div>` element.
 */
export const TabsList = component$<TabsListProps>((props) => {
  const {
    as = 'div',
    ref,
    activationMode: _activationMode = 'automatic',
    loopFocus: _loopFocus = true,
    ...others
  } = props;

  const { value, orientation } = useTabsRootContext();

  const { state: currentTabStopId, setState$: setCurrentTabStopId$ } = useControllable({
    defaultValue: value.value,
  });

  const listRef = useSignal<HTMLElement | undefined>(undefined);
  const activationMode = useComputed$(() => _activationMode);
  const loopFocus = useComputed$(() => _loopFocus);

  useTask$(({ track }) => {
    // Track the active tab value to synchronize it with the tab stop state.
    // This ensures that when the active tab is changed externally, the tab list
    // correctly updates its current focusable tab stop.
    const activeTabValue = track(() => value.value);

    // Prevent redundant state updates if the tab stop is already synchronized with the newly activated tab.
    if (currentTabStopId.value !== activeTabValue) {
      setCurrentTabStopId$(activeTabValue);
    }
  });

  useContextProvider(TabsListContext, { currentTabStopId, setCurrentTabStopId$, listRef, activationMode, loopFocus });

  return (
    <Primitive.div
      as={as}
      ref={mergeRefs([ref, listRef])}
      role="tablist"
      aria-orientation={orientation.value}
      data-entry-ui-qwik-tabs-list=""
      data-orientation={orientation.value}
      {...others}
    >
      <Slot />
    </Primitive.div>
  );
});
