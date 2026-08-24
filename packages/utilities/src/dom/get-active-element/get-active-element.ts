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
  // Retrieve the initial active element from the provided top-level `Document` context.
  // This serves as the starting node for deep Shadow DOM traversal.
  let activeElement = doc.activeElement;

  // Continuously inspect the current active element to check if it hosts an open `shadowRoot` with its own active element.
  // The loop continues drilling down until it reaches the deepest focused leaf node in the DOM tree.
  while (activeElement?.shadowRoot?.activeElement != null) {
    // Re-assign the active element reference to the focused element nested within the target `shadowRoot`.
    // This traverses down another level into the shadow DOM hierarchy.
    activeElement = activeElement.shadowRoot.activeElement;
  }

  // Return the ultimate focused element, which may be a standard DOM node or a deeply nested Shadow DOM node.
  // If no element currently holds focus, this safely resolves to `null`.
  return activeElement;
};
