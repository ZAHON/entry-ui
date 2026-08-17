/**
 * Configuration object for the `focusElement` utility.
 *
 * This interface encapsulates the parameters required to programmatically manage
 * focus on a specific DOM element. It provides options to control visual focus
 * indicators, scroll behavior, and automatic text selection for input fields.
 */
export interface FocusElementParams {
  /**
   * The target HTML element that should receive focus.
   * This element will be focused using the native `HTMLElement.focus()` method.
   */
  element: HTMLElement;

  /**
   * Whether the focus indicator (e.g., focus ring) should be visible.
   * This mimics the behavior of the `:focus-visible` CSS pseudo-class,
   * ensuring the element appears focused to the user, typically used for
   * keyboard navigation consistency.
   *
   * @default false
   */
  focusVisible?: boolean;

  /**
   * Whether the browser should scroll the element into view after focusing.
   * If set to `true`, it prevents the default scrolling behavior.
   *
   * @default false
   */
  preventScroll?: boolean;

  /**
   * Whether to select the text content within the element.
   * Selection is only performed if the element is an `HTMLInputElement`,
   * supports selection, and is not already the currently focused element.
   *
   * @default false
   */
  select?: boolean;
}
