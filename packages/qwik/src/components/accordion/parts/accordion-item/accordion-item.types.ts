import { PropsOf, Component } from '@qwik.dev/core';

/**
 * Props for the `Accordion.Item` component.
 * Extends the standard HTML attributes for a `<div>` element.
 */
export interface AccordionItemProps extends PropsOf<'div'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "div"
   */
  as?: string | Component;

  /**
   * A unique value that identifies this accordion item.
   * If no value is provided, a unique ID will be generated automatically.
   * Use when controlling the accordion programmatically, or to set an initial open state.
   *
   * @default undefined
   */
  value?: string;

  /**
   * When `true`, prevents the user from interacting with the accordion item.
   *
   * @default false
   */
  disabled?: boolean;
}
