import type { Signal, QRL } from '@qwik.dev/core';

/**
 * Represents the controller API returned by the `useBoolean` hook.
 *
 * This interface defines the operational contract for managing reactive binary state.
 * It encapsulates a readonly state view alongside a set of standalone, QRL-serialized mutation
 * dispatchers engineered to perform deterministic state transitions across Qwik's asynchronous runtime boundaries.
 */
export interface UseBooleanReturnValue {
  /**
   * A readonly signal whose value indicates the current boolean state.
   */
  state: Readonly<Signal<boolean>>;

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
