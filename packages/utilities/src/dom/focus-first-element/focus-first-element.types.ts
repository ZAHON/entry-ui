/**
 * Configuration object for the `focusFirstElement` utility.
 *
 * This interface defines the parameters for attempting to shift focus to the first
 * available and valid element from a list of potential candidates. It provides
 * options to control visual focus indicators, scroll behavior, and text selection.
 */
export interface FocusFirstElementParams {
  /**
   * An ordered array of DOM elements to be evaluated for focusing.
   * The utility iterates through this list and attempts to focus each element
   * sequentially until one successfully receives focus.
   */
  candidates: HTMLElement[];

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
   * If set to `true`, it prevents the default scrolling behavior, which is
   * useful for maintaining the current viewport position.
   *
   * @default false
   */
  preventScroll?: boolean;

  /**
   * Whether to select the text content within the candidate element.
   * Selection is only performed if the focused candidate is an `HTMLInputElement`
   * that supports text selection.
   *
   * @default false
   */
  select?: boolean;
}
