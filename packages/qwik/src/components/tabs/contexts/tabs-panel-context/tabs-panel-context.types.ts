import type { ReadonlySignal } from '@qwik.dev/core';

/**
 * The value provided by the `TabsPanelContext` context.
 *
 * Contains the readonly signal shared with descendant components.
 */
export interface TabsPanelContextValue {
  /**
   * A readonly signal whose value indicates whether the panel is currently active
   * and visible to the user, based on the selection state of its associated tab.
   */
  active: ReadonlySignal<boolean>;
}
