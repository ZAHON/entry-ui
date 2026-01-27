# Separator

Visually or semantically separates content.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/components/separator)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20Separator]%20Issue)
[![ARIA](https://img.shields.io/badge/ARIA-Pattern-blue?logo=w3c)](https://www.w3.org/TR/wai-aria-1.2/#separator)

## Features

- Support for horizontal and vertical orientation.

- Support for purely decorative elements to improve accessibility.

## Import

```tsx
import { Separator } from '@entry-ui/qwik/separator';
```

## Anatomy

Import the component.

```tsx
import { component$ } from '@qwik.dev/core';
import { Separator } from '@entry-ui/qwik/separator';

const Anatomy = component$(() => {
  return <Separator.Root />;
});
```

## Rendered elements

Each of `Separator`'s subcomponents renders a default HTML element that makes sense for its role. This overview outlines the default element rendered by each part of the component. You can customize this element using the `as` prop, as shown in the [Rendering different elements](#rendering-different-elements) example.

| Component        | Default rendered element |
| :--------------- | :----------------------- |
| `Separator.Root` | `<div>`                  |

## API Reference

The `Separator` component consists of a primary subcomponent. This section outlines the props available for the `Separator.Root` subcomponent, enabling you to customize the component's behavior and visual representation.

### Separator.Root

A horizontal or vertical line that visually and semantically separates content. Renders a `<div>` element.

| Prop          | Type                         | Default        | Description                                                                                                                                                                                    |
| :------------ | :--------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`          | `string \| Component`        | `"div"`        | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | The orientation of the separator.                                                                                                                                                              |
| `decorative`  | `boolean`                    | `false`        | Whether or not the component is purely decorative. When `true`, accessibility-related attributes are updated so that the rendered element is removed from the accessibility tree.              |

| Data attribute     | Values                       | Description                                 |
| :----------------- | :--------------------------- | :------------------------------------------ |
| `data-orientation` | `"horizontal" \| "vertical"` | Indicates the orientation of the separator. |

## Examples

Explore the following examples to see how to implement the `Separator` component in various scenarios. These examples demonstrate how to configure different orientations, manage accessibility with decorative separators, and render the component as different HTML elements. You will also find how to apply custom styles using CSS and the provided data attributes.

### Vertical orientation

By default, the `Separator` component is horizontally oriented. To change this, you must set the `orientation` prop to `"vertical"` on the `Separator.Root` component. This adjustment affects the semantic orientation and accessibility of the element. To assist with styling, you can use the `data-orientation` attribute in your CSS, which can take either `"horizontal"` or `"vertical"` as its value. Note that you are responsible for applying the appropriate layout and dimensions (such as height or width) in your CSS to ensure the separator renders correctly in your design.

```tsx
// index.tsx
import { component$, useStyles$ } from '@qwik.dev/core';
import { Separator } from '@entry-ui/qwik/separator';
import styles from './index.css?inline';

const Example = component$(() => {
  useStyles$(styles);

  return (
    <div class="container">
      <a href="#" class="link">
        Home
      </a>
      <a href="#" class="link">
        Pricing
      </a>
      <a href="#" class="link">
        Blog
      </a>
      <a href="#" class="link">
        Support
      </a>

      <Separator.Root orientation="vertical" class="separator-root" />

      <a href="#" class="link">
        Log in
      </a>
      <a href="#" class="link">
        Sign up
      </a>
    </div>
  );
});
```

```css
/* index.css */
.container {
  display: flex;
  align-content: center;
  column-gap: 0.75rem;
  text-wrap: nowrap;
}

.link {
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0em;
  color: oklch(0% 0 0 / 0.608);
  text-decoration-line: none;
  text-decoration-style: solid;
  text-decoration-thickness: min(0.125rem, max(1px, 0.05em));
  text-underline-offset: calc(0.025em + 0.125rem);
  text-decoration-color: oklch(0% 0 0 / 0.122);
}

.link:hover {
  text-decoration-line: underline;
}

.link:focus-visible {
  border-radius: 0.07em;
  outline-color: oklch(73.086% 0.11243 270.438);
  outline-width: 0.125rem;
  outline-style: solid;
  outline-offset: 0.125rem;
}

.link::selection,
.link *::selection {
  background-color: oklch(50.669% 0.27678 263.688 / 0.176);
}

.separator-root[data-orientation='vertical'] {
  width: 1px;
  background-color: oklch(0% 0 0 / 0.149);
}
```

### Purely decorative

By default, the `Separator` component has a semantic `separator` role. However, if the separator is used only for visual styling and does not serve as a meaningful divider between content, you should set the `decorative` prop to `true` on the `Separator.Root` component. This adjustment updates the accessibility-related attributes to ensure the element is completely removed from the accessibility tree, preventing screen readers from announcing it and improving the overall experience for users of assistive technologies.

```tsx
// index.tsx
import { component$, useStyles$ } from '@qwik.dev/core';
import { Separator } from '@entry-ui/qwik/separator';
import styles from './index.css?inline';

const Example = component$(() => {
  useStyles$(styles);

  return (
    <dl class="description-list">
      <div class="description-group">
        <dt class="term">Status</dt>
        <dd class="details">Active</dd>
      </div>

      <Separator.Root decorative={true} class="separator-root" />

      <div class="description-group">
        <dt class="term">Last updated</dt>
        <dd class="details">2 mins ago</dd>
      </div>
    </dl>
  );
});
```

```css
/* index.css */
.description-list {
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
  padding: 1rem;
}

.description-list::selection,
.description-list *::selection {
  background-color: oklch(50.669% 0.27678 263.688 / 0.176);
}

.description-group {
  display: flex;
  justify-content: space-between;
}

.term {
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0em;
  color: oklch(0% 0 0 / 0.608);
}

.details {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0em;
  font-weight: 500;
  color: oklch(24.354% 0 0);
}

.separator-root {
  height: 1px;
  background-color: oklch(0% 0 0 / 0.149);
}
```

### Rendering different elements

By default, the `Separator.Root` component renders a `<div>` element. For a complete overview of the default elements, refer to the [Rendered elements](#rendered-elements) section.

You can customize the underlying HTML element rendered by this component, or even compose it with your own custom Qwik components, by using the `as` prop. This provides immense flexibility, allowing you to:

- Replace the default HTML tag with any other valid HTML element that fits your design and semantic needs.

- Integrate your own Qwik components, wrapping them with custom styles or behaviors while ensuring the component's core logic and accessibility features remain intact.

```tsx
// index.tsx
import { component$, useStyles$ } from '@qwik.dev/core';
import { Separator } from '@entry-ui/qwik/separator';
import styles from './index.css?inline';

const Example = component$(() => {
  useStyles$(styles);

  return <Separator.Root as="hr" class="separator-root" />;
});
```

```css
/* index.css */
.separator-root {
  border: none;
  height: 1px;
  background-color: oklch(0% 0 0 / 0.149);
}
```

## Accessibility

The `Separator` component is a crucial tool for web accessibility, acting as a divider that separates and distinguishes sections of content. It adheres to the [`separator` role requirements](https://www.w3.org/TR/wai-aria-1.2/#separator) by providing the correct semantic role and orientation to assistive technologies.

When used purely for visual styling, setting the `decorative` prop to `true` on the `Separator.Root` component allows you to remove the element from the accessibility tree. This prevents screen readers from announcing redundant information, ensuring a cleaner and more focused experience for users of assistive technologies.
