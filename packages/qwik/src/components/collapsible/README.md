# Collapsible

A collapsible panel controlled by a button.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/components/collapsible)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20Collapsible]%20Issue)
[![ARIA](https://img.shields.io/badge/ARIA-Pattern-blue?logo=w3c)](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

## Import

```tsx
import { Collapsible, useCollapsibleRootContext, useCollapsibleTriggerContext } from '@entry-ui/qwik/collapsible';
```

## Anatomy

```tsx
import { component$ } from '@qwik.dev/core';
import { Collapsible } from '@entry-ui/qwik/collapsible';

const Anatomy = component$(() => {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Panel />
    </Collapsible.Root>
  );
});
```

## Usage

To create a basic collapsible, use the `Collapsible.Root` as a wrapper and place a `Collapsible.Trigger` alongside a `Collapsible.Panel`. The component handles all accessibility requirements (like `aria-expanded` and keyboard interactions) out of the box.

```tsx
import { component$ } from '@qwik.dev/core';
import { Collapsible } from '@entry-ui/qwik/collapsible';

const Usage = component$(() => {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>Toggle Panel</Collapsible.Trigger>
      <Collapsible.Panel>
        This content is hidden by default and becomes visible when the trigger is clicked.
      </Collapsible.Panel>
    </Collapsible.Root>
  );
});
```

## Features

- Full keyboard navigation.

- Can be uncontrolled or controlled.

## Rendered elements

Each of `Collapsible` subcomponents renders a default HTML element that is sensible for its role. This overview outlines the default element rendered by each part of the component. You can customize this element using the `as` prop, as shown in the [Rendering different elements](#rendering-different-elements) example.

| Component               | Default rendered element |
| :---------------------- | :----------------------- |
| `Collapsible.Root`      | `<div>`                  |
| `Collapsible.Trigger`   | `<button>`               |
| `Collapsible.Panel`     | `<div>`                  |
| `Collapsible.Indicator` | `<span>`                 |

> [!IMPORTANT]
> While it's possible to change the element rendered by `Collapsible.Trigger`, for accessibility and correct component functionality, it should always render a `<button>` element.

## API Reference

The `Collapsible` component is built using a modular, compound component pattern. This section provides a detailed breakdown of the properties, data attributes, and CSS variables available for each part of the collapsible, as well as the custom hooks provided for advanced state management.

### Collapsible.Root

Groups all parts of the collapsible. Renders a `<div>` element.

| Prop            | Type                           | Default | Description                                                                                                                                                                                    |
| :-------------- | :----------------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`            | `string \| Component`          | `"div"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |
| `defaultOpen`   | `boolean`                      | `-`     | The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state.                                                                           |
| `open`          | `Signal<boolean>`              | `-`     | The controlled open state of the collapsible. Must be used in conjunction with `onOpenChange$`.                                                                                                |
| `onOpenChange$` | `QRL<(open: boolean) => void>` | `-`     | A `QRL` callback function that is called when the open state of the collapsible changes.                                                                                                       |
| `disabled`      | `boolean`                      | `false` | When `true`, prevents the user from interacting with the collapsible.                                                                                                                          |

| Data attribute  | Values               | Description                                     |
| :-------------- | :------------------- | :---------------------------------------------- |
| `data-state`    | `"open" \| "closed"` | Indicates the current state of the collapsible. |
| `data-disabled` | `-`                  | Present when the collapsible is disabled.       |

### Collapsible.Trigger

A button that opens and closes the collapsible panel. Renders a `<button>` element.

| Prop       | Type                  | Default    | Description                                                                                                                                                                                    |
| :--------- | :-------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`       | `string \| Component` | `"button"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |
| `disabled` | `boolean`             | `-`        | When `true`, prevents the user from interacting with the trigger. If left `undefined`, this state will be inherited from the `disabled` prop of the `Collapsible.Root` component.              |

| Data attribute  | Values               | Description                                     |
| :-------------- | :------------------- | :---------------------------------------------- |
| `data-state`    | `"open" \| "closed"` | Indicates the current state of the collapsible. |
| `data-disabled` | `-`                  | Present when the collapsible is disabled.       |

### Collapsible.Panel

A panel with the collapsible contents. Renders a `<div>` element.

| Prop                    | Type                           | Default | Description                                                                                                                                                                                                               |
| :---------------------- | :----------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `as`                    | `string \| Component`          | `"div"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details.                            |
| `hiddenUntilFound`      | `boolean`                      | `false` | When `true`, the panel uses the `hidden="until-found"` attribute when closed. This allows the browser to search and reveal content within the panel even before it is manually opened.                                    |
| `onOpenChangeComplete$` | `QRL<(open: boolean) => void>` | `-`     | A `QRL` callback invoked once the panel's expansion or collapse has fully settled. If CSS transitions or animations are present, it triggers after they finish; otherwise, it executes immediately upon the state change. |

| Data attribute  | Values               | Description                                     |
| :-------------- | :------------------- | :---------------------------------------------- |
| `data-state`    | `"open" \| "closed"` | Indicates the current state of the collapsible. |
| `data-disabled` | `-`                  | Present when the collapsible is disabled.       |

| CSS variable                               | Description                     |
| :----------------------------------------- | :------------------------------ |
| `--entry-ui-qwik-collapsible-panel-height` | The collapsible panel's height. |

### Collapsible.Indicator

An optional visual indicator that reflects the collapsible's open or closed state. It typically displays an icon or other visual cue to show the current status. Renders a `<span>` element.

| Prop | Type                  | Default  | Description                                                                                                                                                                                    |
| :--- | :-------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as` | `string \| Component` | `"span"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |

| Data attribute  | Values               | Description                                     |
| :-------------- | :------------------- | :---------------------------------------------- |
| `data-state`    | `"open" \| "closed"` | Indicates the current state of the collapsible. |
| `data-disabled` | `-`                  | Present when the collapsible is disabled.       |

### useCollapsibleRootContext

A hook that provides access to the `Collapsible.Root` component's internal state. It exposes readonly signals and `QRL` function to interact with the collapsible's state, allowing descendant components to control or react to its expanded/collapsed state. This hook returns an object containing the following properties:

| Property   | Type                           | Description                                                                                                                                                        |
| :--------- | :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`     | `ReadonlySignal<boolean>`      | A readonly signal whose value indicates the collapsible's current open state. It is `true` when the collapsible is open, and `false` when closed.                  |
| `setOpen$` | `QRL<(open: boolean) => void>` | A `QRL` function used to programmatically set the open state of the collapsible. When invoked with `true`, the collapsible will open; with `false`, it will close. |
| `disabled` | `ReadonlySignal<boolean>`      | A readonly signal whose value indicates the collapsible's current disabled state. It is `true` when the collapsible is prevented from user interaction.            |

### useCollapsibleTriggerContext

A hook that provides access to the `Collapsible.Trigger` component's internal state. It exposes readonly signal to interact with the trigger's state, allowing descendant components to react to its disabled/enabled state. This hook returns an object containing the following properties:

| Property   | Type                      | Description                                                                                                                                                                                                                        |
| :--------- | :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `ReadonlySignal<boolean>` | A readonly signal representing the effective disabled state of the trigger. This value is computed by prioritizing the trigger's own `disabled` prop, falling back to the `Collapsible.Root` disabled state if not explicitly set. |

## Examples

Explore various ways to implement and customize the `Collapsible` component. From simple uncontrolled states to complex nested structures and smooth height animations, these examples demonstrate the component's flexibility and how it can be tailored to fit your specific design and functional requirements.

### Internal state management (Uncontrolled)

In uncontrolled mode, the `Collapsible` component manages its open state internally. You define the initial state by providing a boolean to the `defaultOpen` prop on `Collapsible.Root`. The component then takes full control over subsequent state changes based on user interactions, such as clicking the trigger. This approach is ideal for simpler use cases where the collapsible's state does not need to be managed or synchronized by a parent component.

```tsx
import { component$ } from '@qwik.dev/core';
import { Collapsible } from '@entry-ui/qwik/collapsible';

const Example = component$(() => {
  return (
    <Collapsible.Root defaultOpen={false}>
      <Collapsible.Trigger>What is Entry UI Qwik?</Collapsible.Trigger>
      <Collapsible.Panel>
        A collection of accessible, unstyled components, hooks, and utilities for Qwik, designed for building
        high-quality web applications and design systems.
      </Collapsible.Panel>
    </Collapsible.Root>
  );
});
```

### External state control (Controlled)

When using the controlled mode, the parent component is responsible for managing the open state of the collapsible. You achieve this by passing a signal to the `open` prop on the `Collapsible.Root` component and listening for changes with the `onOpenChange$` event handler. This approach is ideal for more complex use cases, such as synchronizing the collapsible state with a database, integrating with external state management, or enabling a parent component to dynamically trigger state changes based on other application logic.

```tsx
import { component$, useSignal } from '@qwik.dev/core';
import { Collapsible } from '@entry-ui/qwik/collapsible';

const Example = component$(() => {
  const isOpen = useSignal(false);

  return (
    <Collapsible.Root open={isOpen} onOpenChange$={(open) => (isOpen.value = open)}>
      <Collapsible.Trigger>What is Entry UI Qwik?</Collapsible.Trigger>
      <Collapsible.Panel>
        A collection of accessible, unstyled components, hooks, and utilities for Qwik, designed for building
        high-quality web applications and design systems.
      </Collapsible.Panel>
    </Collapsible.Root>
  );
});
```

### Animating panel height with CSS transitions

The `Collapsible.Panel` automatically calculates its content's height and provides it via the `--entry-ui-qwik-collapsible-panel-height` CSS variable. This allows you to create smooth expansion and collapse effects using standard CSS transitions. To implement this, ensure your panel has `overflow: hidden` and a transition applied to the `height` property.

> [!TIP]
> Transitions are the recommended method for animating the `Collapsible.Panel` height, especially because they allow for smooth cancellation mid-way through an animation. For example, if a user quickly opens and then closes the collapsible before it fully expands, a transition will smoothly animate it back to its closed state without any abrupt jumps.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Collapsible } from '@entry-ui/qwik/collapsible';
import styles from './index.module.css';

const Example = component$(() => {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>What is Entry UI Qwik?</Collapsible.Trigger>
      <Collapsible.Panel class={styles['collapsible-panel']}>
        A collection of accessible, unstyled components, hooks, and utilities for Qwik, designed for building
        high-quality web applications and design systems.
      </Collapsible.Panel>
    </Collapsible.Root>
  );
});
```

```css
/* index.module.css */
.collapsible-panel {
  overflow: hidden;
  height: var(--entry-ui-qwik-collapsible-panel-height);
  transition: height 300ms cubic-bezier(0.87, 0, 0.13, 1);
}
```

### Animating panel height with CSS animations

You can also use CSS keyframes to animate the height of the `Collapsible.Panel`. By leveraging the `data-state` attribute, you can trigger specific keyframe animations for both opening and closing states. This method is particularly useful when you want to choreograph the height change alongside other properties like opacity or scale, as it allows you to define the exact flow of the height animation from `0` to the value stored in the `--entry-ui-qwik-collapsible-panel-height` CSS variable.

> [!NOTE]
> While CSS animations offer great control over choreography, they are generally less flexible than transitions for toggling the `Collapsible.Panel` height. Because keyframe animations always run from a fixed start to a fixed end point, they cannot be smoothly cancelled mid-way. If a user interrupts the animation, the panel may "jump" to the start of the next animation state rather than reversing fluidly from its current position.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Collapsible } from '@entry-ui/qwik/collapsible';
import styles from './index.module.css';

const Example = component$(() => {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>What is Entry UI Qwik?</Collapsible.Trigger>
      <Collapsible.Panel class={styles['collapsible-panel']}>
        A collection of accessible, unstyled components, hooks, and utilities for Qwik, designed for building
        high-quality web applications and design systems.
      </Collapsible.Panel>
    </Collapsible.Root>
  );
});
```

```css
/* index.module.css */
.collapsible-panel {
  overflow: hidden;
}

.collapsible-panel[data-state='open'] {
  animation: collapsible-panel-down 300ms cubic-bezier(0.87, 0, 0.13, 1);
}

.collapsible-panel[data-state='closed'] {
  animation: collapsible-panel-up 300ms cubic-bezier(0.87, 0, 0.13, 1);
}

@keyframes collapsible-panel-down {
  0% {
    height: 0;
  }
  100% {
    height: var(--entry-ui-qwik-collapsible-panel-height);
  }
}

@keyframes collapsible-panel-up {
  0% {
    height: var(--entry-ui-qwik-collapsible-panel-height);
  }
  100% {
    height: 0;
  }
}
```

### Searchable hidden content

By default, hidden content in a collapsible panel is invisible to the browser's "Find in page" feature. By setting the `hiddenUntilFound` prop to `true`, the `Collapsible.Panel` uses the `hidden="until-found"` HTML attribute. This allows the browser to index and search the content while it is closed. If a match is found, the browser will automatically expand the panel to reveal the content to the user.

> [!IMPORTANT]
> If the `Collapsible.Root` is `disabled`, the `hiddenUntilFound` functionality is automatically overridden. In this case, the `Collapsible.Panel` uses the standard `hidden="hidden"` attribute, ensuring that non-interactive or disabled content is not indexed or revealed by the browser's search feature.

> [!NOTE]
> When a panel is automatically expanded via the "Find in page" feature, height animations are temporarily disabled. This ensures the browser can instantly scroll to and highlight the matching text, providing a better user experience by avoiding "scrolling to a moving target" during the animation.

```tsx
import { component$ } from '@qwik.dev/core';
import { Collapsible } from '@entry-ui/qwik/collapsible';

const Example = component$(() => {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>Technical Specifications</Collapsible.Trigger>
      {/* Search for "SQU-2026" in the browser to see it in action */}
      <Collapsible.Panel hiddenUntilFound={true}>
        <p>Model Number: SQU-2026</p>
        <p>Manufacturer: Entry UI Systems</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
});
```

### Nesting for multi-level disclosures

The `Collapsible` component can be nested within another `Collapsible.Panel` to create multi-level disclosures or hierarchical menus. Since each `Collapsible.Root` creates its own independent context, internal states remain isolated, allowing you to build complex interfaces like nested FAQs, documentation trees, or multi-layered navigation without additional state management.

```tsx
import { component$ } from '@qwik.dev/core';
import { Collapsible } from '@entry-ui/qwik/collapsible';

const Example = component$(() => {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>Getting started</Collapsible.Trigger>
      <Collapsible.Panel>
        Welcome to the Entry UI Qwik documentation. Here are some topics to explore:
        <Collapsible.Root>
          <Collapsible.Trigger>Installation</Collapsible.Trigger>
          <Collapsible.Panel>
            Install Entry UI Qwik using your preferred package manager: <code>npm install -D @entry-ui/qwik</code>
          </Collapsible.Panel>
        </Collapsible.Root>
        <Collapsible.Root>
          <Collapsible.Trigger>Styling</Collapsible.Trigger>
          <Collapsible.Panel>
            Entry UI Qwik components are unstyled by default. Use CSS modules, Tailwind CSS, or any styling solution.
          </Collapsible.Panel>
        </Collapsible.Root>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
});
```

### State-aware visual indicators

The `Collapsible.Indicator` subcomponent provides a simple way to add visual cues, such as arrows or icons, that react to the collapsible's state. By using the `data-state` attribute, you can easily apply CSS transitions or transforms (e.g., rotating an arrow) to indicate whether the panel is currently expanded or collapsed, enhancing the overall user experience and affordance.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Collapsible } from '@entry-ui/qwik/collapsible';
import styles from './index.module.css';

const Example = component$(() => {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>
        What is Entry UI Qwik?
        <Collapsible.Indicator class={styles['collapsible-indicator']}>
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
        </Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Panel>
        A collection of accessible, unstyled components, hooks, and utilities for Qwik, designed for building
        high-quality web applications and design systems.
      </Collapsible.Panel>
    </Collapsible.Root>
  );
});
```

```css
/* index.module.css */
.collapsible-indicator {
  display: inline-block;
  transform-origin: center;
}

