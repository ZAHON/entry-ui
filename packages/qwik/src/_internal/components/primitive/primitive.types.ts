import type { Component, PropsOf } from '@qwik.dev/core';

export type PrimitiveProps<Node> = {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   */
  as?: string | Component;
} & PropsOf<Node>;
