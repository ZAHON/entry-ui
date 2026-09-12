import type { UseTimeoutReturnValue } from './use-timeout.types';
import type { NoSerialize, QRL } from '@qwik.dev/core';
import { useSignal, useTask$, $, noSerialize } from '@qwik.dev/core';
import { isBrowser, isDev, isServer } from '@qwik.dev/core/build';
import { createTimeout } from '@entry-ui/utilities/create-timeout';
import { fail } from '@/_internal/utilities/fail';

/**
 * A hook that provides a reactive controller for scheduling and managing delayed callbacks.
 *
 * This hook encapsulates isolated, stateful timer logic, exposing `QRL` functions to schedule,
 * cancel, and inspect timeouts safely across Qwik's runtime boundaries. It provides a deterministic
 * execution model that automatically handles single-timer statefulness, ensuring that scheduling
 * a new timeout automatically clears any pending operations.
 *
 * It manages automatic cleanup upon component unmounting to prevent memory leaks and dangling background
 * execution. Built with SSR-safety in mind, the hook includes development-time checks to ensure that
 * browser-native timer scheduling operations are strictly invoked within client-side environments.
 */
export const useTimeout = (): UseTimeoutReturnValue => {
  // Store a non-serialized reference to the internal `createTimeout` controller instance.
  // Using `NoSerialize` prevents Qwik from attempting to serialize the browser-native timer handle.
  const timeout = useSignal<NoSerialize<createTimeout.ReturnValue>>(undefined);

  // Set up a reactive task to manage automatic lifecycle cleanup procedures upon component unmount.
  // It guarantees that any active client-side timer is canceled and cleared when the component unmounts.
  useTask$(({ track, cleanup }) => {
    // Track the internal timeout signal to register lifecycle handlers whenever the timer state changes.
    // This ensures that cleanup registration stays synchronized with the active controller instance.
    track(timeout);

    // Verify execution in the browser environment before attaching unmount cleanup logic.
    // Clears active timers and resets the signal container to prevent dangling background executions.
    if (isBrowser && timeout.value) {
      // Register a cleanup handler that executes when the component unmounts.
      // This guarantees proper resource disposal and prevents dangling timer operations in the background.
      cleanup(() => {
        // Evaluate whether the timer reference remains active during component teardown execution.
        // Safely cancels the active timer and clears the signal reference to avoid memory leaks.
        if (timeout.value) {
          // Invoke the cancellation method on the encapsulated timer instance to stop pending execution.
          // This immediately halts any scheduled callbacks before cleaning up internal references.
          timeout.value.clear();

          // Reset the signal reference to `undefined` to mark the timer as disposed and inactive.
          // Restores the internal state to idle and allows future lazy-initialization when needed.
          timeout.value = undefined;
        }
      });
    }
  });

  const start$ = $((params: { callback: QRL<() => unknown>; delayMs: number }) => {
    // Validate that timer scheduling operations are not executed during server-side rendering.
    // Throws a descriptive development error if invoked on the server to enforce client-only execution
    if (isDev && isServer) {
      fail([
        `The 'start$' QRL function from the 'useTimeout' hook cannot be called during server-side rendering (SSR).`,
        `Timer scheduling operations rely on browser-native setTimeout APIs that are not supported on the server.`,
        `Ensure this function is only invoked within client-side event handlers or browser-only tasks.`,
      ]);
    }

    // Guard execution to ensure that timer creation and scheduling only occur in browser environments.
    // Lazy-initializes the underlying controller instance if absent, then schedules target execution.
    if (isBrowser) {
      // Lazy-initializes and retrieves the encapsulated `createTimeout` controller instance.
      // Wraps the created controller in `noSerialize` to keep non-serializable handle refs browser-safe.
      const getTimeout = () => {
        // Evaluate whether the reactive `timeout` container holds an initialized timer controller instance.
        // Triggers initial creation when invoked for the first time during the component lifecycle.
        if (!timeout.value) {
          // Instantiate the timer controller and wrap it with `noSerialize` for safe signal storage.
          // Prevents Qwik's serialization engine from processing non-serializable browser handle states.
          timeout.value = noSerialize(createTimeout());
        }

        // Return the active controller instance, asserting non-nullability after initial creation.
        // Grants direct access to the underlying timer scheduling and cleanup operations.
        return timeout.value!;
      };

      // Trigger the underlying timer scheduling routine with the provided callback and delay.
      // Clears any previously running execution automatically to enforce single-active-timer guarantees.
      getTimeout().start(params);
    }
  });

  const clear$ = $(() => {
    // Validate that timer cancellation operations are not executed during server-side rendering.
    // Throws a descriptive development error if invoked on the server to prevent invalid execution.
    if (isDev && isServer) {
      fail([
        `The 'clear$' QRL function from the 'useTimeout' hook cannot be called during server-side rendering (SSR).`,
        `Timer cancellation operations require direct access to active client-side handles.`,
        `Ensure this function is only invoked within browser environments or user interaction events.`,
      ]);
    }

    // Verify browser context and check if an active timer instance exists before clearing.
    // Triggers immediate cancellation on the underlying controller to halt pending executions.
    if (isBrowser && timeout.value) {
      // Execute the immediate clear sequence on the active timer controller instance.
      // Aborts any scheduled callbacks and updates internal state tracking to idle.
      timeout.value.clear();
    }
  });

  const isStarted$ = $(() => {
    // Check if the timer controller instance has been initialized inside the reactive signal.
    // Delegates to the controller's `isStarted` method, or defaults to `false` if idle.
    if (timeout.value) {
      // Query the internal timer controller to check whether an execution is currently pending.
      // Returns `true` if a timer cycle is in progress, or `false` if idle or completed.
      return timeout.value.isStarted();
    }

    // Return `false` as a fallback when no timer controller instance has been created yet.
    // Indicates to consumers that no execution is currently scheduled or pending execution.
    return false;
  });

  // Return the public controller API containing `QRL` dispatchers for starting, clearing, and checking status.
  // Exposes serializable operation handles while safely encapsulating internal timer state execution.
  return { start$, clear$, isStarted$ };
};

export namespace useTimeout {
  /**
   * Represents the controller API returned by the `useTimeout` hook.
   *
   * This interface defines the operational contract for scheduling, canceling, and inspecting delayed task executions
   * within Qwik's reactive runtime. It encapsulates a suite of QRL-serialized methods that safely wrap an underlying
   * client-side timer controller, ensuring proper lifecycle cleanup and server-side safety across execution boundaries.
   */
  export type ReturnValue = UseTimeoutReturnValue;
}
