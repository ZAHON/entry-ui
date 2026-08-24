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

  // Extract and cache the total length of the `candidates` array.
  // Avoids repeated length evaluations during loop iterations and enables early guard checking.
  const candidatesLength = candidates.length;

  // Immediately return if no candidate elements are provided.
  // Guards against empty arrays and avoids resolving document context on `undefined` references.
  if (candidatesLength === 0) {
    return;
  }

  // Resolve the target owner document from the initial candidate element.
  // Guarantees reliable active element inspection across different window contexts or iframes.
  const doc = getDocument(candidates[0]);

  // Capture the currently active element prior to attempting focus shifts.
  // Serves as a reference snapshot to determine whether focus successfully transferred to a candidate.
  const previouslyFocusedElement = getActiveElement(doc);

  // Sequentially iterate over candidate elements using an indexed loop for performance optimization.
  // Processes `candidates` in priority order until an element successfully acquires document focus.
  for (let i = 0; i < candidatesLength; i++) {
    // Retrieve the target candidate element at the current index.
    // Provides a localized reference for validation and focus assignment checks.
    const candidate = candidates[i];

    // Skip uninitialized, `null`, or `undefined` array slots safely.
    // Prevents runtime errors when dealing with sparse or conditionally filtered candidate arrays.
    if (!candidate) {
      continue;
    }

    // Check if the current candidate is already the active element in the document.
    // Aborts the operation early to avoid redundant focus operations and unnecessary browser work.
    if (candidate === previouslyFocusedElement) {
      return;
    }

    // Delegate focus application to the `focusElement` utility with configured behavior options.
    // Applies options for focus ring visibility, scroll suppression, and optional text selection.
    focusElement({ element: candidate, focusVisible, preventScroll, select });

    // Check whether the active document element changed following the focus attempt.
    // Immediately terminates execution once a candidate successfully gains active focus.
    if (getActiveElement(doc) !== previouslyFocusedElement) {
      return;
    }
  }
};

export namespace focusFirstElement {
  /**
   * Represents the configuration parameters required by the `focusFirstElement` utility.
   *
   * This interface defines the essential payload fields needed to programmatically shift focus
   * to the first viable candidate within a prioritized list of DOM elements. It enforces a unified
   * parameter structure across the codebase by pairing an ordered array of target elements with
   * configurable options for visual indicators, scroll behavior, and text selection.
   */
  export type Params = FocusFirstElementParams;
}
