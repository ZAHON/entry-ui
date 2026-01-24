import type { PossibleStyle } from './merge-styles.types';

/**
 * Merges multiple style values into a single, unified style object.
 *
 * This function consolidates a variety of style formats (inline strings, object records,
 * or undefined) into a single object. It ensures that all property keys are normalized
 * to camelCase or PascalCase where appropriate (e.g., handling vendor prefixes like
 * `-webkit-` as `Webkit` and `-ms-` as `ms`), while preserving CSS custom properties.
 *
 * The parser intelligently handles complex string values like `calc()` or `url()` to
 * ensure semicolons within them do not break the merging process. Following the CSS
 * cascade principle, styles appearing later in the array will override matching
 * properties from earlier ones.
 *
 * @example
 * ```ts
 * mergeStyles(["color: red; margin-top: 10px;", { marginTop: "20px", "--spacing-unit": "20px" }]);
 * // Returns: { color: "red", marginTop: "20px", "--spacing-unit": "20px" }
 * ```
 */
export const mergeStyles = (styles: PossibleStyle[]) => {
  // Short-circuit if no styles are provided to avoid unnecessary processing.
  if (styles.length === 0) return {};

  return styles.reduce<Record<string, string | number | undefined>>((acc, style) => {
    // Skip nullish values (`null`, `undefined`) which are common in conditional styling.
    if (!style) return acc;

    let styleObject: Record<string, string | number | undefined>;

    // Case 1: Handle inline style strings (e.g., `"color: red; margin-top: 10px"`).
    if (typeof style === 'string') {
      styleObject = {};
      const declarations: string[] = [];
      let currentDeclaration = '';
      let parenDepth = 0;

      // Manual tokenizer that splits declarations by semicolon while respecting
      // parentheses. This ensures that semicolons inside `calc()`, `url()`, or
      // data URIs do not break the parsing logic.
      for (let i = 0; i < style.length; i++) {
        const char = style[i];

        if (char === '(') {
          parenDepth++;
          currentDeclaration += char;
        } else if (char === ')') {
          parenDepth--;
          currentDeclaration += char;
        } else if (char === ';' && parenDepth === 0) {
          // Found a valid declaration boundary.
          if (currentDeclaration.trim()) {
            declarations.push(currentDeclaration.trim());
          }
          currentDeclaration = '';
        } else {
          currentDeclaration += char;
        }
      }

      // Capture the remaining part if the string doesn't end with a semicolon.
      if (currentDeclaration.trim()) {
        declarations.push(currentDeclaration.trim());
      }

      // Convert `"property: value"` pairs into object entries.
      for (const declaration of declarations) {
        const colonIndex = declaration.indexOf(':');
        if (colonIndex === -1) continue; // Skip malformed declarations.

        const property = declaration.slice(0, colonIndex).trim();
        const value = declaration.slice(colonIndex + 1).trim();

        if (property && value) {
          styleObject[property] = value;
        }
      }
    } else {
      // Case 2: Style is already an object, use it directly for normalization.
      styleObject = style;
    }

    // Normalization Loop:
    // Converts kebab-case keys and vendor prefixes into JS-friendly camelCase/PascalCase.
    for (const [key, value] of Object.entries(styleObject)) {
      // CSS Custom Properties (Variables) should remain in kebab-case.
      if (key.startsWith('--')) {
        acc[key] = value;
        continue;
      }

      let normalizedKey: string;

      if (key.startsWith('-')) {
        const withoutPrefix = key.slice(1);

        // Special handling for Internet Explorer prefix.
        // In JS style objects, `"-ms-property"` becomes `"msProperty"` (lowercase 'm').
        if (withoutPrefix.startsWith('ms-')) {
          const rest = withoutPrefix.slice(3);
          normalizedKey =
            'ms' +
            rest.charAt(0).toUpperCase() +
            rest.slice(1).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        } else {
          // Standard vendor prefixes (e.g., `-webkit-`, `-moz-`, `-o-`).
          // These are normalized to PascalCase (e.g., `"WebkitTransform"`).
          normalizedKey =
            withoutPrefix.charAt(0).toUpperCase() +
            withoutPrefix.slice(1).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        }
      } else {
        // Standard CSS properties: convert `"background-color"` to `"backgroundColor"`.
        normalizedKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      }

      // Later styles in the array will overwrite earlier ones.
      acc[normalizedKey] = value;
    }

    return acc;
  }, {});
};
