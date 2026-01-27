import type { PropsOf, Component, Signal, QRL } from '@qwik.dev/core';

/**
 * Props for the `Toggle.Root` component.
 * Extends the standard HTML attributes for a `button` element.
 */
export interface ToggleRootProps extends PropsOf<'button'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "button"
   */
  as?: string | Component;

  /**
   * The pressed state of the toggle when it is initially rendered.
   * Use when you do not need to control its pressed state.
   *
   * @default undefined
   */
  defaultPressed?: boolean;

  /**
   * The controlled pressed state of the toggle.
   * Must be used in conjunction with `onPressedChange$`.
   *
   * @default undefined
   */
  pressed?: Signal<boolean>;

  /**
   * A `QRL` callback function that is called when the pressed state of the toggle changes.
   *
   * @default undefined
   */
  onPressedChange$?: QRL<(pressed: boolean) => void>;

  /**
   * When `true`, prevents the user from interacting with the toggle.
   *
   * @default false
   */
  disabled?: boolean;
}
