# setStyle

Safely applies inline styles to an element and returns a cleanup function to revert changes.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/set-style)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20setStyle]%20Issue)

## Import

```ts
import { setStyle } from '@entry-ui/utilities/set-style';
```

## Usage

The `setStyle` utility provides a declarative way to modify an element's inline styles while maintaining a snapshot of its previous state. This is particularly useful for temporary visual changes, such as animations, drag-and-drop interactions, or modal-induced body locking.

One of the key advantages of this utility is that it optimizes performance by preventing redundant DOM mutations if the requested styles are already present. Additionally, it ensures a clean DOM by automatically removing the `style` attribute if no inline properties remain after a cleanup.

```ts
import { setStyle } from '@entry-ui/utilities/set-style';

const cleanup = setStyle({
  element: document.body,
  style: { overflow: 'hidden', paddingRight: '15px' },
});

// Later, to undo the changes:
cleanup();
```

## API reference

This section provides a technical overview of the `setStyle` function and its configuration properties.

### Parameters

The `setStyle` function accepts a single configuration object as its parameter. Required properties are marked with an asterisk (`*`):

| Property   | Type                           | Default | Description                                                                                                                                                                                             |
| :--------- | :----------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `element*` | `HTMLElement`                  | `-`     | The target HTML element whose inline styles will be modified.                                                                                                                                           |
| `style*`   | `Partial<CSSStyleDeclaration>` | `-`     | An object containing the CSS property-value pairs to apply. Only the provided properties will be updated, while others remain untouched. Values should follow standard CSS property naming conventions. |

### Returns

The `setStyle` function returns a cleanup utility:

| Type         | Description                                                                                                                                                                               |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `() => void` | A function that, when executed, reverts the element's styles to their exact state before `setStyle` was called. It also handles the removal of the `style` attribute if it becomes empty. |
