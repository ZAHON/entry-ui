import type * as CSS from 'csstype';

/**
 * Visually hides an input element while keeping it functional and accessible.
 *
 * Commonly used for styling native checkboxes, radio buttons, or file inputs
 * by hiding the default browser element and replacing it with a custom-styled
 * UI, while ensuring the underlying input remains focusable and reachable
 * by assistive technologies.
 *
 * @example
 * ```tsx
 * const CustomCheckbox = () => (
 * 	<>
 * 		<input type="checkbox" id="terms" style={visuallyHiddenInputStyle} />
 * 		<label htmlFor="terms">I agree to the terms</label>
 * 	</>
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
