import type { ReadonlySignal, QRL } from '@qwik.dev/core';

/**
 * The value provided by the `AccordionRootContext` context.
 * Contains the readonly signals and `QRL` functions shared with descendant components.
 */
export interface AccordionRootContextValue {
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
   * A readonly signal indicating whether the `"hidden-until-found"` behavior is enabled for all panels within the accordion.
   */
  hiddenUntilFound: ReadonlySignal<boolean>;

  /**
   * A readonly signal whose value indicates whether the entire accordion is disabled.
   * When `true`, all interaction with the accordion and its items is prevented.
   */
  disabled: ReadonlySignal<boolean>;

  /**
   * A `QRL` callback function invoked when an accordion item should be opened.
   */
  onItemOpen$: QRL<(itemValue: string) => void>;

  /**
   * A `QRL` callback function invoked when an accordion item should be closed.
   */
  onItemClose$: QRL<(itemValue: string) => void>;
}
