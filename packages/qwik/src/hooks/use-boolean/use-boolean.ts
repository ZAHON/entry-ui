import type { UseBooleanReturnValue } from './use-boolean.types';
import { useSignal, $ } from '@qwik.dev/core';

/**
 * A hook that manages a boolean state with common utility methods.
 *
 * This hook accepts a single optional `initialState` parameter, which defaults to `false`.
 * It simplifies the management of boolean flags (toggles, modals, drawers) by
 * encapsulating a boolean signal and exposing it as a readonly signal.
 *
 * State mutations are performed exclusively through the provided `QRL`
 * functions (`setFalse$` ,`setTrue$`, `toggle$`), promoting a predictable data flow.
 */
export const useBoolean = (initialState: boolean | undefined = false): UseBooleanReturnValue => {
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

export namespace useBoolean {
  /**
   * Represents the controller API returned by the `useBoolean` hook.
   *
   * This interface defines the operational contract for managing reactive binary state.
   * It encapsulates a readonly state view alongside a set of standalone, QRL-serialized mutation
   * dispatchers engineered to perform deterministic state transitions across Qwik's asynchronous runtime boundaries.
   */
  export type ReturnValue = UseBooleanReturnValue;
}
