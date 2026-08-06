/**
 * Configuration object for the `preventScrollInsetScrollbars` utility.
 *
 * This interface encapsulates references to the target `Window` object context alongside
 * the root `<html>` and `<body>` element references required to identify the active element
 * responsible for scrolling the document viewport, evaluate layout dimensions, and suppress
 * viewport scrolling without layout shift.
 */
export interface PreventScrollInsetScrollbarsParams {
  /**
   * The target `Window` object context.
   * Provides access to computed styles, layout dimensions, and execution context APIs,
   * ensuring accurate measurement across cross-frame or iframe boundaries.
   */
  win: typeof window;

  /**
   * The root `<html>` element of the document.
   * Serves as the primary DOM target for native `scrollbar-gutter` properties, overflow locks,
   * and tracking global scroll-lock state attributes.
   */
  html: HTMLElement;

  /**
   * The document `<body>` element.
   * Acts as the fallback layout container and scroll target when fallback scroll locking applies,
   * allowing precise dimension recalculations and scroll position preservation.
   */
  body: HTMLElement;
}
