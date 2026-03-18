import type { TabsListProps } from './tabs-list.types';
import { component$, useSignal, useComputed$, useTask$, $, useContextProvider, Slot } from '@qwik.dev/core';
import { RovingFocusGroupRoot } from '@/components/roving-focus-group/parts/roving-focus-group-root';
import { useTabsRootContext } from '../../contexts/tabs-root-context';
import { TabsListContext } from '../../contexts/tabs-list-context';

/**
 * Groups the individual tab buttons.
 *
 * Renders a `<div>` element.
 */
export const TabsList = component$<TabsListProps>((props) => {
  const { as = 'div', activationMode: _activationMode = 'automatic', loopFocus = true, ...others } = props;

  const { value, dir, orientation } = useTabsRootContext();

  const currentTabStopId = useSignal(value.value);
  const activationMode = useComputed$(() => _activationMode);

  useTask$(({ track }) => {
    // Track the active tab value to synchronize it with the roving focus state.
    // This ensures that when the active tab changes externally or via click,
    // the roving focus group correctly updates the current tab stop.
    const activeTabValue = track(() => value.value);

    currentTabStopId.value = activeTabValue;
  });

  const handleCurrentTabStopIdChange$ = $((tabStopId: string) => {
    currentTabStopId.value = tabStopId;
  });

  useContextProvider(TabsListContext, { activationMode });

  return (
    <RovingFocusGroupRoot
      as={as}
      currentTabStopId={currentTabStopId}
      onCurrentTabStopIdChange$={handleCurrentTabStopIdChange$}
      loopFocus={loopFocus}
      dir={dir.value}
      orientation={orientation.value}
      role="tablist"
      aria-orientation={orientation.value}
      data-entry-ui-qwik-tabs-list=""
      {...others}
    >
      <Slot />
    </RovingFocusGroupRoot>
  );
});
