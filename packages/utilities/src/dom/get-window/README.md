# getWindow

Retrieves the window object associated with a given DOM node, ensuring the correct execution context.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-window)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getWindow]%20Issue)

## Import

```ts
import { getWindow } from '@entry-ui/utilities/get-window';
```

## Usage

The `getWindow` utility identifies the global `window` object (execution context) for a specific DOM node. This is essential when building applications that interact with `iframes` or multiple browser windows, where a node's owner document might differ from the top-level `window`.

By using this utility, you ensure that window-level APIs (like `getComputedStyle`, `requestAnimationFrame`, or event listeners) are accessed from the correct environment relative to the element.

```ts
import { getWindow } from '@entry-ui/utilities/get-window';

const element = document.getElementById('my-iframe-element');
const targetWindow = getWindow(element);

// Now you can safely use window-specific APIs
const styles = targetWindow.getComputedStyle(element);

// If node is null, it falls back to the current global window
getWindow(null);
// Returns: window
```

## API reference

This section provides a technical overview of the `getWindow` function and how it resolves the execution context.

### Parameters

The `getWindow` function accepts a single required parameter (marked with an asterisk `*`) that represents the starting point for finding the window context:

| Parameter | Type  | Default | Description                                                                                                                                                                        |
| :-------- | :---- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node*`   | `any` | `-`     | The DOM node or object to inspect. The utility attempts to access `node.ownerDocument.defaultView`. If the node is null or lacks these properties, it returns the global `window`. |

### Returns

The `getWindow` function returns the resolved `window` object:

| Type            | Description                                                                                                                                        |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `typeof window` | The `window` object associated with the node's document, or the current global `window` if the node is invalid or resides in the standard context. |
