import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * Represents the object returned by the `useBoolean` hook.
 */
export interface UseBooleanReturnValue {
  /**
   * A readonly signal whose value indicates the current boolean state.
   */
  state: ReadonlySignal<boolean>;

  /**
   * A `QRL` function to set the boolean state to `false`.
   */
  setFalse$: QRL<() => void>;

  /**
   * A `QRL` function to set the boolean state to `true`.
   */
  setTrue$: QRL<() => void>;

  /**
   * A `QRL` function to toggle the boolean state.
   */
  toggle$: QRL<() => void>;
}
