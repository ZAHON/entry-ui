import { getComputedStyle } from '../get-computed-style';

/**
 * Determines whether an element has a stable scrollbar gutter configured via CSS.
 *
 * This utility checks the `scrollbar-gutter` computed style of a given element.
 * It identifies if the property is set to `"stable"` or includes the `"stable"` keyword
 * (e.g., `"stable both-edges"`), which ensures that the layout remains consistent
 * by reserving space for the scrollbar regardless of whether it is currently visible.
 *
 * @example
 * ```ts
 * const element = document.querySelector("#element");
 *
 * if (element && hasStableScrollbarGutter(element)) {
 * 	console.log("Element has a stable layout gutter.");
 * }
 * ```
 */
export const hasStableScrollbarGutter = (element: HTMLElement) => {
  const styles = getComputedStyle(element);
  const scrollbarGutter = styles?.scrollbarGutter;

  return scrollbarGutter === 'stable' || scrollbarGutter?.startsWith('stable ') === true;
};
