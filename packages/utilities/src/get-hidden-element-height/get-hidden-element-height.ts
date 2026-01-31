import { getCssDimensions } from '../get-css-dimensions';

/**
 * Calculates the natural height of an element that is otherwise hidden from the layout.
 *
 * This function handles cases where an element's dimensions cannot be accurately measured
 * (e.g., when it is set to `display: none` and occupies no space in the document). It
 * works by creating an invisible, deep clone of the element and temporarily injecting
 * it into the DOM at a position far outside the visible viewport.
 *
 * The clone is styled to be non-interactive and layout-neutral by overriding its display,
 * positioning, and visibility properties. This ensures that its presence does not
 * interfere with the user experience, trigger unintended layout shifts, or affect
 * accessibility trees. Once the height is captured, the clone is immediately removed
 * from the document to maintain DOM cleanliness.
 *
 * @example
 * ```ts
 * getHiddenElementHeight(myHiddenElement);
 * // Returns: 42
 * ```
 */
export const getHiddenElementHeight = (element: HTMLElement) => {
  const cloneElement = element.cloneNode(true) as HTMLElement;

  cloneElement.setAttribute('aria-hidden', 'true');

  Object.assign(cloneElement.style, {
    pointerEvents: 'none',
    userSelect: 'none',
    overflow: 'visible',
    height: 'auto',
    maxHeight: 'none',
    opacity: '0',
    visibility: 'hidden',
    display: 'block',
    contentVisibility: 'visible',
    transition: 'none',
    animation: 'none',
    position: 'absolute',
    top: '-9999px',
  });

  element.after(cloneElement);

  const { height } = getCssDimensions(cloneElement);

  cloneElement.remove();

  return height;
};
