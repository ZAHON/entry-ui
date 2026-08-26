import type * as CSS from 'csstype';

/**
 * Defines the immutable CSS property object used to visually hide an element while preserving accessibility.
 *
 * This object encapsulates spatial clipping and positioning rules that strip an element of its visual layout footprint
 * without removing it from the accessibility tree. It combines fixed positioning, zeroed padding and borders, a 1x1 pixel bounding box,
 * and inset clipping to ensure assistive technologies can still announce hidden context (such as screen-reader-only labels).
 *
 * @example
 * ```tsx
 * // Visually hide the label text while maintaining screen reader accessibility.
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
