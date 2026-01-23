import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * Configuration parameters for the `useCycle` hook.
 */
export interface UseCycleParams<T> {
  /**
   * A readonly array of values to cycle through.
   * This defines the sequence and the scope of all possible states the hook can manage.
   */
  options: readonly T[];

  /**
   * The initial value to be set when the hook is first initialized.
   * If provided, it must be present in the `options` array.
   * If the provided value is not found within the `options` array,
   * the hook will fall back to the first element of the array.
   *
   * @default options[0]
   */
  defaultOption?: T;

  /**
   * Determines the behavior when navigating past the boundaries of the `options` array.
   * If set to `true`, the sequence will wrap around (e.g., from last to first).
   * If `false`, navigation will stop at the first or last element.
   *
   * @default true
   */
  loop?: boolean;
}

/**
 * Represents the object returned by the `useCycle` hook.
 */
export interface UseCycleReturnValue<T> {
  /**
   * A readonly signal whose value represents the currently active option from the provided array.
   * This signal is read-only, which means its value can only be changed by calling navigation `QRL` functions
   * like `next$`, `previous$`, or `set$`, ensuring predictable state transitions.
   */
  option: ReadonlySignal<T>;

  /**
   * A `QRL` function that advances the value to the next option in the sequence.
   * If `loop` is enabled, it cycles back to the first item upon reaching the end.
   */
  next$: QRL<() => void>;

  /**
   * A `QRL` function that moves the value to the previous option in the sequence.
   * If `loop` is enabled, it cycles back to the last item upon reaching the start.
   */
  previous$: QRL<() => void>;

  /**
   * A `QRL` function that jumps directly to the first item in the `options` array.
   */
  first$: QRL<() => void>;

  /**
   * A `QRL` function that jumps directly to the last item in the `options` array.
   */
  last$: QRL<() => void>;

  /**
   * A `QRL` function that directly sets the `option` to a new value.
   * This function includes a built-in validation check; the value will only be updated
   * if it is present in the original `options` array.
   */
  set$: QRL<(value: T) => void>;
}
