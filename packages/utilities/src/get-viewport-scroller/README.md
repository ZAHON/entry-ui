# getViewportScroller

Determines and returns the active element responsible for scrolling the document viewport.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-viewport-scroller)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getViewportScroller]%20Issue)

## Import

```ts
import { getViewportScroller } from '@entry-ui/utilities/get-viewport-scroller';
```

## Usage

The `getViewportScroller` utility determines whether `<html>` or `<body>` acts as the active scroll container for the document viewport.

According to CSS specifications, the viewport's overflow behavior is inherited directly from the root `<html>` element. If `<html>` establishes its own scroll container (e.g. via `overflow: "auto"` or `overflow: "scroll"`), it becomes the active viewport scroller. Otherwise, overflow propagates down to the `<body>` element, making it the effective scroll target.

```ts
import { getViewportScroller } from '@entry-ui/utilities/get-viewport-scroller';

// Retrieve the correct scroll target for the current document context.
const scroller = getViewportScroller({
  html: document.documentElement,
  body: document.body,
});

// Safely read or set scroll offsets on the resolved container.
scroller.scrollTop = 0;
```

## API reference

This section provides a technical overview of the `getViewportScroller` function, including its parameters and return values.

### Parameters

The `getViewportScroller` function accepts a single required configuration object as its parameter, where all properties are required (marked with an asterisk `*`):

| Property | Type          | Default | Description                                                                                                                                                                           |
| :------- | :------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `html*`  | `HTMLElement` | `-`     | The root `<html>` element of the document. Used to check if explicit overflow properties are declared on the root element, which overrides default document-level scroll propagation. |
| `body*`  | `HTMLElement` | `-`     | The document `<body>` element. Serves as the default viewport scroll container when the root `<html>` element does not establish its own independent scroll container.                |

### Returns

The `getViewportScroller` function returns an element:

| Type          | Description                                                                                                                           |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `HTMLElement` | Returns the `<html>` element if it establishes its own scroll container, otherwise returns the `<body>` element as the scroll target. |
