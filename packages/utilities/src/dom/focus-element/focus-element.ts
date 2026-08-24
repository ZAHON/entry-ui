import type { FocusElementParams } from './focus-element.types';
import { getDocument } from '../get-document';
import { getActiveElement } from '../get-active-element';
import { isSelectableInput } from '../is-selectable-input';

/**
 * Programmatically manages focus for a given DOM element with extended configuration.
 *
 * This utility wraps the native `HTMLElement.focus()` method, providing a unified
 * interface for common focus-related tasks such as controlling the focus ring
 * visibility, preventing automatic scrolling, and selecting input text.
 *
 * It includes a safety check to ensure the target element is focusable and
 * optimizes the user experience by avoiding redundant selection operations
 * if the element is already active.
 *
 * @example
 * ```ts
 * const input = document.querySelector<HTMLInputElement>('#search-input');
 *
 * // Programmatically focus the input and select its text without triggering auto-scroll.
 * if (input) {
 *   focusElement({ element: input, preventScroll: true, select: true });
 * }
 * ```
 */
export const focusElement = (params: FocusElementParams) => {
  const { element, focusVisible = false, preventScroll = false, select = false } = params;

  // Verify that the target element supports the native `focus` method before proceeding.
  // Guards against potential runtime errors if a non-focusable object or invalid DOM node is provided.
  if ('focus' in element) {
    // Resolve the owner document context for the target element.
    // Ensures safe active element checking across different frames or window environments.
    const doc = getDocument(element);

    // Capture the currently active element prior to applying new focus.
    // This snapshot is used to determine whether a text selection operation is redundant.
    const previouslyFocusedElement = getActiveElement(doc);

    // Trigger native focus with configuration options applied.
    // The type cast ensures compatibility with `focusVisible` across standard DOM types.
    element.focus({ focusVisible, preventScroll } as { focusVisible?: boolean } & FocusOptions);

    // If the element is an input field and selection is explicitly requested,
    // select its content only if it wasn't the previously focused element.
    // This avoids redundant operations and enhances the user experience.
    if (element !== previouslyFocusedElement && isSelectableInput(element) && select) {
      element.select();
    }
  }
};

export namespace focusElement {
  /**
   * Represents the configuration parameters required by the `focusElement` utility.
   *
   * This interface defines the essential payload fields needed to programmatically manage focus state
   * on a target DOM element. It enforces a unified parameter structure across the codebase by pairing
   * a target HTML element with configurable options for visual indicators, scroll behavior, and text selection.
   */
  export type Params = FocusElementParams;
}
