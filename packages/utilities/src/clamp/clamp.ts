import type { ClampParams } from './clamp.types';
import { isValidNumber } from '../is-valid-number';
import { fail } from '../fail';

/**
 * Clamps a number between a minimum and maximum value.
 *
 * This utility ensures that the returned value is restricted to a specified range.
 * If the input value is smaller than the minimum boundary, the minimum value is
 * returned. If it exceeds the maximum boundary, the maximum value is returned.
 *
 * This function will throw an error if:
 * - Any of the input parameters are not finite numbers.
 * - The `min` value is greater than the `max` value.
 *
 * @example
 * ```ts
 * clamp({ value: 150, min: 0, max: 100 });
 * // Returns: 100
 *
 * clamp({ value: -20, min: 0, max: 100 });
 * Returns: 0
 *
 * clamp({ value: 50, min: 0, max: 100 });
 * // Returns: 50
 * ```
 */
export const clamp = (params: ClampParams) => {
  const { value, min, max } = params;

  if (!isValidNumber(value)) {
    fail({
      prefix: '[Entry UI Utilities]',
      messages: [`Invalid 'value' parameter in 'clamp' utility.`, `Expected a finite number, but received: ${value}`],
    });
  }

  if (!isValidNumber(min)) {
    fail({
      prefix: '[Entry UI Utilities]',
      messages: [`Invalid 'min' parameter in 'clamp' utility.`, `Expected a finite number, but received: ${min}`],
    });
  }

  if (!isValidNumber(max)) {
    fail({
      prefix: '[Entry UI Utilities]',
      messages: [`Invalid 'max' parameter in 'clamp' utility.`, `Expected a finite number, but received: ${max}`],
    });
  }

  if (min > max) {
    fail({
      prefix: '[Entry UI Utilities]',
      messages: [
        `Invalid range for 'clamp' utility.`,
        `The 'min' parameter (${min}) must be less than or equal to the 'max' parameter (${max}).`,
      ],
    });
  }

  return Math.min(max, Math.max(min, value));
};
