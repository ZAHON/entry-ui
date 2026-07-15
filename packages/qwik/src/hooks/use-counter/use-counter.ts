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
