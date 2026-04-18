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
 * isShallowSubset({ source: { id: 1 }, target: { id: 1, name: "John" } });
 * // Returns: true
 *
 * isShallowSubset({ source: { id: 1, type: 'admin' }, target: { id: 1 } });
 * // Returns: false
 * ```
 */
export const isShallowSubset = (params: IsShallowSubsetParams) => {
  const { source, target } = params;

  return Object.keys(source).every((key) => source[key] === target[key]);
};
