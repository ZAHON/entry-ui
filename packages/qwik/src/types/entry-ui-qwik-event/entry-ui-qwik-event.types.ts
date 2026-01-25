/**
 * Represents a Qwik event augmented with Entry UI Qwik's custom prevention logic.
 *
 * This type extends the standard DOM event with additional methods and properties
 * that allow for granular control over internal component handlers within the
 * Entry UI Qwik library.
 */
export type EntryUIQwikEvent<EV extends Event> = EV & {
  /**
   * Prevents the internal Entry UI Qwik handler from executing for this event.
   * When called, this method sets the `entryUIQwikHandlerPrevented` flag to `true`.
   * Use this when you want to handle the event manually in a consumer-provided
   * handler and prevent the component's default state updates or logic from firing.
   */
  preventEntryUIQwikHandler: () => void;

  /**
   * Indicates whether the internal Entry UI Qwik logic has been prevented for this event.
   * This property is read-only and is typically checked by internal component
   * handlers to determine if they should skip their default execution logic.
   */
  readonly entryUIQwikHandlerPrevented?: boolean;
};
