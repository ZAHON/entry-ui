import type { CollapsibleRootContextValue } from './collapsible-root-context.types';
import { createContextId, useContext } from '@qwik.dev/core';

/**
 * Provides the context for the `Collapsible.Root` component, allowing descendant
 * components to access readonly signals and `QRL` functions without prop drilling.
 */
export const CollapsibleRootContext = createContextId<CollapsibleRootContextValue>(
  'entry-ui-qwik-collapsible-root-context'
);

/**
 * A hook that provides access to the `Collapsible.Root` component's internal state.
 * It exposes readonly signals and `QRL` functions to interact with the component's state,
 */
export const useCollapsibleRootContext = () => {
  const context = useContext(CollapsibleRootContext);

  return context;
};
