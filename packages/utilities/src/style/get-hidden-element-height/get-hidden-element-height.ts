import { getCssDimensions } from '../get-css-dimensions';
import { getMeasurableAncestorWidth } from './_internal/get-measurable-ancestor-width';
import { isolateClonedElement } from './_internal/isolate-cloned-element';

/**
 * Calculates the natural height of an element that is otherwise hidden from the layout.
 *
 * This utility resolves accurate vertical dimensions for unrendered or hidden elements (such as those
 * with `display: none`) that lack independent layout geometry. It achieves this by creating a deep,
 * sanitized clone of the target element, resolving its proper width constraints via ancestor inspection,
 * and temporarily injecting it off-screen into the DOM.
 *
 * The clone is rendered layout-neutral, non-interactive, and hidden from accessibility trees by overriding
 * positioning, display, visibility, and interaction attributes. Once the natural height is measured using
 * reconciled spatial dimensions, the temporary node is immediately removed to preserve DOM integrity.
 *
 * @example
 * ```ts
 * const element = document.querySelector<HTMLElement>("#hidden-element");
 *
 * // Retrieve the natural height of the hidden element.
 * if (element) {
 *   const height = getHiddenElementHeight(element);
 * }
 * ```
 */
export const getHiddenElementHeight = (element: HTMLElement) => {
  // Resolve a valid measurable width by inspecting the element or its parent hierarchy.
  // Ensures the clone receives appropriate layout constraints when the original element is hidden.
  const measurableWidth = getMeasurableAncestorWidth(element);

  // Create a deep clone of the target element to measure its natural dimensions safely.
  // Captures all nested structure without altering or disrupting the original node.
  const cloneElement = element.cloneNode(true) as HTMLElement;

  // Sanitize the cloned element subtree by stripping sensitive attributes and IDs.
  // Prevents duplicate-ID collisions and input group conflicts in the active DOM.
  isolateClonedElement(cloneElement);

  // Hide the cloned element from accessibility trees using the `aria-hidden` attribute.
  // Ensures screen readers ignore the temporary measurement node completely.
  cloneElement.setAttribute('aria-hidden', 'true');

  // Mark the cloned element as inert to block all user interactions and events.
  // Prevents focus, pointer events, and other interactions while the clone is temporarily mounted.
  cloneElement.setAttribute('inert', '');

  // Apply inline styles to render the clone layout-neutral, invisible, and positioned off-screen.
  // Overrides visibility and layout geometry so dimensions can be calculated accurately.
  Object.assign(cloneElement.style, {
    // Set the clone position to absolute to take it out of the normal document flow.
    // Prevents the temporary measurement element from affecting surrounding layout elements.
    position: 'absolute',

    // Push the cloned element far outside the visible boundary of the viewport.
    // Ensures that the temporary node is completely invisible to the user during measurement.
    top: '-9999px',

    // Constrain the clone width to match its measurable ancestor if a valid width was resolved.
    // Guarantees proper text wrapping and block sizing during the layout measurement phase.
    ...(measurableWidth !== null ? { width: `${measurableWidth}px` } : {}),

    // Force the display property to block regardless of the original hidden state (e.g., `display: none`).
    // Allows the browser to calculate proper layout dimensions and height for block-level contents.
    display: 'block',

    // Hide the element visually while still retaining its geometric layout box.
    // Ensures the browser engine fully computes dimensions without rendering pixels on screen.
    visibility: 'hidden',

    // Set the opacity to zero to guarantee the element is completely transparent.
    // Acts as an extra safeguard alongside visibility to prevent any accidental visual flicker.
    opacity: '0',

    // Override any potential content-visibility rules that might skip layout rendering optimizations.
    // Forces the browser to fully perform layout and geometry calculations for the element subtree.
    contentVisibility: 'visible',

    // Reset the height property to auto to let the element expand to its natural content size.
    // Allows accurate measurement of the full unconstrained vertical space required by the content.
    height: 'auto',

    // Remove any maximum height constraints that could artificially truncate the element.
    // Ensures the measured height reflects the true natural size without arbitrary limits.
    maxHeight: 'none',

    // Ensure overflow is set to visible so content doesn't get clipped or trigger scroll heights.
    // Allows all internal child elements to contribute fully to the container's natural height.
    overflow: 'visible',

    // Disable any CSS transitions immediately on the cloned element.
    // Prevents asynchronous rendering delays or intermediate animation states from skewing the height value.
    transition: 'none',

    // Stop any active CSS animations from running on the temporary clone node.
    // Guarantees a static layout snapshot without fluctuating animation frames affecting the measurement.
    animation: 'none',
  });

  // Insert the prepared invisible clone into the document immediately after the original element.
  // Temporarily mounts the node to allow the browser engine to compute its true layout dimensions.
  element.after(cloneElement);

  // Measure and extract the reconciled height dimensions of the cloned DOM element.
  // Utilizes the specialized dimension utility to account for subpixel rounding and layout boundaries.
  const { height } = getCssDimensions(cloneElement);

  // Remove the temporary clone from the document immediately after capturing its height.
  // Keeps the DOM clean and prevents memory leaks or unwanted layout remnants.
  cloneElement.remove();

  // Return the calculated natural height value of the hidden target element.
  // Fulfills the utility contract for retrieving accurate dimensions of unrendered elements.
  return height;
};
