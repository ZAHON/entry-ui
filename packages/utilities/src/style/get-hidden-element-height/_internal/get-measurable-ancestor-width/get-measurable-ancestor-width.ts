import { getContentBoxWidth } from '../../../get-content-box-width';

/**
 * An internal utility that resolves a valid measurable width by inspecting the element's content-box width or walking up its ancestor chain.
 *
 * This utility is essential when dealing with hidden or unrendered elements (e.g., those with `display: none`)
 * that lack independent layout geometry. It first evaluates the target element's content-box width; if it evaluates
 * to zero, it iteratively traverses up the DOM tree through parent elements until it identifies the nearest ancestor
 * with a positive, measurable width.
 */
export const getMeasurableAncestorWidth = (element: Element) => {
  // Evaluate the content-box width of the target element itself.
  // Returns a positive value if the element already possesses layout dimensions.
  const ownWidth = getContentBoxWidth(element);

  // Return the element's own content width immediately if it is measurable.
  // Avoids unnecessary DOM traversal when the element already has a valid width.
  if (ownWidth > 0) {
    return ownWidth;
  }

  // Initialize a reference to the element's immediate parent element.
  // Serves as the starting point for traversing up the DOM ancestor chain.
  let parent = element.parentElement;

  // Iteratively traverse up through parent elements to find a container with a valid width.
  // Essential for hidden elements (like `display: none`) whose width depends on an enclosing parent.
  while (parent) {
    // Measure the content-box width of the current ancestor element.
    // Checks if the parent provides explicit layout boundaries.
    const parentWidth = getContentBoxWidth(parent);

    // Return the parent's width if a valid positive measurement is found.
    // Halts traversal early once a measurable container is identified.
    if (parentWidth > 0) {
      return parentWidth;
    }

    // Move one level higher up the DOM tree to the next parent element.
    // Continues the search loop toward the root of the document if necessary.
    parent = parent.parentElement;
  }

  // Return `null` if no measurable width could be resolved from the element or its ancestors.
  // Falls back gracefully when the element and all its parents lack layout bounds.
  return null;
};
