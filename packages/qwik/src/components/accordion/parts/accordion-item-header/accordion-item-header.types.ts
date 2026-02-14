import { PropsOf, Component } from '@qwik.dev/core';

/**
 * Props for the `Accordion.ItemHeader` component.
 * Extends the standard HTML attributes for an `<h3>` element.
 */
export interface AccordionItemHeaderProps extends PropsOf<'h3'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "h3"
   */
  as?: string | Component;
}
