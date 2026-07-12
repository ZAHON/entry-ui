import type { Signal } from '@qwik.dev/core';

/**
 * The value provided by the `TabsListContext` context.
 *
 * Contains the readonly signal shared with descendant components.
 */
export interface TabsListContextValue {
  /**
   * A readonly signal whose value determines whether tabs are activated
   * automatically on focus or manually on click/selection.
   */
  activationMode: Readonly<Signal<'automatic' | 'manual'>>;
}
