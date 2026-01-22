import type { PossibleStyle } from './merge-styles.types';
import type { PossibleStyle as _PossibleStyle } from '@entry-ui/utilities/merge-styles';
import type { CSSProperties } from '@qwik.dev/core';
import { mergeStyles as _mergeStyles } from '@entry-ui/utilities/merge-styles';

/**
 * Merges multiple style values into a single, unified style object.
 *
 * This function consolidates a variety of style formats (inline strings, CSS objects,
 * or undefined) into a single `CSSProperties` object. It ensures that all property
 * keys are normalized to camelCase (preserving CSS variables and handling vendor
 * prefixes appropriately) to remain compatible with JavaScript-based styling engines.
 * The merging process follows the CSS cascade principle: styles appearing later in
 * the array will override matching properties from earlier styles.
 */
export const mergeStyles = (styles: PossibleStyle[]) => {
  return _mergeStyles(styles as _PossibleStyle[]) as CSSProperties;
};
