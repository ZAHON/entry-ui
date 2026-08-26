/**
 * Represents the spatial result returned by the `getCssDimensions` utility.
 *
 * This interface defines the normalized geometric payload calculated for a target DOM element.
 * It enforces a consistent layout contract across measurement operations by pairing explicit pixel
 * width and height properties reconciled from computed CSS styles and offset geometry.
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
