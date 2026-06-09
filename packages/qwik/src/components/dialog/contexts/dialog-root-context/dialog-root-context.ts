import type { DialogRootContextValue } from './dialog-root-context.types';
import { createContextId, useContext } from '@qwik.dev/core';

/**
 * Provides the context for the `Dialog.Root` component, allowing descendant
 * components to access readonly signals and `QRL` function without prop drilling.
 */
export const DialogRootContext = createContextId<DialogRootContextValue>('entry-ui-qwik-dialog-root-context');

/**
 * A hook that provides access to the `Dialog.Root` component's internal state.
 *
 * It exposes readonly signals and `QRL` function to interact with the component's state,
 */
export const useDialogRootContext = () => {
  const context = useContext(DialogRootContext);

  return context;
};
