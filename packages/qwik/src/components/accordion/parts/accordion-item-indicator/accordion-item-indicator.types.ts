import { PropsOf, Component } from '@qwik.dev/core';

/**
 * Props for the `Accordion.ItemIndicator` component.
 * Extends the standard HTML attributes for a `<span>` element.
 */
export interface AccordionItemIndicatorProps extends PropsOf<'span'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "span"
   */
  as?: string | Component;
}
