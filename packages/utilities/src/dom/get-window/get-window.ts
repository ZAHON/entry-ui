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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getWindow = (node: any): typeof window => {
  return node?.ownerDocument?.defaultView || window;
};
