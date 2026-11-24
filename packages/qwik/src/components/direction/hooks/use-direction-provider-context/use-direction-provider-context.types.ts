import type { Signal } from '@qwik.dev/core';

/**
 * The value returned by the `useDirectionProviderContext` hook.
 *
 * Provides access to the provider direction's readonly signal for descendant components.
 */
export interface UseDirectionProviderContextReturnValue {
  /**
   * A readonly signal whose value indicates the active reading direction.
   * Its value is `"ltr"` for left-to-right text layout or `"rtl"` for right-to-left layout.
   *
   * If consumed outside of a `<Direction.Provider>` component, it automatically falls back
   * to `"ltr"` as the default direction.
   */
  direction: Readonly<Signal<'ltr' | 'rtl'>>;
}
