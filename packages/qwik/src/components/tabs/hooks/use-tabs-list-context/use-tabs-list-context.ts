import type { UseTabsListContextReturnValue } from './use-tabs-list-context.types';
import { useContext } from '@qwik.dev/core';
import { TabsListContext } from '../../contexts/tabs-list-context';

/**
 * A hook that provides access to the `<Tabs.List>` component's internal state.
 *
 * It exposes a readonly signal and a `QRL` function to interact with the current tab stop,
 * allowing descendant components to synchronize focus management and support roving
 * tabindex navigation across the tab list.
 */
export const useTabsListContext = (): UseTabsListContextReturnValue => {
  const { currentTabStopId, setCurrentTabStopId$ } = useContext(TabsListContext);

  return { currentTabStopId, setCurrentTabStopId$ };
};

export namespace useTabsListContext {
  /**
   * The value returned by the `useTabsListContext` hook.
   *
   * Provides access to the tab list's readonly signal and `QRL` function for descendant components.
   */
  export type ReturnValue = UseTabsListContextReturnValue;
}
