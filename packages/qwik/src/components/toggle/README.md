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
  return (
    <Toggle.Root>
      <Toggle.Indicator />
    </Toggle.Root>
  );
});
```

## Usage

To implement a toggle, use the `Toggle.Root` to manage the component's interactive state and encapsulate its contents. Inside the root, you can optionally include the `Toggle.Indicator` to deliver a dedicated visual cue, such as an icon, that dynamically synchronizes with the component's internal flags. This layout ensures proper accessibility tree establishment, correct ARIA attribute propagation, and semantic clarity.

By default, the component operates in an uncontrolled fashion, managing its pressed and unpressed states internally via the `defaultPressed` prop. However, it can also be used as a controlled component by providing a `pressed` signal and an `onPressedChange$` callback to the root component, allowing you to easily integrate it into external workflows or state-driven architectures.

Below is a basic example of how to implement a simple toggle:

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
  color: oklch(0% 0 0deg);
  background-color: oklch(100% 0 0deg);
}

.toggle-root[data-state='on'] {
  color: oklch(100% 0 0deg);
  background-color: purple;
}
```

## Features

- Full keyboard navigation.

- Can be uncontrolled or controlled.

## Rendered elements

Each of `Toggle` subcomponents renders a default HTML element that makes sense for its role. This overview outlines the default element rendered by each part of the component. You can customize this element using the `as` prop.

| Component          | Default rendered element |
| :----------------- | :----------------------- |
| `Toggle.Root`      | `<button>`               |
| `Toggle.Indicator` | `<span>`                 |

> [!IMPORTANT]
> While it's possible to change the element rendered by `Toggle.Root`, for accessibility and correct component functionality, it should always render a `<button>` element.

## API Reference

The `Toggle` component is built using a modular, compound component pattern, providing full control over the layout and behavior of two-state interactive elements. This section provides a detailed breakdown of the properties and data attributes available for each part of the toggle system, as well as the custom hooks provided for accessing and managing its internal state, allowing for deep customization and seamless integration.

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

### Toggle.Indicator

An optional visual indicator that reflects the toggle's pressed or unpressed state. It typically displays an icon or other visual cue to show the current status. Renders a `<span>` element.

> [!NOTE]
> This component is intended for visual feedback only. It is hidden from screen readers and ignores pointer events to ensure it doesn't interfere with the `Toggle.Root` interactivity or accessibility.

| Prop | Type                  | Default  | Description                                                                                                                                                                                    |
| :--- | :-------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as` | `string \| Component` | `"span"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |

| Data attribute  | Values          | Description                                |
| :-------------- | :-------------- | :----------------------------------------- |
| `data-state`    | `"on" \| "off"` | Indicates the current state of the toggle. |
| `data-disabled` | `-`             | Present when the toggle is disabled.       |

### useToggleRootContext

A hook that provides access to the `Toggle.Root` component's internal state. It exposes readonly signals and `QRL` functions to interact with the toggle's state, allowing descendant components to control or react to its pressed/unpressed state. This hook returns an object containing the following properties:

| Property      | Type                              | Description                                                                                                                                                   |
| :------------ | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pressed`     | `Readonly<Signal<boolean>>`       | A readonly signal whose value indicates the toggle's current pressed state. It is `true` when the toggle is on, and `false` when off.                         |
| `setPressed$` | `QRL<(pressed: boolean) => void>` | A `QRL` function used to programmatically set the pressed state of the toggle. When invoked with `true`, the toggle will be on; with `false`, it will be off. |
| `disabled`    | `Readonly<Signal<boolean>>`       | A readonly signal that indicates whether the toggle is disabled. Its value is `true` if the toggle is disabled, preventing user interaction.                  |

## Examples

Explore the following examples to discover how to effectively implement the `Toggle` component in your application. These examples demonstrate how to manage its state in both uncontrolled and controlled modes, handle disabled interactions, and leverage the `as` prop to render custom elements. You will also see how to utilize data attributes for advanced styling, ensuring a flexible and accessible user interface.

### Internal state management

When using the uncontrolled mode, the `Toggle` component handles its pressed state internally. You define the initial state by providing a boolean to the `defaultPressed` prop on `Toggle.Root`, which dictates whether the toggle is initially active or inactive. The component then takes full control over subsequent state changes based on user interactions, such as clicking the button or utilizing keyboard navigation.

This approach is ideal for simpler use cases where the toggle's state does not need to be managed or synchronized by a parent component.

```tsx
import { component$ } from '@qwik.dev/core';
import { Toggle } from '@entry-ui/qwik/toggle';

