import type { TabsListContextValue } from './tabs-list-context.types';
import { createContextId, useContext } from '@qwik.dev/core';

/**
 * Provides the context for the `Tabs.List` component, allowing descendant
 * components to access readonly signals and `QRL` function without prop drilling.
 */
export const TabsListContext = createContextId<TabsListContextValue>('entry-ui-qwik-tabs-list-context');

/**
 * An internal hook that provides access to the `Tabs.List` component's internal state.
 *
 * It exposes readonly signals and `QRL` functions to interact with the component's state.
 */
export const useTabsListContext = () => {
  const context = useContext(TabsListContext);

  return context;
};
