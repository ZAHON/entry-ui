import type { TabsListContextValue } from './tabs-list-context.types';
import { createContextId, useContext } from '@qwik.dev/core';

/**
 * Provides the context for the `Tabs.List` component, allowing descendant
 * components to access readonly signal without prop drilling.
 */
export const TabsListContext = createContextId<TabsListContextValue>('entry-ui-qwik-tabs-list-context');

/**
 * A hook that provides access to the `Tabs.List` component's internal state.
 * It exposes readonly signal to interact with the component's state,
 */
export const useTabsListContext = () => {
  const context = useContext(TabsListContext);

  return context;
};
