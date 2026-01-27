import type { ToggleRootContextValue } from './toggle-root-context.types';
import { createContextId } from '@qwik.dev/core';

/**
 * Provides the context for the `Toggle.Root` component, allowing descendant
 * components to access readonly signals and `QRL` functions without prop drilling.
 */
export const ToggleRootContext = createContextId<ToggleRootContextValue>('entry-ui-qwik-toggle-root-context');
