import type { WrapArrayParams } from './wrap-array.types';

/**
 * Rearranges an array by shifting its starting point to a specified index.
 *
 * This utility creates a circular shift of the array elements. The element at
 * `startIndex` becomes the first element of the resulting array, followed by
 * subsequent elements. When the end of the original array is reached, it wraps
 * around to the beginning until all elements are included.
 *
 * @example
 * ```ts
 * wrapArray({ array: ["a", "b", "c", "d"], startIndex: 2 });
 * // Returns: ["c", "d", "a", "b"]
 *
 * wrapArray({ array: ["a", "b", "c", "d"], startIndex: 3 });
 * // Returns: ["d", "a", "b", "c"]
 *
 * wrapArray({ array: ["a", "b", "c", "d"], startIndex: 0 });
 * // Returns: ["a", "b", "c", "d"]
 * ```
 */
export const wrapArray = <T>(params: WrapArrayParams<T>) => {
  const { array, startIndex } = params;

  return array.map<T>((_, index) => array[(startIndex + index) % array.length]!);
};
