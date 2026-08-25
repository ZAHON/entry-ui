/**
 * An internal set of stringified boolean and falsy primitive tokens resulting from template literal interpolation.
 *
 * Used by `mergeStyles` utility to identify and ignore invalid CSS property values produced when a conditional
 * short-circuit evaluation fails inside an inline style string
 * (e.g.,  `color: ${isActive && "red"}` resulting in `"color: false"`).
 *
 * @internal
 */
const FALSY_GUARD_TOKENS = new Set(['false', 'true', 'undefined', 'null']);

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
export const mergeStyles = (
  styles: (string | Record<string, string | number | boolean | undefined> | false | undefined)[]
) => {
  // Short-circuit execution if the provided styles array is completely empty.
  // Returns a fresh empty object immediately to avoid invoking the array reduction pipeline.
  if (styles.length === 0) return {};

  // Consolidate the input array of heterogeneous style inputs into a single merged result object.
  // Uses `Array.prototype.reduce` to incrementally build up the final normalized key-value CSS map.
  return styles.reduce<Record<string, string | number | undefined>>((acc, style) => {
    // Skip nullish or falsy style entries (`null`, `undefined`, `false`) passed during conditional evaluation.
    // This safely accommodates common JSX patterns such as `isActive && { color: "red" }` or `isHovered && "margin: 0"`.
    if (!style) return acc;

    // Declare intermediate holder for parsed key-value pairs before normalization pass.
    // Stores raw properties extracted from either inline strings or object input formats.
    let styleObject: Record<string, string | number | undefined>;

    // Case 1: Process raw inline CSS string declarations (e.g., `"color: red; margin-top: 10px"`).
    // Parses key-value pairs while respecting nested functional expressions like `calc()` or `var()`.
    if (typeof style === 'string') {
      // Initialize an empty dictionary to receive extracted property-value pairs.
      // Serves as an un-normalized buffer for declarations parsed from the inline CSS string.
      styleObject = {};

      // Temporary buffer storing extracted single CSS declaration statements prior to key-value splitting.
      // Holds parsed strings like `"color: red"` or `"padding: calc(10px + 2px)"`.
      const declarations: string[] = [];

      // Accumulator string building the current CSS declaration character by character during tokenization.
      // Flushed into `declarations` whenever a top-level semicolon delimiter is encountered.
      let currentDeclaration = '';

      // Tracks nested parenthesis depth to prevent splitting on semicolons inside functions.
      // Incremented on `(` and decremented on `)` to safely isolate expressions like `url("data:image/svg+xml;...")`.
      let parenDepth = 0;

      // Perform a single-pass character scan through the inline CSS string to detect top-level declaration boundaries.
      // Maintains parenthesis tracking to ensure complex sub-expressions do not cause premature declaration splits.
      for (let i = 0; i < style.length; i++) {
        // Extract the individual character at the active index for syntax analysis.
        // Used to detect structural delimiters like parentheses and declaration-terminating semicolons.
        const char = style[i];

        if (char === '(') {
          // Increment nesting level count when entering a functional sub-expression.
          // Ensures enclosed semicolons (e.g., inside `calc()` or `url()`) are not treated as declaration boundaries.
          parenDepth++;

          // Append the opening parenthesis character to the active declaration string buffer.
          // Preserves exact expression syntax within nested functional CSS values.
          currentDeclaration += char;
        } else if (char === ')') {
          // Decrement nesting level count when exiting a functional sub-expression context.
          // Restores top-level scope tracking when all balanced parentheses close.
          parenDepth--;

          // Append the closing parenthesis character to the ongoing declaration accumulator.
          // Maintains structural integrity of closed functional expressions inside CSS properties.
          currentDeclaration += char;
        } else if (char === ';' && parenDepth === 0) {
          // Encountered a top-level semicolon marking the termination of a complete CSS declaration statement.
          // Commits the accumulated declaration text if non-empty and resets the parser buffer for the next property.
          if (currentDeclaration.trim()) {
            // Append the trimmed declaration statement to the batch list for downstream key-value parsing.
            // Ignores whitespace-only fragments resulting from trailing semicolons or multiple consecutive delimiters.
            declarations.push(currentDeclaration.trim());
          }

          // Reset the declaration buffer back to an empty string.
          // Clears state to start tokenizing the next CSS property declaration in sequence.
          currentDeclaration = '';
        } else {
          // Accumulate standard literal characters into the ongoing declaration string buffer.
          // Builds up property keys and values character-by-character during parsing.
          currentDeclaration += char;
        }
      }

      // Capture any lingering declaration fragment if the input CSS string does not terminate with a trailing semicolon.
      // Ensures trailing declarations like `"color: red"` in `"margin: 0; color: red"` are not accidentally dropped.
      if (currentDeclaration.trim()) {
        // Push the remaining non-empty declaration buffer into the parsing queue.
        // Handles inline CSS strings that do not conclude with a trailing semicolon delimiter.
        declarations.push(currentDeclaration.trim());
      }

      // Iterate through all tokenized declaration statements to convert `"property: value"` strings into object key-value pairs.
      // Normalizes whitespace around colons and filters out stringified boolean guards before property normalization.
      for (const declaration of declarations) {
        // Find the offset index of the key-value separator colon character.
        // Splits property name from value string during statement breakdown.
        const colonIndex = declaration.indexOf(':');

        // Bypass malformed declaration statements that lack a valid colon delimiter.
        // Protects downstream string parsing from invalid CSS syntax inputs.
        if (colonIndex === -1) continue;

        // Isolate and clean the raw CSS property key portion located before the colon.
        // Strips surrounding whitespace to prepare the property name for normalization.
        const property = declaration.slice(0, colonIndex).trim();

        // Isolate and clean the raw CSS property value portion located after the colon.
        // Strips leading and trailing whitespace to extract pure value string.
        const value = declaration.slice(colonIndex + 1).trim();

        // Ignore incomplete declaration pairs where either the property name or the value string is empty.
        // Prevents inserting blank keys or empty values into the intermediate style object.
        if (!property || !value) continue;

        // Filter out primitive values stringified by template literal interpolations (e.g., `font-size: ${false}`).
        // Ignores literal string matches for `"false"`, `"true"`, `"undefined"`, and `"null"` resulting from failed logical guards.
        if (FALSY_GUARD_TOKENS.has(value)) continue;

        // Assign the raw property key and value pair to the intermediate un-normalized style object.
        // Prepares raw keys for unified normalization and vendor-prefix handling in the subsequent pass.
        styleObject[property] = value;
      }
    } else {
      // Case 2: Process direct JavaScript style object records (e.g., `{ color: 'red', marginTop: 10 }`).
      // Filters out boolean flags stemming from conditional short-circuit expressions before normalization.

      // Initialize an empty object buffer for filtering input style object entries.
      // Prepares isolated container for validating non-boolean property values.
      styleObject = {};

      // Iterate over key-value entry pairs present in the input style object record.
      // Filters out boolean flags and prepares valid entries for normalization.
      for (const [key, value] of Object.entries(style)) {
        // Omit boolean values produced by failed logical AND expressions inside object literals (e.g., `{ padding: isFocused && '10px' }`).
        // Ensures boolean primitives are not passed down as valid CSS property values.
        if (typeof value === 'boolean') continue;

        // Store valid property key-value pairs into the intermediate style object for subsequent key normalization.
        // Preserves original numbers, strings, and undefined values for standard CSS processing.
        styleObject[key] = value;
      }
    }

    // Iterate through all key-value entries in the intermediate style object to normalize property names.
    // Converts kebab-case keys and browser vendor prefixes into camelCase or PascalCase equivalents.
    for (const [key, value] of Object.entries(styleObject)) {
      // CSS Custom Properties (CSS variables starting with `--`) must retain their exact kebab-case formatting.
      // Bypasses camelCase normalization so custom properties like `--primary-color` remain unchanged.
      if (key.startsWith('--')) {
        // Assign the CSS variable key and value directly into the result accumulator object.
        // Preserves native `--custom-prop` syntax without camelCase conversion.
        acc[key] = value;

        // Bypass standard key casing transformations for the current CSS variable entry.
        // Advances execution immediately to processing the next style property.
        continue;
      }

      // Variable holding transformed property key normalized into camelCase or PascalCase.
      // Serves as the target property key name stored in the final merged style object.
      let normalizedKey: string;

      // Handle vendor-prefixed CSS properties starting with a single hyphen (e.g., `-webkit-`, `-moz-`, `-ms-`, `-o-`).
      // Normalizes browser-specific prefixes into appropriate JS style object casing standards.
      if (key.startsWith('-')) {
        // Strip the initial hyphen from vendor-prefixed CSS keys (e.g., `-webkit-` -> `webkit-`).
        // Simplifies prefix detection and capitalization processing.
        const withoutPrefix = key.slice(1);

        // Special case for Internet Explorer vendor prefix (`-ms-`).
        // In JavaScript style objects, `-ms-` maps to a lowercase `ms` prefix (e.g., `"-ms-flex"` -> `"msFlex"`).
        if (withoutPrefix.startsWith('ms-')) {
          // Slice off the `"ms-"` prefix string portion to isolate remaining property text.
          // Prepares trailing property name segment for camelCase formatting.
          const rest = withoutPrefix.slice(3);

          // Construct lower camelCase key specifically required for Internet Explorer (`ms`) properties.
          // Combines lower-case `'ms'` prefix with upper-camelCased property name segment.
          normalizedKey =
            'ms' +
            rest.charAt(0).toUpperCase() +
            rest.slice(1).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        } else {
          // Standard vendor prefixes (e.g., `-webkit-`, `-moz-`, `-o-`).
          // Normalized to PascalCase in JavaScript style objects (e.g., `"-webkit-transform"` -> `"WebkitTransform"`).
          normalizedKey =
            withoutPrefix.charAt(0).toUpperCase() +
            withoutPrefix.slice(1).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        }
      } else {
        // Standard CSS property keys without vendor prefixes (e.g., `"background-color"`, `"font-size"`).
        // Transforms kebab-case property names directly into standard camelCase keys (e.g., `"backgroundColor"`).
        normalizedKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      }

      // Write the normalized property key and value into the accumulated result object.
      // Following CSS cascade rules, properties encountered later in the `styles` array overwrite earlier definitions.
      acc[normalizedKey] = value;
    }

    // Pass updated accumulator containing merged and normalized properties to next reduction cycle.
    // Returns final aggregated style record once all inputs have been processed.
    return acc;
  }, {});
};
