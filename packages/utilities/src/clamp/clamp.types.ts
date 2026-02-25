/**
 * Configuration object for the `clamp` utility.
 *
 * This interface defines the numerical boundaries and the target value required
 * to perform a clamping operation.
 */
export interface ClampParams {
  /**
   * The numerical value to be restricted within the specified range.
   */
  value: number;

  /**
   * The lower bound of the range.
   * If `value` is less than `min`, the function returns `min`.
   */
  min: number;

  /**
   * The upper bound of the range.
   * If `value` is greater than `max`, the function returns `max`.
   */
  max: number;
}
