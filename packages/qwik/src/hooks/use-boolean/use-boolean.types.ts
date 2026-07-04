import type { Signal, QRL } from '@qwik.dev/core';

/**
 * Represents the object returned by the `useBoolean` hook.
 *
 * This interface exposes a highly specialized API designed to manage binary state flags efficiently.
 * It provides the consuming component with an immutable, reactive view of the underlying boolean value
 * alongside a set of standalone, serialized mutation dispatchers optimized for common toggle and reset operations.
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
