/**
 * Represents the configuration parameters required by the `createAnimationsFinished` factory utility.
 *
 * This interface defines the operational options for monitoring web animation lifecycles on DOM elements.
 * It provides configuration flags to control microtask execution batching, attribute mutation synchronization
 * for starting style transitions, and custom synchronous flush adapters.
 */
export interface CreateAnimationsFinishedParams {
  /**
   * Determines whether completion callbacks resolving within the same microtask checkpoint should be coalesced into a single commit.
   * When enabled, callbacks execute together before the browser paints, preventing redundant
   * re-renders and visual flickering across concurrent updates.
   *
   * @default false
   */
  batch?: boolean | undefined;

  /**
   * Indicates whether execution should wait for the `[data-starting-style]` attribute to be removed from the element.
   * Ensures that initial entry styles and transition baseline attributes settle prior to evaluating active element animations.
   *
   * @default false
   */
  waitForStartingStyleRemoved?: boolean | undefined;

  /**
   * A custom adapter for flushing state updates or DOM mutations synchronously.
   * Delegates execution to framework-specific flush wrappers (e.g., `ReactDOM.flushSync`) to guarantee immediate,
   * synchronous updates before the next browser paint cycle.
   *
   * @default undefined
   */
  flushUpdate?: ((callback: () => void) => void) | undefined;
}

/**
 * Represents the controller API returned by the `createAnimationsFinished` factory utility.
 *
 * This interface defines the operational contract for observing animation completions on specific DOM elements.
 * It provides methods to attach finished listeners to active Web Animations API instances while offering
 * cleanup handle controls to cancel pending scheduled requests.
 */
export interface CreateAnimationsFinishedReturnValue {
  /**
   * Waits for all active Web Animations API instances running on the specified element to reach a finished state.
   * Safely handles replaced or aborted animations, respects lifecycle `AbortSignal` cancellation, and executes
   * the provided callback once all motion phases settle.
   */
  waitForAnimations: (params: { element: HTMLElement; callback: () => void; signal?: AbortSignal | undefined }) => void;

  /**
   * Immediately cancels any pending frame requests or active animation monitoring routines.
   * Cleans up scheduled timers to prevent stale execution callbacks when unmounting or resetting context.
   */
  cancel: () => void;
}
