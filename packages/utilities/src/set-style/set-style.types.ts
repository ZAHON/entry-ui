/**
 * Configuration object for the `setStyle` utility.
 *
 * This interface defines the target element and the style declarations to be applied.
 * It facilitates a reversible style application by storing the previous state,
 * allowing for safe cleanup or temporary style overrides.
 */
export interface SetStyleParams {
  /**
   * The target HTML element whose inline styles will be modified.
   */
  element: HTMLElement;

  /**
   * An object containing the CSS property-value pairs to apply.
   * Only the provided properties will be updated, while others remain untouched.
   * Values should follow standard CSS property naming conventions.
   */
  style: Partial<CSSStyleDeclaration>;
}
