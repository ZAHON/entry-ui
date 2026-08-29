/**
 * Represents the configuration parameters required by the internal `hasInsetScrollbars` utility.
 *
 * This interface defines the essential execution context reference fields needed to detect space-occupying
 * scrollbars in the viewport. It ensures accurate layout measurement evaluations across cross-frame or
 * multi-window environments by pairing the target `Window` object with its corresponding `Document` context.
 */
export interface HasInsetScrollbarsParams {
  /**
   * The target `Window` object context.
   * Provides access to the active execution context's viewport measurement properties.
   * Explicitly passing this context ensures accurate size evaluations across cross-frame,
   * iframe, or multi-window environments.
   */
  win: typeof window;

  /**
   * The target `Document` object context.
   * Provides access to the root element's content layout dimensions.
   * Serves as the baseline to determine whether native scrollbars consume actual spatial layout width.
   */
  doc: Document;
}
