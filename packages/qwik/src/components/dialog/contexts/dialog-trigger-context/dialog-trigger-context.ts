import type { DialogTriggerContextValue } from './dialog-trigger-context.types';
import { createContextId } from '@qwik.dev/core';

/**
 * Provides the context for the `Dialog.Trigger` component, allowing descendant
 * components to access readonly signal without prop drilling.
 */
export const DialogTriggerContext = createContextId<DialogTriggerContextValue>('entry-ui-dialog-trigger-context');
