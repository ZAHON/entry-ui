# Dialog

A popup that opens on top of the entire page.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/components/dialog)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20Dialog]%20Issue)
[![ARIA](https://img.shields.io/badge/ARIA-Pattern-blue?logo=w3c)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

## Import

```tsx
import { Dialog, useDialogRootContext, useDialogTriggerContext, useDialogCloseContext } from '@entry-ui/qwik/dialog';
```

## Anatomy

```tsx
import { component$ } from '@qwik.dev/core';
import { Dialog } from '@entry-ui/qwik/dialog';

const Anatomy = component$(() => {
  return (
    <Dialog.Root>
      <Dialog.Trigger />
      <Dialog.Popup>
        <Dialog.Title />
        <Dialog.Description />
        <Dialog.Close />
      </Dialog.Popup>
    </Dialog.Root>
  );
});
```

## Usage

To implement a dialog, use the `Dialog.Root` to group the interactive `Dialog.Trigger` and the main container, `Dialog.Popup`. Inside the popup, structure your modal content using `Dialog.Title`, `Dialog.Description`, and a `Dialog.Close` element to provide users with an explicit way to dismiss the overlay. This layout ensures proper accessibility tree establishment and semantic clarity.

By default, the component operates in an uncontrolled fashion, managing its open and closed states internally. However, it can also be used as a controlled component by providing an `open` signal and an `onOpenChange$` callback to the root component, allowing you to easily integrate it into external workflows or state-driven architectures.

Below is a basic example of how to implement a simple dialog:

```tsx
import { component$ } from '@qwik.dev/core';
import { Dialog } from '@entry-ui/qwik/dialog';

const Usage = component$(() => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>View notifications</Dialog.Trigger>
      <Dialog.Popup>
        <Dialog.Title>Notifications</Dialog.Title>
        <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Popup>
    </Dialog.Root>
  );
});
```

## Features

- Full keyboard navigation with automatic focus trapping.

- Provides screen reader announcements via rendered title and description.

- Automatically locks body scrolling and traps focus while open.

- Supports dismissal via <kbd>Esc</kbd> key or clicking outside.

- Can be uncontrolled or controlled.

## Rendered elements

Each of `Dialog` subcomponents renders a default HTML element that makes sense for its role. This overview outlines the default element rendered by each part of the component. You can customize this element using the `as` prop.

| Component            | Default rendered element |
| :------------------- | :----------------------- |
| `Dialog.Root`        | `-`                      |
| `Dialog.Trigger`     | `<button>`               |
| `Dialog.Popup`       | `<dialog>`               |
| `Dialog.Title`       | `<h2>`                   |
| `Dialog.Description` | `<p>`                    |
| `Dialog.Close`       | `<button>`               |

> [!IMPORTANT]
> While it is possible to change the element rendered by subcomponents, for accessibility and correct component functionality, `Dialog.Trigger` and `Dialog.Close` should always render a `<button>` element, and `Dialog.Popup` must render a `<dialog>` element, as the internal logic relies on the [native HTML Dialog API](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog).

## API Reference

The `Dialog` component is built using a modular, compound component pattern, providing full control over the layout and behavior of modal overlays. This section provides a detailed breakdown of the properties and data attributes available for each part of the dialog system, as well as the custom hooks provided for accessing and programmatically managing its internal state, allowing for deep customization and seamless integration.

### Dialog.Root

Groups all parts of the dialog. Doesn’t render its own HTML element.

| Prop            | Type                           | Default | Description                                                                                                                                                                                                                                                                                                             |
| :-------------- | :----------------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`          | `Signal<boolean>`              | `-`     | The controlled open state of the dialog. Must be used in conjunction with `onOpenChange$`. The value of this signal must be initialized as `false` (or the prop itself `undefined`). The `Dialog` component uses the native HTML `<dialog>` element, which cannot be reliably rendered or initialized in an open state. |
| `onOpenChange$` | `QRL<(open: boolean) => void>` | `-`     | A `QRL` callback function that is called when the open state of the dialog changes.                                                                                                                                                                                                                                     |

### Dialog.Trigger

A button that opens the dialog. Renders a `<button>` element.

| Prop       | Type                  | Default    | Description                                                                                                                                                                                    |
| :--------- | :-------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`       | `string \| Component` | `"button"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |
| `disabled` | `boolean`             | `false`    | When `true`, prevents the user from interacting with the trigger.                                                                                                                              |

| Data attribute  | Values               | Description                                                         |
| :-------------- | :------------------- | :------------------------------------------------------------------ |
| `data-state`    | `"open" \| "closed"` | Indicates the current state of the dialog.                          |
| `data-disabled` | `-`                  | Present when the trigger is disabled and cannot be interacted with. |

### Dialog.Popup

A container for the dialog contents. Renders a `<dialog>` element.

| Prop                    | Type                           | Default    | Description                                                                                                                                                                                                                       |
| :---------------------- | :----------------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`                    | `string \| Component`          | `"dialog"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details.                                    |
| `preventScroll`         | `boolean`                      | `true`     | If `true`, prevents scrolling on the `<body>` element while the dialog is open. This ensures that the user remains focused on the dialog content and prevents layout shifting or background scrolling.                            |
| `closeOnEscapeKeyDown`  | `boolean`                      | `true`     | If `true`, the dialog will close when the user presses the <kbd>Esc</kbd> key.                                                                                                                                                    |
| `closeOnClickOutside`   | `boolean`                      | `true`     | If `true`, the dialog will close when the user clicks outside the dialog's content area (e.g., on the backdrop).                                                                                                                  |
| `onOpenChangeComplete$` | `QRL<(open: boolean) => void>` | `-`        | A `QRL` callback invoked once the popup's opening or closing transition has fully settled. If CSS transitions or animations are present, it triggers after they finish; otherwise, it executes immediately upon the state change. |

| Data attribute | Values               | Description                                |
| :------------- | :------------------- | :----------------------------------------- |
| `data-state`   | `"open" \| "closed"` | Indicates the current state of the dialog. |

### Dialog.Title

A heading that labels the dialog. Renders an `<h2>` element.

| Prop | Type                  | Default | Description                                                                                                                                                                                    |
| :--- | :-------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as` | `string \| Component` | `"h2"`  | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |

### Dialog.Description

A paragraph with additional information about the dialog. Renders a `<p>` element.

| Prop | Type                  | Default | Description                                                                                                                                                                                    |
| :--- | :-------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as` | `string \| Component` | `"p"`   | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |

### Dialog.Close

A button that closes the dialog. Renders a `<button>` element.

| Prop       | Type                  | Default    | Description                                                                                                                                                                                    |
| :--------- | :-------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`       | `string \| Component` | `"button"` | The element or component this component should render as. Read our [Composition](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/docs/guides/composition.md) guide for more details. |
| `disabled` | `boolean`             | `false`    | When `true`, prevents the user from interacting with the close button.                                                                                                                         |

| Data attribute  | Values | Description                                                              |
| :-------------- | :----- | :----------------------------------------------------------------------- |
| `data-disabled` | `-`    | Present when the close button is disabled and cannot be interacted with. |

### useDialogRootContext

A hook that provides access to the `Dialog.Root` component's internal state. It exposes readonly signal and a `QRL` function to interact with the dialog's state, allowing descendant components to control or react to whether the dialog is shown. This hook returns an object containing the following properties:

| Property   | Type                           | Description                                                                                                                                              |
| :--------- | :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`     | `ReadonlySignal<boolean>`      | A readonly signal whose value indicates the dialog's current open state. It is `true` when the dialog is open, and `false` when closed.                  |
| `setOpen$` | `QRL<(open: boolean) => void>` | A `QRL` function used to programmatically set the open state of the dialog. When invoked with `true`, the dialog will open; with `false`, it will close. |

### useDialogTriggerContext

A hook that provides access to the `Dialog.Trigger` component's internal state. It exposes a readonly signal to interact with the trigger's state, allowing descendant components to react to its disabled/enabled state. This hook returns an object containing the following properties:

| Property   | Type                      | Description                                                                                                                                    |
| :--------- | :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `ReadonlySignal<boolean>` | A readonly signal that indicates whether the trigger is disabled. Its value is `true` if the trigger is disabled, preventing user interaction. |

### useDialogCloseContext

A hook that provides access to the `Dialog.Close` component's internal state. It exposes a readonly signal to interact with the close button's state, allowing descendant components to react to its disabled/enabled state. This hook returns an object containing the following properties:

| Property   | Type                      | Description                                                                                                                                        |
| :--------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `ReadonlySignal<boolean>` | A readonly signal that indicates whether the close button is disabled. Its value is `true` if the button is disabled, preventing user interaction. |

## Examples

Explore various ways to implement and customize the `Dialog` component. From simple uncontrolled setups and external state management to custom backdrop styling, fluid CSS transitions, and precise keyframe animations, these examples demonstrate the component's flexibility and how it can be tailored to fit your specific application layouts and interactive requirements.

### Internal state management

When using the uncontrolled mode, the `Dialog` component manages its open and closed states internally. In this setup, the component handles the logic for toggling the visibility of the popup based on interactions with `Dialog.Trigger` and `Dialog.Close`, as well as built-in behaviors like pressing the <kbd>Esc</kbd> key or clicking outside the content area.

By default, the dialog starts in a closed state to ensure compatibility with the native HTML Dialog API and proper accessibility initialization. This approach is ideal for straightforward scenarios where you don't need to programmatically control the dialog from outside its own scope, allowing for a cleaner and more self-contained implementation.

```tsx
import { component$ } from '@qwik.dev/core';
import { Dialog } from '@entry-ui/qwik/dialog';

const Example = component$(() => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>View notifications</Dialog.Trigger>
      <Dialog.Popup>
        <Dialog.Title>Notifications</Dialog.Title>
        <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Popup>
    </Dialog.Root>
  );
});
```

### External state control

When using the controlled mode, the parent component is responsible for managing the open state of the dialog. You achieve this by passing a signal to the `open` prop on the `Dialog.Root` component and synchronizing changes using the `onOpenChange$` event handler.

This approach is ideal for more complex use cases, such as triggering the dialog based on external events (e.g., a websocket notification), integrating with global state management, or implementing custom logic that must run before the dialog is allowed to open or close.

> [!IMPORTANT]
> The signal passed to the `open` prop must be initialized with `false`. The `Dialog` component uses the native HTML `<dialog>` element, which cannot be reliably rendered or initialized in an open state.

```tsx
import { component$, useSignal } from '@qwik.dev/core';
import { Dialog } from '@entry-ui/qwik/dialog';

