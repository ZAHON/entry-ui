# Alert

Display a brief, important message in a way that attracts the user's attention without interrupting the user's task.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/components/alert)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20Alert]%20Issue)
[![ARIA](https://img.shields.io/badge/ARIA-Pattern-blue?logo=w3c)](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

## Import

```tsx
import { Alert } from '@entry-ui/qwik/alert';
```

## Anatomy

```tsx
import { component$ } from '@qwik.dev/core';
import { Alert } from '@entry-ui/qwik/alert';

const Anatomy = component$(() => {
  return <Alert.Root />;
});
```

## Usage

Use the `Alert` component to display important information or feedback. This example shows a standard composition featuring an icon and a text-based content area, providing a clear and accessible message to the user.

```tsx
// index.tsx
import { component$, useStyles$ } from '@qwik.dev/core';
import { Alert } from '@entry-ui/qwik/alert';
import styles from './index.css?inline';

const Usage = component$(() => {
  useStyles$(styles);

  return (
    <Alert.Root class="alert-root">
      <div aria-hidden="true" class="alert-indicator">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="alert-icon"
        >
          <path
            d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="alert-content">
        <p class="alert-title">Access restricted</p>
        <span>
          Your account doesn't have the necessary roles to view this content. Contact your system admin for assistance.
        </span>
      </div>
    </Alert.Root>
  );
});
```

```css
/* index.css */
.alert-root {
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  justify-content: start;
  align-items: start;
  column-gap: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0em;
  color: oklch(51.532% 0.21106 28.625 / 0.827);
  background-color: oklch(60.577% 0.24794 28.411 / 0.078);
  border-radius: 0.5rem;
}

.alert-root::selection,
.alert-root *::selection {
  background-color: oklch(62.808% 0.25747 28.892 / 0.196);
}

.alert-content {
  display: flex;
  flex-direction: column;
}

.alert-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.25rem;
}

.alert-icon {
  width: 0.9375rem;
  height: 0.9375rem;
}

.alert-title {
  margin: 0;
  font-weight: 500;
}
```

## Features

- Adheres to the [Alert WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/).

## Rendered elements

Each of `Alert` subcomponents renders a default HTML element that makes sense for its role. This overview outlines the default element rendered by each part of the component. You can customize this element using the `as` prop, as shown in the [Rendering different elements](#rendering-different-elements) example.

| Component    | Default rendered element |
| :----------- | :----------------------- |
| `Alert.Root` | `<div>`                  |

## API Reference

The `Alert` component is built using a primary root subcomponent. This section details the props available for the `Alert.Root` subcomponent, allowing you to fine-tune its behavior and integrate it seamlessly with your custom styles or polymorphic elements.

### Alert.Root

Contains the content for the alert. Renders a `<div>` element.

| Prop | Type                  | Default | Description                                                                                                                                                                                    |
| :--- | :-------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as` | `string \| Component` | `"div"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |

## Examples

Explore different ways to implement and customize the `Alert` component to suit your specific design and functional requirements. From adjusting semantic HTML structure to creating minimalist layouts, these examples demonstrate the component's flexibility.

### Rendering different elements

By default, the `Alert.Root` component renders a `<div>` element. For a complete overview of the default elements, refer to the [Rendered elements](#rendered-elements) section.

You can customize the underlying HTML element rendered by this component, or even compose it with your own custom Qwik components, by using the `as` prop. This provides immense flexibility, allowing you to:

- Replace the default HTML tag with any other valid HTML element that fits your design and semantic needs.

- Integrate your own Qwik components, wrapping them with custom styles or behaviors while ensuring the component's core logic and accessibility features remain intact.

```tsx
// index.tsx
import { component$, useStyles$ } from '@qwik.dev/core';
import { Alert } from '@entry-ui/qwik/alert';
import styles from './index.css?inline';

const Example = component$(() => {
  useStyles$(styles);

  return (
    <Alert.Root as="p" class="alert-root">
      You need administrative permissions to access this specific resource.
    </Alert.Root>
  );
});
```

```css
/* index.css */
.alert-root {
  box-sizing: border-box;
  margin: 0;
  padding: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0em;
  color: oklch(51.532% 0.21106 28.625 / 0.827);
  background-color: oklch(60.577% 0.24794 28.411 / 0.078);
  border-radius: 0.5rem;
}

.alert-root::selection,
.alert-root *::selection {
  background-color: oklch(62.808% 0.25747 28.892 / 0.196);
}
```

## Accessibility

The `Alert` component adheres to the [Alert WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/). Its main purpose is to display a brief, important message without interrupting the user's task or affecting keyboard focus. The component uses the `role="alert"` attribute to ensure it is automatically announced by most screen readers when it appears on the page.
