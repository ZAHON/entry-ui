import type { NavigatorUserAgentData } from './get-platform.types';

/**
 * Identifies the operating system platform on which the current browser is running.
 *
 * This utility provides a robust way to detect the platform by prioritizing the modern
 * **User-Agent Client Hints API** (`userAgentData`) over the deprecated `navigator.platform`
 * property. It ensures better compatibility with modern privacy standards while
 * maintaining a reliable fallback for older browsers.
 *
 * @example
 * ```ts
 * getPlatform();
 * // Returns: "macOS", "Windows", or "Linux" (on modern browsers)
 * // Returns: "Win32" or "MacIntel" (as a legacy fallback)
 * ```
 */
export const getPlatform = () => {
  const userAgentData = (navigator as Navigator & { userAgentData?: NavigatorUserAgentData | undefined }).userAgentData;

  return userAgentData?.platform ?? navigator.platform;
};
