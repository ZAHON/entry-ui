import type { TabsPanelContextValue } from './tabs-panel-context.types';
import { createContextId } from '@qwik.dev/core';

/**
 * Provides the context for the `Tabs.Panel` component, allowing descendant
 * components to access readonly signal without prop drilling.
 */
export const TabsPanelContext = createContextId<TabsPanelContextValue>('entry-ui-qwik-tabs-panel-context');
