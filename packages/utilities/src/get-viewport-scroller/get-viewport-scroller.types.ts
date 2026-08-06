/**
 * Configuration object for the `getViewportScroller` utility.
 *
 * This interface encapsulates the root element references required to identify the active
 * scrolling element for the document viewport. It accepts both the root `<html>` element
 * and the document `<body>` element to resolve layout overflow propagation rules properly.
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
