/**
 * Represents the configuration parameters required by the internal `flushBeforePaint` utility.
 *
 * This interface defines the essential execution callback and rendering flush mechanism needed to synchronize
 * DOM mutations before the browser's next paint cycle. It prevents intermediate visual frames by batching
 * callbacks that resolve within the same microtask into a single synchronous update.
 */
export interface FlushBeforePaintParams {
  /**
   * The function to execute once the animation sequence or specific task completes.
   * Contains the state updates or DOM mutations that must be committed synchronously
   * before the browser paints the next frame.
   */
  callback: () => void;

  /**
   * A framework-agnostic update mechanism that forces a synchronous layout or state flush.
   * Serves as an adapter (e.g., wrapping React's `ReactDOM.flushSync`) to execute the batched
   * callbacks, ensuring they are committed together immediately in a single execution context.
   */
  flushUpdate: (batch: () => void) => void;
}
