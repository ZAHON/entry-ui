/**
 * Represents the subset of the modern `NavigatorUAData` interface provided by the
 * User-Agent Client Hints API (`navigator.userAgentData`).
 *
 * Used as a type-safe contract to inspect operating system identification details
 * in supported modern environments without depending on full DOM typings.
 */
export interface NavigatorUserAgentData {
  /**
   * The primary operating system platform identifier reported by the browser runtime.
   * Provides a structured platform name (e.g., `"macOS"`, `"Windows"`, `"Linux"`, or `"Android"`)
   * conforming to modern privacy standards.
   */
  readonly platform: string;
}
