import type { SetStyleParams } from './set-style.types';
import { isShallowSubset } from '../is-shallow-subset';

/**
 * Safely applies inline styles to an element and returns a cleanup function to revert changes.
 *
 * This utility optimizes performance by preventing redundant DOM mutations if the
 * requested styles are already present. When the returned cleanup function is executed,
 * the element's styles are restored to their original state, and the `style` attribute
 * is automatically removed if no inline properties remain.
 *
 * @example
 * ```ts
 * const cleanup = setStyle({
 * 	element: document.body,
 * 	style: { overflow: "hidden", paddingRight: "15px" }
 * });
 *
 * // Later, to undo the changes:
 * cleanup();
 * ```
 */
export const setStyle = (params: SetStyleParams) => {
  const { element, style } = params;

  const prevStyle: Partial<CSSStyleDeclaration> = {};

  for (const key in style) {
    prevStyle[key] = element.style[key];
  }

  if (isShallowSubset({ source: prevStyle, target: style })) {
    return () => void 0;
  }

  Object.assign(element.style, style);

  return () => {
    Object.assign(element.style, prevStyle);

    if (element.style.length === 0) {
      element.removeAttribute('style');
    }
  };
};
