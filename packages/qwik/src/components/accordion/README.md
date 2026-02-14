# Accordion

A set of collapsible panels with headings.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/components/accordion)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20Accordion]%20Issue)
[![ARIA](https://img.shields.io/badge/ARIA-Pattern-blue?logo=w3c)](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

## Import

```tsx
import {
  Accordion,
  useAccordionRootContext,
  useAccordionItemContext,
  useAccordionItemTriggerContext,
} from '@entry-ui/qwik/accordion';
```

## Anatomy

```tsx
import { component$ } from '@qwik.dev/core';
import { Accordion } from '@entry-ui/qwik/accordion';

const Anatomy = component$(() => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel />
      </Accordion.Item>
    </Accordion.Root>
  );
});
```

## Usage

To use the `Accordion` component, wrap your collapsible sections within the `Accordion.Root`. Each section is defined by an `Accordion.Item`, which contains a header (providing semantic structure) and a panel for the content. The `Accordion.ItemTrigger` serves as the interactive element that toggles the visibility of its corresponding `Accordion.ItemPanel`.

Below is a basic example of how to implement a simple accordion:

```tsx
import { component$ } from '@qwik.dev/core';
import { Accordion } from '@entry-ui/qwik/accordion';

const Usage = component$(() => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>What is Entry UI Qwik?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          A collection of accessible, unstyled components, hooks, and utilities for Qwik, designed for building
          high-quality web applications and design systems.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>How do I get started?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Check out our installation guide to add the library to your project. Our intuitive API makes it easy to build
          complex components in minutes.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>Can I use it for my project?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Of course! Entry UI Qwik is an open-source project licensed under MIT. You are free to use it in both personal
          and commercial projects without any restrictions.
        </Accordion.ItemPanel>
      </Accordion.Item>
    </Accordion.Root>
  );
});
```

## Features

- Full keyboard navigation.

- Can expand one or multiple items.

- Can be uncontrolled or controlled.

## Rendered elements

Each of `Accordion` subcomponents renders a default HTML element that is sensible for its role. This overview outlines the default element rendered by each part of the component. You can customize this element using the `as` prop, as shown in the [Rendering different elements](#rendering-different-elements) example.

| Component                 | Default rendered element |
| :------------------------ | :----------------------- |
| `Accordion.Root`          | `<div>`                  |
| `Accordion.Item`          | `<div>`                  |
| `Accordion.ItemHeader`    | `<h3>`                   |
| `Accordion.ItemTrigger`   | `<button>`               |
| `Accordion.ItemPanel`     | `<div>`                  |
| `Accordion.ItemIndicator` | `<span>`                 |

> [!IMPORTANT]
> While it's possible to change the element rendered by `Accordion.ItemTrigger`, for accessibility and correct component functionality, it should always render a `<button>` element.

## API Reference

The `Accordion` component is built using a modular, compound component pattern, providing full control over the layout and behavior of collapsible sections. This section provides a detailed breakdown of the properties, data attributes, and CSS variables available for each part of the accordion, as well as the custom hooks provided for advanced state management and integration.

### Accordion.Root

Groups all parts of the accordion. Renders a `<div>` element.

| Prop               | Type                             | Default | Description                                                                                                                                                                                                                                                                                  |
| :----------------- | :------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`               | `string \| Component`            | `"div"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details.                                                                                               |
| `defaultOpen`      | `string[]`                       | `-`     | The value of the accordion item or items to expand when initially rendered. When `multiple` is `false`, this array should contain at most one element. Use when you do not need to control the state of the accordion items.                                                                 |
| `value`            | `Signal<string[]>`               | `-`     | The controlled value of the accordion item or items to expand. When `multiple` is `false`, this array should contain at most one element. Must be used in conjunction with `onValueChange$`.                                                                                                 |
| `onValueChange$`   | `QRL<(value: string[]) => void>` | `-`     | A `QRL` callback function that is called when the expanded state of an accordion item or items changes.                                                                                                                                                                                      |
| `multiple`         | `boolean`                        | `false` | Whether or not multiple accordion items can be expanded at the same time. When `false`, expanding one item will automatically collapse the others.                                                                                                                                           |
| `loopFocus`        | `boolean`                        | `true`  | Whether the keyboard focus should wrap back to the first or last item trigger when navigating through the accordion. When `true`, pressing <kbd>↓</kbd> on the last enabled trigger moves focus to the first one, and <kbd>↑</kbd> on the first enabled trigger moves focus to the last one. |
| `hiddenUntilFound` | `boolean`                        | `false` | When `true`, all collapsed accordion panels will use the `hidden="until-found"` attribute. This allows the browser's "Find in page" feature to search through collapsed content and automatically expand the item when a match is found.                                                     |
| `disabled`         | `boolean`                        | `false` | When `true`, prevents the user from interacting with the accordion and all its items.                                                                                                                                                                                                        |

| Data attribute  | Values | Description                             |
| :-------------- | :----- | :-------------------------------------- |
| `data-disabled` | `-`    | Present when the accordion is disabled. |

### Accordion.Item

Groups all the parts of a collapsible section. Renders a `<div>` element.

| Prop       | Type                  | Default | Description                                                                                                                                                                                                     |
| :--------- | :-------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`       | `string \| Component` | `"div"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details.                  |
| `value`    | `string`              | `-`     | A unique value that identifies this accordion item. If no value is provided, a unique ID will be generated automatically. Use when controlling the accordion programmatically, or to set an initial open state. |
| `disabled` | `boolean`             | `false` | When `true`, prevents the user from interacting with the accordion item.                                                                                                                                        |

| Data attribute  | Values               | Description                                        |
| :-------------- | :------------------- | :------------------------------------------------- |
| `data-state`    | `"open" \| "closed"` | Indicates the current state of the accordion item. |
| `data-disabled` | `-`                  | Present when the accordion item is disabled.       |

### Accordion.ItemHeader

A heading that labels the corresponding panel. It provides a semantic structure to the collapsible section, ensuring it follows accessibility best practices by wrapping the interactive trigger in a heading element. Renders an `<h3>` element.

| Prop | Type                  | Default | Description                                                                                                                                                                                    |
| :--- | :-------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as` | `string \| Component` | `"h3"`  | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |

| Data attribute  | Values               | Description                                        |
| :-------------- | :------------------- | :------------------------------------------------- |
| `data-state`    | `"open" \| "closed"` | Indicates the current state of the accordion item. |
| `data-disabled` | `-`                  | Present when the accordion item is disabled.       |

### Accordion.ItemTrigger

A button that opens and closes the corresponding panel. Renders a `<button>` element.

| Prop       | Type                  | Default    | Description                                                                                                                                                                                    |
| :--------- | :-------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`       | `string \| Component` | `"button"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |
| `disabled` | `boolean`             | `-`        | When `true`, prevents the user from interacting with the trigger. If left `undefined`, this state will be inherited from the `disabled` prop of the `Accordion.Item` component.                |

| Data attribute  | Values               | Description                                        |
| :-------------- | :------------------- | :------------------------------------------------- |
| `data-state`    | `"open" \| "closed"` | Indicates the current state of the accordion item. |
| `data-disabled` | `-`                  | Present when the accordion item is disabled.       |

### Accordion.ItemPanel

A collapsible panel with the accordion item contents. Renders a `<div>` element.

| Prop                    | Type                           | Default | Description                                                                                                                                                                                                               |
| :---------------------- | :----------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `as`                    | `string \| Component`          | `"div"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details.                            |
| `hiddenUntilFound`      | `boolean`                      | `false` | When `true`, the panel uses the `hidden="until-found"` attribute when closed. This allows the browser to search and reveal content within the panel even before it is manually opened.                                    |
| `onOpenChangeComplete$` | `QRL<(open: boolean) => void>` | `-`     | A `QRL` callback invoked once the panel's expansion or collapse has fully settled. If CSS transitions or animations are present, it triggers after they finish; otherwise, it executes immediately upon the state change. |

| Data attribute  | Values               | Description                                        |
| :-------------- | :------------------- | :------------------------------------------------- |
| `data-state`    | `"open" \| "closed"` | Indicates the current state of the accordion item. |
| `data-disabled` | `-`                  | Present when the accordion item is disabled.       |

| CSS variable                                  | Description                        |
| :-------------------------------------------- | :--------------------------------- |
| `--entry-ui-qwik-accordion-item-panel-height` | The accordion item panel's height. |

### Accordion.ItemIndicator

An optional visual indicator that reflects the item's open or closed state. It typically displays an icon or other visual cue to show the current status. Renders a `<span>` element.

| Prop | Type                  | Default  | Description                                                                                                                                                                                    |
| :--- | :-------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as` | `string \| Component` | `"span"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |

| Data attribute  | Values               | Description                                        |
| :-------------- | :------------------- | :------------------------------------------------- |
| `data-state`    | `"open" \| "closed"` | Indicates the current state of the accordion item. |
| `data-disabled` | `-`                  | Present when the accordion item is disabled.       |

### useAccordionRootContext

A hook that provides access to the `Accordion.Root` component's internal state. It exposes readonly signals and a `QRL` function to interact with the accordion's state, allowing descendant components to synchronize with or programmatically control which items are currently expanded. This hook returns an object containing the following properties:

| Property    | Type                             | Description                                                                                                                                                                                               |
| :---------- | :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`     | `ReadonlySignal<string[]>`       | A readonly signal whose value is an array of strings representing the currently expanded accordion item or items values. This signal reflects the internal state of which accordion items are open.       |
| `setValue$` | `QRL<(value: string[]) => void>` | A `QRL` function used to programmatically set the open state of the accordion items. This function takes an array of strings, where each string represents the value of the accordion items to be opened. |
| `disabled`  | `ReadonlySignal<boolean>`        | A readonly signal whose value indicates whether the entire accordion is disabled. When `true`, all interaction with the accordion and its items is prevented.                                             |

### useAccordionItemContext

A hook that provides access to the `Accordion.Item` component's internal state. It exposes readonly signals and a `QRL` function to synchronize with a specific item's state, managing its expanded status and disabled availability. This hook returns an object containing the following properties:

| Property   | Type                           | Description                                                                                                                                                                                                      |
| :--------- | :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`    | `ReadonlySignal<string>`       | A readonly signal whose value is the unique identifier for the specific accordion item. This is used to identify the item and control its open/closed state within the accordion component.                      |
| `open`     | `ReadonlySignal<boolean>`      | A readonly signal whose value indicates whether the accordion item is currently in an open (expanded) state. A value of `true` means the item's panel is visible, while `false` means it's hidden.               |
| `setOpen$` | `QRL<(open: boolean) => void>` | A `QRL` function used to programmatically set the open state of the accordion item. This function toggles the item's visibility based on the provided boolean value.                                             |
| `disabled` | `ReadonlySignal<boolean>`      | A readonly signal whose value specifies if the accordion item is disabled. When `true`, the item cannot be interacted with by the user, and its trigger might be visually styled to reflect this inactive state. |

### useAccordionItemTriggerContext

A hook that provides access to the `Accordion.ItemTrigger` component's internal state. It exposes a readonly signal to synchronize with the trigger's availability, reflecting its effective disabled or enabled status. This hook returns an object containing the following properties:

| Property   | Type                      | Description                                                                                                                                                                                                                      |
| :--------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `ReadonlySignal<boolean>` | A readonly signal representing the effective disabled state of the trigger. This value is computed by prioritizing the trigger's own `disabled` prop, falling back to the `Accordion.Item` disabled state if not explicitly set. |

## Examples

Explore various ways to implement and customize the `Accordion` component. From simple uncontrolled setups and external state management to accessible searchable content and smooth height animations, these examples demonstrate the component's flexibility and how it can be tailored to fit your specific design and functional requirements.

### Internal state management (Uncontrolled)

In uncontrolled mode, the `Accordion` component manages its expansion state internally. You can define the initial state by providing an array of item values to the `defaultOpen` prop on `Accordion.Root`. To ensure specific items can be targeted, each `Accordion.Item` should have a unique `value` that identifies it. If no value is provided, a unique ID will be generated automatically. These values are essential when you want to set an initial open state or control the accordion programmatically.

This approach is ideal for simpler use cases where the accordion's state doesn't need to be synchronized with or manipulated by an external parent component.

```tsx
import { component$ } from '@qwik.dev/core';
import { Accordion } from '@entry-ui/qwik/accordion';

const Example = component$(() => {
  return (
    <Accordion.Root defaultValue={[]}>
      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>What is Entry UI Qwik?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          A collection of accessible, unstyled components, hooks, and utilities for Qwik, designed for building
          high-quality web applications and design systems.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>How do I get started?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Check out our installation guide to add the library to your project. Our intuitive API makes it easy to build
          complex components in minutes.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>Can I use it for my project?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Of course! Entry UI Qwik is an open-source project licensed under MIT. You are free to use it in both personal
          and commercial projects without any restrictions.
        </Accordion.ItemPanel>
      </Accordion.Item>
    </Accordion.Root>
  );
});
```

### External state control (Controlled)

In controlled mode, the parent component is responsible for managing the expansion state of the accordion. You achieve this by passing a signal to the `value` prop on the `Accordion.Root` component and synchronizing changes using the `onValueChange$` event handler. For this to work correctly, each `Accordion.Item` should be assigned a unique `value` that identifies it. This approach is ideal for complex use cases, such as synchronizing the accordion state with a database, integrating with global state management, or enabling dynamic state changes triggered by other parts of your application logic.

```tsx
import { component$, useSignal } from '@qwik.dev/core';
import { Accordion } from '@entry-ui/qwik/accordion';

const Example = component$(() => {
  const value = useSignal<string[]>([]);

  return (
    <Accordion.Root value={value} onValueChange$={(_value) => (value.value = _value)}>
      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>What is Entry UI Qwik?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          A collection of accessible, unstyled components, hooks, and utilities for Qwik, designed for building
          high-quality web applications and design systems.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>How do I get started?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Check out our installation guide to add the library to your project. Our intuitive API makes it easy to build
          complex components in minutes.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>Can I use it for my project?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Of course! Entry UI Qwik is an open-source project licensed under MIT. You are free to use it in both personal
          and commercial projects without any restrictions.
        </Accordion.ItemPanel>
      </Accordion.Item>
    </Accordion.Root>
  );
});
```

### Multiple items open at the same time

By default, the `Accordion` only allows one item to be expanded at a time. To enable expanding multiple items simultaneously, set the `multiple` prop to `true` on the `Accordion.Root` component. In this mode, interacting with one item trigger will no longer automatically collapse the others, providing users with more flexibility to compare or view content across different sections at once.

```tsx
import { component$ } from '@qwik.dev/core';
import { Accordion } from '@entry-ui/qwik/accordion';

const Example = component$(() => {
  return (
    <Accordion.Root multiple={true}>
      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>What is Entry UI Qwik?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          A collection of accessible, unstyled components, hooks, and utilities for Qwik, designed for building
          high-quality web applications and design systems.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>How do I get started?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Check out our installation guide to add the library to your project. Our intuitive API makes it easy to build
          complex components in minutes.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>Can I use it for my project?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Of course! Entry UI Qwik is an open-source project licensed under MIT. You are free to use it in both personal
          and commercial projects without any restrictions.
        </Accordion.ItemPanel>
      </Accordion.Item>
    </Accordion.Root>
  );
});
```

### Animating panel height with CSS transitions

The `Accordion.ItemPanel` automatically calculates its content's height and exposes it via the `--entry-ui-qwik-accordion-item-panel-height` CSS variable. This allows you to create smooth expansion and collapse effects using standard CSS transitions. To implement this, ensure your panel has `overflow: hidden` and a transition applied to the `height` property.

> [!TIP]
> Transitions are the recommended method for animating the `Accordion.ItemPanel` height because they handle interrupted animations gracefully. For example, if a user quickly opens and then closes a panel before it fully expands, a transition will smoothly reverse the movement without any abrupt visual jumps.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Accordion } from '@entry-ui/qwik/accordion';
import styles from './index.module.css';

const Example = component$(() => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>What is Entry UI Qwik?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel class={styles['accordion-item-panel']}>
          A collection of accessible, unstyled components, hooks, and utilities for Qwik, designed for building
          high-quality web applications and design systems.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>How do I get started?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel class={styles['accordion-item-panel']}>
          Check out our installation guide to add the library to your project. Our intuitive API makes it easy to build
          complex components in minutes.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>Can I use it for my project?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel class={styles['accordion-item-panel']}>
          Of course! Entry UI Qwik is an open-source project licensed under MIT. You are free to use it in both personal
          and commercial projects without any restrictions.
        </Accordion.ItemPanel>
      </Accordion.Item>
    </Accordion.Root>
  );
});
```

```css
/* index.module.css */
.accordion-item-panel {
  overflow: hidden;
  height: var(--entry-ui-qwik-accordion-item-panel-height);
  transition: height 300ms cubic-bezier(0.87, 0, 0.13, 1);
}
```

### Animating panel height with CSS animations

You can also use CSS keyframes to animate the height of the `Accordion.ItemPanel`. By leveraging the `data-state` attribute, you can trigger specific keyframe animations for both opening and closing states. This method is particularly useful when you want to choreograph the height change alongside other properties like opacity or scale, as it allows you to define the exact flow of the height animation from `0` to the value stored in the `--entry-ui-qwik-accordion-item-panel-height` CSS variable.

> [!NOTE]
> While CSS animations offer great control over choreography, they are generally less flexible than transitions for toggling the `Accordion.ItemPanel` height. Because keyframe animations always run from a fixed start to a fixed end point, they cannot be smoothly cancelled mid-way. If a user interrupts the animation, the panel may "jump" to the start of the next animation state rather than reversing fluidly from its current position.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Accordion } from '@entry-ui/qwik/accordion';
import styles from './index.module.css';

const Example = component$(() => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>What is Entry UI Qwik?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel class={styles['accordion-item-panel']}>
          A collection of accessible, unstyled components, hooks, and utilities for Qwik, designed for building
          high-quality web applications and design systems.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>How do I get started?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel class={styles['accordion-item-panel']}>
          Check out our installation guide to add the library to your project. Our intuitive API makes it easy to build
          complex components in minutes.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>Can I use it for my project?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel class={styles['accordion-item-panel']}>
          Of course! Entry UI Qwik is an open-source project licensed under MIT. You are free to use it in both personal
          and commercial projects without any restrictions.
        </Accordion.ItemPanel>
      </Accordion.Item>
    </Accordion.Root>
  );
});
```

