import type { Signal, QRL } from '@qwik.dev/core';

/**
 * Configuration parameters for the `useCounter` hook.
 *
 * This interface encapsulates the parameters required to govern the numerical boundaries
 * and stepping behavior of a stateful counter. It allows the caller to establish
 * initial baseline values, define the granular step delta for arithmetic transitions,
 * and enforce hard upper and lower mathematical constraints.
 */
export interface UseCounterParams {
  /**
   * The starting value of the counter.
   * It will be automatically clamped if it falls outside the specified
   * `min` and `max` range.
   *
   * @default 0
   */
  initialCount?: number;

  /**
   * The amount by which the counter increases or decreases during
   * increment and decrement operations.
   *
   * @default 1
   */
  step?: number;

  /**
   * The lower numerical boundary of the counter.
   * The counter value will never go below this limit.
   * Must be less than or equal to `max`.
   *
   * @default -Infinity
   */
  min?: number;

  /**
   * The upper numerical boundary of the counter.
   * The counter value will never exceed this limit.
   * Must be greater than or equal to `min`.
   *
   * @default Infinity
   */
  max?: number;
}

/**
 * Represents the object returned by the `useCounter` hook.
 *
 * This interface exposes a comprehensive arithmetic API designed to mutate and monitor a bounded numerical state.
 * It provides the consuming component with an immutable, reactive view of the current counter value,
 * paired with a suite of specialized, serialized QRL dispatchers for directional stepping, direct assignment,
 * and state restoration with integrated boundary-clamping.
 */
export interface UseCounterReturnValue {
  /**
   * A readonly signal representing the current numeric state of the counter.
   * This signal is read-only, meaning its value can only be modified by calling
   * specific `QRL` functions like `increment$`, `decrement$`, `set$`,
   * or `reset$`, ensuring consistent and predictable state updates.
   */
  count: Readonly<Signal<number>>;

  /**
   * A `QRL` function that increases the counter value by the defined `step`.
   * The resulting value is automatically clamped between `min` and `max`.
   */
  increment$: QRL<() => void>;

  /**
   * A `QRL` function that decreases the counter value by the defined `step`.
   * The resulting value is automatically clamped between `min` and `max`.
   */
  decrement$: QRL<() => void>;

  /**
   * A `QRL` function that directly sets the counter to a specific numeric value.
   * The value is automatically clamped between `min` and `max`.
   */
  set$: QRL<(value: number) => void>;

  /**
   * A `QRL` function that restores the counter to its defined `initialCount`.
   * The `initialCount` value is re-clamped during this operation to ensure
   * it still adheres to the current `min` and `max` constraints.
   */
  reset$: QRL<() => void>;
}
