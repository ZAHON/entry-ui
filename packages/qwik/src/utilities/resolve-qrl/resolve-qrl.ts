import type { QRL } from '@qwik.dev/core';

/**
 * Asynchronously resolves a QRL reference into its underlying value or symbol.
 *
 * This utility handles specialized lazy-loaded code references embedded within HTML attributes,
 * leveraging framework mechanisms to fetch the target JavaScript chunk and retrieve the exported symbol.
 *
 * It simplifies the process of getting the actual value from a `QRL` reference (such as a lazy function)
 * by abstracting away manual resolution details, replacing the lower-level method and providing a cleaner
 * way to obtain and invoke the target resource.
 */
export const resolveQrl = async <T>(qrl: QRL<T>): Promise<T> => {
  // Check whether the `QRL` reference has already been resolved and stored in memory.
  // Returning the cached property directly avoids redundant asynchronous loading steps.
  if (qrl.resolved !== undefined) {
    return qrl.resolved;
  }

  // Trigger the asynchronous resolution process to fetch the target JavaScript chunk.
  // Awaits and returns the retrieved symbol once the lazy-loading operation completes.
  return await qrl.resolve();
};
