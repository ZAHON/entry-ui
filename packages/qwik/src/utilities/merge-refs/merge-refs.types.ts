import type { Signal } from '@qwik.dev/core';

/**
 * Represents the various ways a reference can be assigned to a DOM element in Qwik.
 *
 * This type provides flexibility for handling references, supporting:
 *
 * - `Signal<T | undefined>` or `Signal<Element | undefined>`: The standard Qwik approach using `useSignal`.
 * It allows the element to be reactively tracked within the `.value` property.
 *
 * - `(node: T) => void`: A callback ref (ref-callback) that provides direct access to the DOM node upon mounting.
 *
 * - `undefined`: Designed for optional references. This allows you to pass component props directly into the utility without manual null-checks.
 */
export type PossibleRef<T> = Signal<Element | undefined> | Signal<T | undefined> | ((node: T) => void) | undefined;
