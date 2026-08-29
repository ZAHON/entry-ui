/**
 * Represents the configuration parameters required by the internal `isStableScrollbarGutterSupported` utility.
 *
 * This interface defines the essential element reference fields needed to identify the active viewport scroll container
 * and verify runtime layout support for the CSS `scrollbar-gutter: stable` property. It ensures reliable feature
 * testing by pairing the root `<html>` element with the document `<body>` element.
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
