import type { UseCounterParams, UseCounterReturnValue } from './use-counter.types';
import { useConstant, useSignal, $ } from '@qwik.dev/core';
import { clamp } from '@entry-ui/utilities/clamp';

/**
 * A hook that manages a numeric state with built-in clamping and boundary logic.
 *
 * This hook provides a secure way to handle counter states by ensuring the value
 * always remains within defined boundaries. It encapsulates a numeric signal and
 * exposes it as a readonly signal, enforcing predictable state transitions through
 * dedicated `QRL` functions.
 *
 * It supports customizable boundaries (defaulting to native `-Infinity` and `Infinity`)
 * and guarantees a stable, positive step size (preventing inverted behaviors even if
 * a negative step is provided). It is ideal for quantity selectors, pagination,
 * volume controls, or any UI element requiring bounded numeric input.
 */
export const useCounter = (params: UseCounterParams = {}): UseCounterReturnValue => {
  const { initialCount = 0, step: _step = 1, min = -Infinity, max = Infinity } = params;

  // Ensures the `step` value remains positive and immutable throughout the component's lifecycle,
  // preventing inverted counter behaviors even if a negative delta is initially provided.
  const step = useConstant(Math.abs(_step));

  const count = useSignal(clamp({ value: initialCount, min, max }));

  const increment$ = $(() => {
    count.value = clamp({ value: count.value + step, min, max });
  });

  const decrement$ = $(() => {
    count.value = clamp({ value: count.value - step, min, max });
  });

  const set$ = $((value: number) => {
    count.value = clamp({ value, min, max });
  });

  const reset$ = $(() => {
    count.value = clamp({ value: initialCount, min, max });
  });

  return { count, increment$, decrement$, reset$, set$ };
};

export namespace useCounter {
  /**
   * Represents the configuration parameters accepted by the `useCounter` hook.
   *
   * This interface defines the essential options needed to govern the numerical boundaries and stepping behavior
   * of a stateful counter. It establishes a unified structure for initializing baseline values, defining granular
   * arithmetic step deltas, and enforcing hard upper and lower mathematical constraints.
   */
  export type Params = UseCounterParams;

  /**
   * Represents the object returned by the `useCounter` hook.
   *
   * This interface exposes a comprehensive arithmetic API designed to mutate and monitor a bounded numerical state.
   * It provides the consuming component with an immutable, reactive view of the current counter value,
   * paired with a suite of specialized, serialized QRL dispatchers for directional stepping, direct assignment,
   * and state restoration with integrated boundary-clamping.
   */
  export type ReturnValue = UseCounterReturnValue;
}
