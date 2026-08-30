import { PropsOf, Component } from '@qwik.dev/core';
import type { IntrinsicTagName } from '@/types';

/**
 * Props for the internal `<Indicator>` component.
 *
 * Extends the standard HTML attributes for a `<span>` element.
 */
export interface IndicatorProps extends PropsOf<'span'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "span"
   */
  as?: IntrinsicTagName | Component | undefined;
}
