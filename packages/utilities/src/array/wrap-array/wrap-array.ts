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

  // Cache the original array length in a local variable.
  // Storing the length avoids repeated property lookups throughout the execution.
  const arrayLength = array.length;

  // Guard clause for empty arrays to prevent unnecessary execution.
  // Returning early avoids modulo division by zero and returns a safe empty result.
  if (arrayLength === 0) {
    return [];
  }

  // Normalize the starting index using the modulo operator.
  // This safely handles negative values as well as indices larger than the array length.
  const normalizedIndex = ((startIndex % arrayLength) + arrayLength) % arrayLength;

  // Pre-allocate the result array with the exact known length.
  // Memory pre-allocation provides significantly better performance than iterative pushing.
  const result = new Array<T>(arrayLength);

  // Populate the array elements sequentially starting from the normalized index.
  // Circular wrap-around is guaranteed by applying the modulo operation to the calculated index.
  for (let i = 0; i < arrayLength; i++) {
    result[i] = array[(normalizedIndex + i) % arrayLength]!;
  }

  // Return the newly constructed circularly shifted array.
  // The original array remains completely untouched ensuring pure immutability.
  return result;
};
