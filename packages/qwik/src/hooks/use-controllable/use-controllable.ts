import type { UseControllableParams, UseControllableReturnValue } from './use-controllable.types';
import { useSignal, $ } from '@qwik.dev/core';
import { isDev } from '@qwik.dev/core/build';
import { fail } from '@/_internal/utilities/fail';

/**
 * A hook that manages state in either controlled or uncontrolled mode.
 *
 * It provides a unified interface for handling state updates, regardless of whether
 * the data is managed internally or by a parent component. This pattern is essential
 * for building flexible UI components that need to support both "set-and-forget"
 * usage and tight integration with external state.
 *
 * State synchronization is handled automatically:
 * - **Controlled**: Uses the provided `controlledSignal` and requests changes via `onChange$`.
 * - **Uncontrolled**: Manages an internal signal initialized by `defaultValue`.
 *
 * @remarks
 * Although `defaultValue` and `controlledSignal` are marked as optional in the type definition,
 * at least one must be provided. If both are `undefined`, the hook throws an error in development
 * mode because it cannot determine the initial state or operating mode.
 */
export const useControllable = <T>(params: UseControllableParams<T> = {}): UseControllableReturnValue<T> => {
  const { defaultValue, controlledSignal, onChange$ } = params;

  // =========================================================================
  // CONTROLLED MODE EXECUTION PATH
  // =========================================================================

  // When `controlledSignal` is explicitly provided, the state authority resides with the parent context.
  // The hook directly exposes the external reference as a readonly view, bypassing any internal tracking mechanisms.
  // Mutational updates are intercepted and delegated upstream via the serialized `onChange$` callback,
  // leaving the ultimate execution track and value resolution entirely to the parent's architectural boundary.
  if (controlledSignal !== undefined) {
    // Encapsulate external change delegation into a `QRL` handler for optimal lazy-loading behavior.
    // This function intercepts local mutation calls and safely dispatches them to the parent context.
    const handleExternalStateChange$ = $((value: T) => {
      // Safely invoke the optional upstream handler to notify the parent of state mutation requests.
      // Operates as an asynchronous trigger without modifying local signal references directly.
      onChange$?.(value);
    });

    return {
      state: controlledSignal,
      setState$: handleExternalStateChange$,
      controlled: true,
    };
  }

  // =========================================================================
  // INVARIANT VERIFICATION (DEVELOPMENT ONLY)
  // =========================================================================

  // Enforce the presence of `defaultValue` to guarantee deterministic internal state initialization.
  // This invariant verification is executed exclusively within development mode to prevent runtime ambiguity
  // without introducing any performance overhead or dead-code artifacts in production bundles.
  if (isDev && defaultValue === undefined) {
    fail([
      `The 'defaultValue' parameter in 'useControllable' hook is required when 'controlledSignal' is not provided.`,
      `Either provide a 'defaultValue' for uncontrolled mode, or pass a 'controlledSignal' for controlled mode.`,
    ]);
  }

  // =========================================================================
  // UNCONTROLLED MODE EXECUTION PATH
  // =========================================================================

  // Allocate an internal reactive signal initialized with the validated default state value.
  // Type-casted safely to `T` after passing the development-mode invariant check above.
  const internalState = useSignal(defaultValue as T);

  // Define the internal state update dispatcher and serialize it into a `QRL` function reference.
  // Handles local signal mutation synchronously while allowing downstream listeners to react.
  const handleInternalStateChange$ = $((value: T) => {
    // Synchronously mutate the internal reactive signal value to trigger UI updates.
    // Keeps internal state aligned with user interactions in uncontrolled mode.
    internalState.value = value;

    // Post-process state change by notifying consumer callbacks if registered in parameters.
    // Enables external side effects while maintaining internal state ownership.
    onChange$?.(value);
  });

  return {
    state: internalState,
    setState$: handleInternalStateChange$,
    controlled: false,
  };
};

export namespace useControllable {
  /**
   * Represents the configuration parameters accepted by the `useControllable` hook.
   *
   * This interface defines the essential options needed to configure dual-mode state management across controlled
   * and uncontrolled execution tracks. It establishes a unified structure for delegating state authority
   * to an external signal or encapsulating internal reactive state, alongside QRL-serialized lifecycle callbacks
   * to synchronize value mutations across architectural boundaries.
   */
  export type Params<T> = UseControllableParams<T>;

  /**
   * Represents the controller API returned by the `useControllable` hook.
   *
   * This interface defines the operational contract for consuming and manipulating state across controlled and uncontrolled
   * execution tracks. It encapsulates a readonly state view, a QRL-serialized mutation dispatcher engineered to execute
   * state transitions, and explicit metadata indicating the active management mode across Qwik's runtime boundaries.
   */
  export type ReturnValue<T> = UseControllableReturnValue<T>;
}
