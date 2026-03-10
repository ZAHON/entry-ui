/**
 * Recursively retrieves the currently focused element, including those nested within Shadow DOM.
 *
 * Unlike the standard `document.activeElement`, which only returns the host element
 * of a Shadow Root, this utility traverses through any available `shadowRoot` to
 * pinpoint the actual element that holds focus deep within the DOM tree.
 *
 * @example
 * ```ts
 * // If focus is inside a web component's shadow DOM:
 * getActiveElement(document);
 * // Returns: <input /> (inside shadow root)
 *
 * // Standard approach would only return:
 * document.activeElement;
 * // Returns: <my-custom-component /> (the host)
 * ```
 */
export const getActiveElement = (doc: Document) => {
  let activeElement = doc.activeElement;

  while (activeElement?.shadowRoot?.activeElement != null) {
    activeElement = activeElement.shadowRoot.activeElement;
  }

  return activeElement;
};
