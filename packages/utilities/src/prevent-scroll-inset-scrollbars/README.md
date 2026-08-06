# preventScrollInsetScrollbars

Prevents viewport scrolling in inset scrollbar environments while preserving layout stability.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/prevent-scroll-inset-scrollbars)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20preventScrollInsetScrollbars]%20Issue)

## Import

```ts
import { preventScrollInsetScrollbars } from '@entry-ui/utilities/prevent-scroll-inset-scrollbars';
```

## Usage

The `preventScrollInsetScrollbars` utility locks document viewport scrolling in environments with classic, physical inset scrollbars where hiding scrollbars typically causes unwanted layout shifts (content jitter).

It leverages native `scrollbar-gutter: stable` support when available. When native support is lacking, it seamlessly falls back to body-locking with dynamic dimensional compensation (`vw`/`dvh` calculations) and scroll position preservation. The utility automatically aborts execution if WebKit pinch-zoom is active, handles window resizes dynamically via animation frames, and returns a cleanup callback to restore original inline styles, scroll positions, and DOM attributes.

```ts
import { preventScrollInsetScrollbars } from '@entry-ui/utilities/prevent-scroll-inset-scrollbars';

// Lock viewport scrolling without triggering layout shifts when displaying a modal dialog.
const restoreScroll = preventScrollInsetScrollbars({
  win: window,
  html: document.documentElement,
  body: document.body,
});

// Restore original layout dimensions and scrolling behavior upon closing.
restoreScroll();
```

## API reference

This section provides a technical overview of the `preventScrollInsetScrollbars` function, including its parameters and return values.

### Parameters

The `preventScrollInsetScrollbars` function accepts a single required configuration object as its parameter, where all properties are required (marked with an asterisk `*`):

| Property | Type            | Default | Description                                                                                                                                                                                              |
| :------- | :-------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `win*`   | `typeof window` | `-`     | The target `Window` object context. Provides access to computed styles, layout dimensions, and execution context APIs, ensuring accurate measurement across cross-frame or iframe boundaries.            |
| `html*`  | `HTMLElement`   | `-`     | The root `<html>` element of the document. Serves as the primary DOM target for native `scrollbar-gutter` properties, overflow locks, and tracking global scroll-lock state attributes.                  |
| `body*`  | `HTMLElement`   | `-`     | The document `<body>` element. Acts as the fallback layout container and scroll target when fallback scroll locking applies, allowing precise dimension recalculations and scroll position preservation. |

### Returns

The `preventScrollInsetScrollbars` function returns a restoration function:

| Type         | Description                                                                                                                                                                        |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `() => void` | Returns a teardown function that cancels pending resize frames, restores original DOM inline styles and scroll positions, removes state attributes, and cleans up event listeners. |
