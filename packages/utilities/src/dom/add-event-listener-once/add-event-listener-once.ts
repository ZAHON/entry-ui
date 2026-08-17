import type { AllEventMaps, AddEventListenerOnceParams } from './add-event-listener-once.types';

/**
 * Registers an event listener that is automatically removed after its first invocation.
 *
 * This utility wraps the native `addEventListener` method and enforces the `once: true`
 * option. It provides a clean way to handle one-time events while returning a manual
 * cleanup function, which can be used to remove the listener before it even fires.
 * It is fully type-safe, supporting event maps for `HTMLElement`, `Document`, and `Window`.
 *
 * @example
 * ```ts
 * const cleanup = addEventListenerOnce({
 * 	target: window,
 * 	type: "scroll",
 * 	listener: (event) => console.log("First scroll detected!"", event),
 * 	options: { passive: true },
 * });
 *
 * cleanup(); // If the listener is no longer needed before the first scroll.
 * ```
 */
export const addEventListenerOnce = <K extends keyof AllEventMaps>(params: AddEventListenerOnceParams<K>) => {
  const { target, type, listener, options } = params;

  const eventOptions = { ...options, once: true };

  target.addEventListener(type, listener as EventListenerOrEventListenerObject, eventOptions);

  const cleanup = () => {
    target.removeEventListener(type, listener as EventListenerOrEventListenerObject, eventOptions);
  };

  return cleanup;
};
