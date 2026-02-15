# Toggle

A two-state button that can be either on or off.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/components/toggle)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20Toggle]%20Issue)
[![ARIA](https://img.shields.io/badge/ARIA-Pattern-blue?logo=w3c)](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Import

```tsx
import { Toggle, useToggleRootContext } from '@entry-ui/qwik/toggle';
```

## Anatomy

```tsx
import { component$ } from '@qwik.dev/core';
import { Toggle } from '@entry-ui/qwik/toggle';

const Anatomy = component$(() => {
  return <Toggle.Root />;
});
```

## Usage

Use the `Toggle` component to create a two-state button that allows users to switch between on and off states. This example demonstrates a basic implementation where the toggle changes its visual appearance based on its state, providing a clear, accessible, and interactive element for actions like pinning or favoriting content.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Toggle } from '@entry-ui/qwik/toggle';
import styles from './index.module.css';

const Usage = component$(() => {
  return <Toggle.Root class={styles['toggle-root']}>Pin</Toggle.Root>;
});
```

```css
/* index.module.css */
.toggle-root[data-state='off'] {
  color: black;
  background-color: gainsboro;
}

.toggle-root[data-state='on'] {
  color: white;
  background-color: purple;
}
```

## Features

- Full keyboard navigation.

- Can be uncontrolled or controlled.

## Rendered elements

Each of `Toggle` subcomponents renders a default HTML element that makes sense for its role. This overview outlines the default element rendered by each part of the component. You can customize this element using the `as` prop, as shown in the [Rendering different elements](#rendering-different-elements) example.

| Component     | Default rendered element |
| :------------ | :----------------------- |
| `Toggle.Root` | `<button>`               |

> [!IMPORTANT]
> While it's possible to change the element rendered by `Toggle.Root`, for accessibility and correct component functionality, it should always render a `<button>` element.

## API Reference

The `Toggle` component consists of a subcomponent and a hook. This section outlines the props available for the `Toggle.Root` subcomponent and the properties returned by the `useToggleRootContext` hook, enabling you to customize the component's behavior and access its internal state.

### Toggle.Root

Contains the content for the toggle. Renders a `<button>` element.

| Prop               | Type                              | Default    | Description                                                                                                                                                                                    |
| :----------------- | :-------------------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`               | `string \| Component`             | `"button"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |
| `defaultPressed`   | `boolean`                         | `-`        | The pressed state of the toggle when it is initially rendered. Use when you do not need to control its pressed state.                                                                          |
| `pressed`          | `Signal<boolean>`                 | `-`        | The controlled pressed state of the toggle. Must be used in conjunction with `onPressedChange$`.                                                                                               |
| `onPressedChange$` | `QRL<(pressed: boolean) => void>` | `-`        | A `QRL` callback function that is called when the pressed state of the toggle changes.                                                                                                         |
| `disabled`         | `boolean`                         | `false`    | When `true`, prevents the user from interacting with the toggle.                                                                                                                               |

| Data attribute  | Values          | Description                                |
| :-------------- | :-------------- | :----------------------------------------- |
| `data-state`    | `"on" \| "off"` | Indicates the current state of the toggle. |
| `data-disabled` | `-`             | Present when the toggle is disabled.       |

### useToggleRootContext

A hook that provides access to the `Toggle.Root` component's internal state. It exposes readonly signals and `QRL` functions to interact with the toggle's state, allowing descendant components to control or react to its pressed/unpressed state. This hook returns an object containing the following properties:

| Property      | Type                              | Description                                                                                                                                                   |
| :------------ | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pressed`     | `ReadonlySignal<boolean>`         | A readonly signal whose value indicates the toggle's current pressed state. It is `true` when the toggle is on, and `false` when off.                         |
| `setPressed$` | `QRL<(pressed: boolean) => void>` | A `QRL` function used to programmatically set the pressed state of the toggle. When invoked with `true`, the toggle will be on; with `false`, it will be off. |
| `disabled`    | `ReadonlySignal<boolean>`         | A readonly signal that indicates whether the toggle is disabled. Its value is `true` if the toggle is disabled, preventing user interaction.                  |

## Examples

Explore the following examples to discover how to effectively implement the `Toggle` component in your application. These examples demonstrate how to manage its state in both uncontrolled and controlled modes, handle disabled interactions, and leverage the `as` prop to render custom elements. You will also see how to utilize data attributes for advanced styling, ensuring a flexible and accessible user interface.

### Internal state management (Uncontrolled)

When using the uncontrolled mode, the `Toggle` component handles its pressed state internally. You define the initial state by providing a boolean to the `defaultPressed` prop on `Toggle.Root`. The component then takes full control over subsequent state changes based on user interactions, such as clicking the button. This approach is ideal for simpler use cases where the toggle's state does not need to be managed or synchronized by a parent component.

```tsx
import { component$ } from '@qwik.dev/core';
import { Toggle } from '@entry-ui/qwik/toggle';

const Example = component$(() => {
  return <Toggle.Root defaultPressed={false}>Pin</Toggle.Root>;
});
```

### External state control (Controlled)

When using the controlled mode, the parent component is responsible for managing the pressed state of the toggle. You achieve this by passing a signal to the `pressed` prop on the `Toggle.Root` component and listening for changes with the `onPressedChange$` event handler. This approach is ideal for more complex use cases, such as synchronizing the toggle state with a database, integrating with external state management, or enabling a parent component to dynamically trigger state changes based on other application logic.

```tsx
import { component$, useSignal } from '@qwik.dev/core';
import { Toggle } from '@entry-ui/qwik/toggle';

const Example = component$(() => {
  const isPressed = useSignal(false);

  return (
    <Toggle.Root pressed={isPressed} onPressedChange$={(pressed) => (isPressed.value = pressed)}>
      Pin
    </Toggle.Root>
  );
});
```

### Disabled interaction

When the `disabled` prop is set to `true` on the `Toggle.Root` component, it becomes non-interactive and is omitted from the tab order. The component automatically applies the `disabled` HTML attribute and the `data-disabled` state attribute, ensuring accessibility for screen readers and allowing you to apply custom disabled styles. This is useful for preventing user interaction when an action is not currently available or applicable.

```tsx
import { component$ } from '@qwik.dev/core';
import { Toggle } from '@entry-ui/qwik/toggle';

const Example = component$(() => {
  return <Toggle.Root disabled={true}>Pin</Toggle.Root>;
});
```

### Rendering different elements

By default, the `Toggle.Root` component renders a `<button>` element. For a complete overview of the default elements, refer to the [Rendered elements](#rendered-elements) section.

You can customize the underlying HTML element rendered by this component, or even compose it with your own custom Qwik components, by using the `as` prop. This provides immense flexibility, allowing you to:

- Replace the default HTML tag with any other valid HTML element that fits your design and semantic needs.

- Integrate your own Qwik components, wrapping them with custom styles or behaviors while ensuring the component's core logic and accessibility features remain intact.

> [!IMPORTANT]
> While it's possible to change the element rendered by `Toggle.Root`, for accessibility and correct component functionality, it should always render a `<button>` element.

```tsx
import type { PropsOf } from '@qwik.dev/core';
import { component$, Slot } from '@qwik.dev/core';
import { Toggle } from '@entry-ui/qwik/toggle';

const MyCustomButton = component$<PropsOf<'button'>>((props) => {
  return (
    <button class="..." {...props}>
      <Slot />
    </button>
  );
});

const Example = component$(() => {
  return <Toggle.Root as={MyCustomButton}>Pin</Toggle.Root>;
});
```

## Accessibility

The `Toggle` component is built with accessibility in mind, strictly following the [Button WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/). It ensures that the current state is correctly announced to screen readers using appropriate ARIA attributes and provides full support for keyboard-only users.

### Keyboard interactions

The `Toggle` component handles the following keyboard interactions to ensure full accessibility and a consistent user experience.

| Key              | Description                                                                   |
| :--------------- | :---------------------------------------------------------------------------- |
| <kbd>Space</kbd> | When focus is on the `Toggle.Root`, toggles the state, unless it is disabled. |
| <kbd>Enter</kbd> | When focus is on the `Toggle.Root`, toggles the state, unless it is disabled. |
