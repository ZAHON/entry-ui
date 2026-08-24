import type { FocusFirstElementParams } from './focus-first-element.types';
import { getDocument } from '../get-document';
import { getActiveElement } from '../get-active-element';
import { focusElement } from '../focus-element';

/**
 * Attempts to focus the first available element from a list of candidates.
 *
 * This utility iterates through an array of elements and tries to set focus on each
 * one sequentially. The process stops as soon as an element successfully receives focus
 * (i.e., when the document's active element changes). This is particularly useful for
 * managing focus in modals, forms, or complex components where the primary focus target
 * might be conditional or dynamic.
 *
 * @example
 * ```ts
 * const input = document.querySelector<HTMLElement>("#search-input");
 * const button = document.querySelector<HTMLElement>("#submit-button");
 *
 * // Focus the first available candidate (e.g. input) and select its text without auto-scrolling.
 * if (input && button) {
 *   focusFirstElement({ candidates: [input, button], preventScroll: true, select: true });
 * }
 * ```
 */
export const focusFirstElement = (params: FocusFirstElementParams) => {
  const { candidates, focusVisible = false, preventScroll = false, select = false } = params;

  const doc = getDocument(candidates[0]);
  const previouslyFocusedElement = getActiveElement(doc);
  const candidatesLength = candidates.length;

  for (let i = 0; i < candidatesLength; i++) {
    const candidate = candidates[i];

    if (!candidate) {
      continue;
    }

    if (candidate === previouslyFocusedElement) {
      return;
    }

    focusElement({ element: candidate, focusVisible, preventScroll, select });

    if (getActiveElement(doc) !== previouslyFocusedElement) {
      return;
    }
  }
};
