import type * as CSS from 'csstype';

/**
 * A set of CSS properties used to hide an element visually while keeping it
 * accessible to screen readers.
 *
 * This utility is essential for providing additional context to assistive
 * technologies without affecting the visual layout. It uses a combination of
 * clipping, overflow, and absolute positioning to ensure the element has
 * dimensions of 1x1 pixel but remains "visible" in the accessibility tree.
 *
 * @example
 * ```tsx
 * const SearchButton = () => (
 * 	<button type="button">
 * 		<Icon name="search" />
 * 		<span style={visuallyHiddenStyle}>Search</span>
 * 	</button>
 * );
 * ```
 */
export const visuallyHiddenStyle = Object.freeze({
  clipPath: 'inset(50%)',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1,
  position: 'fixed',
  top: 0,
  left: 0,
}) satisfies CSS.Properties<string | number>;
