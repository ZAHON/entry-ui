import type { UseScrollLockReturnValue } from './use-scroll-lock.types';
import type { QRL } from '@qwik.dev/core';
import { useSignal, useTask$, $ } from '@qwik.dev/core';
import { isDev, isServer, isBrowser } from '@qwik.dev/core/build';
import { getScrollLocker } from '@entry-ui/utilities/get-scroll-locker';
import { fail } from '@/_internal/utilities/fail';
import { resolveQrl } from '@/utilities/resolve-qrl';

/**
 * A hook that provides a reactive interface for managing background scroll locking.
 *
 * This hook facilitates the management of document scrolling, which is essential
 * for maintaining focus and preventing background movement when overlays, modals,
 * or drawers are active. It coordinates scroll prevention across concurrent UI
 * components and application runtime execution contexts.
 *
 * It accepts an optional `getDocumentViewportContext$` of type `QRL` that resolves
 * to specific `Window` and `Document` contexts, as well as `<html>` and `<body>` elements,
 * making it fully compatible with isolated environments such as iframes. The hook is built
 * with SSR-safety in mind, including development-time checks to ensure that DOM-dependent
 * locking operations are only triggered in the browser environment.
 */
export const useScrollLock = (
  getDocumentViewportContext$?:
    | QRL<() => { win: typeof window; doc: Document; html: HTMLElement; body: HTMLElement }>
    | undefined
): UseScrollLockReturnValue => {
  // Initialize a signal to store the current cleanup release callback.
  // This signal tracks active scroll lock state across component lifecycle updates.
  const release = useSignal<(() => void) | undefined>(undefined);

  // Set up a reactive task to handle automatic unmount cleanup procedures.
  // It ensures that any active scroll lock is safely released when the component unmounts.
  useTask$(({ track, cleanup }) => {
    // Track changes to the release signal value to register or update cleanup handlers.
    // This guarantees that the task re-evaluates whenever the scroll lock state changes.
    track(() => release.value);

    // Verify that execution occurs in the browser environment and an active lock exists.
    // If conditions are met, register a cleanup callback for component unmounting.
    if (isBrowser && release.value) {
      cleanup(() => {
        // Check if the release callback is still present during unmount execution.
        // Invoke the release function and reset the signal value to clean up state safely.
        if (release.value) {
          release.value();
          release.value = undefined;
        }
      });
    }
  });

  const lock$ = $(async () => {
    if (isDev && isServer) {
      fail([
        `The 'lock$' QRL function from the 'useScrollLock' hook cannot be called during server-side rendering (SSR).`,
        `Scroll locking operations require direct DOM access and visual viewport calculations.`,
        `Ensure this function is only invoked within a browser-only task or user event.`,
      ]);
    }

    // Set up the default global window and document context parameters.
    // These defaults serve as fallback values when no custom viewport context `QRL` is provided.
    let documentViewportContext = {
      win: window,
      doc: document,
      html: document.documentElement,
      body: document.body,
    };

    // Check if a custom document viewport context QRL has been provided by the consumer.
    // If available, attempt to resolve and execute it asynchronously to target specific viewports.
    if (getDocumentViewportContext$) {
      try {
        const getDocumentViewportContext = await resolveQrl(getDocumentViewportContext$);

        documentViewportContext = getDocumentViewportContext();
      } catch {
        // Fall back to the default global document and viewport context
        // if resolving or executing the custom `QRL` fails, ensuring safe execution.
      }
    }

    // Acquire the scroll lock using the resolved document and viewport context.
    // Store the returned release callback inside the reactive signal state.
    release.value = getScrollLocker().acquire(documentViewportContext);
  });

  const unlock$ = $(() => {
    if (isDev && isServer) {
      fail([
        `The 'unlock$' QRL function from the 'useScrollLock' hook cannot be called during server-side rendering (SSR).`,
        `Style restoration and cleanup operations are only applicable in the browser environment.`,
      ]);
    }

    // Check if an active release callback exists within the signal reference.
    // If present, invoke the cleanup handler to restore styles and reset the signal state.
    if (release.value) {
      release.value();
      release.value = undefined;
    }
  });

  // Return the encapsulated `lock$` and `unlock$` execution handles.
  // These `QRL` functions provide the primary public interface for consumers of the hook.
  return { lock$, unlock$ };
};

export namespace useScrollLock {
  /**
   * Represents the controller API returned by the `useScrollLock` hook.
   *
   * This interface defines the operational contract for managing background document scrolling and layout continuity.
   * It encapsulates QRL-serialized command dispatchers engineered to toggle layout interaction, manipulate document
   * viewport styling, inject layout-shift mitigation variables, and resolve platform-specific scroll boundaries
   * across Qwik's runtime boundaries.
   */
  export type ReturnValue = UseScrollLockReturnValue;
}
