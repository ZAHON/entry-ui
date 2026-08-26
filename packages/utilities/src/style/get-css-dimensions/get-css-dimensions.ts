import type { GetCssDimensionsReturnValue } from './get-css-dimensions.types';
import { getComputedStyle } from '../get-computed-style';
import { isHTMLElement } from '../../dom/is-html-element';

/**
 * Calculates the reconciled spatial dimensions of a target DOM element.
 *
 * This utility determines accurate pixel measurements by evaluating computed CSS values against
 * rendered offset geometry. It resolves edge cases in non-standard environments by automatically falling back
 * to layout bounds whenever a discrepancy is detected between computed styles and rendered dimensions.
 *
 * @example
 * ```ts
 * const element = document.querySelector("#my-element");
 *
 * // Retrieve reconciled spatial dimensions for the target element.
 * if (element) {
 *   const dimensions = getCssDimensions(element);
 * }
 * ```
 */
export const getCssDimensions = (element: Element): GetCssDimensionsReturnValue => {
  // Retrieve the resolved computed CSS style declaration dictionary for the target DOM element.
  // Provides active property values from the `Window` context to inspect style-defined width and height.
  const css = getComputedStyle(element);

  // Parse the numeric horizontal width in pixels from the computed CSS style declaration string.
  // Falls back to `0` if parsing yields `NaN` when style values are empty or unparsed in testing setups.
  let width = parseFloat(css.width) || 0;

  // Parse the numeric vertical height in pixels from the computed CSS style declaration string.
  // Falls back to `0` if parsing yields `NaN` when style values are empty or unparsed in testing setups.
  let height = parseFloat(css.height) || 0;

  // Determine whether the target element is an instance of `HTMLElement` supporting layout properties.
  // Guards access to native layout geometry fields (`offsetWidth`, `offsetHeight`) unavailable on non-HTML elements.
  const hasOffset = isHTMLElement(element);

  // Resolve rendered layout offset width if supported by the target element context.
  // Defaults to the computed CSS width value when element layout bounds are unavailable.
  const offsetWidth = hasOffset ? element.offsetWidth : width;

  // Resolve rendered layout offset height if supported by the target element context.
  // Defaults to the computed CSS height value when element layout bounds are unavailable.
  const offsetHeight = hasOffset ? element.offsetHeight : height;

  // Compare rounded computed CSS dimensions against actual rendered layout offset bounds.
  // Detects spatial discrepancies caused by subpixel rounding, zoom factors, or testing environment edge cases.
  const shouldFallback = Math.round(width) !== offsetWidth || Math.round(height) !== offsetHeight;

  // Reconcile dimension measurements by favoring actual layout bounds over computed CSS declarations.
  // Overwrites initial CSS values with offset geometry when a layout discrepancy is identified.
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }

  // Return normalized spatial dimension payload containing explicit width and height pixel values.
  // Fulfills the layout contract expected by downstream consumers requiring reconciled element geometry.
  return { width, height };
};
