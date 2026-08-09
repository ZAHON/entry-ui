import type { ToggleRootContextValue } from './toggle-root-context.types';
import { createContextId, useContext } from '@qwik.dev/core';

/**
 * Provides the context for the `<Toggle.Root>` component, allowing descendant
 * components to access readonly signals and `QRL` function without prop drilling.
 */
export const ToggleRootContext = createContextId<ToggleRootContextValue>('entry-ui-qwik-toggle-root-context');

/**
 * An internal hook that provides access to the `<Toggle.Root>` component's internal state.
 *
 * It exposes readonly signals and `QRL` function to interact with the component's state.
 */
export const useToggleRootContext = () => {
  const context = useContext(ToggleRootContext);

  return context;
};
