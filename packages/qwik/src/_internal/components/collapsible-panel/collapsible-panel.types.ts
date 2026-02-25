import { PropsOf, Component, QRL } from '@qwik.dev/core';

/**
 * Props for the internal `CollapsiblePanel` component.
 * Extends the standard HTML attributes for a `<div>` element.
 */
export interface CollapsiblePanelProps extends PropsOf<'div'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "div"
   */
  as?: string | Component;

  /**
   * The name of the parent component using this panel (e.g., "Accordion.ItemPanel").
   * Used primarily for developer warnings and debugging.
   */
  componentName: string;

  /**
   * The name of the CSS custom property (variable) used to synchronize the panel's height.
   */
  heightVariableName: `--${string}`;

  /**
   * The controlled open state of the panel.
   * When `true`, the panel expands to reveal its content.
   *
   * @default false
   */
  open?: boolean;

  /**
   * A `QRL` callback that updates the `open` state.
   * Triggered automatically by internal logic, such as the browser's "beforematch" event.
   *
   * @default undefined
   */
  setOpen$?: QRL<(open: boolean) => void>;

  /**
   * When `true`, the panel utilizes the browser's native `hidden="until-found"` attribute.
   * This enables "find-in-page" support, allowing the browser to automatically reveal
   * the panel when a match is found inside its content.
   *
   * @default false
   */
  hiddenUntilFound?: boolean;

  /**
   * If `true`, the panel is considered inactive.
   * This prevents the `hiddenUntilFound` behavior and ensures the panel remains
   * closed and non-interactable.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * A `QRL` callback invoked once the expansion or collapse transition has fully completed.
   * It fires after the CSS `transitionend` or `animationend` events, or immediately
   * if no animations are defined.
   *
   * @default undefined
   */
  onOpenChangeComplete$?: QRL<(open: boolean) => void>;
}
