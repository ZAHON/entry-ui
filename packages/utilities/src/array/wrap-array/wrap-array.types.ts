/**
 * Configuration object for the `wrapArray` utility.
 *
 * This interface defines the necessary parameters to perform a circular shift
 * on a generic collection. It ensures type safety by leveraging a generic type `T`,
 * allowing the utility to maintain the integrity of the array elements throughout
 * the rearrangement process.
 */
export interface WrapArrayParams<T> {
  /**
   * The source array to be rearranged.
   * This array remains unmodified as the function returns a new mapped instance.
   */
  array: T[];

  /**
   * The zero-based index in the original array that will serve as the new starting point.
   * Elements before this index will be appended to the end of the new array,
   * maintaining their relative order in a circular fashion.
   */
  startIndex: number;
}
