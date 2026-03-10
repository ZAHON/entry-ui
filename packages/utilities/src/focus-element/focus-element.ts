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
 * // Basic focus with scroll prevention
 * focusElement({ element: myButton, preventScroll: true });
 *
 * // Focus an input and automatically select its text content
 * focusElement({ element: myInput, select: true });
 *
 * // Requesting selection on an already active element will focus it without re-selecting
 * focusElement({ element: alreadyActiveInput, select: true });
 *
 * // Triggering focus with a visible focus ring (mimics keyboard navigation)
 * focusElement({ element: myLink, focusVisible: true });
 * ```
 */
export const focusElement = (params: FocusElementParams) => {
  const { element, focusVisible = false, preventScroll = false, select = false } = params;

  // Only focus if that element is focusable.
  if ('focus' in element) {
    const doc = getDocument(element);
    const previouslyFocusedElement = getActiveElement(doc);

    // @ts-expect-error - `focusVisible` is an experimental option not yet in TS types
    // Browsers that do not support the `focusVisible` option will simply
    // ignore it and perform a standard focus without throwing an error.
    element.focus({ focusVisible, preventScroll });

    // If the element is an input field and selection is explicitly requested,
    // select its content only if it wasn't the previously focused element.
    // This avoids redundant operations and enhances the user experience.
    if (element !== previouslyFocusedElement && isSelectableInput(element) && select) {
      element.select();
    }
  }
};
