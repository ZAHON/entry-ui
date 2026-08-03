import { getPlatform } from '../get-platform';

/**
 * Verifies whether the current device is running on the iOS or iPadOS platform.
 *
 * This utility identifies iPhones and iPads by inspecting the platform string
 * and account for modern iPadOS behavior, where newer iPads might identify
 * as a Macintosh. It uses a combination of platform detection and touch point
 * capability to ensure accurate identification across different mobile browser
 * configurations.
 *
 * @example
 * ```ts
 * if (isIos()) {
 * 	console.log("User is on an iOS/iPadOS device");
 * }
 * ```
 */
export const isIos = () => {
  // Normalize the retrieved platform string to lower case to ensure safe,
  // case-insensitive evaluations across different browser runtimes.
  const lowerPlatform = getPlatform().toLowerCase();

  // Evaluate whether the platform matches standard iOS signatures (iPhone, iPad, iPod),
  // or handle iPadOS 13+ desktop mode where `navigator.platform` reports `MacIntel`.
  // iPadOS 13+ reports `MacIntel` for `navigator.platform`; disambiguated via
  // `maxTouchPoints` so iPad is classified as iOS, not macOS.
  return /^i(os$|p)/.test(lowerPlatform) || (lowerPlatform === 'macintel' && navigator.maxTouchPoints > 1);
};
