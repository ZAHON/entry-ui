import type { Signal } from '@qwik.dev/core';
import { isSignal } from '@qwik.dev/core';

/**
 * Unwraps a potential signal, returning its current value or the original value if it is not a signal.
 *
 * This utility checks whether the provided input is a Qwik `Signal`. If it is, it extracts and returns
 * the underlying value via the `.value` property; otherwise, it returns the input value as-is.
 *
 * It simplifies working with flexible component props or parameters that can accept either raw values
 * or reactive signals by abstracting away the conditional check.
 */
export const unwrapSignal = <T>(maybeSignal: T | Signal<T> | Readonly<Signal<T>>) => {
  // Check whether the input parameter is an active Qwik signal instance.
  // Returns the underlying value via the `.value` property if `true`, or passes through the raw input if `false`.
  return isSignal(maybeSignal) ? maybeSignal.value : maybeSignal;
};
