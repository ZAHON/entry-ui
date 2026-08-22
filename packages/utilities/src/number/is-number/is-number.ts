/**
 * Verifies whether a given value is a valid number.
 *
 * This utility provides a reliable type guard to determine if a value is of type `number`.
 * Unlike the standard `typeof` operator, which classifies `NaN` (Not-a-Number) as a `number`,
 * this function strictly filters out `NaN` values to ensure the value can be safely used
 * in mathematical operations.
 *
 * @example
 * ```ts
 * // Standard usage with a valid integer or floating-point number.
 * isNumber(42);
 * // Returns: true
 *
 * // Filtering out `NaN`, which is natively typed as a `number`.
 * isNumber(NaN);
 * // Returns: false
 *
 * // Validating non-numeric primitive types.
 * isNumber("42");
 * // Returns: false
 * ```
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !Number.isNaN(value);
};
