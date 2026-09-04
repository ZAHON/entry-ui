import type { CreateGlobalUnmountObserverReturnValue } from './create-global-unmount-observer.types';
import type { QRL } from '@qwik.dev/core';
import { isDev } from '@qwik.dev/core/build';
import { error } from '@/_internal/utilities/error';

/**
 * An internal utility that creates a centralized observer to manage element unmounting across the application.
 *
 * This factory utility returns an object with methods to track `HTMLElement` instances and execute
 * their associated cleanup QRL functions when those elements are removed from the DOM. It solves Qwik's
 * "lost cleanup" problem across the server-to-browser boundary by sharing a single `MutationObserver`
 * instance to minimize DOM monitoring overhead.
 *
 * The observer is lazily initialized upon tracking the first element and automatically disconnects
 * when no elements remain. To ensure optimal performance, it filters DOM mutations to run removal
 * checks only when nodes are actually detached, using an internal `WeakMap` to associate elements
 * with their cleanup tasks without mutating the DOM nodes directly.
 */
export const createGlobalUnmountObserver = (): CreateGlobalUnmountObserverReturnValue => {
  let isInitialized = false;
  let mutationObserver: MutationObserver | undefined = undefined;

  const qrlMap = new WeakMap<HTMLElement, Set<QRL<() => void> | QRL<() => Promise<void>>>>();
  const elements = new Set<HTMLElement>();

  const processRemovedElements = () => {
    const toRemove: HTMLElement[] = [];
    const elementsArray = Array.from(elements);

    for (let i = 0; i < elementsArray.length; i++) {
      const element = elementsArray[i];

      if (!document.contains(element)) {
        toRemove.push(element);
      }
    }

    for (let i = 0; i < toRemove.length; i++) {
      const element = toRemove[i];
      const qrls = qrlMap.get(element);

      if (qrls) {
        const promises: Promise<void>[] = [];
        const qrlsArray = Array.from(qrls);

        for (let j = 0; j < qrlsArray.length; j++) {
          const result = qrlsArray[j]();

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

    mutationObserver = new MutationObserver((mutationsList) => {
      let hasRemovals = false;

      for (let i = 0; i < mutationsList.length; i++) {
        if (mutationsList[i].removedNodes.length > 0) {
          hasRemovals = true;
          break;
        }
      }

      if (!hasRemovals) {
        return;
      }

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

    if (!qrls) {
      return;
    }

    qrls.delete(qrl);

    if (qrls.size === 0) {
      qrlMap.delete(element);
      elements.delete(element);
      cleanupObserver();
    }
  };

  return { add, remove };
};
