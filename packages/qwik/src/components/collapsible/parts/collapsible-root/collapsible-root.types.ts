import type { PropsOf, Component, Signal, QRL } from '@qwik.dev/core';

/**
 * Props for the `<Collapsible.Root>` component.
 *
 * Extends the standard HTML attributes for a `<div>` element.
 */
export interface CollapsibleRootProps extends PropsOf<'div'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "div"
   */
  as?: string | Component | undefined;

  /**
   * The open state of the collapsible when it is initially rendered.
   * Use when you do not need to control its open state.
   *
   * @default undefined
   */
  defaultOpen?: boolean | undefined;

  /**
   * The controlled open state of the collapsible.
   * Must be used in conjunction with `onOpenChange$`.
   *
   * @default undefined
   */
  open?: Signal<boolean> | undefined;

  /**
   * A `QRL` callback function that is called when the open state of the collapsible changes.
   *
   * @default undefined
   */
  onOpenChange$?: QRL<(open: boolean) => void> | undefined;

  /**
   * When `true`, prevents the user from interacting with the collapsible.
   *
   * @default false
   */
  disabled?: boolean | undefined;
}
