import type { PreventScrollInsetScrollbarsParams } from './prevent-scroll-inset-scrollbars.types';
import { createAnimationFrame } from '../create-animation-frame';
import { isWebKit } from '../is-webkit';
import { getViewportScroller } from '../get-viewport-scroller';
import { isStableScrollbarGutterSupported } from '../is-stable-scrollbar-gutter-supported';

/**
 * Prevents viewport scrolling in inset scrollbar environments while preserving layout stability.
 *
 * Designed specifically for platforms with classic, physical inset scrollbars where hiding scrollbars
 * typically triggers unwanted content shifts (layout jitter). It leverages modern native `scrollbar-gutter: stable`
 * support when available, or seamlessly falls back to dynamic dimensional compensation and body locking.
 * A teardown cleanup function is returned to restore original inline styles, scroll positions, and DOM attributes.
 *
 * @example
 * ```ts
 * // Lock viewport scrolling without triggering layout shifts when displaying a modal dialog.
 * const restoreScroll = preventScrollInsetScrollbars({
 *   win: window,
 *   html: document.documentElement,
 *   body: document.body,
 * });
 *
 * // Later, restore original layout dimensions and scrolling behavior upon closing.
 * restoreScroll();
 * ```
 */
export const preventScrollInsetScrollbars = (params: PreventScrollInsetScrollbarsParams) => {
  const { win, html, body } = params;

  // Track the absolute scroll coordinates prior to activating the scroll lock mechanism.
  // Preserved to accurately restore vertical and horizontal scroll positions upon teardown.
  let scrollTop = 0;
  let scrollLeft = 0;

  // Flag indicating whether scroll lock can rely purely on the native `scrollbar-gutter` property.
  // When `false`, the utility falls back to manual layout position locking and dynamic dimension calculations.
  let updateGutterOnly = false;

  // Preserve initial inline style rules defined directly on the root `<html>` element.
  // Ensures exact visual baseline restoration when removing active scroll locks during cleanup.
  let originalHtmlScrollbarGutter = '';
  let originalHtmlOverflowY = '';
  let originalHtmlOverflowX = '';
  let originalHtmlScrollBehavior = '';

  // Preserve initial inline layout and styling properties applied directly to the document `<body>`.
  // Restored during teardown to prevent disrupting existing layout boundaries or position context.
  let originalBodyPosition = '';
  let originalBodyHeight = '';
  let originalBodyWidth = '';
  let originalBodyBoxSizing = '';
  let originalBodyOverflowY = '';
  let originalBodyOverflowX = '';
  let originalBodyScrollBehavior = '';

  // Dedicated animation frame request controller for batching window resize adjustments.
  // Throttles layout recalculations to match native rendering frames and prevent layout thrashing.
  const resizeFrame = createAnimationFrame();

  // Pinch-zoom in Safari causes a shift. Just don't lock scroll if there's any pinch-zoom.
  // Immediately returns a safe no-op teardown function to abort execution when pinch-zoomed in WebKit.
  if (isWebKit() && (win.visualViewport?.scale ?? 1) !== 1) {
    return () => void 0;
  }

  // Core handler responsible for locking viewport scrolling and maintaining layout alignment.
  // Evaluates current DOM metrics before applying style overrides to freeze document movement without visual shifts.
  const lockScroll = () => {
    // *********************************************************************************************************
    // * DOM reads                                                                                             *
    // * All DOM layout queries, computed style evaluations, and element dimension measurements are performed  *
    // * here upfront. Batching read operations before writing prevents forced synchronous layouts and costly  *
    // * browser reflow thrashing.                                                                             *
    // *********************************************************************************************************

    // Retrieve resolved runtime CSS computed styles for both the `<html>` and `<body>` elements.
    // Provides read-only access to current padding, margins, overflow, and scrollbar configurations.
    const htmlStyles = win.getComputedStyle(html);
    const bodyStyles = win.getComputedStyle(body);

    // Extract runtime computed `scrollbar-gutter` property string from root `<html>` element.
    // Resolves fallback empty string when property is unsupported or undeclared in stylesheet.
    const htmlScrollbarGutterValue = htmlStyles.scrollbarGutter || '';

    // Check if the current page styling explicitly includes symmetric `both-edges` scrollbar gutters.
    // Determines whether space reservation must apply across both screen edges or just the primary edge.
    const hasBothEdges = htmlScrollbarGutterValue.includes('both-edges');

    // Construct target CSS `scrollbar-gutter` value string based on existing edge rules.
    // Ensures existing double-sided gutters are preserved when locking layout scrollability.
    const scrollbarGutterValue = hasBothEdges ? 'stable both-edges' : 'stable';

    // Read and store current active viewport scroll coordinates from the root `<html>` element.
    // Captures exact offsets to restore scroll position cleanly during unlock or apply during fallback locks.
    scrollTop = html.scrollTop;
    scrollLeft = html.scrollLeft;

    // Snapshot current inline CSS style overrides configured directly on the root `<html>` element.
    // Preserves author-defined inline scrollbar and overflow properties to ensure complete teardown fidelity.
    originalHtmlScrollbarGutter = html.style.scrollbarGutter;
    originalHtmlOverflowY = html.style.overflowY;
    originalHtmlOverflowX = html.style.overflowX;
    originalHtmlScrollBehavior = html.style.scrollBehavior;

    // Snapshot current inline layout and box model inline properties set on the document `<body>` element.
    // Preserves author-defined dimension limits, positioning rules, and overflow settings for restoration.
    originalBodyPosition = body.style.position;
    originalBodyHeight = body.style.height;
    originalBodyWidth = body.style.width;
    originalBodyBoxSizing = body.style.boxSizing;
    originalBodyOverflowY = body.style.overflowY;
    originalBodyOverflowX = body.style.overflowX;
    originalBodyScrollBehavior = body.style.scrollBehavior;

    // Evaluate whether the document content currently overflows the root viewport dimensions.
    // Detects whether vertical or horizontal scrollbars were actively rendered prior to locking.
    const isScrollableY = html.scrollHeight > html.clientHeight;
    const isScrollableX = html.scrollWidth > html.clientWidth;

    // Check if explicit `scroll` overflow behavior is enforced via stylesheet rules on `<html>` or `<body>`.
    // Determines whether scrollbar tracks must remain reserved even if content fits inside the viewport.
    const hasConstantOverflowY = htmlStyles.overflowY === 'scroll' || bodyStyles.overflowY === 'scroll';
    const hasConstantOverflowX = htmlStyles.overflowX === 'scroll' || bodyStyles.overflowX === 'scroll';

    // Calculate vertical and horizontal scrollbar dimensions by measuring window boundaries against body client sizes.
    // Clamped with `Math.max` to zero to prevent invalid negative values caused by specific sub-pixel or Firefox layout bugs.
    const scrollbarWidth = Math.max(0, win.innerWidth - body.clientWidth);
    const scrollbarHeight = Math.max(0, win.innerHeight - body.clientHeight);

    // Calculate total vertical and horizontal computed margins applied directly to the document `<body>`.
    // Accounts for default or custom element margins to prevent visual layout shifts and unwanted edge whitespace during scroll locking.
    const marginY = parseFloat(bodyStyles.marginTop) + parseFloat(bodyStyles.marginBottom);
    const marginX = parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight);

    // Resolve whether the root `<html>` or `<body>` element currently acts as the active viewport scroll container.
    // Ensures targeted style overrides for overflow and scrollbar locking are applied to the correct DOM node.
    const viewportScroller = getViewportScroller({ html, body });

    // Evaluate runtime browser engine support for stable native scrollbar gutters in the current layout context.
    // Determines whether scroll locking can rely purely on native CSS properties or must use fixed dimension overrides.
    updateGutterOnly = isStableScrollbarGutterSupported({ html, body });

    // *********************************************************************************************************
    // * DOM writes                                                                                            *
    // * All inline style modifications, dimension mutations, and attribute assignments are isolated in this   *
    // * section. Do not read DOM measurements past this point; mixing writes and reads invalidates geometry   *
    // * and forces layout recalcs.                                                                            *
    // *********************************************************************************************************

    // Fast-path execution branch for modern browsers supporting native `scrollbar-gutter` stability.
    // Avoids invasive `<body>` element positioning overrides by relying entirely on native engine space reservation.
    if (updateGutterOnly) {
      // Reserve native inline scrollbar space on the root `<html>` element to prevent layout reflow.
      // Keeps page content aligned without needing manual width or padding adjustments.
      html.style.scrollbarGutter = scrollbarGutterValue;

      // Disable scrolling capability on the target viewport scroller node.
      // Prevents user scroll interaction while reserving the scrollbar track space.
      viewportScroller.style.overflowY = 'hidden';
      viewportScroller.style.overflowX = 'hidden';

      // Early exit since native gutter support handles layout stability without fallback DOM mutations.
      // Skips dynamic pixel measurements, fixed positioning, and `<body>` dimension overrides.
      return;
    }

    // Apply baseline scrollbar gutter space reservation and hide active viewport scrollbars.
    // Initiates lock process for engines requiring fallback explicit dimension and position controls.
    html.style.scrollbarGutter = scrollbarGutterValue;
    html.style.overflowY = 'hidden';
    html.style.overflowX = 'hidden';

    // Force explicit vertical scrollbar tracks when content was previously scrollable or forced via CSS.
    // Prevents sudden horizontal content jumping when scrollbars disappear during lock activation.
    if (isScrollableY || hasConstantOverflowY) {
      html.style.overflowY = 'scroll';
    }

    // Force explicit horizontal scrollbar tracks when content was previously scrollable or forced via CSS.
    // Prevents sudden vertical content jumping when scrollbars disappear during lock activation.
    if (isScrollableX || hasConstantOverflowX) {
      html.style.overflowX = 'scroll';
    }

    // Lock `<body>` dimensions and positioning context to freeze layout within active viewport boundaries.
    // Compensates for hidden scrollbars using calculated viewport units (`dvh`/`vw`) and computed margin offsets.
    body.style.position = 'relative';
    body.style.height = marginY || scrollbarHeight ? `calc(100dvh - ${marginY + scrollbarHeight}px)` : '100dvh';
    body.style.width = marginX || scrollbarWidth ? `calc(100vw - ${marginX + scrollbarWidth}px)` : '100vw';
    body.style.boxSizing = 'border-box';
    body.style.overflowY = 'hidden';
    body.style.overflowX = 'hidden';
    body.style.scrollBehavior = 'unset';

    // Restore visual scroll positioning directly on the body container after freezing layout dimensions.
    // Maintains current user scroll offset when fallback mode shifts scrolling responsibility to `<body>`.
    body.scrollTop = scrollTop;
    body.scrollLeft = scrollLeft;

    // Temporarily disable smooth scroll behavior transitions on the root document element.
    // Prevents unwanted animated scrolling during locking operations and layout adjustments.
    html.style.scrollBehavior = 'unset';

    // Attach custom data attribute to mark the root DOM element as actively scroll-locked.
    // Serves as a state indicator for external component styling or global lock detection.
    html.setAttribute('data-entry-ui-scroll-locked', '');
  };

  // Teardown handler responsible for restoring original DOM inline styles and viewport state.
  // Reverts modifications made by `lockScroll` to reset elements back to their initial conditions.
  const cleanup = () => {
    // Restore original inline overflow, scrollbar-gutter, and scroll behavior styles on `<html>`.
    // Reverts document root element to its exact CSS state prior to scroll lock activation.
    html.style.scrollbarGutter = originalHtmlScrollbarGutter;
    html.style.overflowY = originalHtmlOverflowY;
    html.style.overflowX = originalHtmlOverflowX;
    html.style.scrollBehavior = originalHtmlScrollBehavior;

    // Restore original inline layout, positioning, and overflow properties on the `<body>` element.
    // Reinstates pre-lock dimensions, positioning modes, and scroll configurations for body content.
    body.style.position = originalBodyPosition;
    body.style.height = originalBodyHeight;
    body.style.width = originalBodyWidth;
    body.style.boxSizing = originalBodyBoxSizing;
    body.style.overflowY = originalBodyOverflowY;
    body.style.overflowX = originalBodyOverflowX;
    body.style.scrollBehavior = originalBodyScrollBehavior;

    // Execute viewport scroll offset restoration and attribute removal for fallback scroll locking.
    // Restores original scroll position coordinates when lock mode didn't rely purely on native gutters.
    if (!updateGutterOnly) {
      // Re-apply saved scroll coordinates directly to the root element to preserve user viewport position.
      // Prevents page jumping back to the top after teardown removes fixed body layout overrides.
      html.scrollTop = scrollTop;
      html.scrollLeft = scrollLeft;

      // Remove active scroll-lock marker attribute from the root document element.
      // Signals to external styles or components that viewport scrolling is no longer restricted.
      html.removeAttribute('data-entry-ui-scroll-locked');
    }

    // Clean up empty inline `style` attribute on `<html>` to avoid leaving unnecessary DOM artifacts.
    // Ensures root element attribute tree remains clean when no inline styles existed before locking.
    if (html.style.length === 0) {
      html.removeAttribute('style');
    }

    // Clean up empty inline `style` attribute on `<body>` to avoid leaving unnecessary DOM artifacts.
    // Ensures document body attribute tree remains clean when no inline styles existed before locking.
    if (body.style.length === 0) {
      body.removeAttribute('style');
    }
  };

  // Event handler for window resize events during active scroll lock sessions.
  // Performs teardown and schedules a fresh lock computation to match new viewport dimensions.
  const handleResize = () => {
    // Teardown current lock modifications to measure accurate baseline layout dimensions.
    // Prevents previous lock styles from distorting new viewport size calculations.
    cleanup();

    // Schedule next lock execution on the following animation frame to match screen refresh rate.
    // Batches style modifications to avoid layout thrashing during active window resizes.
    resizeFrame.request(lockScroll);
  };

  // Execute initial scroll locking setup immediately upon invoking the utility.
  // Applies inline style rules and dimensional adjustments for current viewport state.
  lockScroll();

  // Attach window resize listener to dynamically recalculate layout adjustments on viewport change.
  // Keeps scroll lock measurements accurate across screen size changes or orientation shifts.
  win.addEventListener('resize', handleResize);

  // Return teardown function to clean up side effects, event listeners, and pending frames.
  // Executed by consumer when removing scroll lock or unmounting calling component.
  return () => {
    // Cancel any scheduled animation frame request pending for viewport recalculations.
    // Prevents lock execution from running after teardown has been triggered.
    resizeFrame.cancel();

    // Restore original DOM element styles, scroll positions, and state data attributes.
    // Reverts document layout back to pre-locked state cleanly upon unmount.
    cleanup();

    // Sometimes this cleanup can run after test teardown because it is called
    // in a `setTimeout(cleanup, 0)`. Guard the returned cleanup to avoid calling
    // `removeEventListener` when it is no longer available in tests.
    if (typeof win.removeEventListener === 'function') {
      win.removeEventListener('resize', handleResize);
    }
  };
};
