/**
 * Represents the configuration parameters required by the internal `getViewportScroller` utility.
 *
 * This interface defines the essential element reference fields needed to identify the active
 * scroll container for the document viewport. It enforces consistent scroll target resolution
 * across varying CSS layout configurations by pairing the root `<html>` element with the document `<body>` element.
 */
export interface GetViewportScrollerParams {
  /**
   * The root `<html>` element of the document.
   * Used to check if explicit overflow properties are declared on the root element,
   * which overrides default document-level scroll propagation.
   */
  html: HTMLElement;

  /**
   * The document `<body>` element.
   * Serves as the default viewport scroll container when the root `<html>` element
   * does not establish its own independent scroll container.
   */
  body: HTMLElement;
}
