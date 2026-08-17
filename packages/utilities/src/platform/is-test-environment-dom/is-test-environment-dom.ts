import { getUserAgent } from '../get-user-agent';

/**
 * Determines whether the current environment is a simulated test DOM (e.g., JSDOM or Happy DOM).
 *
 * This utility evaluates the normalized user agent string derived from the browser environment,
 * inspecting it for signature patterns associated with lightweight, headless DOM implementations.
 * It is particularly useful for detecting mock browser runtimes commonly employed during automated
 * unit testing frameworks (e.g., Jest, Vitest) to safely bypass browser-only side effects or APIs.
 *
 * @example
 * ```ts
 * // Check if the current execution runtime is a simulated test DOM.
 * isTestEnvironmentDOM();
 *
 * // Returns: true (when running inside JSDOM or Happy DOM)
 * // Returns: false (when running in a real browser)
 * ```
 */
export const isTestEnvironmentDOM = () => {
  // Normalize the retrieved user agent string to lower case to perform safe, case-insensitive string matching
  // when identifying signature patterns across different test environment implementations.
  const lowerUserAgent = getUserAgent().toLowerCase();

  // Evaluate whether the normalized user agent string contains signatures for known simulated DOM environments
  // (such as JSDOM or Happy DOM), returning true if a match is found and false otherwise.
  return /jsdom|happydom/.test(lowerUserAgent);
};
