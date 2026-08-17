/**
 * Determines whether a given HTML element is an input that supports text selection.
 *
 * This utility performs a type guard check to verify if the element is an instance
 * of `HTMLInputElement` and explicitly contains the `select` method. This is
 * particularly useful before calling `element.select()` to avoid runtime errors
 * on input types that do not support selection (e.g., `type="date"` in some browsers).
 *
 * @example
 * ```ts
 * const input = document.querySelector('input[type="text"]');
 *
 * if (isSelectableInput(input)) {
 * 	input.select();
 * }
 * ```
 */
export const isSelectableInput = (element: HTMLElement) => {
  return element instanceof HTMLInputElement && 'select' in element;
};
