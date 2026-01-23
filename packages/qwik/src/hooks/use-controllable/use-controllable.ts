import type { UseControllableParams, UseControllableReturnValue } from './use-controllable.types';
import { useSignal, $ } from '@qwik.dev/core';
import { isDev } from '@qwik.dev/core/build';
import { fail } from '@/_internal/utilities/fail';

/**
 * A hook that manages state in either controlled or uncontrolled mode.
 *
 * It provides a unified interface for handling state updates, regardless of whether
 * the data is managed internally or by a parent component. This pattern is essential
 * for building flexible UI components that need to support both "set-and-forget"
 * usage and tight integration with external state.
 *
 * State synchronization is handled automatically:
 * - **Controlled**: Uses the provided `controlledSignal` and requests changes via `onChange$`.
 * - **Uncontrolled**: Manages an internal signal initialized by `defaultValue`.
 */
export const useControllable = <T>(params: UseControllableParams<T> = {}): UseControllableReturnValue<T> => {
  const { defaultValue, controlledSignal, onChange$ } = params;

  // In controlled mode, the state authority resides with the parent component.
  // We return the external signal directly and delegate all update requests
  // to the 'onChange$' callback without managing internal state.
  if (controlledSignal !== undefined) {
    const handleExternalStateChange$ = $((value: T) => {
      onChange$?.(value);
    });

    return {
      state: controlledSignal,
      setState$: handleExternalStateChange$,
      controlled: true,
    };
  }

  // Ensure 'defaultValue' is provided for internal state initialization.
  // This validation is performed only in development mode.
  if (isDev && defaultValue === undefined) {
    fail([
      `The 'defaultValue' parameter in 'useControllable' hook is required when 'controlledSignal' is not provided.`,
      `Either provide a 'defaultValue' for uncontrolled mode, or pass a 'controlledSignal' for controlled mode.`,
    ]);
  }

  const internalState = useSignal(defaultValue as T);

  const handleInternalStateChange$ = $((value: T) => {
    internalState.value = value;
    onChange$?.(value);
  });

  return {
    state: internalState,
    setState$: handleInternalStateChange$,
    controlled: false,
  };
};
