# Tabs

A set of layered sections of content known as tab panels that are displayed one at a time.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/components/tabs)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20Tabs]%20Issue)
[![ARIA](https://img.shields.io/badge/ARIA-Pattern-blue?logo=w3c)](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

## Import

```tsx
import { Tabs, useTabsRootContext, useTabsTabContext, useTabsPanelContext } from '@entry-ui/qwik/tabs';
```

## Anatomy

```tsx
import { component$ } from '@qwik.dev/core';
import { Tabs } from '@entry-ui/qwik/tabs';

const Anatomy = component$(() => {
  return (
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Tab />
      </Tabs.List>
      <Tabs.Panel />
    </Tabs.Root>
  );
});
```

## Usage

To implement tabs, use the `Tabs.Root` to wrap the `Tabs.List` and its associated `Tabs.Panel` components. The `Tabs.List` serves as the container for `Tabs.Tab` triggers, which the user interacts with to toggle between different views. This coordination ensures that only the panel corresponding to the active tab is visible, providing a clean and organized way to manage layered content.

By default, the component operates in an uncontrolled fashion using the `defaultValue` prop, but it can also be used as a controlled component by providing the `value` signal and `onValueChange$` callback. This allows for seamless integration into more complex navigation patterns or state-driven interfaces.

```tsx
import { component$ } from '@qwik.dev/core';
import { Tabs } from '@entry-ui/qwik/tabs';

const Usage = component$(() => {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Tab value="account">Account</Tabs.Tab>
        <Tabs.Tab value="documents">Documents</Tabs.Tab>
        <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">Account details</Tabs.Panel>
      <Tabs.Panel value="documents">Documents details</Tabs.Panel>
      <Tabs.Panel value="notifications">Notifications details</Tabs.Panel>
      <Tabs.Panel value="settings">Settings details</Tabs.Panel>
    </Tabs.Root>
  );
});
```

## Features

- Full keyboard navigation.

- Supports both horizontal and vertical orientations.

- Supports automatic or manual activation.

- Can be uncontrolled or controlled.

## Rendered elements

Each of `Tabs` subcomponents renders a default HTML element that makes sense for its role. This overview outlines the default element rendered by each part of the component. You can customize this element using the `as` prop.

| Component    | Default rendered element |
| :----------- | :----------------------- |
| `Tabs.Root`  | `<div>`                  |
| `Tabs.List`  | `<div>`                  |
| `Tabs.Tab`   | `<button>`               |
| `Tabs.Panel` | `<div>`                  |

> [!IMPORTANT]
> While it's possible to change the element rendered by `Tabs.Tab`, for accessibility and correct component functionality, it should always render a `<button>` element.

## API Reference

The `Tabs` component is built using a modular, compound component pattern. This section provides a detailed breakdown of the properties and data attributes available for each part of the tabs system, as well as the custom hooks provided for accessing and managing its internal state, allowing for deep customization and seamless integration.

### Tabs.Root

Groups the tabs and the corresponding panels. Renders a `<div>` element.

| Prop             | Type                           | Default        | Description                                                                                                                                                                                    |
| :--------------- | :----------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`             | `string \| Component`          | `"div"`        | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |
| `defaultValue`   | `string`                       | `-`            | The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs.                                                                 |
| `value`          | `Signal<string>`               | `-`            | The controlled value of the tab to activate. Should be used in conjunction with `onValueChange$`.                                                                                              |
| `onValueChange$` | `QRL<(value: string) => void>` | `-`            | A `QRL` callback function that is called when the value changes.                                                                                                                               |
| `dir`            | `"ltr" \| "rtl"`               | `"ltr"`        | The reading direction of the tabs. When set to `"rtl"`, keyboard navigation is reversed and visual alignment is adjusted for right-to-left languages.                                          |
| `orientation`    | `"horizontal" \| "vertical"`   | `"horizontal"` | The orientation of the tabs. This value determines whether the tabs are laid out horizontally or vertically, and adjusts keyboard navigation (arrow keys) to match the visual orientation.     |

| Data attribute     | Values                       | Description                            |
| :----------------- | :--------------------------- | :------------------------------------- |
| `data-orientation` | `"horizontal" \| "vertical"` | Indicates the orientation of the tabs. |

### Tabs.List

Groups the individual tab buttons. Renders a `<div>` element.

| Prop             | Type                      | Default       | Description                                                                                                                                                                                                                                                                            |
| :--------------- | :------------------------ | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`             | `string \| Component`     | `"div"`       | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details.                                                                                         |
| `activationMode` | `"automatic" \| "manual"` | `"automatic"` | Whether the tabs should be activated automatically on focus or manually on click. </br> - When `"automatic"`, tabs are activated when receiving focus. </br> - When `"manual"`, tabs are activated only when clicked or via keyboard selection (<kbd>Enter</kbd> or <kbd>Space</kbd>). |
| `loopFocus`      | `boolean`                 | `true`        | When `true`, keyboard navigation will loop from last tab to first, and vice versa.                                                                                                                                                                                                     |

| Data attribute     | Values                       | Description                            |
| :----------------- | :--------------------------- | :------------------------------------- |
| `data-orientation` | `"horizontal" \| "vertical"` | Indicates the orientation of the tabs. |

### Tabs.Tab

An individual interactive tab button that toggles the corresponding panel. Renders a `<button>` element.

| Prop       | Type                  | Default    | Description                                                                                                                                                                                    |
| :--------- | :-------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`       | `string \| Component` | `"button"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |
| `value*`   | `string`              | `-`        | A unique value that associates the tab with a panel.                                                                                                                                           |
| `disabled` | `boolean`             | `false`    | When `true`, prevents the user from interacting with the tab.                                                                                                                                  |

| Data attribute     | Values                       | Description                                                     |
| :----------------- | :--------------------------- | :-------------------------------------------------------------- |
| `data-state`       | `"active" \| "inactive"`     | Indicates whether the tab is currently active or inactive.      |
| `data-disabled`    | `-`                          | Present when the tab is disabled and cannot be interacted with. |
| `data-orientation` | `"horizontal" \| "vertical"` | Indicates the orientation of the tabs.                          |

### Tabs.Panel

A panel displayed when the corresponding tab is active. Renders a `<div>` element.

| Prop                       | Type                  | Default | Description                                                                                                                                                                                                                          |
| :------------------------- | :-------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`                       | `string \| Component` | `"div"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details.                                       |
| `value*`                   | `string`              | `-`     | A unique value that associates the panel with a tab.                                                                                                                                                                                 |
| `containsFocusableContent` | `boolean`             | `false` | When `true`, indicates the panel contains focusable elements (like inputs or links). This removes the panel from the tab order (`tabIndex`) to avoid redundant focus stops, allowing focus to move directly to the internal content. |

| Data attribute     | Values                       | Description                                                  |
| :----------------- | :--------------------------- | :----------------------------------------------------------- |
| `data-state`       | `"active" \| "inactive"`     | Indicates whether the panel is currently active or inactive. |
| `data-orientation` | `"horizontal" \| "vertical"` | Indicates the orientation of the tabs.                       |

### useTabsRootContext

A hook that provides access to the `Tabs.Root` component's internal state. It exposes readonly signals and a `QRL` function to interact with the tabs state, allowing descendant components to synchronize with or programmatically control which tab is currently active, while respecting the defined orientation. This hook returns an object containing the following properties:

| Property      | Type                                         | Description                                                                                                                                                                                   |
| :------------ | :------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`       | `ReadonlySignal<string>`                     | A readonly signal whose value represents the unique identifier of the currently active tab. This signal reflects the internal state and determines which tab panel is currently visible.      |
| `setValue$`   | `QRL<(value: string) => void>`               | A `QRL` function used to programmatically set the active value of the tabs. This function takes a string representing the value of the tab to be activated.                                   |
| `orientation` | `ReadonlySignal<"horizontal" \| "vertical">` | A readonly signal whose value represents the orientation of the tabs. This value (either `"horizontal"` or `"vertical"`) determines how keyboard navigation and focus management are handled. |

### useTabsTabContext

A hook that provides access to the `Tabs.Tab` component's internal state. It exposes readonly signals that allow descendant components to react to the tab's unique value, its current activation state, and its disabled status. This hook returns an object containing the following properties:

| Property   | Type                      | Description                                                                                                                            |
| :--------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| `value`    | `ReadonlySignal<string>`  | A readonly signal containing the unique value associated with the tab. This value connects the tab to its corresponding panel.         |
| `active`   | `ReadonlySignal<boolean>` | A readonly signal whose value indicates whether the tab is currently active, meaning its associated panel is being displayed.          |
| `disabled` | `ReadonlySignal<boolean>` | A readonly signal that indicates whether the tab is disabled. Its value is `true` if the tab is disabled, preventing user interaction. |

### useTabsPanelContext

A hook that provides access to the `Tabs.Panel` component's internal state. It exposes a readonly signal that allows descendant components to react to the panel's activation state, synchronizing their behavior or styles base on whether the panel is currently visible. This hook returns an object containing the following properties:

| Property | Type                      | Description                                                                                                                                                |
| :------- | :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active` | `ReadonlySignal<boolean>` | A readonly signal whose value indicates whether the panel is currently active and visible to the user, based on the selection state of its associated tab. |

## Examples

Explore various ways to implement and customize the `Tabs` component. From simple uncontrolled setups and external state management to manual activation modes and vertical layouts, these examples demonstrate the component's flexibility and how it can be tailored to fit your specific design and functional requirements for organized, layered content interfaces.

### Internal state management

When using the uncontrolled mode, the `Tabs` component handles the active state of its panels internally. You define the initial state by providing a string to the `defaultValue` prop on `Tabs.Root`. This string must correspond to the unique `value` prop of a `Tabs.Tab` and its associated `Tabs.Panel`, which will be initially active. The component then takes full control over subsequent state changes based on user interactions, such as clicking a tab or using keyboard navigation.

This approach is ideal for simpler use cases where the active tab state does not need to be managed or synchronized by a parent component.

```tsx
import { component$ } from '@qwik.dev/core';
import { Tabs } from '@entry-ui/qwik/tabs';

const Example = component$(() => {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Tab value="account">Account</Tabs.Tab>
        <Tabs.Tab value="documents">Documents</Tabs.Tab>
        <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">Account details</Tabs.Panel>
      <Tabs.Panel value="documents">Documents details</Tabs.Panel>
      <Tabs.Panel value="notifications">Notifications details</Tabs.Panel>
      <Tabs.Panel value="settings">Settings details</Tabs.Panel>
    </Tabs.Root>
  );
});
```

### External state control

When using the controlled mode, the parent component is responsible for managing the active state of the tabs. You achieve this by passing a signal to the `value` prop on the `Tabs.Root` component and listening for changes with the `onValueChange$` event handler. This string must correspond to the unique `value` prop of a `Tabs.Tab` and its associated `Tabs.Panel` that you want to be active.

This approach is ideal for more complex use cases, such as synchronizing the active tab with a URL query parameter, integrating with external state management, or enabling a parent component to dynamically trigger tab switches.

```tsx
import { component$, useSignal } from '@qwik.dev/core';
import { Tabs } from '@entry-ui/qwik/tabs';

const Example = component$(() => {
  const activeTab = useSignal('account');

  return (
    <Tabs.Root value={activeTab} onValueChange$={(value) => (activeTab.value = value)}>
      <Tabs.List>
        <Tabs.Tab value="account">Account</Tabs.Tab>
        <Tabs.Tab value="documents">Documents</Tabs.Tab>
        <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">Account details</Tabs.Panel>
      <Tabs.Panel value="documents">Documents details</Tabs.Panel>
      <Tabs.Panel value="notifications">Notifications details</Tabs.Panel>
      <Tabs.Panel value="settings">Settings details</Tabs.Panel>
    </Tabs.Root>
  );
});
```

### Focusable content

By default, when a `Tabs.Panel` is active, it is focusable (`tabIndex="0"`) to ensure that users navigating with a keyboard can reach the content area, especially when it contains only static text.

However, if your panel contains interactive elements like inputs, buttons, or links, having the panel itself in the tab order becomes redundant. In such cases, you can set the `containsFocusableContent` prop to `true` on the `Tabs.Panel` component. This removes the active panel from the tab order, allowing focus to move directly from the tab to the first interactive element within the panel, providing a smoother navigation experience.

```tsx
import { component$ } from '@qwik.dev/core';
import { Tabs } from '@entry-ui/qwik/tabs';

const Example = component$(() => {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Tab value="account">Account</Tabs.Tab>
        <Tabs.Tab value="documents">Documents</Tabs.Tab>
        <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account" containsFocusableContent={true}>
        <input type="password" placeholder="Change password" />
      </Tabs.Panel>
      <Tabs.Panel value="documents">Documents details</Tabs.Panel>
      <Tabs.Panel value="notifications">Notifications details</Tabs.Panel>
      <Tabs.Panel value="settings">Settings details</Tabs.Panel>
    </Tabs.Root>
  );
});
```

### Manual activation

By default, the `Tabs` component uses automatic activation, meaning that navigating between tabs using the arrow keys immediately selects the tab and displays its corresponding panel.

If you want to change this behavior, you can set the `activationMode` prop to `"manual"` on the `Tabs.List` component. In this mode, moving focus with the arrow keys will not automatically switch the active tab; instead, the user must press <kbd>Enter</kbd> or <kbd>Space</kbd> to confirm the selection. This is particularly useful for accessibility or when switching tabs triggers expensive operations (like heavy API calls) that you want to avoid running unnecessarily during navigation.

```tsx
import { component$ } from '@qwik.dev/core';
import { Tabs } from '@entry-ui/qwik/tabs';

const Example = component$(() => {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List activationMode="manual">
        <Tabs.Tab value="account">Account</Tabs.Tab>
        <Tabs.Tab value="documents">Documents</Tabs.Tab>
        <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">Account details</Tabs.Panel>
      <Tabs.Panel value="documents">Documents details</Tabs.Panel>
      <Tabs.Panel value="notifications">Notifications details</Tabs.Panel>
      <Tabs.Panel value="settings">Settings details</Tabs.Panel>
    </Tabs.Root>
  );
});
```

### Vertical orientation

By default, the `Tabs` component is horizontally oriented. To change this, you must set the `orientation` prop to `"vertical"` on the `Tabs.Root` component. This adjustment affects both the visual structure and keyboard navigation to ensure they align with the vertical layout. To assist with styling, you can use the `data-orientation` attribute in your CSS, which can take either `"horizontal"` or `"vertical"` as its value. Note that you are responsible for applying the appropriate layout styles to ensure your tabs and panels flow correctly.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Tabs } from '@entry-ui/qwik/tabs';
import styles from './index.module.css';

const Example = component$(() => {
  return (
    <Tabs.Root defaultValue="account" orientation="vertical" class={styles['tabs-root']}>
      <Tabs.List class={styles['tabs-list']}>
        <Tabs.Tab value="account">Account</Tabs.Tab>
        <Tabs.Tab value="documents">Documents</Tabs.Tab>
        <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">Account details</Tabs.Panel>
      <Tabs.Panel value="documents">Documents details</Tabs.Panel>
      <Tabs.Panel value="notifications">Notifications details</Tabs.Panel>
      <Tabs.Panel value="settings">Settings details</Tabs.Panel>
    </Tabs.Root>
  );
});
```

```css
/* index.module.css */
.tabs-root[data-orientation='vertical'] {
  display: flex;
}

.tabs-list[data-orientation='vertical'] {
  display: flex;
  flex-direction: column;
}
```

### Disabled interaction

To prevent user interaction with a specific tab, you can set the `disabled` prop to `true` on the `Tabs.Tab` component. When a tab is disabled, it is skipped during keyboard navigation and cannot be activated via mouse click or keyboard selection (<kbd>Enter</kbd> or <kbd>Space</kbd>).

This is particularly useful for indicating that certain content is currently unavailable or restricted based on the application's state or user permissions. The `data-disabled` attribute is automatically added to the disabled tab, allowing you to easily apply custom styles to reflect its inactive state.

```tsx
import { component$ } from '@qwik.dev/core';
import { Tabs } from '@entry-ui/qwik/tabs';

const Example = component$(() => {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Tab value="account">Account</Tabs.Tab>
        <Tabs.Tab value="documents" disabled={true}>
          Documents
        </Tabs.Tab>
        <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">Account details</Tabs.Panel>
      <Tabs.Panel value="documents">Documents details</Tabs.Panel>
      <Tabs.Panel value="notifications">Notifications details</Tabs.Panel>
      <Tabs.Panel value="settings">Settings details</Tabs.Panel>
    </Tabs.Root>
  );
});
```

## Accessibility

The `Tabs` component is built with accessibility in mind, strictly adhering to the [Tabs WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). This ensures the component is usable and understandable for everyone, including users relying on assistive technologies like screen readers. By following this pattern, it provides a robust and inclusive user experience.

### Keyboard interactions

Users can interact with the `Tabs` component efficiently using only a keyboard. The following overview outlines the primary keyboard shortcuts and their actions:

| Key                    | Description                                                                                                                                                                                                                                                                          |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>Space</kbd>       | When a `Tabs.Tab` has focus, it activates the tab and displays its associated `Tabs.Panel` when `activationMode` is `"manual"`.                                                                                                                                                      |
| <kbd>Enter</kbd>       | When a `Tabs.Tab` has focus, it activates the tab and displays its associated `Tabs.Panel` when `activationMode` is `"manual"`.                                                                                                                                                      |
| <kbd>Tab</kbd>         | When focus enters the `Tabs.List`, it moves to the active `Tabs.Tab`. If no tab is active, focus moves to the first focusable `Tabs.Tab`. If the active `Tabs.Tab` already has focus, it moves focus to the active `Tabs.Panel` (unless `containsFocusableContent` is `true`).       |
| <kbd>Shift + Tab</kbd> | Moves focus out of the `Tabs.List` to the previous focusable element in the page flow.                                                                                                                                                                                               |
| <kbd>→</kbd>           | Moves focus to the next `Tabs.Tab` when `orientation` is `"horizontal"`. Since `activationMode` is `"automatic"`, it also activates the tab. If `loopFocus` is enabled and focus is on the last tab, it moves to the first one. In `"rtl"` mode, it moves focus to the previous tab. |
| <kbd>←</kbd>           | Moves focus to the previous `Tabs.Tab` when `orientation` is `"horizontal"`. Since `activationMode` is `"automatic"`, it also activates the tab. If `loopFocus` is enabled and focus is on the first tab, it moves to the last one. In `"rtl"` mode, it moves focus to the next tab. |
| <kbd>↓</kbd>           | Moves focus to the next `Tabs.Tab` when `orientation` is `"vertical"`. Since `activationMode` is `"automatic"`, it also activates the tab. If `loopFocus` is enabled and focus is on the last tab, it moves to the first one.                                                        |
| <kbd>↑</kbd>           | Moves focus to the previous `Tabs.Tab` when `orientation` is `"vertical"`. Since `activationMode` is `"automatic"`, it also activates the tab. If `loopFocus` is enabled and focus is on the first tab, it moves to the last one.                                                    |
| <kbd>Home</kbd>        | Moves focus to the first focusable `Tabs.Tab` within the group. Since `activationMode` is `"automatic"`, it also activates the tab.                                                                                                                                                  |
| <kbd>End</kbd>         | Moves focus to the last focusable `Tabs.Tab` within the group. Since `activationMode` is `"automatic"`, it also activates the tab.                                                                                                                                                   |
