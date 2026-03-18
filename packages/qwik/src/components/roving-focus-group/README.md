# Roving Focus Group

A utility component that implements the roving tabindex method to manage focus between items.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/components/roving-focus-group)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20Roving%20Focus%20Group]%20Issue)
[![ARIA](https://img.shields.io/badge/ARIA-Pattern-blue?logo=w3c)](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)

## Import

```tsx
import {
  RovingFocusGroup,
  useRovingFocusGroupRootContext,
  useRovingFocusGroupItemContext,
} from '@entry-ui/qwik/roving-focus-group';
```

## Anatomy

```tsx
import { component$ } from '@qwik.dev/core';
import { RovingFocusGroup } from '@entry-ui/qwik/roving-focus-group';

const Anatomy = component$(() => {
  return (
    <RovingFocusGroup.Root>
      <RovingFocusGroup.Item />
    </RovingFocusGroup.Root>
  );
});
```

## Usage

To implement a roving focus group, use the `RovingFocusGroup.Root` to wrap a collection of `RovingFocusGroup.Item` components. This setup automatically manages the focus state, ensuring that only one item is focusable via the <kbd>Tab</kbd> key at a time. As the user navigates using arrow keys, the component dynamically updates the `tabindex` of each item, providing a seamless and accessible keyboard experience.

By default, the component works in an uncontrolled fashion, but it can be easily customized or controlled to fit more complex UI patterns like toolbars, menus, or tab lists.

```tsx
import { component$ } from '@qwik.dev/core';
import { RovingFocusGroup } from '@entry-ui/qwik/roving-focus-group';

const Usage = component$(() => {
  return (
    <RovingFocusGroup.Root>
      <RovingFocusGroup.Item>Item 1</RovingFocusGroup.Item>
      <RovingFocusGroup.Item>Item 2</RovingFocusGroup.Item>
      <RovingFocusGroup.Item>Item 3</RovingFocusGroup.Item>
    </RovingFocusGroup.Root>
  );
});
```

## Features

- Full keyboard navigation.

- Supports horizontal, vertical, or both navigation orientations.

- Can be uncontrolled or controlled.

## Rendered elements

Each of `RovingFocusGroup` subcomponents renders a default HTML element that makes sense for its role. This overview outlines the default element rendered by each part of the component. You can customize this element using the `as` prop.

| Component               | Default rendered element |
| :---------------------- | :----------------------- |
| `RovingFocusGroup.Root` | `<div>`                  |
| `RovingFocusGroup.Item` | `<div>`                  |

## API Reference

The `RovingFocusGroup` component is built using a modular, compound component pattern. This section provides a detailed breakdown of the properties and data attributes available for each part of the roving focus group, as well as the custom hooks provided for accessing and managing its internal state.

### RovingFocusGroup.Root

Groups all parts of the roving focus group. Renders a `<div>` element.

| Prop                        | Type                                   | Default  | Description                                                                                                                                                                                                                                                                     |
| :-------------------------- | :------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `as`                        | `string \| Component`                  | `"div"`  | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details.                                                                                  |
| `defaultCurrentTabStopId`   | `string`                               | `-`      | The ID of the item that should be active when initially rendered. Use when you do not need to control the state of the active item.                                                                                                                                             |
| `currentTabStopId`          | `Signal<string>`                       | `-`      | The controlled value of the item ID to activate. Must be used in conjunction with `onCurrentTabStopIdChange$`.                                                                                                                                                                  |
| `onCurrentTabStopIdChange$` | `QRL<(tabStopId: string) => void>`     | `-`      | A `QRL` callback function that is called when the active tab stop changes.                                                                                                                                                                                                      |
| `loopFocus`                 | `boolean`                              | `false`  | Whether the keyboard focus should wrap around to the first or last item when navigating past the boundaries of the group.                                                                                                                                                       |
| `dir`                       | `"ltr" \| "rtl"`                       | `"ltr"`  | The reading direction of the group. When set to `"rtl"`, the behavior of the left and right arrow keys is swapped.                                                                                                                                                              |
| `orientation`               | `"horizontal" \| "vertical" \| "both"` | `"both"` | The orientation of the group, which determines which arrow keys can be used for navigation. </br> - `"horizontal"`: Only `ArrowLeft` and `ArrowRight` are active. </br> - `"vertical"`: Only `ArrowUp` and `ArrowDown` are active. </br> - `"both"`: All arrow keys are active. |

| Data attribute     | Values                                 | Description                                          |
| :----------------- | :------------------------------------- | :--------------------------------------------------- |
| `data-orientation` | `"horizontal" \| "vertical" \| "both"` | Indicates the orientation of the roving focus group. |

### RovingFocusGroup.Item

An individual item within the roving focus group. Renders a `<div>` element.

| Prop        | Type                  | Default | Description                                                                                                                                                                                    |
| :---------- | :-------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`        | `string \| Component` | `"div"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |
| `tabStopId` | `string`              | `-`     | A unique value that identifies this item within the roving focus group. If no value is provided, a unique ID will be generated automatically.                                                  |
| `focusable` | `boolean`             | `true`  | When `false`, prevents the item from becoming active and skips it during keyboard navigation.                                                                                                  |

| Data attribute     | Values                                 | Description                                             |
| :----------------- | :------------------------------------- | :------------------------------------------------------ |
| `data-active`      | `-`                                    | Present when the item is the currently active tab stop. |
| `data-disabled`    | `-`                                    | Present when the item is non-focusable.                 |
| `data-orientation` | `"horizontal" \| "vertical" \| "both"` | Indicates the orientation of the roving focus group.    |

### useRovingFocusGroupRootContext

A hook that provides access to the `RovingFocusGroup.Root` component's internal state. It exposes readonly signals and a `QRL` function to interact with the roving focus state, allowing descendant components to synchronize with or programmatically control which item currently holds the tab stop and is eligible for focus. This hook returns an object containing the following properties:

| Property               | Type                                                   | Description                                                                                                                                                                                    |
| :--------------------- | :----------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currentTabStopId`     | `ReadonlySignal<string>`                               | A readonly signal whose value is a string representing the ID of the item that is currently active. This signal reflects the internal state of which item within the group holds the tab stop. |
| `setCurrentTabStopId$` | `QRL<(tabStopId: string) => void>`                     | A `QRL` function used to programmatically set the active tab stop. This function takes a string representing the ID of the item that should become focusable.                                  |
| `orientation`          | `ReadonlySignal<"horizontal" \| "vertical" \| "both">` | A readonly signal specifying the allowed navigation axes. It determines whether the group responds to horizontal, vertical, or both sets of arrow keys.                                        |

### useRovingFocusGroupItemContext

A hook that provides access to the `RovingFocusGroup.Item` component's internal state. It exposes readonly signals that allow descendant components to react to the item's active state, its identifier, and whether it is currently focusable within the group. This hook returns an object containing the following properties:

| Property    | Type                      | Description                                                                                                                                                                                   |
| :---------- | :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tabStopId` | `ReadonlySignal<string>`  | A readonly signal whose value is the unique identifier for the specific roving focus item. This ID is used to track and manage the item's active state within the group.                      |
| `active`    | `ReadonlySignal<boolean>` | A readonly signal whose value indicates whether this specific item is currently the active tab stop. When `true`, the item's `tabIndex` is set to `0`, allowing it to receive keyboard focus. |
| `focusable` | `ReadonlySignal<boolean>` | A readonly signal specifying if the item is capable of receiving focus. When `false`, the item is skipped during navigation and cannot be activated by the user.                              |

## Examples

Explore various ways to implement and customize the `RovingFocusGroup` component. From simple uncontrolled setups and external state management to constrained navigation axes and circular focus looping, these examples demonstrate the component's flexibility and how it can be tailored to fit your specific design and functional requirements for complex keyboard-navigable interfaces.

### Internal state management

In uncontrolled mode, the `RovingFocusGroup` component manages its active tab stop state internally. You can define the initial active item by providing its identifier to the `defaultCurrentTabStopId` prop on `RovingFocusGroup.Root`. To ensure specific items can be targeted, each `RovingFocusGroup.Item` should have a unique `tabStopId` that identifies it. If no value is provided, a unique ID will be generated automatically. These identifiers are essential when you want to set an initial focus state or track which item is currently active.

This approach is ideal for simpler use cases where the focus group's state doesn't need to be synchronized with or manipulated by an external parent component.

```tsx
import { component$ } from '@qwik.dev/core';
import { RovingFocusGroup } from '@entry-ui/qwik/roving-focus-group';

const Example = component$(() => {
  return (
    <RovingFocusGroup.Root defaultCurrentTabStopId="item-1">
      <RovingFocusGroup.Item tabStopId="item-1">Item 1</RovingFocusGroup.Item>
      <RovingFocusGroup.Item tabStopId="item-2">Item 2</RovingFocusGroup.Item>
      <RovingFocusGroup.Item tabStopId="item-3">Item 3</RovingFocusGroup.Item>
      <RovingFocusGroup.Item tabStopId="item-4">Item 4</RovingFocusGroup.Item>
    </RovingFocusGroup.Root>
  );
});
```

### External state control

In controlled mode, the parent component is responsible for managing the active tab stop state of the roving focus group. You achieve this by passing a signal to the `currentTabStopId` prop on the `RovingFocusGroup.Root` component and synchronizing changes using the `onCurrentTabStopIdChange$` event handler. For this to work correctly, each `RovingFocusGroup.Item` should be assigned a unique `tabStopId` that identifies it.

This approach is ideal for complex use cases, such as synchronizing the focus state with a database, integrating with global state management, or enabling dynamic state changes triggered by other parts of your application logic.

```tsx
import { component$, useSignal } from '@qwik.dev/core';
import { RovingFocusGroup } from '@entry-ui/qwik/roving-focus-group';

const Example = component$(() => {
  const currentTabStopId = useSignal('item-1');

  return (
    <RovingFocusGroup.Root
      currentTabStopId={currentTabStopId}
      onCurrentTabStopIdChange$={(tabStopId) => (currentTabStopId.value = tabStopId)}
    >
      <RovingFocusGroup.Item tabStopId="item-1">Item 1</RovingFocusGroup.Item>
      <RovingFocusGroup.Item tabStopId="item-2">Item 2</RovingFocusGroup.Item>
      <RovingFocusGroup.Item tabStopId="item-3">Item 3</RovingFocusGroup.Item>
      <RovingFocusGroup.Item tabStopId="item-4">Item 4</RovingFocusGroup.Item>
    </RovingFocusGroup.Root>
  );
});
```

### Looping focus navigation

By default, focus navigation is linear and stops at the boundaries of the group. By enabling the `loopFocus` prop on `RovingFocusGroup.Root`, you can create a circular navigation experience. When the user reaches the last item and presses the forward navigation key (e.g., <kbd>→</kbd> or <kbd>↓</kbd>), the focus will automatically wrap around to the first item. Similarly, pressing a backward navigation key at the start of the group will move the focus to the last item.

This behavior is particularly beneficial for small, repetitive sets of items like toolbars, pagination controls, or tab lists, as it reduces the number of keystrokes needed to navigate back to the beginning of the set.

```tsx
import { component$ } from '@qwik.dev/core';
import { RovingFocusGroup } from '@entry-ui/qwik/roving-focus-group';

const Example = component$(() => {
  return (
    <RovingFocusGroup.Root loopFocus={true}>
      <RovingFocusGroup.Item>Item 1</RovingFocusGroup.Item>
      <RovingFocusGroup.Item>Item 2</RovingFocusGroup.Item>
      <RovingFocusGroup.Item>Item 3</RovingFocusGroup.Item>
    </RovingFocusGroup.Root>
  );
});
```

### Constraining navigation orientation

By default, the roving focus group responds to all arrow keys. You can restrict keyboard navigation to a specific axis using the `orientation` prop on `RovingFocusGroup.Root`. When set to `"vertical"`, only the <kbd>↑</kbd> and <kbd>↓</kbd> keys will navigate between items, while `"horizontal"` limits navigation to <kbd>←</kbd> and <kbd>→</kbd>.

This is particularly useful for building layouts like vertical sidebars or horizontal toolbars, where you want to ensure that navigation remains intuitive and prevents unintended focus shifts when using the orthogonal arrow keys.

```tsx
import { component$ } from '@qwik.dev/core';
import { RovingFocusGroup } from '@entry-ui/qwik/roving-focus-group';

const Example = component$(() => {
  return (
    <RovingFocusGroup.Root orientation="vertical">
      <RovingFocusGroup.Item>Item 1</RovingFocusGroup.Item>
      <RovingFocusGroup.Item>Item 2</RovingFocusGroup.Item>
      <RovingFocusGroup.Item>Item 3</RovingFocusGroup.Item>
    </RovingFocusGroup.Root>
  );
});
```

### Handling non-focusable items

You can use the `focusable` prop on `RovingFocusGroup.Item` to skip specific items during keyboard navigation. By setting this property to `false`, the item will be ignored by arrow key navigation and will not become the active tab stop, even if clicked. This is particularly useful for items in a disabled state that should remain visible in the group but not interactive.

```tsx
import { component$ } from '@qwik.dev/core';
import { RovingFocusGroup } from '@entry-ui/qwik/roving-focus-group';

const Example = component$(() => {
  return (
    <RovingFocusGroup.Root>
      <RovingFocusGroup.Item>Item 1</RovingFocusGroup.Item>
      <RovingFocusGroup.Item focusable={false}>Item 2</RovingFocusGroup.Item>
      <RovingFocusGroup.Item>Item 3</RovingFocusGroup.Item>
    </RovingFocusGroup.Root>
  );
});
```

## Accessibility

The `RovingFocusGroup` component is designed with accessibility at its core, implementing the [Keyboard Navigation Inside Components pattern](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents). This pattern ensures that a group of interactive elements acts as a single tab stop, reducing keyboard "clutter" and allowing users to navigate within the group using arrow keys. It automatically manages the `tabindex` of each item, ensuring only the active element is focusable via the <kbd>Tab</kbd> key.

### Keyboard interactions

The component provides comprehensive keyboard support to ensure smooth navigation. The specific keys used for navigation depend on the `orientation` and `dir` props configured on the `RovingFocusGroup.Root`.

| Key                    | Description                                                                                                                                                                                                                   |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>Tab</kbd>         | Moves focus into the group to the currently active item. Subsequent <kbd>Tab</kbd> presses move focus out of the group to the next element in the page flow, regardless of which item within the group is currently active.   |
| <kbd>Shift + Tab</kbd> | Moves focus out of the group to the previous element in the page flow, regardless of which item within the group is currently active.                                                                                         |
| <kbd>→</kbd>           | Moves focus to the next focusable item in horizontal or bidirectional groups. If `loopFocus` is enabled and focus is on the last item, it moves focus to the first one. In `"rtl"` mode, it moves focus to the previous item. |
| <kbd>←</kbd>           | Moves focus to the previous focusable item in horizontal or bidirectional groups. If `loopFocus` is enabled and focus is on the first item, it moves focus to the last one. In `"rtl"` mode, it moves focus to the next item. |
| <kbd>↓</kbd>           | Moves focus to the next focusable item in vertical or bidirectional groups. If `loopFocus` is enabled and focus is on the last item, it moves focus to the first one.                                                         |
| <kbd>↑</kbd>           | Moves focus to the previous focusable item in vertical or bidirectional groups. If `loopFocus` is enabled and focus is on the first item, it moves focus to the last one.                                                     |
| <kbd>Home</kbd>        | Moves focus to the first focusable `RovingFocusGroup.Item` within the group.                                                                                                                                                  |
| <kbd>End</kbd>         | Moves focus to the last focusable `RovingFocusGroup.Item` within the group.                                                                                                                                                   |
