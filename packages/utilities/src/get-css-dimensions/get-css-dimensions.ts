import type { GetCssDimensionsReturnValue } from './get-css-dimensions.types';
import { getComputedStyle } from '../get-computed-style';
import { isHTMLElement } from '../is-html-element';

/**
 * Calculates the visual dimensions of an element, reconciling CSS styles with layout geometry.
 *
 * This utility determines the most accurate width and height of an element by
 * comparing its computed CSS values with its offset dimensions. It accounts for
 * edge cases where `getComputedStyle` might return inconsistent results, such as
 * in testing environments or when dealing with SVG elements. If a significant
 * discrepancy is detected between the CSS-defined size and the actual offset size,
 * it prioritizes the offset dimensions to ensure layout accuracy.
 *
 * @example
 * ```ts
 * getCssDimensions(myElement);
 * // Returns: { width: 150, height: 42 }
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
