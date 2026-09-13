import type { RunIfHandlerNotPreventedParams } from './run-if-handler-not-prevented.types';
import type { EntryUIQwikEventState } from '@/types';

/**
 * An internal utility used for conditionally executing callback logic based on the prevention state of an event.
 *
 * It inspects the provided event for the `entryUIQwikHandlerPrevented` flag, executing the callback only when
 * internal component logic has not been explicitly prevented by a preceding handler.
 *
 * This utility is designed for internal library use to simplify conditional event handling, maintain uniform
 * execution checks, and streamline component state updates within the Entry UI Qwik ecosystem.
 */
export const runIfHandlerNotPrevented = <EV extends Event>(params: RunIfHandlerNotPreventedParams<EV>) => {
  const { event, callback } = params;

  // Cast the incoming generic DOM event to access the optional internal
  // Entry UI Qwik prevention state flag without mutating the event.
  const entryUIQwikEvent = event as EntryUIQwikEventState<EV>;

  // Proceed only if the internal handler prevention flag has not been set to `true`,
  // indicating that preceding handlers allowed default component logic to execute.
  if (!entryUIQwikEvent.entryUIQwikHandlerPrevented) {
    // Execute the provided callback function to perform default internal state
    // updates or behaviors associated with this specific event handler.
    callback();
  }
};
