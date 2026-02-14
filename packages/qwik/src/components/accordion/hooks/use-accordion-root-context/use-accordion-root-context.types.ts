import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * The value returned by the `useAccordionRootContext` hook.
 * Provides access to the accordion's readonly signals and `QRL` function for descendant components.
 */
export interface UseAccordionRootContextReturnValue {
  /**
   * A readonly signal whose value is an array of strings representing the currently expanded accordion item or items values.
   * This signal reflects the internal state of which accordion items are open.
   */
  value: ReadonlySignal<string[]>;

  /**
   * A `QRL` function used to programmatically set the open state of the accordion items.
   * This function takes an array of strings, where each string represents the value of the accordion items to be opened.
   */
  setValue$: QRL<(value: string[]) => void>;

  /**
   * A readonly signal whose value indicates whether the entire accordion is disabled.
   * When `true`, all interaction with the accordion and its items is prevented.
   */
  disabled: ReadonlySignal<boolean>;
}
