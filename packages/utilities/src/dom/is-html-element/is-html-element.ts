import { hasWindow } from '../has-window';
import { getWindow } from '../get-window';

/**
 * Verifies whether a given value is an instance of `HTMLElement`, with support for cross-realm environments.
 *
 * This utility provides a cross-realm safe check to determine if a value is a
 * standard HTML element. It first ensures a window environment is available
 * and then checks the instance against both the current global `HTMLElement`
 * and the `HTMLElement` constructor from the node's specific window context.
 * This prevents false negatives when elements are passed between different
 * frames or windows.
 *
 * @example
 * ```ts
 * isHTMLElement(document.createElement('div'));
 * // Returns: true
 *
 * isHTMLElement(null);
 * // Returns: false
 *
 * isHTMLElement(iframeElement.contentDocument.body);
 * // Returns: true (even if the instance comes from another window context)
 * ```
 */
export const isHTMLElement = (value: unknown): value is HTMLElement => {
  if (!hasWindow()) {
    return false;
  }

  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
};
