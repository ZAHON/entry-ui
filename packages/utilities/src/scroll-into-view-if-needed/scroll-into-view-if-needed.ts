import type {
  ScrollIntoViewIfNeededParams,
  HTMLElementWithScrollIntoViewIfNeeded,
} from './scroll-into-view-if-needed.types';

/**
 * Ensures an element is visible in the viewport by scrolling to it only if necessary.
 *
 * This utility provides a unified interface for the non-standard `scrollIntoViewIfNeeded`
 * method (available in Chromium and WebKit) while providing a robust fallback to the
 * standard `scrollIntoView` API for other browsers. It is designed to prevent jarring
 * layout jumps by avoiding redundant scrolls if the element is already within the
 * user's visible area.
 *
 * The function allows for flexible positioning, enabling you to either center the
 * element within the viewport or use a minimal `"nearest"` alignment strategy to
 * reduce visual noise during navigation or search-in-page operations.
 *
 * @example
 * ```ts
 * scrollIntoViewIfNeeded({
 * element: document.querySelector("#target-element"),
 * center: true
 * });
 * ```
 */
export const scrollIntoViewIfNeeded = (params: ScrollIntoViewIfNeededParams) => {
  const { element, center = true } = params;

  if ('scrollIntoViewIfNeeded' in element) {
    const _element = element as HTMLElementWithScrollIntoViewIfNeeded;

    _element.scrollIntoViewIfNeeded(center);
  } else {
    element.scrollIntoView({
      behavior: 'auto',
      block: center ? 'center' : 'nearest',
      inline: 'nearest',
    });
  }
};
