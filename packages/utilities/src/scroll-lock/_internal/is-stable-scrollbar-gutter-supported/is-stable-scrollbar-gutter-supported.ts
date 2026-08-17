import type { IsStableScrollbarGutterSupportedParams } from './is-stable-scrollbar-gutter-supported.types';
import { getViewportScroller } from '../get-viewport-scroller';

/**
 * Evaluates whether the environment correctly supports stable scrollbar gutters at runtime.
 *
 * While syntax checks confirm basic browser API support, engine implementation bugs or OS scrollbar settings
 * may still cause layout shifts. This utility performs both a feature and layout measurement check
 * by temporarily applying the property and comparing container widths under different overflow states.
 *
 * @example
 * ```ts
 * // Determine if stable scrollbar gutters can be safely relied upon to prevent layout shifts.
 * const isSupported = isStableScrollbarGutterSupported({
 *   html: document.documentElement,
 *   body: document.body,
 * });
 *
 * if (isSupported) {
 *   // Use stable scrollbar gutter styling for scroll locking strategies.
 * }
 * ```
 */
export const isStableScrollbarGutterSupported = (params: IsStableScrollbarGutterSupportedParams) => {
  const { html, body } = params;

  // Verify basic engine syntax support for the `scrollbar-gutter: "stable"` rule via the CSS API.
  // Immediately returns false if runtime CSS evaluation is absent or explicitly reports no property support.
  if (!(typeof CSS !== 'undefined' && CSS.supports && CSS.supports('scrollbar-gutter', 'stable'))) {
    return false;
  }

  // Resolve whether the root `<html>` or `<body>` element currently controls document viewport scrolling.
  // Ensures measurement overrides are applied directly to the active layout scroll container.
  const viewportScroller = getViewportScroller({ html, body });

  // Read and store the current inline `overflowY` style of the active viewport scroll container.
  // Captures the initial style value to ensure it can be restored after measurement finishes.
  const originalViewportScrollerOverflowY = viewportScroller.style.overflowY;

  // Read and store the current inline `scrollbarGutter` style set directly on the root `<html>` element.
  // Preserves existing document-level inline declarations prior to running the runtime feature test.
  const originalHtmlStyleGutter = html.style.scrollbarGutter;

  // Forcefully apply the stable scrollbar gutter configuration on the root `<html>` element.
  // Prepares the DOM layout to reserve explicit spatial gutters for native scrollbar rendering.
  html.style.scrollbarGutter = 'stable';

  // Force vertical scrollbar visibility on the active viewport scroll container.
  // Triggers visual rendering of native scrollbars to establish a baseline layout state.
  viewportScroller.style.overflowY = 'scroll';

  // Measure and record the current offset width of the active viewport scroller.
  // Captures the container width baseline while vertical scrollbars are explicitly rendered.
  const before = viewportScroller.offsetWidth;

  // Temporarily suppress vertical scrolling to test whether reserved layout space remains intact.
  // Switches the overflow mode to hidden to verify if the gutter prevents layout collapsing.
  viewportScroller.style.overflowY = 'hidden';

  // Measure and record the updated offset width of the active viewport scroller.
  // Captures the container width after hiding scrollbars to detect any unwanted layout shift.
  const after = viewportScroller.offsetWidth;

  // Restore the original `overflowY` inline style back onto the active viewport scroller.
  // Cleans up temporary test styles and reverts the container to its initial scroll behavior.
  viewportScroller.style.overflowY = originalViewportScrollerOverflowY;

  // Restore the original `scrollbarGutter` inline style back onto the root `<html>` element.
  // Guarantees zero persistent side effects on root-level document styles following the check.
  html.style.scrollbarGutter = originalHtmlStyleGutter;

  // Compare measured container widths between scrollable and hidden overflow conditions.
  // Equal measurements confirm stable scrollbar gutters reliably prevent visual layout shifts.
  return before === after;
};
