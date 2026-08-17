/**
 * Configuration object for the `isShallowSubset` utility.
 *
 * This interface defines the parameters required to perform a shallow comparison
 * between two objects. It facilitates a partial equality check by focusing
 * exclusively on the keys provided in the source object, making it ideal for
 * state validation, delta checks, or filtering logic.
 */
export interface IsShallowSubsetParams {
  /**
   * The reference object containing the key-value pairs that must be matched.
   * The utility iterates only over the keys defined in this object to determine
   * if the target satisfies the subset criteria.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: Record<string, any>;

  /**
   * The target object to be inspected against the source.
   * For a successful match, this object must contain all keys present in the
   * source with strictly equal values (`===`). Any additional properties present
   * in the target that are missing from the source are ignored.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: Record<string, any>;
}
