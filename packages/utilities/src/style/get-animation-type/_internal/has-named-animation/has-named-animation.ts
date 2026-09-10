/**
 * An internal utility that evaluates whether a CSS `animation-name` property string contains any active, valid animation identifiers.
 *
 * This utility parses comma-separated animation name values (such as those returned by computed styles), cleans whitespace,
 * and filters out empty strings and the default `"none"` keyword. It ensures that only functional, named animations
 * are identified when distinguishing between layout animation types.
 */
export const hasNamedAnimation = (value: string) => {
  // Split the comma-separated list of animation names into individual string tokens.
  // Allows independent evaluation of multiple concurrent animations applied via shorthand rules.
  const names = value.split(',');

  // Cache the total number of animation name tokens to optimize loop performance.
  // Prevents repeated length lookups on every iteration across the array.
  const namesLength = names.length;

  // Iterate through every parsed animation name token using a traditional performance-optimized loop.
  // Guarantees safe index access when processing potentially multi-valued computed style properties.
  for (let i = 0; i < namesLength; i++) {
    // Retrieve the individual animation name token at the current index position.
    // Allows inspection and validation of each comma-separated rule segment.
    const name = names[i];

    // Skip empty or `undefined` names to maintain loop safety under strict TypeScript configurations.
    // Bypasses malformed segments without throwing unexpected runtime exceptions.
    if (!name) {
      continue;
    }

    // Remove surrounding whitespace from the individual animation name token.
    // Normalizes string formatting before running explicit identifier comparisons.
    const trimmed = name.trim();

    // Verify that the normalized name is neither an empty string nor the `"none"` keyword.
    // Returns `true` immediately upon discovering the first active, valid animation identifier.
    if (trimmed !== '' && trimmed !== 'none') {
      return true;
    }
  }

  // Return `false` if no valid animation names were discovered after inspecting all tokens.
  // Indicates that the property contains no functional keyframe animation identifiers.
  return false;
};
