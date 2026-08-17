/**
 * Configuration object for the `preventScrollOverlayScrollbars` utility.
 *
 * This interface encapsulates references to the root `<html>` and `<body>` elements
 * required to resolve the active viewport scroller and suppress viewport scrolling.
 */
export interface PreventScrollOverlayScrollbarsParams {
  /**
   * The root `<html>` element of the document.
   * Used as the primary layout target to apply scroll prevention styles or resolve viewport propagation rules.
   */
  html: HTMLElement;

  /**
   * The document `<body>` element.
   * Serves as the fallback viewport scroll container when the root `<html>` element
   * does not establish its own independent scroll container.
   */
  body: HTMLElement;
}
