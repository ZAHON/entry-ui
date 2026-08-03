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
  const lowerPlatform = getPlatform().toLowerCase();

  return /^i(os$|p)/.test(lowerPlatform) || (lowerPlatform === 'macintel' && navigator.maxTouchPoints > 1);
};
