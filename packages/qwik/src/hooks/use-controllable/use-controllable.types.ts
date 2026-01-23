import type { Signal, QRL, ReadonlySignal } from '@qwik.dev/core';

/**
 * Configuration parameters for the `useControllable` hook.
 * This interface defines the inputs required to initialize the hook in either
 * controlled or uncontrolled mode, allowing for flexible state management
 * strategies within the same component.
 */
export interface UseControllableParams<T> {
  /**
   * The initial value used when the component is in uncontrolled mode.
   * This value is only used to initialize the internal state if `controlledSignal` is not provided.
   */
  defaultValue?: T;

  /**
   * An optional external signal for controlled state management.
   * If provided, the hook operates in controlled mode, delegating state authority to the parent.
   * If omitted, the hook operates in uncontrolled mode using internal state.
   */
  controlledSignal?: Signal<T>;

  /**
   * An optional `QRL` callback invoked whenever the state value changes.
   * In controlled mode, it notifies the parent to update the external signal.
   * In uncontrolled mode, it acts as a listener for internal state changes.
   */
  onChange$?: QRL<(value: T) => void>;
}

/**
 * The stable interface returned by the `useControllable` hook.
 * It provides a unified way to access the current state and perform updates,
 * abstracting away the complexity of switching between controlled and
 * uncontrolled internal logic.
 */
export interface UseControllableReturnValue<T> {
  /**
   * A readonly signal representing the current state.
   * Provides the value from the `controlledSignal` in controlled mode,
   * or the internal signal in uncontrolled mode.
   */
  state: ReadonlySignal<T>;

  /**
   * A `QRL` function to update the state.
   * In controlled mode, it triggers `onChange$` to request a change from the parent.
   * In uncontrolled mode, it updates the internal signal and then invokes `onChange$`.
   */
  setState$: QRL<(value: T) => void>;

  /**
   * A boolean flag indicating the current management mode.
   * Returns `true` if the state is managed externally via `controlledSignal`,
   * and `false` if managed internally.
   */
  controlled: boolean;
}
