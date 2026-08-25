import { getWindow } from '../../dom/get-window';

/**
 * Retrieves the computed style properties for a specified HTML element.
 *
 * This utility provides a reliable way to access an element's computed styles,
 * automatically resolving the correct `Window` context. This ensures accurate
 * results even when the element is located within a different document context,
 * such as an iframe or a popup window.
 *
 * @example
 * ```ts
 * getComputedStyle(document.body);
 * // Returns: CSSStyleDeclaration object
 * ```
 */
export const getComputedStyle = (element: Element) => {
  return getWindow(element).getComputedStyle(element);
};
