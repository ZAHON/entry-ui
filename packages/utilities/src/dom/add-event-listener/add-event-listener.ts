import type {
  AddEventListenerParams,
  AddEventListenerEventMapOf,
  AddEventListenerLiteralUnion,
} from './add-event-listener.types';

/**
 * Attaches an event listener to a target DOM node and returns a cleanup function to remove it.
 *
 * This utility simplifies event listener management by providing strong TypeScript inference
 * for event objects across `Element`, `Document`, `Window`, and `SVGElement` targets.
 * The returned function can be executed directly to detach the listener, preventing memory leaks.
 *
 * @example
 * ```ts
 * // Attaching a window resize listener with passive options.
 * const cleanup = addEventListener({
 *   target: window,
 *   type: "resize",
 *   listener: () => {
 *     console.log("Window dimensions:", window.innerWidth, window.innerHeight);
 *   },
 *   options: { passive: true },
 * });
 *
 * // Easily remove the listener when cleaning up.
 * cleanup();
 * ```
 */
export const addEventListener = <
  T extends EventTarget,
  K extends AddEventListenerLiteralUnion<Extract<keyof AddEventListenerEventMapOf<T>, string>>,
>(
  params: AddEventListenerParams<T, K>
) => {
  const { target, type, listener, options } = params;

  // Bind the provided `listener` function to the specified `target` event.
  // Cast `listener` as `EventListener` to bridge generic TypeScript event signatures with the DOM API.
  target.addEventListener(type, listener as EventListener, options);

  // Return a dedicated teardown callback function to simplify event listener cleanup.
  // This allows callers to conveniently unbind the handler without needing to preserve original arguments.
  return () => {
    // Remove the registered `listener` from the `target` node using identical event parameters.
    // Executing this prevents event listener accumulation and ensures proper resource disposal.
    target.removeEventListener(type, listener as EventListener, options);
  };
};

export namespace addEventListener {
  /**
   * Represents the configuration parameters required by the `addEventListener` utility.
   *
   * This interface defines the payload fields necessary to attach a type-safe event listener
   * to a DOM `Element`, `Document`, `Window`, or `SVGElement`, while automatically inferring
   * the correct event type.
   */
  export type Params<
    T extends EventTarget,
    K extends AddEventListenerLiteralUnion<Extract<keyof AddEventListenerEventMapOf<T>, string>>,
  > = AddEventListenerParams<T, K>;

  /**
   * Maps a given DOM `EventTarget` type to its corresponding event map interface.
   *
   * Resolves specific event maps for `Window`, `Document`, `HTMLElement`, and `SVGElement`,
   * falling back to a generic event record for custom or unmapped targets.
   */
  export type EventMapOf<T extends EventTarget> = AddEventListenerEventMapOf<T>;

  /**
   * Provides autocompletion for a string literal union while allowing arbitrary strings.
   *
   * Preserves IDE IntelliSense suggestions for known event names without restricting
   * the input type strictly to those literals.
   */
  export type LiteralUnion<T extends string> = AddEventListenerLiteralUnion<T>;
}
