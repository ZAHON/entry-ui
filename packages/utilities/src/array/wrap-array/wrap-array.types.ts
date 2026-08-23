/**
 * Represents the configuration parameters required by the `wrapArray` utility.
 *
 * This interface defines the essential input fields needed to perform a circular shift
 * on a generic collection. It enforces type safety and immutability across the operation
 * by pairing a target source array with an explicit starting index identifier.
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
