import type { GetViewportScrollerParams } from './get-viewport-scroller.types';
import { isOverflowElement } from '../is-overflow-element';

/**
 * Determines and returns the active element responsible for scrolling the document viewport.
 *
 * According to CSS display specifications, the viewport's overflow behavior is inherited
 * from the root `<html>` element. If `<html>` establishes its own scroll container (e.g. via `overflow: "auto"`
 * or `overflow: "scroll"`), it becomes the active viewport scroller. Otherwise, overflow propagates
 * down to the `<body>` element, making it the effective scroll target.
 *
 * This utility resolves this ambiguity, ensuring that window/viewport scroll measurements and programmatic
 * scroll manipulations target the correct element across varying CSS layout configurations.
 *
 * @example
 * ```ts
 * // Retrieve the correct scroll target for the current document context.
 * const scroller = getViewportScroller({
 *   html: document.documentElement,
 *   body: document.body,
 * });
 *
 * // Safely read or set scroll offsets on the resolved container.
 * scroller.scrollTop = 0;
 * ```
 */
export const getViewportScroller = (params: GetViewportScrollerParams) => {
  const { html, body } = params;

  // The viewport's overflow behavior is defined by `<html>` when it establishes its own scroll container.
  // If `<html>` does not set explicit overflow rules, the browser propagates overflow styles down to `<body>`,
  // making it the primary scroll target for the document viewport.
  return isOverflowElement(html) ? html : body;
};
