import type { PropsOf, Component } from '@qwik.dev/core';
import type { IntrinsicTagName } from '@/types';

/**
 * Props for the `<Dialog.Description>` component.
 *
 * Extends the standard HTML attributes for a `<p>` element.
 */
export interface DialogDescriptionProps extends PropsOf<'p'> {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   *
   * @default "p"
   */
  as?: IntrinsicTagName | Component | undefined;
}
