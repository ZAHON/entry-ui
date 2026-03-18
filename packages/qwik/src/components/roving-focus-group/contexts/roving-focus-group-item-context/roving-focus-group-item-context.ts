import type { RovingFocusGroupItemContextValue } from './roving-focus-group-item-context.types';
import { createContextId } from '@qwik.dev/core';

/**
 * Provides the context for the `RovingFocusGroup.Item` component, allowing descendant
 * components to access readonly signals without prop drilling.
 */
export const RovingFocusGroupItemContext = createContextId<RovingFocusGroupItemContextValue>(
  'entry-ui-qwik-roving-focus-group-item-context'
);
