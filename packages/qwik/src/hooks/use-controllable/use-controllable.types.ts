import type { Signal, QRL } from '@qwik.dev/core';

/**
 * Represents the configuration parameters accepted by the `useControllable` hook.
 *
 * This interface defines the essential options needed to configure dual-mode state management across controlled
 * and uncontrolled execution tracks. It establishes a unified structure for delegating state authority
 * to an external signal or encapsulating internal reactive state, alongside QRL-serialized lifecycle callbacks
 * to synchronize value mutations across architectural boundaries.
 */
export interface UseControllableParams<T> {
  /**
   * The initial value used when the component is in uncontrolled mode.
   * This value is only used to initialize the internal state if `controlledSignal` is not provided.
   */
  defaultValue?: T | undefined;

  /**
   * An optional external signal for controlled state management.
   * If provided, the hook operates in controlled mode, delegating state authority to the parent.
   * If omitted, the hook operates in uncontrolled mode using internal state.
   */
  controlledSignal?: Signal<T> | undefined;

  /**
   * An optional `QRL` callback invoked whenever the state value changes.
   * In controlled mode, it notifies the parent to update the external signal.
   * In uncontrolled mode, it acts as a listener for internal state changes.
   */
  onChange$?: QRL<(value: T) => void> | undefined;
}

/**
 * Represents the controller API returned by the `useControllable` hook.
 *
 * This interface defines the operational contract for consuming and manipulating state across controlled and uncontrolled
 * execution tracks. It encapsulates a readonly state view, a QRL-serialized mutation dispatcher engineered to execute
 * state transitions, and explicit metadata indicating the active management mode across Qwik's runtime boundaries.
 */
export interface UseControllableReturnValue<T> {
  /**
   * A readonly signal representing the current state.
   * Provides the value from the `controlledSignal` in controlled mode,
   * or the internal signal in uncontrolled mode.
   */
  state: Readonly<Signal<T>>;

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
