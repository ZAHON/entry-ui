/**
 * The geometric results of an element's dimension calculation.
 *
 * This interface represents the reconciled spatial measurements of a DOM element.
 * It provides a normalized output that bridges the gap between computed CSS
 * properties and actual layout geometry, ensuring consistency regardless of
 * whether the element is a standard HTML component or an SVG.
 */
export interface GetCssDimensionsReturnValue {
  /**
   * The calculated horizontal size of the element in pixels.
   * This value prioritizes the actual rendered offset width while falling back
   * to computed CSS values where layout geometry is unavailable or inconsistent.
   */
  width: number;

  /**
   * The calculated vertical size of the element in pixels.
   * Similar to the width, this property reflects the most accurate height
   * by reconciling layout-driven dimensions with the styles defined in the CSS cascade.
   */
  height: number;
}
