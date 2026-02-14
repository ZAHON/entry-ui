import { PropsOf, Component, QRL } from '@qwik.dev/core';

/**
 * Props for the `Accordion.ItemPanel` component.
 * Extends the standard HTML attributes for a `<div>` element.
 */
export interface AccordionItemPanelProps extends PropsOf<'div'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "div"
   */
  as?: string | Component;

  /**
   * When `true`, the panel uses the `hidden="until-found"` attribute when closed.
   * This allows the browser to search and reveal content within the panel
   * even before it is manually opened.
   *
   * @default false
   */
  hiddenUntilFound?: boolean;

  /**
   * A `QRL` callback invoked once the panel's expansion or collapse has fully settled.
   * If CSS transitions or animations are present, it triggers after they finish;
   * otherwise, it executes immediately upon the state change.
   *
   * @default undefined
   */
  onOpenChangeComplete$?: QRL<(open: boolean) => void>;
}
