/**
 * Configuration object for the `hasInsetScrollbars` utility.
 *
 * This interface encapsulates references to the `Window` and `Document` objects
 * required to calculate the difference between the full viewport width (including scrollbars)
 * and the layout width available to content (excluding scrollbars).
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
