import type {
  CreateAnimationsFinishedParams,
  CreateAnimationsFinishedReturnValue,
} from './create-animations-finished.types';
import { createAnimationFrame } from '../../scheduling/create-animation-frame';
import { flushBeforePaint } from './_internal/flush-before-paint';

/**
 * An internal default fallback strategy for flushing updates synchronously.
 *
 * Executes the provided callback directly without framework-specific batching or flushing overhead.
 * Serves as the standard fallback adapter for `createAnimationsFinished` when no custom `flushUpdate` handler is supplied.
 */
const defaultFlushUpdate = (callback: () => void) => {
  // Directly execute the queued callback function in the current call stack.
  // Bypasses external framework flush adapters when no custom update wrapper is provided.
  callback();
};

/**
 * Creates an isolated, stateful animation lifecycle controller instance.
 *
 * This factory utility provides a robust mechanism for monitoring and reacting to Web Animations API completions on DOM elements.
 * It gracefully handles aborted or replaced animation tracks, supports optional batching before browser paint cycles,
 * and coordinates attribute-based starting style transitions with automatic cancellation capabilities.
 *
 * @example
 * ```ts
 * // Create a standalone animations finished controller instance.
 * const animationsFinished = createAnimationsFinished({
 *   batch: true,
 *   waitForStartingStyleRemoved: true,
 * });
 *
 * const element = document.querySelector<HTMLElement>("#my-element");
 *
 * // Wait for all active animations on the target element to finish.
 * if (element) {
 *   animationsFinished.waitForAnimations({
 *     element,
 *     callback: () => {
 *       console.log("All animations finished!");
 *     },
 *   });
 * }
 *
 * // Cancel any active frame checks or pending callbacks if needed.
 * animationsFinished.cancel();
 * ```
 */