const Example = component$(() => {
  return <Toggle.Root defaultPressed={false}>Pin</Toggle.Root>;
});
```

### External state control

When using the controlled mode, the parent component is responsible for managing the pressed state of the toggle. You achieve this by passing a signal to the `pressed` prop on the `Toggle.Root` component and listening for changes with the `onPressedChange$` event handler. This boolean value dictates whether the component is currently active or inactive.

This approach is ideal for more complex use cases, such as synchronizing the toggle state with a database, integrating with external state management, or enabling a parent component to dynamically trigger state changes based on other application logic.

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

### State-aware visual indicators

By leveraging the `Toggle.Indicator` component, you can effortlessly build state-aware interfaces that swap icons or visual states based on whether the toggle is active or inactive. The indicator automatically receives the `data-state` attribute (`"on"` or `"off"`), allowing you to handle the visibility or styling of different elements entirely through CSS.

This pattern is highly useful for common UI paradigms like "Favorite" or "Bookmark" buttons, where the icon itself changes its fill or shape to reflect the current selection.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Toggle } from '@entry-ui/qwik/toggle';
import styles from './index.module.css';

const Example = component$(() => {
  return (
    <Toggle.Root aria-label="Favorite">
      <Toggle.Indicator class={styles['toggle-indicator-not-pressed']}>
        <svg
          aria-hidden="true"
          focusable="false"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.89346 2.35248C3.49195 2.35248 2.35248 3.49359 2.35248 4.90532C2.35248 6.38164 3.20954 7.9168 4.37255 9.33522C5.39396 10.581 6.59464 11.6702 7.50002 12.4778C8.4054 11.6702 9.60608 10.581 10.6275 9.33522C11.7905 7.9168 12.6476 6.38164 12.6476 4.90532C12.6476 3.49359 11.5081 2.35248 10.1066 2.35248C9.27059 2.35248 8.81894 2.64323 8.5397 2.95843C8.27877 3.25295 8.14623 3.58566 8.02501 3.88993C8.00391 3.9429 7.98315 3.99501 7.96211 4.04591C7.88482 4.23294 7.7024 4.35494 7.50002 4.35494C7.29765 4.35494 7.11523 4.23295 7.03793 4.04592C7.01689 3.99501 6.99612 3.94289 6.97502 3.8899C6.8538 3.58564 6.72126 3.25294 6.46034 2.95843C6.18109 2.64323 5.72945 2.35248 4.89346 2.35248ZM1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.0084 1.35248 6.73504 1.76049 7.20884 2.2953C7.32062 2.42147 7.41686 2.55382 7.50002 2.68545C7.58318 2.55382 7.67941 2.42147 7.79119 2.2953C8.265 1.76049 8.99164 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          />
        </svg>
      </Toggle.Indicator>

      <Toggle.Indicator class={styles['toggle-indicator-pressed']}>
        <svg
          aria-hidden="true"
          focusable="false"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          />
        </svg>
      </Toggle.Indicator>
    </Toggle.Root>
  );
});
```

```css
/* index.module.css */
.toggle-indicator-not-pressed[data-state='on'] {
  display: none;
}

.toggle-indicator-pressed[data-state='off'] {
  display: none;
}
```

### Disabled interaction

To prevent user interaction with the toggle, you can set the `disabled` prop to `true` on the `Toggle.Root` component. When the toggle is disabled, it is skipped during keyboard navigation and cannot be toggled via mouse click or keyboard selection (<kbd>Space</kbd> or <kbd>Enter</kbd>).

This is particularly useful for indicating that the action is currently unavailable or restricted based on the application's state or user permissions. The `data-disabled` attribute is automatically added to the component, allowing you to easily apply custom styles to reflect its disabled state.

```tsx
import { component$ } from '@qwik.dev/core';
import { Toggle } from '@entry-ui/qwik/toggle';

const Example = component$(() => {
  return <Toggle.Root disabled={true}>Pin</Toggle.Root>;
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
