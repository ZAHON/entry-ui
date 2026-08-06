import type { Signal } from '@qwik.dev/core';

/**
 * Represents a value that can be a raw value of type `T`, a mutable `Signal<T>`, or a readonly `Readonly<Signal<T>>;`.
 *
 * This type is useful for component props or utilities that need to accept either static values
 * or reactive signals seamlessly. It supports:
 *
 * - `T`: A standard raw value.
 * - `Signal<T>`: A standard, mutable Qwik signal.
 * - `Readonly<Signal<T>>`: A readonly signal, such as those returned by `useComputed$`.
 */
export type MaybeSignal<T> = T | Signal<T> | Readonly<Signal<T>>;
