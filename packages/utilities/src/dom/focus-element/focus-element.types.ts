/**
 * Represents the configuration parameters required by the `focusElement` utility.
 *
 * This interface defines the essential payload fields needed to programmatically manage focus state
 * on a target DOM element. It enforces a unified parameter structure across the codebase by pairing
 * a target HTML element with configurable options for visual indicators, scroll behavior, and text selection.
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
  focusVisible?: boolean | undefined;

  /**
   * Whether the browser should scroll the element into view after focusing.
   * If set to `true`, it prevents the default scrolling behavior.
   *
   * @default false
   */
  preventScroll?: boolean | undefined;

  /**
   * Whether to select the text content within the element.
   * Selection is only performed if the element is an `HTMLInputElement`,
   * supports selection, and is not already the currently focused element.
   *
   * @default false
   */
  select?: boolean | undefined;
}
