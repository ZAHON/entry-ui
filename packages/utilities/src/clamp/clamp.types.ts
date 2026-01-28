/**
 * Configuration object for the `clamp` utility.
 *
 * This interface defines the numerical boundaries and the target value required
 * to perform a clamping operation. It ensures that all provided properties are
 * valid, finite numbers, maintaining strict mathematical constraints where
 * the minimum bound must not exceed the maximum bound.
 */
export interface ClampParams {
  /**
   * The numerical value to be restricted within the specified range.
   * Must be a finite number.
   */
  value: number;

  /**
   * The lower bound of the range.
   * If `value` is less than `min`, the function returns `min`.
   * Must be a finite number and less than or equal to `max`.
   */
  min: number;

  /**
   * The upper bound of the range.
   * If `value` is greater than `max`, the function returns `max`.
   * Must be a finite number and greater than or equal to `min`.
   */
  max: number;
}
