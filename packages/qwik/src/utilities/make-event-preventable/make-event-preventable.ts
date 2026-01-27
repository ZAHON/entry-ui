import type { EntryUIQwikEvent } from '@/types';

/**
 * Augments a standard event with internal handler prevention capabilities.
 *
 * This utility function transforms a standard event object into an `EntryUIQwikEvent`.
 * It adds a `preventEntryUIQwikHandler` method, allowing developers to flag
 * an event during its execution. This flag can then be checked by subsequent
 * handlers in any Qwik event chain (such as `onClick$`, `onKeyDown$`, or `onInput$`)
 * to determine if the internal component logic should be bypassed.
 *
 * It is particularly useful when a consumer needs to intercept an event and
 * conditionally prevent the component's default behavior or state updates
 * (like toggling a state or closing a dialog) without necessarily stopping
 * native event propagation or other DOM-level behaviors.
 *
 * When `preventEntryUIQwikHandler()` is called:
 * - The internal property `entryUIQwikHandlerPrevented` is set to `true`.
 * - Subsequent handlers in the event array can verify this flag to skip their logic.
 */
export const makeEventPreventable = <EV extends Event>(event: EV) => {
  const entryUIQwikEvent = event as EntryUIQwikEvent<typeof event>;

  entryUIQwikEvent.preventEntryUIQwikHandler = () => {
    (entryUIQwikEvent.entryUIQwikHandlerPrevented as boolean) = true;
  };

  return entryUIQwikEvent;
};
