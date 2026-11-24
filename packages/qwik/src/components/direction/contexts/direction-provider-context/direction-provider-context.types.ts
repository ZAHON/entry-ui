import type { Signal } from '@qwik.dev/core';

/**
 * The value provided by the `DirectionProviderContext` context.
 *
 * Contains the readonly signal shared with descendant components.
 */
export interface DirectionProviderContextValue {
  /**
   * A readonly signal that indicates the active reading direction.
   * Its value is `"ltr"` for left-to-right text layout or `"rtl"` for right-to-left layout.
   */
  direction: Readonly<Signal<'ltr' | 'rtl'>>;
}
