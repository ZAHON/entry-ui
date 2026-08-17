import type { FocusFirstElementParams } from './focus-first-element.types';
import { getDocument } from '../get-document';
import { getActiveElement } from '../get-active-element';
import { focusElement } from '../focus-element';

/**
 * Attempts to focus the first available element from a list of candidates.
 *
 * This function iterates through an array of elements and tries to set focus on each
 * one sequentially. The process stops as soon as an element successfully receives focus
 * (i.e., when the document's active element changes). This is particularly useful for
 * managing focus in modals, forms, or complex components where the primary focus target
 * might be conditional or dynamic.
 *
 * @example
 * ```ts
 * // Focus the first visible input or fallback to a close button
 * focusFirstElement({ candidates: [input, closeButton], select: true });
 *
 * // Attempt to focus multiple elements, preventing scroll on the successful one
 * focusFirstElement({ candidates: [primaryAction, secondaryAction], preventScroll: true });
 * ```
 */
export const focusFirstElement = (params: FocusFirstElementParams) => {
  const { candidates, focusVisible = false, preventScroll = false, select = false } = params;

  const doc = getDocument(candidates[0]);
  const previouslyFocusedElement = getActiveElement(doc);

  for (const candidate of candidates) {
    if (candidate === previouslyFocusedElement) return;

    focusElement({ element: candidate, focusVisible, preventScroll, select });

    if (getActiveElement(doc) !== previouslyFocusedElement) return;
  }
};
