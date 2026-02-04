import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * The value returned by the `useCollapsibleRootContext` hook.
 * Provides access to the collapsible's readonly signals and `QRL` function for descendant components.
 */
export interface UseCollapsibleRootContextReturnValue {
  /**
   * A readonly signal whose value indicates the collapsible's current open state.
   * It is `true` when the collapsible is open, and `false` when closed.
   */
  open: ReadonlySignal<boolean>;

  /**
   * A `QRL` function used to programmatically set the open state of the collapsible.
   * When invoked with `true`, the collapsible will open; with `false`, it will close.
   */
  setOpen$: QRL<(open: boolean) => void>;

  /**
   * A readonly signal whose value indicates the collapsible's current disabled state.
   * It is `true` when the collapsible is prevented from user interaction.
   */
  disabled: ReadonlySignal<boolean>;
}
