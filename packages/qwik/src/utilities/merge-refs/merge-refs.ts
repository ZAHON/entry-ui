import type { Signal } from '@qwik.dev/core';
import { noSerialize, $, isSignal } from '@qwik.dev/core';

/**
 * Merges multiple references into a single callback ref.
 *
 * This utility function accepts an array of reference handlers and allows you to assign
 * a single DOM element to multiple handlers simultaneously (both `Signal` objects and callback `function` items).
 * It is particularly useful when a component needs to maintain its own internal reference to an element
 * while also forwarding a reference to a consumer via props.
 *
 * When the returned callback is executed, it iterates through the array of provided `refs` and:
 * - Updates the `.value` property if the ref is a `Signal`.
 * - Invokes the function if the ref is a callback `function`.
 * - Gracefully ignores `undefined` values.
 */
export const mergeRefs = <T extends Element = Element>(
  refs: (Signal<Element | undefined> | Signal<T | undefined> | ((node: T) => void) | undefined)[]
) => {
  // Wrap the array of references with `noSerialize` to prevent Qwik from attempting
  // to serialize raw callback functions and avoid `Q34` serialization errors.
  const _refs = noSerialize(refs);

  // Wrap the returned callback in `$` to make it a Qwik-serializable closure (`QRL`),
  // allowing it to be safely passed down as a DOM event handler or component prop.
  return $((node: T) => {
    // Ensure the non-serializable references array exists before attempting to iterate,
    // protecting against runtime issues if it failed to initialize.
    if (!_refs) {
      return;
    }

    // Iterate through the array of reference handlers using a high-performance traditional loop.
    // This approach minimizes overhead compared to array iteration methods like `forEach`.
    for (let i = 0; i < _refs.length; i++) {
      // Retrieve the current reference handler from the array based on the active index.
      // This value can be either a `Signal`, a callback `function`, or `undefined`.
      const ref = _refs[i];

      // Skip current iteration immediately if the reference handler is `undefined`.
      // This prevents runtime errors when handling optional or unassigned props.
      if (!ref) {
        continue;
      }

      // Check if the reference is a reactive Qwik `Signal` and update its `.value` property with the DOM node.
      // Otherwise, treat it as a callback `function` and invoke it directly with the element argument.
      if (isSignal(ref)) {
        (ref as Signal<T>).value = node;
      } else if (typeof ref === 'function') {
        ref(node);
      }
    }
  });
};
