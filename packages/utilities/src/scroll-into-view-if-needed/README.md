# scrollIntoViewIfNeeded

Ensures an element is visible in the viewport by scrolling to it only if necessary.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/scroll-into-view-if-needed)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20scrollIntoViewIfNeeded]%20Issue)

## Import

```ts
import { scrollIntoViewIfNeeded } from '@entry-ui/utilities/scroll-into-view-if-needed';
```

## Usage

The `scrollIntoViewIfNeeded` utility is a "smart-scroll" wrapper. It prioritizes the non-standard, Chromium/WebKit-specific `scrollIntoViewIfNeeded` method, which avoids scrolling if the element is already within the visible area. For other browsers (like Firefox), it provides a seamless fallback using the standard `scrollIntoView` API.

This utility is particularly effective for accessibility and user experience, as it prevents unnecessary and jarring layout jumps during automated focus management or search-in-page interactions.

```ts
import { scrollIntoViewIfNeeded } from '@entry-ui/utilities/scroll-into-view-if-needed';

const target = document.querySelector('#target-element');

// Scrolls the element into the center of the viewport only if it's not visible.
scrollIntoViewIfNeeded({
  element: target,
  center: true,
});
```

## API reference

This section provides a detailed technical overview of the `scrollIntoViewIfNeeded` function, including its input parameters and expected behavior.

### Parameters

The `scrollIntoViewIfNeeded` function accepts a single configuration object as its parameter. This object contains the following properties, where those marked with an asterisk (`*`) are required:

| Property   | Type          | Default | Description                                                                                                                                                                                                                                                                           |
| :--------- | :------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `element*` | `HTMLElement` | `-`     | The DOM element to be brought into the visible area of the viewport. This is the primary target for the scroll operation, ensuring the element is accessible to the user's current line of sight.                                                                                     |
| `center`   | `boolean`     | `true`  | Controls the positioning logic for the scroll alignment. When set to `true`, the utility attempts to place the element in the dead center of the viewport. When `false`, it uses the `"nearest"` alignment strategy, minimizing movement if the element is already partially visible. |

### Returns

The `scrollIntoViewIfNeeded` function does not return a value:

| Type   | Description                                                                                                   |
| :----- | :------------------------------------------------------------------------------------------------------------ |
| `void` | The function performs a side effect by modifying the scroll position of the element's scrollable ancestor(s). |
