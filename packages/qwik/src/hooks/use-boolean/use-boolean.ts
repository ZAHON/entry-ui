import type { UseBooleanReturnValue } from './use-boolean.types';
import { useSignal, $ } from '@qwik.dev/core';

/**
 * A hook that manages a boolean state with common utility methods.
 *
 * The hook accepts a single `initialState` parameter, which defaults to `false`.
 * It simplifies the management of boolean flags (toggles, modals, drawers) by
 * encapsulating a boolean signal and exposing it as a readonly signal.
 *
 * State mutations are performed exclusively through the provided `QRL`
 * functions (`setFalse$` ,`setTrue$`, `toggle$`), promoting a predictable data flow.
 */
export const useBoolean = (initialState: boolean = false): UseBooleanReturnValue => {
  const state = useSignal(initialState);

  const setFalse$ = $(() => {
    state.value = false;
  });

  const setTrue$ = $(() => {
    state.value = true;
  });

  const toggle$ = $(() => {
    state.value = !state.value;
  });

  return { state, setFalse$, setTrue$, toggle$ };
};
