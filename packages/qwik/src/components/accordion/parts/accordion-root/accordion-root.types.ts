import { PropsOf, Component, Signal, QRL } from '@qwik.dev/core';

/**
 * Props for the `Accordion.Root` component.
 * Extends the standard HTML attributes for a `<div>` element.
 */
export interface AccordionRootProps extends PropsOf<'div'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "div"
   */
  as?: string | Component;

  /**
   * The value of the accordion item or items to expand when initially rendered.
   * When `multiple` is `false`, this array should contain at most one element.
   * Use when you do not need to control the state of the accordion items.
   *
   * @default []
   */
  defaultValue?: string[];

  /**
   * The controlled value of the accordion item or items to expand.
   * When `multiple` is `false`, this array should contain at most one element.
   * Must be used in conjunction with `onValueChange$`.
   *
   * @default undefined
   */
  value?: Signal<string[]>;

  /**
   * A `QRL` callback function that is called when the expanded state of an accordion item or items changes.
   *
   * @default undefined
   */
  onValueChange$?: QRL<(value: string[]) => void>;

  /**
   * Whether or not multiple accordion items can be expanded at the same time.
   * When `false`, expanding one item will automatically collapse the others.
   *
   * @default false
   */
  multiple?: boolean;

  /**
   * Whether the keyboard focus should wrap back to the first or last item trigger
   * when navigating through the accordion.
   * When `true`, pressing `ArrowDown` on the last enabled trigger moves focus to the
   * first one, and `ArrowUp` on the first enabled trigger moves focus to the last one.
   *
   * @default true
   */
  loopFocus?: boolean;

  /**
   * When `true`, all collapsed accordion panels will use the `hidden="until-found"`
   * attribute. This allows the browser's "Find in page" feature to
   * search through collapsed content and automatically expand the item when
   * a match is found.
   *
   * @default false
   */
  hiddenUntilFound?: boolean;

  /**
   * When `true`, prevents the user from interacting with the accordion and all its items.
   *
   * @default false
   */
  disabled?: boolean;
}
