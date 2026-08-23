/**
 * Represents the configuration parameters required by the `addEventListener` utility.
 *
 * This interface defines the payload fields necessary to attach a type-safe event listener
 * to a DOM `Element`, `Document`, `Window`, or `SVGElement`, while automatically inferring
 * the correct event type.
 */
export interface AddEventListenerParams<
  T extends EventTarget,
  K extends AddEventListenerLiteralUnion<Extract<keyof AddEventListenerEventMapOf<T>, string>>,
> {
  /**
   * The target DOM node or object (such as `Window`, `Document`, `HTMLElement`, or `SVGElement`)
   * to which the event listener will be attached.
   */
  target: T;

  /**
   * A case-sensitive string representing the event type to listen for
   * (e.g., `"click"`, `"keydown"`, `"resize"`). Provides autocompletion for standard events
   * while accepting custom event names.
   */
  type: K;

  /**
   * The callback function triggered when the specified event occurs.
   * Automatically receives a strongly-typed event object inferred from the `target` and event `type`.
   */
  listener: K extends keyof AddEventListenerEventMapOf<T>
    ? (this: T, ev: AddEventListenerEventMapOf<T>[K]) => void
    : (ev: Event) => void;

  /**
   * An optional configuration object or boolean flag that specifies characteristics
   * about the event `listener` (e.g., `capture`, `once`, `passive`).
   *
   * @default undefined
   */
  options?: boolean | AddEventListenerOptions | undefined;
}

/**
 * Maps a given DOM `EventTarget` type to its corresponding event map interface.
 *
 * Resolves specific event maps for `Window`, `Document`, `HTMLElement`, and `SVGElement`,
 * falling back to a generic event record for custom or unmapped targets.
 */
export type AddEventListenerEventMapOf<T extends EventTarget> = T extends Window
  ? WindowEventMap
  : T extends Document
    ? DocumentEventMap
    : T extends HTMLElement
      ? HTMLElementEventMap
      : T extends SVGElement
        ? SVGElementEventMap
        : Record<string, Event>;

/**
 * Provides autocompletion for a string literal union while allowing arbitrary strings.
 *
 * Preserves IDE IntelliSense suggestions for known event names without restricting
 * the input type strictly to those literals.
 */
export type AddEventListenerLiteralUnion<T extends string> = T | (string & Record<never, never>);
