# isViewportScrollLocked

Determines whether vertical scrolling on the document viewport is actively locked or disabled.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/is-viewport-scroll-locked)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20isViewportScrollLocked]%20Issue)

## Import

```ts
import { isViewportScrollLocked } from '@entry-ui/utilities/is-viewport-scroll-locked';
```

## Usage

The `isViewportScrollLocked` utility checks whether vertical scrolling on the document viewport is disabled.

It resolves the active viewport scroll container (`<html>` or `<body>`) and evaluates its computed `overflowY` style property. Scrolling is considered locked if overflowY evaluates to `"hidden"` or `"clip"`, which is a common pattern used when opening modals or overlays to block background scrolling.

```ts
import { isViewportScrollLocked } from '@entry-ui/utilities/is-viewport-scroll-locked';

// Check if the viewport scrolling is currently locked by an active modal or overlay.
const isLocked = isViewportScrollLocked({
  win: window,
  html: document.documentElement,
  body: document.body,
});

if (isLocked) {
  // Prevent secondary scroll operations or prevent layout shifts while locked.
}
```

## API reference

This section provides a technical overview of the `isViewportScrollLocked` function, including its parameters and return values.

### Parameters

The `isViewportScrollLocked` function accepts a single required configuration object as its parameter, where all properties are required (marked with an asterisk `*`):

| Property | Type            | Default | Description                                                                                                                                                                                     |
| :------- | :-------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `win*`   | `typeof window` | `-`     | The target `Window` object context. Provides access to the active execution context's `getComputedStyle` API, ensuring accurate style evaluation even across cross-frame or iframe boundaries.  |
| `html*`  | `HTMLElement`   | `-`     | The root `<html>` element of the document. Evaluated by the scroller resolution engine to check for explicit root-level overflow rules that override default document-level scroll propagation. |
| `body*`  | `HTMLElement`   | `-`     | The document `<body>` element. Acts as the fallback viewport scroll target when the root `<html>` element does not establish its own independent scroll container.                              |

### Returns

The `isViewportScrollLocked` function returns a boolean:

| Type      | Description                                                                                                                            |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if the computed `overflowY` style of the active viewport scroller is `"hidden"` or `"clip"`, otherwise returns `false`. |
