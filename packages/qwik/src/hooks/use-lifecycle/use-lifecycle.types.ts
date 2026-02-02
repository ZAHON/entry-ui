import type { SignalOrReadonlySignal } from '@/types';
import type { QRL } from '@qwik.dev/core';

/**
 * Configuration parameters for the `useLifecycle` hook.
 */
export interface UseLifecycleParams {
  /**
   * A signal containing the reference to the target element.
   * This reference is essential for the global unmount observer to track the
   * element's presence in the DOM. It ensures that the unmount logic is
   * correctly associated with the specific node, enabling reliable detection
   * of its removal even across the server-to-browser boundary.
   */
  element: SignalOrReadonlySignal<HTMLElement | undefined | null>;

  /**
   * A `QRL` function executed when the component is first initialized or mounted.
   * Unlike standard effects, this callback is designed to run within the `useTask$`
   * scope, allowing for consistent initialization logic across both server and client
   * environments.
   *
   * @default undefined
   */
  onMount$?: QRL<() => void> | QRL<() => Promise<void>>;

  /**
   * A `QRL` function executed when the element is removed from the DOM.
   * This callback is the primary solution for the "lost cleanup" problem in Qwik.
   * It is reliably triggered by a `MutationObserver` when the associated `element`
   * leaves the document tree.
   *
   * @default undefined
   */
  onUnmount$?: QRL<() => void> | QRL<() => Promise<void>>;
}
