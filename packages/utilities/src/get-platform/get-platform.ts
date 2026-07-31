import type { NavigatorUserAgentData } from './get-platform.types';

/**
 * Identifies the operating system platform on which the current browser is running.
 *
 * This utility provides a robust, cross-browser mechanism for platform identification
 * by prioritizing the modern User-Agent Client Hints API (`navigator.userAgentData`)
 * over the deprecated `navigator.platform` property.
 *
 * It inspects the structured `platform` descriptor when available—aligning with modern
 * privacy standards—and seamlessly falls back to legacy platform strings in unsupported
 * or older browser runtimes.
 *
 * @example
 * ```ts
 * // Identify the current execution platform.
 * getPlatform();
 *
 * // Returns: "macOS", "Windows", or "Linux" (on modern browsers)
 * // Returns: "MacIntel", "Win32", or "Linux x86_64" (as a legacy fallback)
 * ```
 */
export const getPlatform = () => {
  // Safely extract `userAgentData` from the global `navigator` object using type assertion,
  // enabling access to the modern User-Agent Client Hints API without breaking strict TypeScript rules.
  const userAgentData = (navigator as Navigator & { userAgentData?: NavigatorUserAgentData | undefined }).userAgentData;

  // Prioritize the structured platform string provided by User-Agent Client Hints,
  // seamlessly falling back to the legacy `navigator.platform` property if unsupported.
  return userAgentData?.platform ?? navigator.platform;
};
