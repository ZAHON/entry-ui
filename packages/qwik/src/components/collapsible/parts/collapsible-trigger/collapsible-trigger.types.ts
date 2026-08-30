import type { PropsOf, Component } from '@qwik.dev/core';
import type { IntrinsicTagName } from '@/types';

/**
 * Props for the `<Collapsible.Trigger>` component.
 *
 * Extends the standard HTML attributes for a `<button>` element.
 */
export interface CollapsibleTriggerProps extends PropsOf<'button'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "button"
   */
  as?: IntrinsicTagName | Component | undefined;

  /**
   * When `true`, prevents the user from interacting with the trigger.
   * If left `undefined`, this state will be inherited from the `disabled`
   * prop of the `<Collapsible.Root>` component.
   *
   * @default undefined
   */
  disabled?: boolean | undefined;
}