export const createAnimationsFinished = (
  params: CreateAnimationsFinishedParams = {}
): CreateAnimationsFinishedReturnValue => {
  const { batch = false, waitForStartingStyleRemoved = false, flushUpdate = defaultFlushUpdate } = params;

  // Initialize an isolated, stateful animation frame handle.
  // Controls request/cancel cycles for deferring animation execution logic to the next browser repaint.
  const frame = createAnimationFrame();

  const waitForAnimations = (params: {
    element: HTMLElement;
    callback: () => void;
    signal?: AbortSignal | undefined;
  }) => {
    const { element, callback, signal } = params;

    // Cancel any existing pending animation frame request on this controller handle.
    // Prevents stale frame executions when subsequent `waitForAnimations` calls occur.
    frame.cancel();

    // Finalizes the execution flow once all monitored animations settle or finish.
    // Handles routing between immediate unbatched execution and microtask-batched pre-paint flushing.
    const done = () => {
      // Execute the callback synchronously via the flush update wrapper if batching is disabled.
      // Ensures immediate state commit without waiting for microtask coalescing.
      if (!batch) {
        // Synchronously flush the target completion callback using the provided flush handler adapter.
        // Ensures immediate component or state updates without waiting for microtask batching.
        flushUpdate(callback);

        // Early return to exit execution flow immediately after running the unbatched callback.
        // Prevents queuing the callback into the microtask pre-paint flush pipeline.
        return;
      }

      // Schedule callback execution through the microtask pre-paint queue when batching is enabled.
      // Verifies abort signal state prior to invoking the callback during the flush sequence.
      flushBeforePaint({
        callback: () => {
          // Re-evaluate the abort signal state at the exact moment of the pre-paint microtask flush.
          // Protects against executing callbacks that were canceled between scheduling and queue execution.
          if (!signal?.aborted) {
            // Execute the final task callback inside the batched flush wrapper.
            // Triggers the user-defined completion logic safely after verifying active abort status.
            callback();
          }
        },
        flushUpdate,
      });
    };

    // Fallback for environment contexts lacking Web Animations API support.
    // Instantly triggers the completion callback to maintain graceful degradation.
    if (typeof element.getAnimations !== 'function') {
      // Instantly invoke the completion callback via the flush adapter in unsupported DOM environments.
      // Bypasses Web Animations API checks while preserving synchronous frame update behavior.
      flushUpdate(callback);

      // Terminate function execution immediately following the legacy fallback invocation.
      // Prevents further scheduling or execution of animation promises on unsupported elements.
      return;
    }

    // Core execution routine that inspects active Web Animations API promise completions.
    // Handles animation resolution, replacement detection, and re-evaluation loops.
    const exec = () => {
      // Map all active Web Animations instances on the element to their finished promise states.
      // Waits for concurrent animations to resolve or handles promise rejection caused by animation cancellation.
      Promise.all(element.getAnimations().map((animation) => animation.finished)).then(
        () => {
          // Handle successful resolution of all active element animations.
          // Proceeds to final execution if the operation has not been canceled via `AbortSignal`.
          if (!signal?.aborted) {
            // Trigger final execution workflow now that all Web Animations API promises have successfully resolved.
            // Delegates final invocation to the `done` handler to apply batching and flushing logic.
            done();
          }
        },
        () => {
          // Handle rejection triggered when an active animation is canceled or replaced mid-flight.
          // Bails out immediately if the operational lifecycle was explicitly aborted via `AbortSignal`.
          if (signal?.aborted) {
            // Abort promise rejection handling immediately if the active operation signal was canceled.
            // Prevents re-evaluating replacement animations or triggering callbacks on stale controllers.
            return;
          }

          // Inspect the latest snapshot of running animations to verify current playback states.
          // Identifies whether aborted animations were replaced by newly spawned transition tracks.
          const currentAnimations = element.getAnimations();

          // Re-run execution check if new or replacement animations are currently running or pending.
          // Recursively re-subscribes to animation finished promises until all motion completely settles.
          if (currentAnimations.some((animation) => animation.pending || animation.playState !== 'finished')) {
            // Recursively re-initialize the animation promise monitor for newly spawned or pending animations.
            // Continuously tracks active replacement transitions until the target element settles completely.
            exec();

            // Exit current rejection handler loop while waiting for replacement animations to settle.
            // Prevents premature fallthrough to the final completion handler while motion is active.
            return;
          }

          // Complete execution if no active or pending replacement animations remain on the target element.
          // Safely triggers completion when animations cancel without spawning successor transitions.
          done();
        }
      );
    };

    // Branch for handling starting-style transition baseline synchronizations.
    // Delays animation checks until the `[data-starting-style]` attribute is removed from the DOM target.
    if (waitForStartingStyleRemoved) {
      // Defer execution by one frame if the starting-style attribute is already absent.
      // Grants a single frame buffer for entry CSS transitions to register on the element.
      if (!element.hasAttribute('data-starting-style')) {
        // Schedule the core animation check on the next animation frame tick.
        // Gives CSS transitions and animations a single frame window to register their initial state.
        frame.request(exec);

        // Exit execution after scheduling the fallback frame request for starting-style resolution.
        // Prevents setting up an unnecessary DOM MutationObserver on the target element.
        return;
      }

      // Instantiate a DOM MutationObserver to watch for attribute updates on the target element.
      // Waits specifically for the removal of the `[data-starting-style]` attribute before starting checks.
      const attributeObserver = new MutationObserver(() => {
        // Verify if the target starting-style attribute was removed during the observed DOM mutation.
        // Ensures execution continues only after the starting style baseline has been fully stripped.
        if (!element.hasAttribute('data-starting-style')) {
          // Disconnect the mutation observer handle immediately upon detecting attribute removal.
          // Cleans up active DOM listeners to prevent memory leaks and redundant callback triggers.
          attributeObserver.disconnect();

          // Execute the core animation monitoring routine now that starting styles are removed.
          // Begins tracking Web Animations API promises on the updated DOM element state.
          exec();
        }
      });

      // Start observing attribute mutations specifically targeted to `data-starting-style`.
      // Narrows observer scope to minimize layout parsing overhead during DOM mutations.
      attributeObserver.observe(element, {
        // Enable attribute mutation tracking on the target HTML element instance.
        // Instructs the underlying `MutationObserver` to monitor DOM attribute modification events.
        attributes: true,

        // Restrict observation exclusively to changes on the `data-starting-style` attribute.
        // Filters out unrelated DOM attribute updates to maximize layout mutation performance.
        attributeFilter: ['data-starting-style'],
      });

      // Attach a cleanup handler to disconnect the mutation observer if aborted prematurely.
      // Prevents memory leaks and orphaned observer callbacks upon lifecycle cancellation.
      signal?.addEventListener('abort', () => attributeObserver.disconnect(), { once: true });

      // Exit early to await mutation observer notifications before running animation checks.
      // Halts frame scheduling until the starting-style attribute is removed from the DOM.
      return;
    }

    // Defer execution to the next frame to allow CSS transitions and Web Animations to register.
    // Ensures animations triggered in the current tick are captured before promise checking.
    frame.request(exec);
  };

  // Return the controller API exposing the waitForAnimations method and global cancel handle.
  // Provides external consumers with monitoring controls and immediate handle cancellation.
  return { waitForAnimations, cancel: frame.cancel };
};

export namespace createAnimationsFinished {
  /**
   * Represents the configuration parameters required by the `createAnimationsFinished` factory utility.
   *
   * This interface defines the operational options for monitoring web animation lifecycles on DOM elements.
   * It provides configuration flags to control microtask execution batching, attribute mutation synchronization
   * for starting style transitions, and custom synchronous flush adapters.
   */
  export type Params = CreateAnimationsFinishedParams;

  /**
   * Represents the controller API returned by the `createAnimationsFinished` factory utility.
   *
   * This interface defines the operational contract for observing animation completions on specific DOM elements.
   * It provides methods to attach finished listeners to active Web Animations API instances while offering
   * cleanup handle controls to cancel pending scheduled requests.
   */
  export type ReturnValue = CreateAnimationsFinishedReturnValue;
}
