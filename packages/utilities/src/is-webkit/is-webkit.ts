/**
 * Evaluates whether the runtime environment is driven by the WebKit rendering engine.
 *
 * This utility identifies WebKit browsers (Safari, iOS browsers, GNOME Web) and excludes Blink by checking
 * support for the legacy `-webkit-backdrop-filter` property via `CSS.supports`. While Blink (forked in 2013)
 * only ships unprefixed `backdrop-filter`, WebKit retains support for the prefixed variant.
 *
 * @example
 * ```ts
 * // Check if the current browser engine is WebKit.
 * if (isWebKit()) {
 *   // Apply WebKit-specific fixes for Safari, iOS browsers, or GNOME Web.
 * }
 * ```
 */
export const isWebKit = () => {
  // Check for WebKit environments (including Safari, all iOS browsers, and GNOME Web) while excluding Blink.
  // We distinguish WebKit from Blink by checking support for the legacy `-webkit-backdrop-filter` property via `CSS.supports`.
  // Since Blink forked from WebKit back in 2013, it only ships the standard unprefixed `backdrop-filter`,
  // whereas WebKit continues to support the vendor-prefixed variant.
  return typeof CSS !== 'undefined' && !!CSS.supports?.('-webkit-backdrop-filter', 'none');
};
