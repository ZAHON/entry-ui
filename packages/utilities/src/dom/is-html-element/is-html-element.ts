import { hasWindow } from '../has-window';
import { getWindow } from '../get-window';

/**
 * Verifies whether a given value is an instance of HTMLElement, with support for cross-realm environments.
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
  // Immediately return `false` in non-browser or server-side (SSR) execution contexts.
  // Guards against potential `ReferenceError` exceptions when DOM classes are unavailable.
  if (!hasWindow()) {
    return false;
  }

  // Validate the target `value` against the current execution environment's global `HTMLElement` constructor.
  // Fall back to checking against the specific `HTMLElement` constructor resolved from the node's owner window context.
  // This dual verification prevents false negatives for nodes originating from different frames or iframes (cross-realm).
  return value instanceof HTMLElement || value instanceof getWindow(value as Node | null | undefined).HTMLElement;
};
