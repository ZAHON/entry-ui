import type { UseDialogTriggerContextReturnValue } from './use-dialog-trigger-context.types';
import { useContext } from '@qwik.dev/core';
import { DialogTriggerContext } from '../../contexts/dialog-trigger-context';

/**
 * A hook that provides access to the `<Dialog.Trigger>` component's internal state.
 *
 * It exposes a readonly signal to interact with the trigger's state,
 * allowing descendant components to react to its disabled/enabled state.
 */
export const useDialogTriggerContext = (): UseDialogTriggerContextReturnValue => {
  const { disabled } = useContext(DialogTriggerContext);

  return { disabled };
};

export namespace useDialogTriggerContext {
  /**
   * The value returned by the `useDialogTriggerContext` hook.
   *
   * Provides access to the trigger's readonly signal for descendant components.
   */
  export type ReturnValue = UseDialogTriggerContextReturnValue;
}
