/**
 * Retrieves the document object associated with a given DOM node, ensuring the correct execution context.
 *
 * This utility identifies the correct owner document for a specific node. It is
 * particularly useful when working with applications that utilize iframes or
 * multiple windows, as it ensures that document-level APIs (like `createElement`,
 * `getElementById`, or `addEventListener`) are accessed from the node's actual
 * environment rather than the current global document.
 *
 * @example
 * ```ts
 * getDocument(document.getElementById("my-element"));
 * // Returns: the document object where the element resides
 *
 * getDocument(null);
 * // Returns: the global document object as a fallback
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDocument = (node: any): Document => {
  return node?.ownerDocument || document;
};
