/**
 * Represents the configuration parameters required by the `clamp` utility.
 *
 * This interface defines the essential payload fields needed to restrict a numeric value within a closed interval.
 * It enforces a unified parameter structure across the codebase by pairing the target value with explicit minimum
 * and maximum boundary thresholds.
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
