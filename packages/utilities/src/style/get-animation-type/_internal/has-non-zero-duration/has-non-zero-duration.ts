/**
 * An internal utility that evaluates whether a CSS duration property string contains any active, non-zero time values.
 *
 * This utility parses comma-separated duration values (such as `animation-duration` or `transition-duration`), cleans whitespace,
 * and checks whether any parsed numeric duration exceeds zero seconds. It ensures that zero-duration or empty declarations
 * do not falsely register as active animations or transitions.
 */
export const hasNonZeroDuration = (value: string) => {
  // Split the comma-separated list of duration values into individual string tokens.
  // Accommodates multiple transition or animation duration entries specified in computed styles.
  const parts = value.split(',');

  // Cache the total number of duration tokens to optimize loop performance.
  // Prevents repeated length lookups on every iteration across the array.
  const partsLength = parts.length;

  // Iterate sequentially through each parsed duration token using an optimized index loop.
  // Ensures strict compatibility and robust iteration without relying on higher-order array methods.
  for (let i = 0; i < partsLength; i++) {
    // Retrieve the individual duration token string at the current loop index position.
    // Allows safe access and validation of each comma-separated timing segment.
    const part = parts[i];

    // Skip empty or `undefined` parts to maintain loop safety under strict TypeScript configurations.
    // Bypasses malformed segments without throwing unexpected runtime exceptions.
    if (!part) {
      continue;
    }

    // Strip extra whitespace surrounding the individual duration token string.
    // Prepares the raw unit string for accurate numerical float parsing.
    const trimmed = part.trim();

    // Check that the token is not empty and parses to a floating-point number greater than zero.
    // Confirms that a non-zero time duration (e.g., in seconds or milliseconds) is active.
    if (trimmed !== '' && Number.parseFloat(trimmed) > 0) {
      return true;
    }
  }

  // Return `false` if all evaluated duration tokens parse to zero or remain empty.
  // Signals that no active, non-zero motion duration exists within the property declaration.
  return false;
};
