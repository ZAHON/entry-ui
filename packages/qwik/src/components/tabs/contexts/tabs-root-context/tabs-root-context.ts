import type { TabsRootContextValue } from './tabs-root-context.types';
import { createContextId, useContext } from '@qwik.dev/core';

/**
 * Provides the context for the `Tabs.Root` component, allowing descendant
 * components to access readonly signals and `QRL` function without prop drilling.
 */
export const TabsRootContext = createContextId<TabsRootContextValue>('entry-ui-qwik-tabs-root-context');

/**
 * A hook that provides access to the `Tabs.Root` component's internal state.
 * It exposes readonly signals and `QRL` function to interact with the component's state,
 */
export const useTabsRootContext = () => {
  const context = useContext(TabsRootContext);

  return context;
};
