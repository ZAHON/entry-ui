/**
 * Checks whether the Window object is defined in the current execution environment.
 *
 * This utility is primarily used to detect if the code is running in a browser
 * environment versus a server-side environment (like Node.js or during SSR).
 * It helps prevent "window is not defined" errors by ensuring browser-specific
 * APIs are only accessed when available.
 *
 * @example
 * ```ts
 * // Safely access browser-only APIs without triggering server-side errors.
 * if (hasWindow()) {
 *   // Safe to access window, document, or local storage APIs.
 * }
 * ```
 */
export const hasWindow = () => {
  // Safely check if the global `Window` object is defined in the current execution environment.
  // This guards against `ReferenceError` exceptions when running in server-side (SSR) contexts.
  return typeof window !== 'undefined';
};
