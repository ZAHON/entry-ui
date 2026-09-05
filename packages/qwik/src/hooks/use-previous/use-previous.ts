import type { Signal } from '@qwik.dev/core';
import { useSignal, useTask$ } from '@qwik.dev/core';

/**
 * A hook that tracks and retains the previous value of a reactive signal.
 *
 * This hook facilitates the monitoring of historical state transitions by comparing
 * current and incoming signal values across updates. It leverages Qwik's reactive tasks
 * to safely capture state changes without triggering unnecessary cascading renders,
 * providing a readonly signal containing the prior value.
 *
 * It accepts either a mutable `Signal` or a `Readonly<Signal>`, making it highly
 * versatile for tracking props, derived states, or local component variables.
 * During the initial render, the previous value defaults to the initial value
 * of the passed signal.
 */
export const usePrevious = <T>(value: Signal<T> | Readonly<Signal<T>>) => {
  // Initialize a local tracking signal to hold the current snapshot of the value.
  // This acts as a reference baseline to detect future changes accurately.
  const current = useSignal<T>(value.value);

  // Initialize a signal to store the prior value, starting as `undefined` initially.
  // This will be returned to consumers to expose the historical state transition.
  const previous = useSignal<T | undefined>(undefined);

  // Set up a reactive task that runs whenever the tracked value changes.
  // This guarantees that historical updates are captured synchronously upon signal mutation.
  useTask$(({ track }) => {
    // Explicitly track the target signal to establish a reactive dependency relationship.
    // This ensures the task re-executes whenever the source value changes during runtime.
    track(value);

    // Compare the incoming value with the current baseline using strict equality semantics.
    // If a change is detected, shift the current value to previous and update the baseline.
    if (!Object.is(value.value, current.value)) {
      // Assign the current baseline value to the previous signal slot before updating.
      // This preserves the historical state snapshot for external consumption.
      previous.value = current.value;

      // Update the internal reference baseline with the newly observed value.
      // This synchronizes the state tracking for subsequent comparison checks.
      current.value = value.value;
    }
  });

  // Return the previous value signal as a readonly reference to prevent external mutation.
  // This preserves encapsulation while allowing downstream components to reactively read history.
  return previous as Readonly<Signal<T | undefined>>;
};
