import type { Signal, QRL } from '@qwik.dev/core';

/**
 * Represents the configuration parameters accepted by the `useLifecycle` hook.
 *
 * This interface defines the essential options needed to establish reliable lifecycle synchronization
 * across the server-to-browser continuity gap. It establishes a unified structure for binding target DOM
 * node references to global mutation tracking and registering serialized initialization and teardown
 * callbacks that safeguard against lost cleanup during component unmounting.
 */
export interface UseLifecycleParams {
  /**
   * A signal holding the reference to the target DOM element.
   * Provides the central node binding monitored by the global unmount observer to track presence
   * within the document tree, enabling reliable detachment detection and lifecycle synchronization
   * across the server-to-browser boundary.
   */
  element: Signal<HTMLElement | undefined> | Readonly<Signal<HTMLElement | undefined>>;

  /**
   * A `QRL` function executed during component initialization or DOM attachment.
   * Invoked within the `useTask$` execution scope to provide consistent setup and initialization
   * logic across both server-side rendering and client-side execution contexts.
   *
   * @default undefined
   */
  onMount$?: QRL<() => void> | QRL<() => Promise<void>> | undefined;

  /**
   * A `QRL` function executed when the target element is detached from the DOM.
   * Triggered by the centralized `MutationObserver` when the associated element leaves the document tree,
   * offering a resilient solution to Qwik's "lost cleanup" problem across component boundaries.
   *
   * @default undefined
   */
  onUnmount$?: QRL<() => void> | QRL<() => Promise<void>> | undefined;
}
