/**
 * Props for the `<Direction.Provider>` component.
 */
export interface DirectionProviderProps {
  /**
   * The global reading direction of your application.
   * This will be inherited by all Entry UI Qwik components.
   *
   * @default "ltr"
   */
  direction?: 'ltr' | 'rtl' | undefined;
}
