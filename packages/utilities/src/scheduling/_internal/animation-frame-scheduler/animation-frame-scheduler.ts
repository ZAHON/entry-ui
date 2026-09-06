import { createAnimationFrameScheduler } from '../create-animation-frame-scheduler';

/**
 * An internal process-global instance of the batched animation frame scheduler.
 *
 * Coordinates execution across all standalone `createAnimationFrame` handles,
 * batching individual callbacks into unified browser frame ticks to maximize
 * rendering performance and avoid layout thrashing.
 */
let animationFrameScheduler = createAnimationFrameScheduler();

/**
 * An internal utility that retrieves and returns the current process-global animation frame scheduler instance.
 *
 * This utility serves as the core access point for standalone `createAnimationFrame` factory instances,
 * allowing them to register and cancel frame requests within a shared batch queue. By centralizing
 * scheduler access, it ensures that all individual frame requests across the application are batched
 * into unified browser frame ticks, optimizing rendering performance and preventing layout thrashing.
 */
export const getAnimationFrameScheduler = () => {
  // Access the current process-global scheduler instance reference stored in module scope.
  // Returns the active scheduler controller object to allow queuing and managing animation frames.
  return animationFrameScheduler;
};

/**
 * An internal utility that replaces the current process-global animation frame scheduler instance with a new one.
 *
 * This utility is designed primarily for testing environments, allowing test suites to inject custom or
 * mock schedulers (or reset the state completely). By enabling scheduler substitution, it prevents state
 * pollution and cascading side effects across asynchronous tests where leftover pending callbacks from
 * previous test suites could otherwise persist and execute unexpectedly against a stale context.
 */
export const setAnimationFrameScheduler = (scheduler: typeof animationFrameScheduler) => {
  // Assign the newly provided scheduler instance reference to the module-scoped global variable.
  // Updates the active reference so subsequent operations target the new scheduler context.
  animationFrameScheduler = scheduler;
};
