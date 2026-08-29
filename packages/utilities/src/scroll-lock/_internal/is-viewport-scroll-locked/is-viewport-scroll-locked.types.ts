/**
 * Represents the configuration parameters required by the internal `isViewportScrollLocked` utility.
 *
 * This interface defines the essential execution context and element reference fields needed to evaluate
 * the vertical scroll lock state of the document viewport. It pairs the target `Window` object context
 * with the root `<html>` and `<body>` elements to properly resolve active scroller styles.
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
