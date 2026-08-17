/**
 * Represents the subset of the modern `NavigatorUAData` interface provided by the
 * User-Agent Client Hints API (`navigator.userAgentData`).
 *
 * Used as a type-safe contract to inspect structured browser identification details
 * in supported modern environments without depending on full DOM typings.
 */
export interface NavigatorUserAgentData {
  /**
   * A read-only list of browser brand descriptors and their corresponding major version numbers.
   * Provides structured identity entries for the user agent, allowing accurate detection
   * of the underlying browser architecture and any compatible brand wrappers.
   */
  readonly brands: ReadonlyArray<{ brand: string; version: string }>;
}
