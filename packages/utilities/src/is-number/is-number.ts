/**
 * Verifies whether a given value is a valid number, excluding `NaN`.
 *
 * This utility provides a reliable type guard to determine if a value is of type `number`.
 * Unlike the standard `typeof` operator, which classifies `NaN` (Not-a-Number) as a `number`,
 * this function strictly filters out `NaN` values to ensure the value can be safely used
 * in mathematical operations.
 *
 * @example
 * ```ts
 * isNumber(42);
 * // Returns: true
 *
 * isNumber(NaN);
 * // Returns: false
 *
 * isNumber("42");
 * // Returns: false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (value: any): value is number => {
  return typeof value === 'number' && !Number.isNaN(value);
};
