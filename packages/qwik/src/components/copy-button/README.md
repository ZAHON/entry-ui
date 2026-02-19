# Copy Button

A button that transfers text to the system clipboard.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/components/copy-button)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20Copy%20Button]%20Issue)
[![ARIA](https://img.shields.io/badge/ARIA-Pattern-blue?logo=w3c)](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Import

```tsx
import { CopyButton, useCopyButtonRootContext } from '@entry-ui/qwik/copy-button';
```

## Anatomy

```tsx
import { component$ } from '@qwik.dev/core';
import { CopyButton } from '@entry-ui/qwik/copy-button';

const Anatomy = component$(() => {
  return (
    <CopyButton.Root>
      <CopyButton.Indicator />
    </CopyButton.Root>
  );
});
```

## Usage

To create a basic copy button, use the `CopyButton.Root` as a primary wrapper and provide the text to be copied via the `defaultText` prop. Inside, you can place a `CopyButton.Indicator` or use the component's children to react to the "copied" state. The component automatically handles clipboard operations, state resets, and accessibility requirements out of the box.

Below is a basic example of how to implement a simple copy button:

```tsx
const Usage = component$(() => {
  const isCopied = useSignal(false);

  return (
    <CopyButton.Root
      defaultText="Hello from Entry UI Qwik!"
      onStatusChange$={({ copied }) => (isCopied.value = copied)}
    >
      {isCopied.value ? 'Copied!' : 'Copy to clipboard'}
    </CopyButton.Root>
  );
});
```

## Features

- Full keyboard navigation.

- Auto-reset mechanism.

- Can be uncontrolled or controlled.

## Rendered elements

Each of `CopyButton` subcomponents renders a default HTML element that makes sense for its role. This overview outlines the default element rendered by each part of the component. You can customize this element using the `as` prop, as shown in the [Rendering different elements](#rendering-different-elements) example.

| Component              | Default rendered element |
| :--------------------- | :----------------------- |
| `CopyButton.Root`      | `<button>`               |
| `CopyButton.Indicator` | `<span>`                 |

> [!IMPORTANT]
> While it's possible to change the element rendered by `CopyButton.Root`, for accessibility and correct component functionality, it should always render a `<button>` element.

## API Reference

The `CopyButton` component is built using a modular, compound component pattern. This section provides a detailed breakdown of the properties and data attributes available for each part of the copy button, as well as the custom hook provided for accessing its internal state.

### CopyButton.Root

Contains the content for the copy button. Renders a `<button>` element.

| Prop              | Type                                                                                           | Default    | Description                                                                                                                                                                                                                                                                                                                |
| :---------------- | :--------------------------------------------------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`              | `string \| Component`                                                                          | `"button"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details.                                                                                                                             |
| `defaultText`     | `string`                                                                                       | `-`        | The text value to be copied when the component is initially rendered. Use when you do not need to control the text state.                                                                                                                                                                                                  |
| `text`            | `Signal<string>`                                                                               | `-`        | The controlled text value to be copied.                                                                                                                                                                                                                                                                                    |
| `onStatusChange$` | `QRL<(details: { copied: boolean; error: "NOT_SUPPORTED" \| "COPY_FAILED" \| null }) => void>` | `-`        | An optional `QRL` callback function that is invoked whenever the clipboard status changes. It provides a detailed object reflecting whether the text was successfully copied or if an error occurred. This callback is also triggered when the status is automatically cleared after the `timeoutMs` duration has elapsed. |
| `timeoutMs`       | `number`                                                                                       | `3000`     | The duration in milliseconds before the copied state automatically resets to `false`.                                                                                                                                                                                                                                      |
| `disabled`        | `boolean`                                                                                      | `false`    | When `true`, prevents the user from interacting with the copy button.                                                                                                                                                                                                                                                      |

| Data attribute  | Values | Description                                         |
| :-------------- | :----- | :-------------------------------------------------- |
| `data-copied`   | `-`    | Present when the text has been successfully copied. |
| `data-error`    | `-`    | Present when the clipboard operation has failed.    |
| `data-disabled` | `-`    | Present when the copy button is disabled.           |

### CopyButton.Indicator

An optional visual indicator that reflects the copy button's state. It typically displays an icon or other visual cue to show whether the content has been successfully copied or if an error occurred. Renders a `<span>` element.

> [!NOTE]
> This component is intended for visual feedback only. It is hidden from screen readers and ignores pointer events to ensure it doesn't interfere with the button's interactivity or accessibility.

| Prop | Type                  | Default  | Description                                                                                                                                                                                    |
| :--- | :-------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as` | `string \| Component` | `"span"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |

| Data attribute  | Values | Description                                         |
| :-------------- | :----- | :-------------------------------------------------- |
| `data-copied`   | `-`    | Present when the text has been successfully copied. |
| `data-error`    | `-`    | Present when the clipboard operation has failed.    |
| `data-disabled` | `-`    | Present when the copy button is disabled.           |

### useCopyButtonRootContext

A hook that provides access to the `CopyButton.Root` component's internal state. It exposes readonly signals to interact with the copy button's state, allowing descendant components to react to its `copied`, `error`, or `disabled` state. This hook returns an object containing the following properties:

| Property   | Type                                                       | Description                                                                                                                                                                                                                               |
| :--------- | :--------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `copied`   | `ReadonlySignal<boolean>`                                  | A readonly signal whose value indicates whether the text was successfully copied. It is `true` immediately after a successful copy operation and reverts to `false` after the specified timeout.                                          |
| `error`    | `ReadonlySignal<"NOT_SUPPORTED" \| "COPY_FAILED" \| null>` | A readonly signal representing the current error state of the clipboard operation. It returns `"NOT_SUPPORTED"` if the API is unavailable, `"COPY_FAILED"` if the operation was rejected, or `null` if the last operation was successful. |
| `disabled` | `ReadonlySignal<boolean>`                                  | A readonly signal whose value indicates the copy button's current disabled state. It is `true` when the button is prevented from user interaction.                                                                                        |

## Examples

Explore the following examples to discover how to effectively implement the CopyButton component in your application. These examples demonstrate how to manage clipboard operations in both uncontrolled and controlled modes, respond to status changes for granular user feedback, and handle disabled interactions. You will also see how to use visual indicators for state-based styling and leverage the `as` prop to integrate custom elements, ensuring a flexible and accessible clipboard interface.

### Internal state management (Uncontrolled)

When using the uncontrolled mode, the `CopyButton` component handles the text and its copied state internally. You define the initial text to be copied by providing a string to the `defaultText` prop on `CopyButton.Root`. The component then takes full control over the clipboard lifecycle and state resets based on user interactions. This approach is ideal for simpler use cases where the text to be copied does not need to be managed or synchronized by a parent component.

```tsx
import { component$ } from '@qwik.dev/core';
import { CopyButton } from '@entry-ui/qwik/copy-button';

const Example = component$(() => {
  return <CopyButton.Root defaultText="Hello from Entry UI Qwik!">Copy to clipboard</CopyButton.Root>;
});
```

### External state control (Controlled)

When using the controlled mode, the parent component is responsible for managing the text to be copied. You achieve this by passing a signal to the `text` prop on the `CopyButton.Root` component. This approach is ideal for more complex use cases, such as dynamically generating the text based on other form inputs, synchronizing the content with an external state management system, or enabling the parent component to dynamically update the text to be copied based on other application logic.

```tsx
import { component$, useSignal } from '@qwik.dev/core';
import { CopyButton } from '@entry-ui/qwik/copy-button';

const Example = component$(() => {
  const text = useSignal('Hello from Entry UI Qwik!');

  return <CopyButton.Root text={text}>Copy to clipboard</CopyButton.Root>;
});
```

### Handling status changes

You can use the `onStatusChange$` event handler to respond to different stages of the clipboard operation. This callback provides a detailed object containing the `copied` state and any potential `error` codes. This is particularly useful for providing granular feedback to the user, such as displaying specific messages when the Clipboard API is not supported by the browser or when a copy operation is rejected.

```tsx
import { component$, useSignal } from '@qwik.dev/core';
import { CopyButton } from '@entry-ui/qwik/copy-button';

const Example = component$(() => {
  const label = useSignal('Copy to clipboard');

  return (
    <CopyButton.Root
      defaultText="Hello from Entry UI Qwik!"
      onStatusChange$={({ copied, error }) => {
        if (error === 'NOT_SUPPORTED') {
          label.value = 'Not supported';
          return;
        }

        if (error === 'COPY_FAILED') {
          label.value = 'Failed to copy';
          return;
        }

        label.value = copied ? 'Copied!' : 'Copy to clipboard';
      }}
    >
      {label.value}
    </CopyButton.Root>
  );
});
```

### State-aware visual indicators

You can enhance the user experience by using the `CopyButton.Indicator` component to provide visual feedback. By placing multiple indicators inside the `CopyButton.Root` and leveraging the `data-copied` attribute, you can easily toggle between different icons (like a "copy" and a "check" icon) using CSS. This approach allows you to create highly interactive and accessible buttons that communicate state changes without relying solely on text.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { CopyButton } from '@entry-ui/qwik/copy-button';
import styles from './index.module.css';

const Example = component$(() => {
  return (
    <CopyButton.Root aria-label="Copy to clipboard" defaultText="Hello from Entry UI Qwik!">
      <CopyButton.Indicator class={styles['copy-button-indicator-not-copied']}>
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
            d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          />
        </svg>
      </CopyButton.Indicator>

      <CopyButton.Indicator class={styles['copy-button-indicator-copied']}>
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
            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          />
        </svg>
      </CopyButton.Indicator>
    </CopyButton.Root>
  );
});
```

```css
/* index.module.css */
.copy-button-indicator-not-copied[data-copied] {
  display: none;
}

.copy-button-indicator-copied:not([data-copied]) {
  display: none;
}
```

### Disabled interaction

When the `disabled` prop is set to `true` on the `CopyButton.Root` component, it becomes non-interactive and is omitted from the tab order. The component automatically applies the disabled HTML attribute and the `data-disabled` state attribute, ensuring accessibility for screen readers and allowing you to apply custom disabled styles. This is useful for preventing user interaction when the copy action is not currently available or applicable, such as when the text to be copied is empty or the user lacks necessary permissions.

```tsx
import { component$ } from '@qwik.dev/core';
import { CopyButton } from '@entry-ui/qwik/copy-button';

const Example = component$(() => {
  return (
    <CopyButton.Root disabled={true} defaultText="Hello from Entry UI Qwik!">
      Copy to clipboard
    </CopyButton.Root>
  );
});
```

### Rendering different elements

By default, the `CopyButton` subcomponents render elements that are sensible for their roles, such as a `<button>` for `CopyButton.Root` or a `<span>` for `CopyButton.Indicator`. For a complete overview of the default elements, refer to the [Rendered elements](#rendered-elements) section.

You can customize the underlying HTML element rendered by these components, or even compose them with your own custom Qwik components, by using the `as` prop. This provides immense flexibility, allowing you to:

- Replace the default HTML tag with any other valid HTML element that fits your design and semantic needs.

- Integrate your own Qwik components, wrapping them with custom styles or behaviors while ensuring the component's core logic and accessibility features remain intact.

> [!IMPORTANT]
> While it's possible to change the element rendered by `CopyButton.Root`, for accessibility and correct component functionality, it should always render a `<button>` element.

```tsx
import type { PropsOf } from '@qwik.dev/core';
import { component$, Slot } from '@qwik.dev/core';
import { CopyButton } from '@entry-ui/qwik/copy-button';

const MyCustomButton = component$<PropsOf<'button'>>((props) => {
  return (
    <button style={{ color: 'white', backgroundColor: 'purple' }} {...props}>
      <Slot />
    </button>
  );
});

const Example = component$(() => {
  return (
    <CopyButton.Root as={MyCustomButton} defaultText="Hello from Entry UI Qwik!">
      Copy to clipboard
    </CopyButton.Root>
  );
});
```

## Accessibility

The `CopyButton` component is built with accessibility in mind, strictly following the [Button WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/). It ensures that the clipboard operation is correctly handled for screen readers and provides full support for keyboard-only users by leveraging standard button behaviors.

### Keyboard interactions

The `CopyButton` component handles the following keyboard interactions to ensure full accessibility and a consistent user experience.

| Key              | Description                                                                                                  |
| :--------------- | :----------------------------------------------------------------------------------------------------------- |
| <kbd>Space</kbd> | When focus is on the `CopyButton.Root`, triggers the copy operation to the clipboard, unless it is disabled. |
| <kbd>Enter</kbd> | When focus is on the `CopyButton.Root`, triggers the copy operation to the clipboard, unless it is disabled. |
