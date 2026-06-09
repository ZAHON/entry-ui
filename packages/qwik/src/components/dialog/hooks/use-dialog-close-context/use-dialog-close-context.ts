import type { UseDialogCloseContextReturnValue } from './use-dialog-close-context.types';
import { useContext } from '@qwik.dev/core';
import { DialogCloseContext } from '../../contexts/dialog-close-context';

/**
 * A hook that provides access to the `Dialog.Close` component's internal state.
 *
 * It exposes a readonly signal to interact with the close button's state,
 * allowing descendant components to react to its disabled/enabled state.
 */
export const useDialogCloseContext = (): UseDialogCloseContextReturnValue => {
  const { disabled } = useContext(DialogCloseContext);

  return { disabled };
};
