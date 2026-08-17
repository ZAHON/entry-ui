/**
 * Checks whether the `window` object is defined in the current execution environment.
 *
 * This utility is primarily used to detect if the code is running in a browser
 * environment versus a server-side environment (like Node.js or during SSR).
 * It helps prevent "window is not defined" errors by ensuring browser-specific
 * APIs are only accessed when available.
 *
 * @example
 * ```ts
 * hasWindow()
 * // Returns: true if the window object is available, false otherwise
 * ```
 */
export const hasWindow = () => {
  return typeof window !== 'undefined';
};