const Example = component$(() => {
  const isOpen = useSignal(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange$={(open) => (isOpen.value = open)}>
      <Dialog.Trigger>View notifications</Dialog.Trigger>
      <Dialog.Popup>
        <Dialog.Title>Notifications</Dialog.Title>
        <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Popup>
    </Dialog.Root>
  );
});
```

### Controlling the scroll behavior

By default, the `Dialog` component prevents scrolling on the `<body>` element when the popup is open to maintain focus and prevent background movement. This is achieved by engaging a scroll lock that automatically compensates for scrollbar width to prevent layout shifts.

In certain layout configurations, you may want to disable this behavior and allow the background to remain scrollable while the dialog is active. You can control this using the `preventScroll` prop on the `Dialog.Popup` component. Setting it to `false` will deactivate the scroll lock mechanism.

```tsx
import { component$ } from '@qwik.dev/core';
import { Dialog } from '@entry-ui/qwik/dialog';

const Example = component$(() => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>View notifications</Dialog.Trigger>
      <Dialog.Popup preventScroll={false}>
        <Dialog.Title>Notifications</Dialog.Title>
        <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Popup>
    </Dialog.Root>
  );
});
```

### Preventing close on Escape key

By default, the `Dialog` component follows standard accessibility patterns and closes when the user presses the <kbd>Esc</kbd> key. This provides a quick and familiar way for users to dismiss the popup.

If your use case requires the user to take a specific action within the dialog before closing it, you can disable this behavior by setting the `closeOnEscapeKeyDown` prop to `false` on the `Dialog.Popup` component.

```tsx
import { component$ } from '@qwik.dev/core';
import { Dialog } from '@entry-ui/qwik/dialog';

