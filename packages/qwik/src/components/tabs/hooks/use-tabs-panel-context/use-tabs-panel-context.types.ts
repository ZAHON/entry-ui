import type { ReadonlySignal } from '@qwik.dev/core';

/**
 * The value returned by the `useTabsPanelContext` hook.
 * Provides access to the specific tab panel's readonly signal for descendant components.
 */
export interface UseTabsPanelContextReturnValue {
  /**
   * A readonly signal whose value indicates whether the panel is currently active
   * and visible to the user, based on the selection state of its associated tab.
   */
  active: ReadonlySignal<boolean>;
}
