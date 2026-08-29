import type { IsViewportScrollLockedParams } from './is-viewport-scroll-locked.types';
import { getViewportScroller } from '../get-viewport-scroller';

/**
 * An internal utility that determines whether vertical scrolling on the document viewport is actively locked or disabled.
 *
 * This utility resolves the current active viewport scroller (either `<html>` or `<body>`)
 * and inspects its computed `overflowY` style property. If the resolved scroller applies
 * `hidden` or `clip`, vertical viewport scrolling is considered locked.
 */
export const isViewportScrollLocked = (params: IsViewportScrollLockedParams) => {
  const { win, html, body } = params;

  // Resolve which element currently acts as the document viewport's main scroll container,
  // accounting for CSS overflow propagation rules between the root `<html>` and `<body>` tags.
  const viewportScroller = getViewportScroller({ html, body });

  // Retrieve the active scroller's final computed styles to accurately evaluate its current
  // runtime vertical overflow behavior, regardless of how or where CSS styles were declared.
  const { overflowY } = win.getComputedStyle(viewportScroller);

  // Evaluate whether the computed vertical overflow behavior suppresses scroll interactions.
  // Values of `hidden` or `clip` explicitly lock or strip scrollability from the viewport container.
  return /hidden|clip/.test(overflowY);
};
