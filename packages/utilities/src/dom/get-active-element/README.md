# getActiveElement

Recursively retrieves the currently focused element, including those nested deep within the Shadow DOM.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-active-element)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getActiveElement]%20Issue)

## Import

```ts
import { getActiveElement } from '@entry-ui/utilities/get-active-element';
```

## Usage

The `getActiveElement` utility solves a common limitation of the standard `document.activeElement` API. When an element inside a Shadow Root (e.g., inside a Web Component) has focus, the standard API only returns the host element, effectively "hiding" the true focus target.

This utility recursively traverses through any available `shadowRoot` to pinpoint the actual leaf element that holds focus. This is essential for building accessible components, managing focus traps, or handling keyboard navigation in modern web applications.

```ts
import { getActiveElement } from '@entry-ui/utilities/get-active-element';

// Standard behavior:
console.log(document.activeElement);
// Returns: <my-custom-input /> (the Shadow Host)

// Using getActiveElement:
const realFocus = getActiveElement(document);
console.log(realFocus);
// Returns: <input /> (the actual element inside the Shadow DOM)
```

## API reference

This section provides a technical overview of the `getActiveElement` function and its traversal logic.

### Parameters

The `getActiveElement` function accepts a single required parameter (marked with an asterisk `*`) representing the starting document context:

| Parameter | Type       | Default | Description                                                                                           |
| :-------- | :--------- | :------ | :---------------------------------------------------------------------------------------------------- |
| `doc*`    | `Document` | `-`     | The document object to inspect. The utility will start its recursive search from `doc.activeElement`. |

### Returns

The `getActiveElement` function returns the deeply nested focused element:

| Type              | Description                                                                                                                                  |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `Element \| null` | The actual element that holds focus. If no element is focused or the document is invalid, it returns `null` or the top-level active element. |
