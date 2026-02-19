import type { PropsOf, Component, Signal, QRL } from '@qwik.dev/core';

/**
 * Props for the `CopyButton.Root` component.
 * Extends the standard HTML attributes for a `<button>` element.
 */
export interface CopyButtonRootProps extends PropsOf<'button'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "button"
   */
  as?: string | Component;

  /**
   * The text value to be copied when the component is initially rendered.
   * Use when you do not need to control the text state.
   *
   * @default undefined
   */
  defaultText?: string;

  /**
   * The controlled text value to be copied.
   *
   * @default undefined
   */
  text?: Signal<string>;

  /**
   * An optional `QRL` callback function that is invoked whenever the clipboard status changes.
   * It provides a detailed object reflecting whether the text was successfully copied
   * or if an error occurred. This callback is also triggered when the status
   * is automatically cleared after the `timeoutMs` duration has elapsed.
   *
   * @default undefined
   */
  onStatusChange$?: QRL<(details: { copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null }) => void>;

  /**
   * The duration in milliseconds before the copied state automatically resets to `false`.
   *
   * @default 3000
   */
  timeoutMs?: number;

  /**
   * When `true`, prevents the user from interacting with the copy button.
   *
   * @default false
   */
  disabled?: boolean;
}
