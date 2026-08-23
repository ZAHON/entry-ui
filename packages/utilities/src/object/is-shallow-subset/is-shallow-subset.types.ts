/**
 * Represents the configuration parameters required by the `isShallowSubset` utility.
 *
 * This interface defines the essential payload fields needed to verify partial key-value equality between objects.
 * It enforces a unified parameter structure across the codebase by pairing a baseline source reference with a target comparison object.
 */
export interface IsShallowSubsetParams {
  /**
   * The reference object containing the key-value pairs that must be matched.
   * The utility iterates only over the keys defined in this object to determine
   * if the target satisfies the subset criteria.
   */
  source: Record<string, unknown>;

  /**
   * The target object to be inspected against the source.
   * For a successful match, this object must contain all keys present in the
   * source with strictly equal values (`===`). Any additional properties present
   * in the target that are missing from the source are ignored.
   */
  target: Record<string, unknown>;
}