const Example = component$(() => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>View notifications</Dialog.Trigger>
      <Dialog.Popup closeOnEscapeKeyDown={false}>
        <Dialog.Title>Notifications</Dialog.Title>
        <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Popup>
    </Dialog.Root>
  );
});
```

### Disabling click outside to close

By default, the `Dialog` component closes when the user clicks outside the content area (on the backdrop), providing a convenient way to dismiss the popup.

However, if you want to ensure that the user interacts with the dialog or explicitly clicks the close button, you can disable this behavior by setting the `closeOnClickOutside` prop to `false` on the `Dialog.Popup` component.

```tsx
import { component$ } from '@qwik.dev/core';
import { Dialog } from '@entry-ui/qwik/dialog';

const Example = component$(() => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>View notifications</Dialog.Trigger>
      <Dialog.Popup closeOnClickOutside={false}>
        <Dialog.Title>Notifications</Dialog.Title>
        <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Popup>
    </Dialog.Root>
  );
});
```

### Animating popup with CSS transitions

The `Dialog.Popup` exposes a `data-state` attribute reflecting whether the dialog is `"open"` or `"closed"`. This allows you to leverage standard CSS transitions to create smooth entry and exit effects based on state changes. To implement this, define the transitions on the target properties (such as `opacity` and `transform`) and specify their initial and target values using the `data-state` attribute selectors.

> [!TIP]
> Transitions are the recommended method for animating the `Dialog.Popup`, as they naturally handle animation cancellation mid-way through. For instance, if a user opens the dialog and instantly hits the <kbd>Esc</kbd> key or clicks outside before the entry effect completes, a CSS transition will smoothly reverse back to its closed state without any jarring visual jumps.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Dialog } from '@entry-ui/qwik/dialog';
import styles from './index.module.css';

const Example = component$(() => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>View notifications</Dialog.Trigger>
      <Dialog.Popup class={styles['dialog-popup']}>
        <Dialog.Title>Notifications</Dialog.Title>
        <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Popup>
    </Dialog.Root>
  );
});
```

