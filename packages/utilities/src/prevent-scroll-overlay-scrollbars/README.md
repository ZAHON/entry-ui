# preventScrollOverlayScrollbars

Prevents viewport scrolling in overlay scrollbar environments by disabling scroll overflow.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/prevent-scroll-overlay-scrollbars)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20preventScrollOverlayScrollbars]%20Issue)

## Import

```ts
import { preventScrollOverlayScrollbars } from '@entry-ui/utilities/prevent-scroll-overlay-scrollbars';
```

## Usage

The `preventScrollOverlayScrollbars` utility locks document viewport scrolling in environments where native scrollbars overlay content without occupying physical layout width (such as macOS, iOS, or mobile browsers).

Because overlay scrollbars do not take up spatial layout width, disabling viewport overflow effectively prevents scrolling without causing layout shifts or horizontal content jumps. The utility resolves the active viewport scroll container, applies axis lock configurations, and returns a cleanup callback that restores original inline styles and purges empty DOM attributes upon release.

```ts
import { preventScrollOverlayScrollbars } from '@entry-ui/utilities/prevent-scroll-overlay-scrollbars';

// Temporarily disable viewport scrolling when an overlay or modal opens.
const restoreScroll = preventScrollOverlayScrollbars({
  html: document.documentElement,
  body: document.body,
});

// Restore original scroll behavior when the overlay closes.
restoreScroll();
```

## API reference

This section provides a technical overview of the `preventScrollOverlayScrollbars` function, including its parameters and return values.

### Parameters

The `preventScrollOverlayScrollbars` function accepts a single required configuration object as its parameter, where all properties are required (marked with an asterisk `*`):

| Property | Type          | Default | Description                                                                                                                                                             |
| :------- | :------------ | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `html*`  | `HTMLElement` | `-`     | The root `<html>` element of the document. Used as the primary layout target to apply scroll prevention styles or resolve viewport propagation rules.                   |
| `body*`  | `HTMLElement` | `-`     | The document `<body>` element. Serves as the fallback viewport scroll container when the root `<html>` element does not establish its own independent scroll container. |

### Returns

The `preventScrollOverlayScrollbars` function returns a restoration function:

| Type         | Description                                                                                                                                                         |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `() => void` | Returns a cleanup callback that restores the active viewport scroller's original inline styles, and removes the `style` attribute if no inline declarations remain. |
