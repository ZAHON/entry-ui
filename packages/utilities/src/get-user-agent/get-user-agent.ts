import type { NavigatorUserAgentData } from './get-user-agent.types';

/**
 * Retrieves the normalized user agent string representing the current browser environment.
 *
 * This utility constructs a space-separated brand-version string derived from `navigator.userAgentData.brands`
 * when available. If Client Hints are unavailable or unsupported, it smoothly falls back to the standard
 * legacy `navigator.userAgent` string.
 *
 * @example
 * ```ts
 * // Retrieve the user agent string in a browser runtime.
 * getUserAgent();
 *
 * // Returns: "Chromium/122 Not(A:Brand/24 Google Chrome/122" (on modern browsers)
 * // Returns: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)..." (as a legacy fallback)
 * ```
 */
export const getUserAgent = () => {
  // Safely extract `userAgentData` from the global `navigator` object using type assertion,
  // enabling access to the modern User-Agent Client Hints API without breaking strict TypeScript rules.
  const userAgentData = (navigator as Navigator & { userAgentData?: NavigatorUserAgentData | undefined }).userAgentData;

  // Validate that the modern Client Hints object exists and contains a valid array of brands,
  // ensuring the environment supports structured user agent data before attempting iteration.
  if (userAgentData && Array.isArray(userAgentData.brands)) {
    // Store a direct reference to the brands array to prevent repetitive property lookups
    // on the userAgentData object during length checking and element retrieval operations.
    const brands = userAgentData.brands;

    // Cache the total number of brands in a dedicated variable to optimize loop conditions
    // and eliminate repeated property access across iterations.
    const brandsLength = brands.length;

    // Return an empty string immediately if the brands array is empty, avoiding unnecessary
    // variable allocations or indexing into undefined array entries below.
    if (brandsLength === 0) {
      return '';
    }

    // Initialize the accumulated string with the first brand-version pair to avoid redundant
    // delimiter checks inside the performance-critical iteration loop.
    let result = `${brands[0].brand}/${brands[0].version}`;

    // Iterate through the remaining brand elements using a traditional indexed `for` loop,
    // maximizing execution speed and minimizing memory overhead during string concatenation.
    for (let i = 1; i < brandsLength; i++) {
      // Access the current brand descriptor at index `i` directly without destructuring,
      // avoiding micro-allocations within each pass of the execution loop.
      const item = brands[i];

      // Concatenate a space delimiter followed by the formatted brand and version pair
      // to the expanding result string via standard in-place string addition.
      result += ` ${item.brand}/${item.version}`;
    }

    // Deliver the fully formatted space-separated user agent string representing all detected browser brands
    // derived directly from the Client Hints API payload.
    return result;
  }

  // Fall back to the traditional `navigator.userAgent` string when Client Hints are unavailable,
  // ensuring seamless support across legacy browsers, server-side environments, or non-standard runtimes.
  return navigator.userAgent;
};
