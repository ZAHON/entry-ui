/**
 * Configuration object for the `isViewportScrollLocked` utility.
 *
 * This interface encapsulates the target `Window` object reference alongside the root `<html>`
 * and `<body>` element references required to resolve the active viewport scroller
 * and evaluate its vertical scroll lock state.
 */
export interface IsViewportScrollLockedParams {
  /**
   * The target `Window` object context.
   * Provides access to the active execution context's `getComputedStyle` API, ensuring
   * accurate style evaluation even across cross-frame or iframe boundaries.
   */
  win: typeof window;

  /**
   * The root `<html>` element of the document.
   * Evaluated by the scroller resolution engine to check for explicit root-level overflow
   * rules that override default document-level scroll propagation.
   */
  html: HTMLElement;

  /**
   * The document `<body>` element.
   * Acts as the fallback viewport scroll target when the root `<html>` element does not
   * establish its own independent scroll container.
   */
  body: HTMLElement;
}
