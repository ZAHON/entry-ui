/**
 * Represents the state of a Qwik event within the Entry UI Qwik system.
 *
 * This type is a specialized version of the event object that includes only the
 * state flag. It is typically used in internal component handlers to check
 * if a previous handler in the execution chain has requested to prevent
 * the default Entry UI Qwik logic.
 */
export type EntryUIQwikEventState<EV extends Event> = EV & {
  /**
   * Indicates whether the internal Entry UI Qwik logic has been prevented for this event.
   * When `true`, it signals that a consumer or a preceding handler has invoked
   * the prevention mechanism, and the current handler should likely skip
   * its default state updates or behaviors.
   */
  readonly entryUIQwikHandlerPrevented?: boolean;
};
