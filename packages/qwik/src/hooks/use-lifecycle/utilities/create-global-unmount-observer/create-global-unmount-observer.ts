import type { CreateGlobalUnmountObserverReturnValue } from './create-global-unmount-observer.types';
import type { QRL } from '@qwik.dev/core';
import { isDev } from '@qwik.dev/core/build';
import { error } from '@/_internal/utilities/error';

/**
 * A utility that creates a centralized observer to manage element unmounting across the application.
 *
 * This factory function returns an object with methods to track HTMLElements and execute
 * associated cleanup QRLs when those elements are removed from the DOM. It solves
 * the "ghost element" problem in Qwik by using a single `MutationObserver` instance,
 * which is lazily initialized and automatically disconnected when no elements are
 * being tracked, ensuring optimal memory management and performance.
 * The observer uses a `WeakMap` internally to prevent memory leaks, allowing the
 * garbage collector to reclaim elements even if they are still registered in the observer.
 */
export const createGlobalUnmountObserver = (): CreateGlobalUnmountObserverReturnValue => {
  let isInitialized = false;
  let mutationObserver: MutationObserver | undefined = undefined;

  const qrlMap = new WeakMap<HTMLElement, Set<QRL<() => void> | QRL<() => Promise<void>>>>();
  const elements = new Set<HTMLElement>();

  const processRemovedElements = () => {
    const toRemove: HTMLElement[] = [];

    for (const element of elements) {
      if (!document.contains(element)) {
        toRemove.push(element);
      }
    }

    for (const element of toRemove) {
      const qrls = qrlMap.get(element);

      if (qrls) {
        const promises: Promise<void>[] = [];

        for (const qrl of qrls) {
          const result = qrl();

          if (result instanceof Promise) {
            promises.push(result);
          }
        }

        if (promises.length > 0) {
          Promise.all(promises).catch((err) => {
            if (isDev) {
              error([
                `An error occurred during the 'onUnmount$' lifecycle execution in 'useLifecycle' hook.`,
                `Check the cleanup logic in your 'onUnmount$' QRL. `,
                `One or more promises rejected during the element removal process: ${err instanceof Error ? err.message : String(err)}`,
              ]);
            }
          });
        }

        qrls.clear();
      }

      qrlMap.delete(element);
      elements.delete(element);
    }
  };

  const cleanupObserver = () => {
    if (mutationObserver && elements.size === 0) {
      mutationObserver.disconnect();
      mutationObserver = undefined;
      isInitialized = false;
    }
  };

  const initMutationObserver = () => {
    if (isInitialized || typeof MutationObserver === 'undefined') return;

    isInitialized = true;

    mutationObserver = new MutationObserver(() => {
      processRemovedElements();
      cleanupObserver();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  const add = (params: { element: HTMLElement; qrl: QRL<() => void> | QRL<() => Promise<void>> }) => {
    const { element, qrl } = params;

    if (!qrlMap.has(element)) {
      qrlMap.set(element, new Set());
    }

    const qrls = qrlMap.get(element)!;

    qrls.add(qrl);
    elements.add(element);

    if (!isInitialized) {
      processRemovedElements();
    }

    initMutationObserver();
  };

  const remove = (params: { element: HTMLElement; qrl: QRL<() => void> | QRL<() => Promise<void>> }) => {
    const { element, qrl } = params;

    const qrls = qrlMap.get(element);

    if (!qrls) return;

    qrls.delete(qrl);

    if (qrls.size === 0) {
      elements.delete(element);
      cleanupObserver();
    }
  };

  return {
    add,
    remove,
  };
};
