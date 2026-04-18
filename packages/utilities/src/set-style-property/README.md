# setStyleProperty

Verifies and applies a specific CSS property to an element with a revertible cleanup.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/set-style-property)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20setStyleProperty]%20Issue)

## Import

```ts
import { setStyleProperty } from '@entry-ui/utilities/set-style-property';
```

## Usage

The `setStyleProperty` utility offers a lightweight way to manage individual CSS properties or custom variables (`--vars`). It is specifically designed for cases where you need to toggle a single style (like a theme color or a specific transform) and later revert it to its original state.

By focusing on a single property, it avoids the overhead of object iterations. It also optimizes performance by preventing redundant DOM updates if the property already holds the target value. Like other style utilities in this package, it ensures DOM cleanliness by removing the `style` attribute if it becomes empty after cleanup.

```ts
import { setStyleProperty } from '@entry-ui/utilities/set-style-property';

const cleanup = setStyleProperty({
  element: document.documentElement,
  property: '--brand-color',
  value: 'blue',
});

// Reverts the property to its original value
cleanup();
```

## API reference

This section provides a technical overview of the `setStyleProperty` function and its configuration properties.

### Parameters

The `setStyleProperty` function accepts a single configuration object as its parameter. Required properties are marked with an asterisk (`*`):

| Property    | Type          | Default | Description                                                                                                                                                   |
| :---------- | :------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `element*`  | `HTMLElement` | `-`     | The target HTML element whose inline style property will be modified.                                                                                         |
| `property*` | `string`      | `-`     | The name of the CSS property to be set. This can be a standard CSS property (e.g., `"opacity"`) or a CSS custom property/variable (e.g., `"--accent-color"`). |
| `value*`    | `string`      | `-`     | The value to be assigned to the specified property. This must be a string that conforms to CSS value syntax (e.g., `"0.5"`, `"20px"`, or `"var(--primary)"`). |

### Returns

The `setStyleProperty` function returns a cleanup utility:

| Type         | Description                                                                                                                                                                                      |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `() => void` | A function that, when executed, reverts the specific property to its exact state before `setStyleProperty` was called. It also handles the removal of the `style` attribute if it becomes empty. |
