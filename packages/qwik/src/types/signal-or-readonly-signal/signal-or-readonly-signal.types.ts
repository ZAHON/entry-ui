import type { Signal, ReadonlySignal } from '@qwik.dev/core';

/**
 * Represents a signal that can be either mutable or readonly.
 *
 * This type is useful for component props or utilities that need to read from a signal
 * without concerned whether it was created as a standard `Signal` (mutable) or
 * a `ReadonlySignal` (typically derived from `useComputed$`). It supports:
 *
 * - `Signal<T>`: A standard, mutable Qwik signal.
 * - `ReadonlySignal<T>`: A readonly signal, such as those returned by `useComputed$`.
 */
export type SignalOrReadonlySignal<T> = Signal<T> | ReadonlySignal<T>;
