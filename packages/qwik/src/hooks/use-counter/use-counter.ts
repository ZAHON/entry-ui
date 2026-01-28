import type { UseCounterParams, UseCounterReturnValue } from './use-counter.types';
import { useSignal, $ } from '@qwik.dev/core';
import { isDev } from '@qwik.dev/core/build';
import { isValidNumber } from '@entry-ui/utilities/is-valid-number';
import { clamp } from '@entry-ui/utilities/clamp';
import { fail } from '@/_internal/utilities/fail';
import { warn } from '@/_internal/utilities/warn';

/**
 * A hook that manages a numeric state with built-in clamping and validation logic.
 *
 * This hook provides a secure way to handle counter states by ensuring the value
 * always remains within defined boundaries. It encapsulates a numeric signal and
 * exposes it as a readonly signal, enforcing predictable state transitions through
 * dedicated `QRL` functions.
 *
 * It features strict validation during development to ensure all parameters
 * and operations result in finite numbers, preventing common pitfalls such as
 * `NaN` or `Infinity` from polluting the state. It is ideal for quantity selectors,
 * pagination, volume controls, or any UI element requiring bounded numeric input.
 */
export const useCounter = (params: UseCounterParams = {}): UseCounterReturnValue => {
  const { initialCount = 0, step = 1, min = -Number.MAX_VALUE, max = Number.MAX_VALUE } = params;

  if (isDev) {
    if (!isValidNumber(initialCount)) {
      fail([
        `Invalid 'initialCount' parameter in 'useCounter' hook.`,
        `Expected a finite number, but received: ${initialCount}`,
      ]);
    }

    if (!isValidNumber(step)) {
      fail([`Invalid 'step' parameter in 'useCounter' hook.`, `Expected a finite number, but received: ${step}`]);
    }

    if (!isValidNumber(min)) {
      fail([`Invalid 'min' parameter in 'useCounter' hook.`, `Expected a finite number, but received: ${min}`]);
    }

    if (!isValidNumber(max)) {
      fail([`Invalid 'max' parameter in 'useCounter' hook.`, `Expected a finite number, but received: ${max}`]);
    }

    if (min > max) {
      fail([
        `Invalid range for 'useCounter' hook.`,
        `The 'min' parameter (${min}) must be less than or equal to the 'max' parameter (${max}).`,
      ]);
    }
  }

  const count = useSignal(clamp({ value: initialCount, min, max }));

  const increment$ = $(() => {
    const nextCount = count.value + step;

    if (!isValidNumber(nextCount)) {
      if (isDev) {
        warn([
          `The 'increment$' QRL function from the 'useCounter' hook resulted in an invalid, non-finite number: ${nextCount}.`,
          `The 'count' was not updated to prevent application instability.`,
        ]);
      }

      return;
    }

    count.value = clamp({ value: nextCount, min, max });
  });

  const decrement$ = $(() => {
    const nextCount = count.value - step;

    if (!isValidNumber(nextCount)) {
      if (isDev) {
        warn([
          `The 'decrement$' QRL function from the 'useCounter' hook resulted in an invalid, non-finite number: ${nextCount}.`,
          `The 'count' was not updated to prevent application instability.`,
        ]);
      }

      return;
    }

    count.value = clamp({ value: nextCount, min, max });
  });

  const set$ = $((value: number) => {
    if (!isValidNumber(value)) {
      if (isDev) {
        warn([
          `The 'set$' QRL function from the 'useCounter' hook was called with an invalid, non-finite number: ${value}.`,
          `The 'count' was not updated to prevent application instability.`,
        ]);
      }

      return;
    }

    count.value = clamp({ value, min, max });
  });

  const reset$ = $(() => {
    count.value = clamp({ value: initialCount, min, max });
  });

  return { count, increment$, decrement$, reset$, set$ };
};