```css
/* index.module.css */
.accordion-item-panel {
  overflow: hidden;
}

.accordion-item-panel[data-state='open'] {
  animation: accordion-item-panel-down 300ms cubic-bezier(0.87, 0, 0.13, 1);
}

.accordion-item-panel[data-state='closed'] {
  animation: accordion-item-panel-up 300ms cubic-bezier(0.87, 0, 0.13, 1);
}

@keyframes accordion-item-panel-down {
  0% {
    height: 0;
  }
  100% {
    height: var(--entry-ui-qwik-accordion-item-panel-height);
  }
}

@keyframes accordion-item-panel-up {
  0% {
    height: var(--entry-ui-qwik-accordion-item-panel-height);
  }
  100% {
    height: 0;
  }
}
```

### Searchable hidden content

By default, collapsed accordion panels are hidden from the browser's "Find in page" feature. You can enable searching through collapsed content by setting the `hiddenUntilFound` prop to `true`. This can be applied globally on the `Accordion.Root` to affect all items, or specifically on an individual `Accordion.ItemPanel` if you only want certain sections to be searchable.

When enabled, the component uses the `hidden="until-found"` attribute, allowing the browser to find text within closed panels and automatically expand them when a match is found.

> [!NOTE]
> When a panel is automatically expanded via the "Find in page" feature, height animations are temporarily disabled. This ensures the browser can instantly scroll to and highlight the matching text, providing a better user experience by avoiding "scrolling to a moving target" during the animation.

