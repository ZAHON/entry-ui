import type { CSSProperties } from '@qwik.dev/core';
import { mergeStyles as _mergeStyles } from '@entry-ui/utilities/merge-styles';

/**
 * Merges multiple style values into a single, unified style object.
 *
 * This function consolidates a variety of style formats—such as standard inline CSS strings,
 * structured `CSSProperties` objects, or `undefined` for conditional styling—into a single
 * normalized `CSSProperties` object.
 *
 * It ensures that all property keys are correctly transformed and normalized (converting kebab-case
 * to camelCase, handling vendor prefixes appropriately, and preserving CSS variables) to remain
 * fully compatible with JavaScript-based styling engines and Qwik components.
 *
 * The merging follows the CSS cascade principle: styles appearing later in the input array will
 * override matching properties from earlier styles.
 */
export const mergeStyles = (styles: (string | CSSProperties | undefined)[]) => {
  return _mergeStyles(styles as (string | Record<string, string | number | undefined> | undefined)[]) as CSSProperties;
};
