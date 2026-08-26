import type * as CSS from 'csstype';

/**
 * Defines the immutable CSS property object used to visually hide form input elements while preserving interactive accessibility.
 *
 * This object encapsulates spatial clipping and absolute positioning rules that strip native form controls (such as checkboxes,
 * radio buttons, or file inputs) of their default visual representation without compromising keyboard focus or screen reader behavior.
 * It combines absolute positioning, zeroed padding and borders, a 1x1 pixel bounding box, and inset clipping to ensure
 * the underlying input remains focusable, reachable, and functional within custom UI control patterns.
 *
 * @example
 * ```tsx
 * // Visually hide a native checkbox input while preserving custom label interactivity and focus.
 * const CustomCheckbox = () => (
 *   <>
 *     <input type="checkbox" id="terms" style={visuallyHiddenInputStyle} />
 *     <label htmlFor="terms">I agree to the terms</label>
 *   </>
 * );
 * ```
 */
export const visuallyHiddenInputStyle = Object.freeze({
  clipPath: 'inset(50%)',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1,
  position: 'absolute',
}) satisfies CSS.Properties<string | number>;
