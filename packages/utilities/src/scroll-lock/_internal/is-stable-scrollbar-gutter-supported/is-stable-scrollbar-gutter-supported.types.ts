/**
 * Configuration object for the `isStableScrollbarGutterSupported` utility.
 *
 * This interface encapsulates references to the root `<html>` and `<body>` elements
 * required to resolve the active viewport scroller and verify runtime support
 * for the CSS `scrollbar-gutter: "stable"` property.
 */
export interface IsStableScrollbarGutterSupportedParams {
  /**
   * The root `<html>` element of the document.
   * Used as the target container to apply and test `scrollbar-gutter` styles
   * and resolve viewport scroll propagation rules.
   */
  html: HTMLElement;

  /**
   * The document `<body>` element.
   * Serves as the fallback viewport scroll container when the root `<html>` element
   * does not establish its own independent scroll container.
   */
  body: HTMLElement;
}
