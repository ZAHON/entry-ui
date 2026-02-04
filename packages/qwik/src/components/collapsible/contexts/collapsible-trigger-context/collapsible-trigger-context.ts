import type { CollapsibleTriggerContextValue } from './collapsible-trigger-context.types';
import { createContextId } from '@qwik.dev/core';

/**
 * Provides the context for the `Collapsible.Trigger` component, allowing descendant
 * components to access readonly signal without prop drilling.
 */
export const CollapsibleTriggerContext = createContextId<CollapsibleTriggerContextValue>(
  'entry-ui-qwik-collapsible-trigger-context'
);
