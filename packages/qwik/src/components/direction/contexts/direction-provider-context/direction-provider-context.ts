import type { DirectionProviderContextValue } from './direction-provider-context.types';
import { createContextId } from '@qwik.dev/core';

/**
 * Provides the context for the `<Direction.Provider>` component, allowing descendant
 * components to access the readonly signal without prop drilling.
 */
export const DirectionProviderContext = createContextId<DirectionProviderContextValue>(
  'entry-ui-qwik-direction-provider-context'
);