```css
/* index.module.css */
.dialog-popup {
  margin: unset;
  border: unset;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  transition-property: opacity, transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

.dialog-popup[data-state='closed'] {
  opacity: 0;
  transform: translate(-50%, -48%) scale(0.96);
}

.dialog-popup[data-state='open'] {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
```

### Animating popup with CSS animations

The `Dialog.Popup` can also be animated using CSS keyframes. By leveraging the `data-state` attribute, you can trigger distinct entry and exit keyframe animations for both the open and closed states. This method provides maximum control when you want to choreograph complex multi-stage animations, allowing you to define precise sequences for properties like `opacity` and `transform`.

> [!NOTE]
> Although CSS animations offer exceptional control over complex choreography, they are less forgiving than transitions when interrupted mid-way. Because keyframe animations always run from a fixed starting point to a fixed ending point, they cannot naturally reverse from a partially animated state. If a user rapidly opens and closes the dialog, the popup may visually jump to the start of the next animation phase rather than fluidly reversing from its current scale or opacity.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Dialog } from '@entry-ui/qwik/dialog';
import styles from './index.module.css';

const Example = component$(() => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>View notifications</Dialog.Trigger>
      <Dialog.Popup class={styles['dialog-popup']}>
        <Dialog.Title>Notifications</Dialog.Title>
        <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Popup>
    </Dialog.Root>
  );
});
```

```css
/* index.module.css */
.dialog-popup {
  margin: unset;
  border: unset;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
}

.dialog-popup[data-state='open'] {
  animation: dialog-popup-show 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.dialog-popup[data-state='closed'] {
  animation: dialog-popup-hide 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes dialog-popup-show {
  0% {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes dialog-popup-hide {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
}
```

### Styling the backdrop

The `Dialog.Popup` component uses the native HTML `<dialog>` element under the hood, which includes a built-in `::backdrop` pseudo-element. This allows you to easily style the dimming effect or background overlay behind the dialog when it is open. You can apply properties like `background-color` or `backdrop-filter` directly to the `::backdrop` selector to match the overlay with your application's design system.

```tsx
// index.tsx
import { component$ } from '@qwik.dev/core';
import { Dialog } from '@entry-ui/qwik/dialog';
import styles from './index.module.css';

const Example = component$(() => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>View notifications</Dialog.Trigger>
      <Dialog.Popup class={styles['dialog-popup']}>
        <Dialog.Title>Notifications</Dialog.Title>
        <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Popup>
    </Dialog.Root>
  );
});
```

```css
/* index.module.css */
.dialog-popup::backdrop {
  background-color: oklch(0% 0 0 / 0.5);
}
```

## Accessibility

The `Dialog` component is built with accessibility in mind, strictly adhering to the [Dialog WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). This ensures the component is usable and understandable for everyone, including users relying on assistive technologies like screen readers. By following this pattern, it automatically manages crucial aspects such as focus trapping, aria attributes, and proper keyboard navigation, providing a robust and inclusive user experience.

### Keyboard interactions

Users can interact with the `Dialog` component efficiently using only a keyboard. The following overview outlines the primary keyboard shortcuts and their actions:

| Key                    | Description                                                                                                                    |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| <kbd>Space</kbd>       | When focus is on the `Dialog.Trigger`, opens the dialog. When focus is on the `Dialog.Close`, closes the dialog.               |
| <kbd>Enter</kbd>       | When focus is on the `Dialog.Trigger`, opens the dialog. When focus is on the `Dialog.Close`, closes the dialog.               |
| <kbd>Tab</kbd>         | When focus is inside the `Dialog.Popup`, moves focus to the next focusable element.                                            |
| <kbd>Shift + Tab</kbd> | When focus is inside the `Dialog.Popup`, moves focus to the previous focusable element.                                        |
| <kbd>Esc</kbd>         | Closes the dialog and moves focus to `Dialog.Trigger` when the `closeOnEscapeKeyDown` prop on `Dialog.Popup` is set to `true`. |
