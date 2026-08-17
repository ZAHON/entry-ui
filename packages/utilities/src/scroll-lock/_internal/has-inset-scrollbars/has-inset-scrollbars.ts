import type { HasInsetScrollbarsParams } from './has-inset-scrollbars.types';

/**
 * Determines whether the viewport renders classic, space-consuming scrollbars instead of overlay scrollbars.
 *
 * It calculates the difference between the window's full inner width (which includes scrollbars)
 * and the root document element's client width (which excludes scrollbars). If the difference is
 * greater than zero, traditional space-occupying scrollbars are present (common on desktop OSs
 * like Windows or macOS when configured to always show scrollbars).
 *
 * @example
 * ```ts
 * // Check if scrollbars occupy physical layout space in the current context.
 * const hasScrollbars = hasInsetScrollbars({
 *   win: window,
 *   doc: document,
 * });
 *
 * if (hasScrollbars) {
 *   // Apply layout padding or offset to prevent content jumping when scrollbars toggle.
 * }
 * ```
 */
export const hasInsetScrollbars = (params: HasInsetScrollbarsParams) => {
  const { win, doc } = params;

  // Compare the window's total width (including scrollbar width) against the root HTML element's
  // inner client width. A positive delta indicates that classic, layout-consuming scrollbars are rendered.
  return win.innerWidth - doc.documentElement.clientWidth > 0;
};
