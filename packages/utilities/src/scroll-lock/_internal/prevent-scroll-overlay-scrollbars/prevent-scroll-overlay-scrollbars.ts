import type { PreventScrollOverlayScrollbarsParams } from './prevent-scroll-overlay-scrollbars.types';
import { getViewportScroller } from '../get-viewport-scroller';

/**
 * An internal utility that prevents viewport scrolling in overlay scrollbar environments by disabling scroll overflow.
 *
 * This utility is designed specifically for platforms with floating/overlay scrollbars (e.g., macOS, iOS, or systems with auto-hiding bars),
 * where disabling overflow does not cause layout shifts. It resolves the active viewport scroller, locks scrolling across
 * both axes, and returns a cleanup function that restores previous inline styles and purges empty `style` attributes.
 */
export const preventScrollOverlayScrollbars = (params: PreventScrollOverlayScrollbarsParams) => {
  const { html, body } = params;

  // Resolve whether the root `<html>` or `<body>` element currently acts as the main viewport scroll container.
  // Guarantees scroll prevention rules are targeted directly at the active scrolling element.
  const viewportScroller = getViewportScroller({ html, body });

  // Read and store the active scroller's original inline `overflowY` and `overflowX` style properties.
  // Preserves existing axis-specific scroll configurations to enable accurate cleanup upon restoration.
  const originalOverflowY = viewportScroller.style.overflowY;
  const originalOverflowX = viewportScroller.style.overflowX;

  // Suppress scroll interactions along both axes by explicitly setting inline overflow styles to hidden.
  // Completely locks horizontal and vertical viewport scrolling for overlay components.
  viewportScroller.style.overflowY = 'hidden';
  viewportScroller.style.overflowX = 'hidden';

  // Return a cleanup restoration function that encapsulates the original scroll states and DOM cleanup logic.
  // Provides a deterministic mechanism to revert inline overflow modifications and purge empty style attributes when scroll lock ends.
  return () => {
    // Revert the active viewport scroller's inline `overflowY` and `overflowX` properties back to their initial values.
    // Restores original scrollability and layout interaction behavior across both axes.
    viewportScroller.style.overflowY = originalOverflowY;
    viewportScroller.style.overflowX = originalOverflowX;

    // Check if any inline styles remain on the active viewport scroll container after resetting overflow.
    // Removes the empty `style` attribute entirely to keep the DOM tree clean when no other inline styles exist.
    if (viewportScroller.style.length === 0) {
      viewportScroller.removeAttribute('style');
    }
  };
};
