# Alert

A brief, important message for providing feedback to the user.

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

To implement an alert, use the `Alert.Root` component to wrap your message content. This container automatically establishes the necessary accessibility semantics, ensuring that important or time-sensitive information is properly communicated to assistive technologies without disrupting the user's current focus or workflow.

Below is a basic example of how to implement a simple alert:

```tsx
import { component$ } from '@qwik.dev/core';
import { Alert } from '@entry-ui/qwik/alert';

const Usage = component$(() => {
  return (
    <Alert.Root>
      Your account doesn't have the necessary roles to view this content. Contact your system admin for assistance.
    </Alert.Root>
  );
});
```

## Features

- Adheres to the [Alert WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/).

## Rendered elements

Each of `Alert` subcomponents renders a default HTML element that makes sense for its role. This overview outlines the default element rendered by each part of the component. You can customize this element using the `as` prop.

| Component    | Default rendered element |
| :----------- | :----------------------- |
| `Alert.Root` | `<div>`                  |

## API Reference

The `Alert` component is built using a modular, compound component pattern, providing full control over the layout and semantic structure of important feedback messages. This section provides a detailed breakdown of the properties and data attributes available for the alert system, allowing for deep customization and seamless integration.

### Alert.Root

Contains the content for the alert. Renders a `<div>` element.

| Prop | Type                  | Default | Description                                                                                                                                                                                    |
| :--- | :-------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as` | `string \| Component` | `"div"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |

## Accessibility

The `Alert` component adheres to the [Alert WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/). Its main purpose is to display a brief, important message without interrupting the user's task or affecting keyboard focus.
