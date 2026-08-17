# focusElement

Programmatically manages focus for a specific DOM element with extended configuration options.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/focus-element)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20focusElement]%20Issue)

## Import

```ts
import { focusElement } from '@entry-ui/utilities/focus-element';
```

## Usage

The `focusElement` utility wraps the native `HTMLElement.focus()` method to provide a unified interface for common focus-related tasks. It allows for precise control over visual indicators, scroll behavior, and text selection, ensuring a consistent user experience across different interaction patterns (e.g., switching between mouse and keyboard).

```ts
import { focusElement } from '@entry-ui/utilities/focus-element';

// Focus an input and automatically select its text content
focusElement({ element: myInput, select: true });

// Basic focus with scroll prevention
focusElement({ element: myButton, preventScroll: true });

// Triggering focus with a visible focus ring (mimics keyboard navigation)
focusElement({ element: myLink, focusVisible: true });
```

## API reference

This section provides a technical overview of the `focusElement` function and its configuration properties.

### Parameters

The `focusElement` function accepts a single configuration object as its parameter. Required properties are marked with an asterisk (`*`):

| Property        | Type          | Default | Description                                                                                                                                                                                                                                |
| :-------------- | :------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `element*`      | `HTMLElement` | `-`     | The target HTML element that should receive focus. This element will be focused using the native `HTMLElement.focus()` method.                                                                                                             |
| `focusVisible`  | `boolean`     | `false` | Whether the focus indicator (e.g., focus ring) should be visible. This mimics the behavior of the `:focus-visible` CSS pseudo-class, ensuring the element appears focused to the user, typically used for keyboard navigation consistency. |
| `preventScroll` | `boolean`     | `false` | Whether the browser should scroll the element into view after focusing. If set to `true`, it prevents the default scrolling behavior.                                                                                                      |
| `select`        | `boolean`     | `false` | Whether to select the text content within the element. Selection is only performed if the element is an `HTMLInputElement`, supports selection, and is not already the currently focused element.                                          |

### Returns

The `focusElement` function is a void utility and does not return a value:

| Type   | Description                                                                           |
| :----- | :------------------------------------------------------------------------------------ |
| `void` | The function performs an action (focusing/selecting) and completes without returning. |
