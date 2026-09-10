import { getComputedStyle } from '../get-computed-style';

/**
 * Calculates the content-box width of a specified DOM element in pixels.
 *
 * This utility determines the exact interior width of an element by subtracting
 * its horizontal padding (left and right) from its `clientWidth`. It works correctly
 * regardless of the element's `box-sizing` model (including `border-box`), as `clientWidth`
 * already accounts for padding dimensions. It safely handles unparsable or missing padding
 * values by treating them as zero, clamps the result to prevent negative values, and optimizes
 * performance by skipping computed style lookups when the element's client width is zero.
 *
 * @example
 * ```ts
 * const element = document.querySelector("#my-element");
 *
 * // Retrieve the precise content-box width accounting for padding.
 * if (element) {
 *   const width = getContentBoxWidth(element);
 * }
 * ```
 */
export const getContentBoxWidth = (element: Element) => {
  // Extract the native `clientWidth` property from the target DOM element.
  // Provides the interior layout width including padding but excluding borders and margins.
  const { clientWidth } = element;

  // Short-circuit execution if the element's client width is zero or not rendered.
  // Prevents unnecessary style calculations and avoids potential negative or invalid measurements.
  if (clientWidth === 0) {
    return 0;
  }

  // Retrieve the resolved computed style declaration containing layout properties.
  // Used to inspect the element's explicit left and right padding style definitions.
  const { paddingLeft, paddingRight } = getComputedStyle(element);

  // Parse the numeric pixel value from the computed left padding property string.
  // Yields `NaN` if the value is missing, empty, or unparsable in specific testing environments.
  const parsedPaddingLeft = parseFloat(paddingLeft);

  // Parse the numeric pixel value from the computed right padding property string.
  // Yields `NaN` if the value is missing, empty, or unparsable in specific testing environments.
  const parsedPaddingRight = parseFloat(paddingRight);

  // Compute the combined total horizontal padding from both left and right sides.
  // Safely defaults to zero for any unparsable or `NaN` padding dimensions encountered.
  const horizontalPadding =
    (Number.isNaN(parsedPaddingLeft) ? 0 : parsedPaddingLeft) +
    (Number.isNaN(parsedPaddingRight) ? 0 : parsedPaddingRight);

  // Calculate the final content-box width by subtracting horizontal padding from client width.
  // Clamps the result using `Math.max` to guarantee it never returns a negative dimension value.
  return Math.max(0, clientWidth - horizontalPadding);
};
