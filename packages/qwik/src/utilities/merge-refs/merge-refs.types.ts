import type { Signal } from '@qwik.dev/core';

/**
 * Represents the various ways a reference can be assigned to a DOM element in Qwik.
 *
 * This type provides flexibility for handling references, supporting:
 *
 * - `Signal`: A Qwik signal that holds the element reference in its `.value` property.
 * - `Function`: A callback function that receives the element as an argument (ref-callback).
 * - `undefined`: Allows for optional references in component props.
 */
export type PossibleRef<T> = Signal<Element | undefined> | Signal<T | undefined> | ((node: T) => void) | undefined;
