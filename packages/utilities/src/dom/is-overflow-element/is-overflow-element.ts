import { getComputedStyle } from '../../style/get-computed-style';

/**
 * Determines whether an element acts as an overflow or scroll container for its content.
 *
 * This utility checks if an element's computed CSS properties enable scrollbars or content clipping.
 * It also filters out elements with layout modes like `inline` or `contents`, which cannot physically
 * contain or clip overflowing child elements.
 *
 * @example
 * ```ts
 * const container = document.querySelector("#container");
 *
 * // Check if an element manages overflow or scroll boundaries.
 * if (container && isOverflowElement(container)) {
 *   // Safe to use as a scroll boundary or containment target.
 * }
 * ```
 */
export const isOverflowElement = (element: Element) => {
  // Extract and cache the resolved layout and overflow CSS properties from the target element.
  // We inspect both generic (`overflow`) and axis-specific (`overflowX`, `overflowY`) rules
  // along with `display` to accurately determine how the browser constructs the element's box model.
  const { overflow, overflowX, overflowY, display } = getComputedStyle(element);

  return (
    // Execute a regex test against the concatenated string of all overflow property values.
    // Matching keywords like `auto`, `scroll`, `overlay`, `hidden`, or `clip` confirms that at least
    // one axis actively intercepts, clips, or renders scrollbars for overflowing child content.
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
    // Exclude inline elements (`display: inline`).
    // Standard inline boxes do not form independent block formatting contexts and cannot contain
    // or scroll overflowing content, causing CSS overflow rules to be silently ignored by layout engines.
    display !== 'inline' &&
    // Exclude elements using `display: contents`.
    // This value suppresses the generation of the element's own principal box in the render tree,
    // causing it to render only its children and effectively rendering its overflow properties completely inert.
    display !== 'contents'
  );
};