```tsx
import { component$ } from '@qwik.dev/core';
import { Accordion } from '@entry-ui/qwik/accordion';

const Example = component$(() => {
  return (
    <Accordion.Root hiddenUntilFound={true}>
      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>Is this content searchable?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Yes! Even when this panel is closed, you can find this specific text using your browser's "Find in page"
          feature. The accordion will automatically snap open to reveal the result.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>SEO and Accessibility</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Using "hidden until found" ensures that your collapsible content remains indexed by search engines while
          providing a cleaner interface for users.
        </Accordion.ItemPanel>
      </Accordion.Item>
    </Accordion.Root>
  );
});
```

### State-aware visual indicators

The `Accordion.ItemIndicator` subcomponent provides a simple way to add visual cues, such as arrows or icons, that react to the item's state. By leveraging the `data-state` attribute, you can easily apply CSS transitions or transforms (e.g., rotating a chevron) to indicate whether the panel is currently expanded or collapsed, enhancing the overall user experience and visual affordance.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Accordion } from '@entry-ui/qwik/accordion';
import styles from './index.module.css';

const ChevronDownIcon = component$(() => {
  return (
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
        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  );
});

const Example = component$(() => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>
            What is Entry UI Qwik?
            <Accordion.ItemIndicator class={styles['accordion-item-indicator']}>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          A collection of accessible, unstyled components, hooks, and utilities for Qwik, designed for building
          high-quality web applications and design systems.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>
            How do I get started?
            <Accordion.ItemIndicator class={styles['accordion-item-indicator']}>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Check out our installation guide to add the library to your project. Our intuitive API makes it easy to build
          complex components in minutes.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader>
          <Accordion.ItemTrigger>
            Can I use it for my project?
            <Accordion.ItemIndicator class={styles['accordion-item-indicator']}>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Of course! Entry UI Qwik is an open-source project licensed under MIT. You are free to use it in both personal
          and commercial projects without any restrictions.
        </Accordion.ItemPanel>
      </Accordion.Item>
    </Accordion.Root>
  );
});
```

```css
/* index.module.css */
.accordion-item-indicator {
  display: inline-block;
  transform-origin: center;
}

