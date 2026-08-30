import type { Component, PropsOf } from '@qwik.dev/core';
import type { IntrinsicTagName } from '@/types';

/**
 * Props for the internal polymorphic primitive components.
 *
 * Combines the standard attributes of the specified HTML element (`Node`)
 * with the `as` prop to allow component composition and semantic overrides.
 */
export type PrimitiveProps<Node> = {
  /**
   * The element or component this component should render as.
   *
   * Allows overriding the default HTML tag (defined by the target primitive node)
   * with another native HTML tag name or custom Qwik component, while preserving
   * compatibility with the underlying node's props.
   */
  as?: IntrinsicTagName | Component | undefined;
} & PropsOf<Node>;
