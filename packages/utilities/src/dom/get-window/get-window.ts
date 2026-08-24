/**
 * Retrieves the window object associated with a given DOM node, ensuring the correct execution context.
 *
 * This utility identifies the correct execution context (global window) for a specific
 * node. It is particularly useful when working with applications that utilize iframes
 * or multiple windows, as it ensures that window-level APIs and properties are
 * accessed from the node's owner document rather than the current top-level window.
 *
 * @example
 * ```ts
 * getWindow(document.getElementById("my-element"));
 * // Returns: the window object where the element resides
 *
 * getWindow(null);
 * // Returns: the global window object as a fallback
 * ```
 */
export const getWindow = (node: Node | null | undefined) => {
  // Access the `defaultView` property of the node's owner document to retrieve its associated `window` context.
  // If the `node` is `null`, `undefined`, or lacks an owner document/view, fallback to the global `window`.
  return node?.ownerDocument?.defaultView || window;
};
