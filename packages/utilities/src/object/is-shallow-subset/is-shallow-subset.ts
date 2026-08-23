import type { IsShallowSubsetParams } from './is-shallow-subset.types';

/**
 * Verifies if a source object's properties strictly match a target object.
 *
 * This utility performs a partial shallow equality check by iterating exclusively
 * over the keys defined in the source. It is particularly useful for state
 * validation or filtering logic where additional properties in the target
 * should be ignored.
 *
 * @example
 * ```ts
 * // Target contains all key-value pairs defined in source.
 * isShallowSubset({ source: { id: 1 }, target: { id: 1, name: "John" } });
 * // Returns: true
 *
 * // Target is missing a required property or value does not match.
 * isShallowSubset({ source: { id: 1, type: "admin" }, target: { id: 1 } });
 * // Returns: false
 * ```
 */
export const isShallowSubset = (params: IsShallowSubsetParams) => {
  const { source, target } = params;

  // Iterate over enumerable properties of the `source` object.
  // Using a `for...in` loop prevents creating temporary key arrays in memory.
  for (const key in source) {
    // Confirm that the property belongs directly to the `source` object.
    // This safeguards against evaluating inherited prototype properties.
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      // Perform a strict equality check between `source` and `target` properties.
      // Trigger an early return as soon as a value mismatch is encountered.
      if (source[key] !== target[key]) {
        return false;
      }
    }
  }

  // Return `true` after successfully verifying all `source` properties.
  // Reaching this line guarantees that the `target` contains a matching subset.
  return true;
};

export namespace isShallowSubset {
  /**
   * Represents the configuration parameters required by the `isShallowSubset` utility.
   *
   * This interface defines the essential payload fields needed to verify partial key-value equality
   * between objects. It enforces a unified parameter structure across the codebase by pairing
   * a baseline source reference with a target comparison object.
   */
  export type Params = IsShallowSubsetParams;
}
