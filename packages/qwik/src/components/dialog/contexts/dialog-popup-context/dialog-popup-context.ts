import type { DialogPopupContextValue } from './dialog-popup-context.types';
import { createContextId, useContext } from '@qwik.dev/core';

/**
 * Provides the context for the `Dialog.Popup` component, allowing descendant
 * components like `Dialog.Title` and `Dialog.Description` to register their
 * unique identifiers for accessibility (WAI-ARIA).
 */
export const DialogPopupContext = createContextId<DialogPopupContextValue>('entry-ui-qwik-dialog-popup-context');

/**
 * An internal hook that provides access to the `Dialog.Popup` component's internal state.
 *
 * It exposes signals and `QRL` functions to manage title and description identifiers,
 * ensuring correct `aria-labelledby` and `aria-describedby` associations.
 */
export const useDialogPopupContext = () => {
  const context = useContext(DialogPopupContext);

  return context;
};
