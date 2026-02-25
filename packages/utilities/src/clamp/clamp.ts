import type { ClampParams } from './clamp.types';

/**
 * Clamps a number between a minimum and maximum value.
 *
 * This utility ensures that the returned value is restricted to a specified range.
 * If the input value is smaller than the minimum boundary, the minimum value is
 * returned. If it exceeds the maximum boundary, the maximum value is returned.
 *
 * @example
 * ```ts
 * clamp({ value: 150, min: 0, max: 100 });
 * // Returns: 100
 *
 * clamp({ value: -20, min: 0, max: 100 });
 * // Returns: 0
 *
 * clamp({ value: 50, min: 0, max: 100 });
 * // Returns: 50
 * ```
 */
export const clamp = (params: ClampParams) => {
  const { value, min, max } = params;

  return Math.min(max, Math.max(min, value));
};
