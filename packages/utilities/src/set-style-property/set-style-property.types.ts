/**
 * Configuration object for the `setStyleProperty` utility.
 *
 * This interface defines the parameters required to modify a specific CSS
 * custom property or standard style property on a target element.
 */
export interface SetStylePropertyParams {
  /**
   * The target HTML element whose inline style property will be modified.
   */
  element: HTMLElement;

  /**
   * The name of the CSS property to be set. This can be a standard CSS
   * property (e.g., `"opacity"`) or a CSS custom property/variable
   * (e.g., `"--accent-color"`).
   */
  property: string;

  /**
   * The value to be assigned to the specified property. This must be
   * a string that conforms to CSS value syntax (e.g., `"0.5"`, `"20px"`, or `"var(--primary)"`).
   */
  value: string;
}
