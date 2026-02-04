import { PropsOf, Component, Signal, QRL } from '@qwik.dev/core';

/**
 * Props for the `Collapsible.Root` component.
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
  as?: string | Component;

  /**
   * The open state of the collapsible when it is initially rendered.
   * Use when you do not need to control its open state.
   *
   * @default undefined
   */
  defaultOpen?: boolean;

  /**
   * The controlled open state of the collapsible.
   * Must be used in conjunction with `onOpenChange$`.
   *
   * @default undefined
   */
  open?: Signal<boolean>;

  /**
   * A `QRL` callback function that is called when the open state of the collapsible changes.
   *
   * @default undefined
   */
  onOpenChange$?: QRL<(open: boolean) => void>;

  /**
   * When `true`, prevents the user from interacting with the collapsible.
   *
   * @default false
   */
  disabled?: boolean;
}
