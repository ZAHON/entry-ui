import type { TabsTabContextValue } from './tabs-tab-context.types';
import { createContextId } from '@qwik.dev/core';

/**
 * Provides the context for the `Tabs.Tab` component, allowing descendant
 * components to access readonly signals without prop drilling.
 */
export const TabsTabContext = createContextId<TabsTabContextValue>('entry-ui-qwik-tabs-tab-context');
