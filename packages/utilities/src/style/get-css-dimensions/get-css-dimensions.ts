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
  const css = getComputedStyle(element);

  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;

  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = Math.round(width) !== offsetWidth || Math.round(height) !== offsetHeight;

  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }

  return {
    width,
    height,
  };
};
