/**
 * Configuration object for the `scrollIntoViewIfNeeded` utility.
 *
 * This interface encapsulates the parameters required to ensure an element's visibility.
 * It provides a structured way to pass the target element and visual alignment
 * preferences, allowing the utility to choose between native Chromium/WebKit
 * implementations or a standard CSSOM Scroll Customization fallback.
 */
export interface ScrollIntoViewIfNeededParams {
  /**
   * The DOM element to be brought into the visible area of the viewport.
   * This is the primary target for the scroll operation, ensuring the element
   * is accessible to the user's current line of sight.
   */
  element: HTMLElement;

  /**
   * Controls the positioning logic for the scroll alignment.
   * When set to `true`, the utility attempts to place the element in the dead center
   * of the viewport. When `false`, it uses the `"nearest"` alignment strategy,
   * minimizing movement if the element is already partially visible.
   *
   * @default true
   */
  center?: boolean;
}

/**
 * Type extension for the `HTMLElement` interface to include non-standard scroll methods.
 *
 * This interface is used for type casting and safety checks when interacting with
 * browser-specific DOM APIs. It explicitly defines the `scrollIntoViewIfNeeded`
 * method, which is natively supported in Chromium and WebKit-based engines but
 * missing from the standard TypeScript `HTMLElement` definition.
 */
export interface HTMLElementWithScrollIntoViewIfNeeded extends HTMLElement {
  /**
   * A non-standard, Chromium and WebKit-specific method that scrolls the element
   * into the visible area of the browser window only if it is not already within
   * the current viewport.
   */
  scrollIntoViewIfNeeded: (centerIfNeeded?: boolean) => void;
}
