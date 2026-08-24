/**
 * Retrieves the document object associated with a given DOM node, ensuring the correct execution context.
 *
 * This utility identifies the correct owner document for a specific node. It is particularly useful when working
 * with applications that utilize iframes or multiple windows, as it ensures that document-level APIs (like
 * `createElement`, `getElementById`, or `addEventListener`) are accessed from the node's actual environment
 * rather than the current global document.
 *
 * @example
 * ```ts
 * const element = document.querySelector('#my-element');
 *
 * // Access document-level APIs from the element's actual owner environment.
 * const doc = getDocument(element);
 * ```
 */
export const getDocument = (node: Node | null | undefined) => {
  // Access the `ownerDocument` property to retrieve the document instance where the `node` lives.
  // If the `node` is `null`, `undefined`, or detached from a specific context, fallback to the global `document`.
  return node?.ownerDocument || document;
};
