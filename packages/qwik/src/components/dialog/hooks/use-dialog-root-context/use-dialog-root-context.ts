import type { UseDialogRootContextReturnValue } from './use-dialog-root-context.types';
import { useContext } from '@qwik.dev/core';
import { DialogRootContext } from '../../contexts/dialog-root-context';

/**
 * A hook that provides access to the `Dialog.Root` component's internal state.
 *
 * It exposes readonly signal and a `QRL` function to interact with the dialog's state,
 * allowing descendant components to control or react to whether the dialog is shown.
 */
export const useDialogRootContext = (): UseDialogRootContextReturnValue => {
  const { open, setOpen$ } = useContext(DialogRootContext);

  return { open, setOpen$ };
};