.collapsible-indicator[data-state='open'] {
  transform: rotate(180deg);
}
```

### Rendering different elements

By default, the `Collapsible` subcomponents render elements that are sensible for their roles, such as a `<button>` for `Collapsible.Trigger`, or a `<div>` for `Collapsible.Panel`. For a complete overview of the default elements, refer to the [Rendered elements](#rendered-elements) section.

You can customize the underlying HTML element rendered by these components, or even compose them with your own custom Qwik components, by using the `as` prop. This provides immense flexibility, allowing you to:

- Replace the default HTML tag with any other valid HTML element that fits your design and semantic needs (e.g., rendering the `Collapsible.Panel` as a `<ul>` for better list semantics).

- Integrate your own Qwik components, wrapping them with custom styles or behaviors while ensuring the component's core logic and accessibility features remain intact.

> [!IMPORTANT]
> While it's possible to change the element rendered by `Collapsible.Root`, for accessibility and correct component functionality, it should always render a `<button>` element.

```tsx
import type { PropsOf } from '@qwik.dev/core';
import { component$, Slot } from '@qwik.dev/core';
import { Collapsible } from '@/components/collapsible';

const MyCustomButton = component$<PropsOf<'button'>>((props) => {
  return (
    <button style={{ color: 'white', backgroundColor: 'purple' }} {...props}>
      <Slot />
    </button>
  );
});

const Example = component$(() => {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger as={MyCustomButton}>What languages do you support?</Collapsible.Trigger>
      <Collapsible.Panel as="ul">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
});
```

## Accessibility

The `Collapsible` component is built with accessibility in mind, strictly adhering to the [Disclosure WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/). This ensures the component is usable and understandable for everyone, including users relying on assistive technologies like screen readers. By following this pattern, it automatically handles crucial ARIA attributes and keyboard interactions, providing a robust and inclusive user experience.

### Keyboard interactions

Users can interact with the `Collapsible` component efficiently using only a keyboard. The following overview outlines the primary keyboard shortcuts and their actions:

| Key              | Description                                                                                         |
| :--------------- | :-------------------------------------------------------------------------------------------------- |
| <kbd>Space</kbd> | When focus is on the `Collapsible.Trigger`, opens or closes the collapsible, unless it is disabled. |
| <kbd>Enter</kbd> | When focus is on the `Collapsible.Trigger`, opens or closes the collapsible, unless it is disabled. |
