import type { UseScrollLockReturnValue } from './use-scroll-lock.types';
import type { QRL } from '@qwik.dev/core';
import { useSignal, $ } from '@qwik.dev/core';
import { isDev, isServer, isBrowser } from '@qwik.dev/core';
import { fail } from '@/_internal/utilities/fail';
import { preventBodyScroll } from '@entry-ui/utilities/prevent-body-scroll';

/**
 * A hook that provides a reactive interface for managing background scroll locking.
 *
 * This hook facilitates the management of document scrolling, which is essential
 * for maintaining focus and preventing background movement when overlays, modals,
 * or drawers are active. It automatically compensates for scrollbar width to
 * prevent horizontal layout shifts and implements specialized strategies for
 * mobile environments where standard overflow rules may be ignored.
 *
 * It accepts an optional `resolveDocument$` of type `QRL` to target specific
 * document contexts, such as iframes. The hook is built with SSR-safety in mind,
 * including development-time checks to ensure that DOM-dependent locking
 * operations are only triggered in the browser environment.
 */
export const useScrollLock = (resolveDocument$?: QRL<() => Document>): UseScrollLockReturnValue => {
  const cleanup = useSignal<(() => void) | undefined>(undefined);

  const lock$ = $(async () => {
    if (isDev && isServer) {
      fail([
        `The 'lock$' QRL function from the 'useScrollLock' hook cannot be called during server-side rendering (SSR).`,
        `Scroll locking operations require direct DOM access and visual viewport calculations.`,
        `Ensure this function is only invoked within a browser-only task or user event.`,
      ]);
    }

    if (isBrowser) {
      let doc: Document | undefined = undefined;

      if (resolveDocument$) {
        try {
          doc = await resolveDocument$();
        } catch {
          doc = document;
        }
      }

      cleanup.value = preventBodyScroll(doc);
    }
  });

  const unlock$ = $(() => {
    if (isDev && isServer) {
      fail([
        `The 'unlock$' QRL function from the 'useScrollLock' hook cannot be called during server-side rendering (SSR).`,
        `Style restoration and cleanup operations are only applicable in the browser environment.`,
      ]);
    }

    if (isBrowser && cleanup.value) {
      cleanup.value();
      cleanup.value = undefined;
    }
  });

  return { lock$, unlock$ };
};
