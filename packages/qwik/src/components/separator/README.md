# Separator

A separator element accessible to screen readers.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/components/separator)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20Separator]%20Issue)
[![ARIA](https://img.shields.io/badge/ARIA-Pattern-blue?logo=w3c)](https://www.w3.org/TR/wai-aria-1.2/#separator)

## Import

```tsx
import { Separator } from '@entry-ui/qwik/separator';
```

## Anatomy

```tsx
import { component$ } from '@qwik.dev/core';
import { Separator } from '@entry-ui/qwik/separator';

const Anatomy = component$(() => {
  return <Separator.Root />;
});
```

## Usage

To implement a separator, use the `Separator.Root` component to create a visual and semantic divider between distinct blocks of content. This layout ensures proper accessibility tree establishment, allowing screen readers to recognize the division while maintaining clear visual structure for sighted users.

By default, the component functions as a horizontal divider, but its behavior can be customized using props like `orientation` to fit vertical layouts, or `decorative` to completely bypass assistive technologies when used purely for aesthetic purposes.

Below is a basic example of how to implement a simple separator:

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Separator } from '@entry-ui/qwik/separator';
import styles from './index.module.css';

const Usage = component$(() => {
  return <Separator.Root class={styles['separator-root']} />;
});
```

```css
/* index.module.css */
.separator-root {
  height: 1px;
  background-color: oklch(0% 0 0deg);
}
```

## Features

- Support for horizontal and vertical orientation.

- Support for purely decorative elements to improve accessibility.

## Rendered elements

Each of `Separator` subcomponents renders a default HTML element that makes sense for its role. This overview outlines the default element rendered by each part of the component. You can customize this element using the `as` prop.

| Component        | Default rendered element |
| :--------------- | :----------------------- |
| `Separator.Root` | `<div>`                  |

## API Reference

The `Separator` component is built using a modular, compound component pattern, providing full control over the layout and semantic structure of layout divisions. This section provides a detailed breakdown of the properties and data attributes available for the separator system, allowing for deep customization and seamless integration.

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

Explore various ways to implement and customize the `Separator` component. From standard horizontal layouts and multi-axis orientation adjustments to purely decorative screen-reader exclusions, these examples demonstrate the component's flexibility and how it can be tailored to fit your specific application layouts and design system requirements.

### Vertical orientation

By default, the `Separator` component is horizontally oriented. To change this, you must set the `orientation` prop to `"vertical"` on the `Separator.Root` component. This adjustment affects the semantic orientation and accessibility of the element.

To assist with styling, you can use the `data-orientation` attribute in your CSS, which can take either `"horizontal"` or `"vertical"` as its value. Note that you are responsible for applying the appropriate layout and dimensions (such as height or width) in your CSS to ensure the separator renders correctly in your design.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Separator } from '@entry-ui/qwik/separator';
import styles from './index.module.css';

const Example = component$(() => {
  return <Separator.Root orientation="vertical" class={styles['separator-root']} />;
});
```

```css
/* index.module.css */
.separator-root[data-orientation='vertical'] {
  width: 1px;
  height: 100px;
  background-color: oklch(0% 0 0deg);
}
```

### Purely decorative

By default, the `Separator` component has a semantic `separator` role. However, if the separator is used only for visual styling and does not serve as a meaningful divider between content, you should set the `decorative` prop to `true` on the `Separator.Root` component.

This adjustment updates the accessibility-related attributes to ensure the element is completely removed from the accessibility tree, preventing screen readers from announcing it and improving the overall experience for users of assistive technologies.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Separator } from '@entry-ui/qwik/separator';
import styles from './index.module.css';

const Example = component$(() => {
  return <Separator.Root decorative={true} class={styles['separator-root']} />;
});
```

```css
/* index.module.css */
.separator-root {
  height: 1px;
  background-color: oklch(0% 0 0deg);
}
```

## Accessibility

The `Separator` component is a crucial tool for web accessibility, acting as a divider that separates and distinguishes sections of content. It adheres to the [`separator` role requirements](https://www.w3.org/TR/wai-aria-1.2/#separator) by providing the correct semantic role and orientation to assistive technologies.

When used purely for visual styling, setting the `decorative` prop to `true` on the `Separator.Root` component allows you to remove the element from the accessibility tree. This prevents screen readers from announcing redundant information, ensuring a cleaner and more focused experience for users of assistive technologies.
