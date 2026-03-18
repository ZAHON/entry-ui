import type { RovingFocusGroupRootContextValue } from './roving-focus-group-root-context.types';
import { createContextId, useContext } from '@qwik.dev/core';

/**
 * Provides the context for the `RovingFocusGroup.Root` component, allowing descendant
 * components to access readonly signals and `QRL` functions without prop drilling.
 */
export const RovingFocusGroupRootContext = createContextId<RovingFocusGroupRootContextValue>(
  'entry-ui-qwik-roving-focus-group-root-context'
);

/**
 * A hook that provides access to the `RovingFocusGroup.Root` component's internal state.
 * It exposes readonly signals and `QRL` functions to interact with the component's state,
 */
export const useRovingFocusGroupRootContext = () => {
  const context = useContext(RovingFocusGroupRootContext);

  return context;
};
