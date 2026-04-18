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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const agent = (navigator as any).userAgentData as { platform: string } | undefined;

  return agent?.platform ?? navigator.platform;
};
