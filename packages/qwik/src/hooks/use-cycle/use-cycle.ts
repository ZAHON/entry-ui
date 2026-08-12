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

  // Initialize a signal to track the currently active `option` in the sequence.
  // Executes a lazy factory callback on creation to safely derive the initial option state.
  const option = useSignal<T>(() => {
    // Validate the optional `defaultOption` parameter against the provided options array.
    // If the value is present within `options`, set it as the initial active state.
    if (defaultOption !== undefined && options.includes(defaultOption)) {
      return defaultOption;
    }

    // Fall back to the first item in the `options` array as the default baseline state
    // when `defaultOption` is either `undefined` or not included in the `options` sequence.
    return options[0];
  });

  const next$ = $(() => {
    // Retrieve the zero-based index of the currently active `option` in the collection.
    // This position serves as the starting baseline for forward navigation calculations.
    const currentIndex = options.indexOf(option.value);

    // Compute the target index by advancing one position forward from the current state.
    // This raw value will be evaluated against boundaries or processed via modular math.
    const nextIndex = currentIndex + 1;

    // Evaluate whether infinite sequence looping is enabled for forward navigation.
    // If active, wrap back to the first option upon exceeding the array length.
    if (loop) {
      option.value = options[nextIndex % options.length];
    } else {
      // Check if the calculated target index falls strictly within valid array bounds.
      // Update the active state only when a subsequent element actually exists.
      if (nextIndex < options.length) {
        option.value = options[nextIndex];
      }
    }
  });

  const previous$ = $(() => {
    // Locate the current index position within the collection to determine baseline state.
    // This value is used to calculate the preceding item during reverse navigation.
    const currentIndex = options.indexOf(option.value);

    // Calculate the target index by stepping one position backward in the array sequence.
    // The calculated index may become negative when stepping back from the first element.
    const prevIndex = currentIndex - 1;

    // Handle wrap-around navigation mechanics when infinite looping is enabled.
    // Applies positive modulo arithmetic to seamlessly wrap from start to end.
    if (loop) {
      option.value = options[(prevIndex + options.length) % options.length];
    } else {
      // Verify that the preceding index position does not cross below the initial boundary.
      // Commit the update only if stepping back lands on a valid array element.
      if (prevIndex >= 0) {
        option.value = options[prevIndex];
      }
    }
  });

  const first$ = $(() => {
    // Instantly reset the signal state back to the first element of the `options` array.
    // Provides direct jump capabilities to the initial node in the sequence.
    option.value = options[0];
  });

  const last$ = $(() => {
    // Instantly set the signal state to the final element of the `options` array.
    // Provides direct jump capabilities to the terminal node in the sequence.
    option.value = options[options.length - 1];
  });

  const set$ = $((value: T) => {
    // Perform a runtime inclusion check to ensure the target value exists in `options`.
    // Only update the signal if the value is valid, preventing out-of-bounds state drift.
    if (options.includes(value)) {
      option.value = value;
    }
  });

  return { option, next$, previous$, first$, last$, set$ };
};

export namespace useCycle {
  /**
   * Configuration parameters for the `useCycle` hook.
   *
   * This interface encapsulates the parameters required to govern navigation through a predefined dataset sequence.
   * It allows the caller to establish the comprehensive scope of valid value states, configure deterministic
   * initialization boundaries, and dictate boundary-crossing mechanics such as automated sequence wrapping.
   */
  export type Params<T> = UseCycleParams<T>;

  /**
   * Represents the object returned by the `useCycle` hook.
   *
   * This interface exposes a comprehensive state-traversal API designed to navigate sequentially through a predefined collection.
   * It provides the consuming component with an immutable, reactive view of the currently active state node, coupled with
   * a set of specialized, serialized navigation dispatchers for directional, boundary-snapped, and direct-access state transitions.
   */
  export type ReturnValue<T> = UseCycleReturnValue<T>;
}
