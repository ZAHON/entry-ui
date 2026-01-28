/**
 * Determines whether the provided value is a valid, finite number.
 *
 * This utility serves as a type guard that goes beyond a simple `typeof` check.
 * While `typeof NaN` or `typeof Infinity` returns `"number"`, this function
 * ensures the value is a usable numeric value by excluding these edge cases
 * using `Number.isFinite`.
 *
 * @example
 * ```ts
 * isValidNumber(10);
 * // Returns: true
 *
 * isValidNumber(NaN);
 * // Returns: false
 *
 * isValidNumber(Infinity);
 * // Returns: false
 * ```
 */
export const isValidNumber = (value: number): value is number => {
  return typeof value === 'number' && Number.isFinite(value);
};
