import type { DialogCloseContextValue } from './dialog-close-context.types';
import { createContextId } from '@qwik.dev/core';

/**
 * Provides the context for the `Dialog.Close` component, allowing descendant
 * components to access readonly signal without prop drilling.
 */
export const DialogCloseContext = createContextId<DialogCloseContextValue>('entry-ui-dialog-close-context');
