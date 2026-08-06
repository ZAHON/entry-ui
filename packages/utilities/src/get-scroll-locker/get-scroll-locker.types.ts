/**
 * The API controls returned by the `getScrollLocker` utility.
 *
 * This interface encapsulates management methods for acquiring and releasing reference-counted
 * viewport scroll locks across concurrent UI components and application runtime execution contexts.
 */
export interface GetScrollLockerReturnValue {
  /**
   * Acquires a viewport scroll lock session and increments reference counter.
   * Schedules lock execution on first acquire call and returns a release callback.
   */
  acquire: (params: {
    /**
     * The target `Window` object context.
     * Provides access to computed styles, layout dimensions, and execution context APIs,
     * ensuring accurate measurement across cross-frame or iframe boundaries.
     */
    win: typeof window;

    /**
     * The target `Document` object context.
     * Provides access to the root document tree and layout features required to evaluate
     * DOM structure and element scrollability.
     */
    doc: Document;

    /**
     * The root `<html>` element of the document.
     * Serves as the primary DOM target for native `scrollbar-gutter` properties, overflow locks,
     * and tracking global scroll-lock state attributes.
     */
    html: HTMLElement;

    /**
     * The document `<body>` element.
     * Acts as the fallback layout container and scroll target when fallback scroll locking applies,
     * allowing precise dimension recalculations and scroll position preservation.
     */
    body: HTMLElement;
  }) => () => void;
}
