/**
 * Represents the configuration parameters required by the internal `runIfHandlerNotPrevented` utility.
 *
 * This interface defines the essential input structure needed to evaluate the internal
 * prevention state of an Entry UI Qwik event. It enforces type safety and intent clarity
 * across generic event types by pairing the target event payload with the conditional execution callback.
 */
export interface RunIfHandlerNotPreventedParams<EV extends Event> {
  /**
   * The event object to inspect for the internal prevention flag (`entryUIQwikHandlerPrevented`).
   * Can be a standard DOM event or an event augmented by `makeEventPreventable`.
   */
  event: EV;

  /**
   * The callback function to execute if the internal Entry UI Qwik handler logic
   * has not been prevented by a preceding handler in the execution chain.
   */
  callback: () => void;
}
