/**
 * A comprehensive union of all standard event maps available in the browser environment.
 *
 * This type aggregates event definitions from `HTMLElement`, `Document`, and `Window`
 * into a single unified interface. It is used to provide exhaustive type safety and
 * accurate IntelliSense during event registration, ensuring that the event object
 * signature is correctly inferred based on the target and event type.
 */
export type AllEventMaps = HTMLElementEventMap & DocumentEventMap & WindowEventMap;

/**
 * Configuration object for the `addEventListenerOnce` utility.
 *
 * This interface defines the necessary properties to register a one-time event listener.
 * It uses a generic type `K` constrained to `AllEventMaps` to ensure that the event
 * type and its corresponding listener remain synchronized and type-safe across
 * different DOM targets.
 */
export interface AddEventListenerOnceParams<K extends keyof AllEventMaps> {
  /**
   * The DOM node or global object to which the event listener will be attached.
   * Supports `HTMLElement`, `Document`, and `Window` targets.
   */
  target: HTMLElement | Document | Window;

  /**
   * A case-sensitive string representing the event type to monitor.
   * The available types are dynamically inferred based on the `target` category.
   */
  type: K;

  /**
   * The callback function executed when the event is dispatched.
   * It receives a strictly typed event object corresponding to the provided event `type`.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (this: HTMLElement | Document | Window, ev: AllEventMaps[K]) => any;

  /**
   * An optional configuration object that specifies characteristics about the event listener.
   * While most native options are supported, the `once` property is internally enforced
   * as `true` and cannot be overridden to ensure the utility's one-time execution behavior.
   */
  options?: Omit<AddEventListenerOptions, 'once'>;
}
