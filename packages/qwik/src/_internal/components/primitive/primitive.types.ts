import type { Component, PropsOf } from '@qwik.dev/core';

/**
 * Props for polymorphic primitive components.
 * Combines the standard attributes of the specified HTML element (`Node`)
 * with the `as` prop to allow component composition and semantic overrides.
 */
export type PrimitiveProps<Node> = {
  /**
   * The element or component this component should render as.
   *
   * @see {@link https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md Composition} guide for more details.
   */
  as?: string | Component;
} & PropsOf<Node>;
