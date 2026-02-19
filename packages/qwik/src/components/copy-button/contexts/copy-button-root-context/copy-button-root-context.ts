import type { CopyButtonRootContextValue } from './copy-button-root-context.types';
import { createContextId, useContext } from '@qwik.dev/core';

/**
 * Provides the context for the `CopyButton.Root` component, allowing descendant
 * components to access readonly signals without prop drilling.
 */
export const CopyButtonRootContext = createContextId<CopyButtonRootContextValue>(
  'entry-ui-qwik-copy-button-root-context'
);

/**
 * A hook that provides access to the `CopyButton.Root` component's internal state.
 * It exposes readonly signals to interact with the component's state,
 */
export const useCopyButtonRootContext = () => {
  const context = useContext(CopyButtonRootContext);

  return context;
};
