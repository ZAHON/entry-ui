import type { UseCycleParams, UseCycleReturnValue } from './use-cycle.types';
import { useSignal, $ } from '@qwik.dev/core';

/**
 * A hook that manages navigation through a predefined sequence of options.
 *
 * This hook provides a robust way to handle multi-state logic by rotating through an array of values.
 * It features advanced navigation controls, allowing for forward and backward movement,
 * direct jumps to the start or end of the sequence, and configurable looping behavior.
 * It is particularly useful for building components such as carousels, steppers,
 * multi-state switches, or any UI element requiring sequential state transitions.
 */
export const useCycle = <T>(params: UseCycleParams<T>): UseCycleReturnValue<T> => {
  const { options, defaultOption, loop = true } = params;

  const option = useSignal<T>(() => {
    if (defaultOption !== undefined && options.includes(defaultOption)) {
      return defaultOption;
    }

    return options[0];
  });

  const next$ = $(() => {
    const currentIndex = options.indexOf(option.value);
    const nextIndex = currentIndex + 1;

    if (loop) {
      option.value = options[nextIndex % options.length];
    } else {
      if (nextIndex < options.length) {
        option.value = options[nextIndex];
      }
    }
  });

  const previous$ = $(() => {
    const currentIndex = options.indexOf(option.value);
    const prevIndex = currentIndex - 1;

    if (loop) {
      option.value = options[(prevIndex + options.length) % options.length];
    } else {
      if (prevIndex >= 0) {
        option.value = options[prevIndex];
      }
    }
  });

  const first$ = $(() => {
    option.value = options[0];
  });

  const last$ = $(() => {
    option.value = options[options.length - 1];
  });

  const set$ = $((value: T) => {
    if (options.includes(value)) {
      option.value = value;
    }
  });

  return { option, next$, previous$, first$, last$, set$ };
};
