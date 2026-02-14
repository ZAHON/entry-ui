import type { PrimitiveProps } from './primitive.types';
import type { Component } from '@qwik.dev/core';
import { component$, Slot } from '@qwik.dev/core';

/**
 * List of HTML elements that can be created as primitive components.
 * Each node in this array will have a corresponding component in the `Primitive` object.
 */
const NODES = ['button', 'div', 'h3', 'span'] as const;

/**
 * HTML void elements that cannot have children.
 * These elements are self-closing and will be rendered without a `<Slot />`.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Void_element MDN} for more details.
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
];

/**
 * A factory function that creates a polymorphic Qwik component for a specific HTML tag.
 */
export const createPrimitive = <Node extends (typeof NODES)[number]>(node: Node) => {
  return component$((props: PrimitiveProps<Node>) => {
    const { as, ...others } = props;

    const element = as ?? node;
    const Comp = element as Component;

    // HTML void elements cannot have children. When rendering as a self-closing tag,
    // return the component without a `<Slot />` to prevent invalid HTML structure.
    if (typeof element === 'string' && SELF_CLOSING_TAGS.includes(element)) {
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
 * A collection of polymorphic primitive components.
 *
 * Each property represents a pre-built component for a specific HTML element
 * that supports the `as` prop for component composition.
 *
 * @remarks
 * Self-closing tags (`<area>`, `<img>`, `<input>`) are automatically handled without slot content.
 */
export const Primitive = NODES.reduce(
  (primitive, node) => {
    const Node = createPrimitive(node);

    return { ...primitive, [node]: Node };
  },
  {} as { [Node in (typeof NODES)[number]]: Component<PrimitiveProps<Node>> }
);
