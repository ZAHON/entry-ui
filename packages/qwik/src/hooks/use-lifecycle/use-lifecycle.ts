import type { UseLifecycleParams } from './use-lifecycle.types';
import { useTask$, $, useOnDocument } from '@qwik.dev/core';
import { isDev, isBrowser } from '@qwik.dev/core/build';
import { error } from '@/_internal/utilities/error';
import { createGlobalUnmountObserver } from './utilities/create-global-unmount-observer';

/**
 * An internal global unmount observer instance used to track DOM element removals across the application.
 *
 * This singleton ensures that all `useLifecycle` hook instances share a single underlying `MutationObserver`,
 * minimizing DOM overhead and memory footprint. It acts as a bridge for server-rendered components,
 * enabling them to seamlessly register cleanup logic upon browser resumption.
 */
const globalUnmountObserver = createGlobalUnmountObserver();

/**
 * A hook that manages component lifecycle events with reliable server-to-browser continuity.
 *
 * This hook addresses Qwik's resumability limitations where server-rendered cleanup closures are not
 * serialized across the network boundary. Unlike `useVisibleTask$`, which forces eager JavaScript execution
 * and degrades performance, `useLifecycle` leverages a centralized `MutationObserver` paired with the
 * `qresume` event to guarantee teardown execution without unnecessary client overhead.
 *
 * Lifecycle synchronization is coordinated through two distinct phases:
 * - **Mounting**: Executes the `onMount$` QRL during the initial `useTask$` scope across both server and client environments.
 * - **Unmounting**: Registers the target `element` reference with a shared global observer upon DOM attachment or application
 * resumption, ensuring `onUnmount$` runs reliably when the node leaves the document tree.
 *
 * @remarks
 * Inspired by and adapted from the `useMountTask$` implementation in the **Qwik Design System (QDS)**.
 * @see {@link https://github.com/kunai-consulting/qwik-design-system/blob/v2-migration/libs/base/src/hooks/use-unmount.tsx QDS use-unmount implementation}
 */
export const useLifecycle = (params: UseLifecycleParams) => {
  const { element, onMount$, onUnmount$ } = params;

  useTask$(async ({ cleanup }) => {
    if (onMount$) {
      try {
        await Promise.resolve(onMount$());
      } catch (err) {
        if (isDev) {
          error([
            `An error occurred during the 'onMount$' lifecycle execution in 'useLifecycle' hook.`,
            `The mount task failed.`,
            `Check your 'onMount$' logic: ${err instanceof Error ? err.message : String(err)}`,
          ]);
        }
      }
    }

    cleanup(async () => {
      if (isBrowser && onUnmount$) {
        const elementRef = element.value;

        if (elementRef) {
          globalUnmountObserver.remove({ element: elementRef, qrl: onUnmount$ });
        }

        try {
          await Promise.resolve(onUnmount$());
        } catch (err) {
          if (isDev) {
            error([
              `An error occurred during the 'onUnmount$' lifecycle execution in 'useLifecycle'.`,
              `The cleanup task failed.`,
              `Check your 'onUnmount$' logic: ${err instanceof Error ? err.message : String(err)}`,
            ]);
          }
        }
      }
    });
  });

  useOnDocument(
    'qresume',
    $(() => {
      if (onUnmount$) {
        const elementRef = element.value;

        if (elementRef) {
          globalUnmountObserver.add({ element: elementRef, qrl: onUnmount$ });
        }
      }
    })
  );
};

export namespace useLifecycle {
  /**
   * Represents the configuration parameters accepted by the `useLifecycle` hook.
   *
   * This interface defines the essential options needed to establish reliable lifecycle synchronization
   * across the server-to-browser continuity gap. It establishes a unified structure for binding target DOM
   * node references to global mutation tracking and registering serialized initialization and teardown
   * callbacks that safeguard against lost cleanup during component unmounting.
   */
  export type Params = UseLifecycleParams;
}
