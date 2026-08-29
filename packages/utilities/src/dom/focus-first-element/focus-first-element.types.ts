/**
 * Represents the configuration parameters required by the `focusFirstElement` utility.
 *
 * This interface defines the essential payload fields needed to programmatically shift focus
 * to the first viable candidate within a prioritized list of DOM elements. It enforces a unified
 * parameter structure across the codebase by pairing an ordered array of target elements with
 * configurable options for visual indicators, scroll behavior, and text selection.
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
  focusVisible?: boolean | undefined;

  /**
   * Whether the browser should scroll the element into view after focusing.
   * If set to `true`, it prevents the default scrolling behavior, which is
   * useful for maintaining the current viewport position.
   *
   * @default false
   */
  preventScroll?: boolean | undefined;

  /**
   * Whether to select the text content within the candidate element.
   * Selection is only performed if the focused candidate is an `HTMLInputElement`
   * that supports text selection.
   *
   * @default false
   */
  select?: boolean | undefined;
}
