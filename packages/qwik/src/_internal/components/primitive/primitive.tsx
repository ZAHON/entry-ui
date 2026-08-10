import type { PrimitiveProps } from './primitive.types';
import type { Component } from '@qwik.dev/core';
import { component$, Slot } from '@qwik.dev/core';

/**
 * Supported HTML element tags used to generate polymorphic primitive components.
 *
 * Each tag in this array serves as the default target node for `createPrimitive`
 * and is mapped as a pre-built component property on the `Primitive` object
 * (e.g., `<Primitive.button>`, `<Primitive.div>`).
 */
const NODES = ['button', 'dialog', 'div', 'h2', 'h3', 'p', 'span'] as const;

/**
 * A definitive list of HTML void elements that cannot contain text or child nodes.
 *
 * In the context of polymorphic components, this array is used by `createPrimitive`
 * to dynamically determine whether an element should be rendered as self-closing.
 * Attempting to render child content (via `<Slot />`) inside these elements
 * (e.g., `<input>`, `<img>`) would result in invalid HTML markup and potential
 * errors in the browser.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Void_element MDN} for more details on void elements.
 */
const SELF_CLOSING_TAGS = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
] as const;

/**
 * An internal factory function that creates a polymorphic Qwik component for a specific HTML tag.
 *
 * It dynamically wraps the specified HTML element, providing out-of-the-box support
 * for component composition via the `as` prop. The factory automatically detects
 * HTML void elements to ensure accurate layout structure and compliance with DOM specifications.
 *
 * This function is designed for internal library use to streamline the generation of
 * structural building blocks, maintain unified rendering behaviors, and ensure core primitive consistency.
 */
export const createPrimitive = <Node extends (typeof NODES)[number]>(node: Node) => {
  return component$((props: PrimitiveProps<Node>) => {
    const { as, ...others } = props;

    const element = as ?? node;
    const Comp = element as Component;

    // HTML void elements cannot have children. When rendering as a self-closing tag,
    // return the component without a `<Slot />` to prevent invalid HTML structure.
    if (typeof element === 'string' && (SELF_CLOSING_TAGS as readonly string[]).includes(element)) {
      return <Comp {...others} />;
    }

    return (
      <Comp {...others}>
        <Slot />
      </Comp>
    );
  });
};

/**
 * An internal collection of polymorphic primitive components.
 *
 * Each property represents a pre-built component for a specific HTML element
 * that supports the `as` prop for component composition.
 *
 * This collection is designed for internal library use to provide consistent
 * element rendering, composition layers, and unified node attributes.
 *
 * @remarks
 * Self-closing tags, such as `<input>` or `<img>`, are automatically handled without slot content.
 */
export const Primitive = NODES.reduce(
  (primitive, node) => {
    const Node = createPrimitive(node);

    return { ...primitive, [node]: Node };
  },
  {} as { [Node in (typeof NODES)[number]]: Component<PrimitiveProps<Node>> }
);