.accordion-item-indicator[data-state='open'] {
  transform: rotate(180deg);
}
```

### Rendering different elements

By default, the `Accordion` subcomponents render elements that are sensible for their roles, such as a `<button>` for `Accordion.ItemTrigger`, or an `<h3>` for `Accordion.ItemHeader`. For a complete overview of the default elements, refer to the [Rendered elements](#rendered-elements) section.

You can customize the underlying HTML element rendered by these components, or even compose them with your own custom Qwik components, by using the `as` prop. This provides immense flexibility, allowing you to:

- Replace the default HTML tag with any other valid HTML element that fits your design and semantic needs (e.g., rendering the `Accordion.ItemHeader` as an `<h4>` or `<h5>` to fit your document's heading hierarchy).

- Integrate your own Qwik components, wrapping them with custom styles or behaviors while ensuring the component's core logic and accessibility features remain intact.

> [!IMPORTANT]
> While it's possible to change the element rendered by `Accordion.ItemTrigger`, for accessibility and correct component functionality, it should always render a `<button>` element.

```tsx
import type { PropsOf } from '@qwik.dev/core';
import { component$, Slot } from '@qwik.dev/core';
import { Accordion } from '@entry-ui/qwik/accordion';

const MyCustomButton = component$<PropsOf<'button'>>((props) => {
  return (
    <button style={{ color: 'white', backgroundColor: 'purple' }} {...props}>
      <Slot />
    </button>
  );
});

