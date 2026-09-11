/**
 * An internal utility that sanitizes and isolates a cloned DOM element and its descendants.
 *
 * This utility ensures that temporary clones injected into the document for measurement purposes
 * do not interfere with the original document state. It strips out duplicate identifiers and
 * unlinks radio/checkbox group names to prevent unintended side effects on user interaction or DOM queries.
 */
export const isolateClonedElement = (element: Element) => {
  // Define a helper function to sanitize sensitive attributes on a cloned node.
  // Prevents ID collisions and input group conflicts while the clone is temporarily active in the DOM.
  const isolateNode = (node: Element) => {
    // Remove the `id` attribute to avoid duplicate-ID collisions in the document.
    // Ensures that queries or anchors targeting IDs remain unaffected by the invisible clone.
    node.removeAttribute('id');

    // Prevent `radio` and `checkbox` inputs from sharing grouping state with the original elements.
    // Retaining the `name` attribute would cause the browser to uncheck the original interactive inputs.
    if (node instanceof HTMLInputElement && (node.type === 'radio' || node.type === 'checkbox')) {
      node.removeAttribute('name');
    }
  };

  // Isolate the root cloned node itself before traversing its descendants.
  // `TreeWalker` only inspects children and descendants, requiring separate handling for the root element.
  isolateNode(element);

  // Initialize a tree walker to traverse all descendant element nodes within the clone.
  // Allows efficient inspection and sanitization of every nested element inside the container.
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT);

  // Retrieve the first descendant node in the traversal sequence.
  // Starts the iterative sanitization loop across the cloned element subtree.
  let node = walker.nextNode();

  // Iterate through all remaining descendant nodes in the tree walker queue.
  // Cleans up attributes across the entire cloned subtree to ensure complete isolation.
  while (node) {
    // Explicitly assert the node type as `Element` to bypass TypeScript's type definition limitations.
    // Although `NodeFilter.SHOW_ELEMENT` guarantees at runtime that only elements are returned,
    // TypeScript types `walker.nextNode()` broadly as `Node | null,` making this safe assertion necessary.
    isolateNode(node as Element);

    // Advance the tree walker to the next matching element node in the cloned subtree.
    // Updates the loop reference to proceed with sanitizing subsequent child nodes.
    node = walker.nextNode();
  }
};
