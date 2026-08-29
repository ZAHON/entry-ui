import type { HasInsetScrollbarsParams } from './has-inset-scrollbars.types';

/**
 * An internal utility that determines whether the viewport renders classic, space-consuming scrollbars instead of overlay scrollbars.
 *
 * This utility calculates the difference between the window's full inner width (which includes scrollbars)
 * and the root document element's client width (which excludes scrollbars). If the difference is
 * greater than zero, traditional space-occupying scrollbars are present (common on desktop OSs
 * like Windows or macOS when configured to always show scrollbars).
 */
export const hasInsetScrollbars = (params: HasInsetScrollbarsParams) => {
  const { win, doc } = params;

  // Compare the window's total width (including scrollbar width) against the root HTML element's
  // inner client width. A positive delta indicates that classic, layout-consuming scrollbars are rendered.
  return win.innerWidth - doc.documentElement.clientWidth > 0;
};
