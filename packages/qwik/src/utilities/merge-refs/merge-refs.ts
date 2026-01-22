import type { PossibleRef } from './merge-refs.types';
import type { Signal } from '@qwik.dev/core';
import { $, isSignal, noSerialize } from '@qwik.dev/core';

/**
 * Combines multiple references into a single callback ref.
 *
 * This utility function allows you to assign a single DOM element to multiple
 * reference handlers (both Qwik Signals and callback functions). It is particularly
 * useful when a component needs to maintain its own internal reference to an element
 * while also forwarding a reference to a consumer via props.
 *
 * When the returned callback is executed, it iterates through all provided refs and:
 * - Updates the `.value` property if the ref is a `Signal`.
 * - Invokes the function if the `ref` is a callback.
 * - Gracefully ignores `undefined` values.
 */
export const mergeRefs = <T extends Element>(refs: PossibleRef<T>[]) => {
  const _refs = noSerialize(refs);

  return $((node: T) => {
    _refs?.forEach((ref) => {
      if (!ref) return;

      if (isSignal(ref)) {
        (ref as Signal<T>).value = node;
      } else if (typeof ref === 'function') {
        ref(node);
      }
    });
  });
};