const Example = component$(() => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.ItemHeader as="h4">
          <Accordion.ItemTrigger as={MyCustomButton}>What is Entry UI Qwik?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          A collection of accessible, unstyled components, hooks, and utilities for Qwik, designed for building
          high-quality web applications and design systems.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader as="h4">
          <Accordion.ItemTrigger as={MyCustomButton}>How do I get started?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Check out our installation guide to add the library to your project. Our intuitive API makes it easy to build
          complex components in minutes.
        </Accordion.ItemPanel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.ItemHeader as="h4">
          <Accordion.ItemTrigger as={MyCustomButton}>Can I use it for my project?</Accordion.ItemTrigger>
        </Accordion.ItemHeader>
        <Accordion.ItemPanel>
          Of course! Entry UI Qwik is an open-source project licensed under MIT. You are free to use it in both personal
          and commercial projects without any restrictions.
        </Accordion.ItemPanel>
      </Accordion.Item>
    </Accordion.Root>
  );
});
```

## Accessibility

The `Accordion` component is built with accessibility in mind, strictly adhering to the [Accordion WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/). This ensures the component is usable and understandable for everyone, including users relying on assistive technologies like screen readers. By following this pattern, it automatically handles crucial ARIA attributes and keyboard interactions, providing a robust and inclusive user experience.

### Keyboard interactions

Users can interact with the `Accordion` component efficiently using only a keyboard. The following overview outlines the primary keyboard shortcuts and their actions:

| Key                    | Description                                                                                                                                                                                              |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>Space</kbd>       | When focus is on an `Accordion.ItemTrigger`, toggles the expanded state of the associated `Accordion.ItemPanel`.                                                                                         |
| <kbd>Enter</kbd>       | When focus is on an `Accordion.ItemTrigger`, toggles the expanded state of the associated `Accordion.ItemPanel`.                                                                                         |
| <kbd>Tab</kbd>         | Moves focus to the next focusable element.                                                                                                                                                               |
| <kbd>Shift + Tab</kbd> | Moves focus to the previous focusable element.                                                                                                                                                           |
| <kbd>↓</kbd>           | When focus is on an `Accordion.ItemTrigger`, moves focus to the next enabled `Accordion.ItemTrigger`. If `loopFocus` is set to `true` and focus is on the last trigger, it moves focus to the first one. |
| <kbd>↑</kbd>           | When focus is on an `Accordion.ItemTrigger`, moves focus to the previous enabled `Accordion.ItemTrigger`. If `loopFocus` is enabled and focus is on the first trigger, it moves focus to the last one.   |
| <kbd>Home</kbd>        | When focus is on an `Accordion.ItemTrigger`, moves focus to the first enabled `Accordion.ItemTrigger`.                                                                                                   |
| <kbd>End</kbd>         | When focus is on an `Accordion.ItemTrigger`, moves focus to the last enabled `Accordion.ItemTrigger`.                                                                                                    |
