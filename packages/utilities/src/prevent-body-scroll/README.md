# preventBodyScroll

Prevents page scrolling by locking the body and compensating for layout shifts across different platforms.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/prevent-body-scroll)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20preventBodyScroll]%20Issue)

## Import

```ts
import { preventBodyScroll } from '@entry-ui/utilities/prevent-body-scroll';
```

## Usage

The `preventBodyScroll` utility provides a robust way to disable background scrolling, which is essential for components like modals, drawers, or overlays. Unlike a simple `overflow: hidden` toggle, this utility addresses several critical browser inconsistencies and UX issues by calculating the scrollbar width and applying temporary padding to the body. This prevents the content from "jumping" when the scrollbar disappears, while remaining aware of modern CSS properties like `scrollbar-gutter: stable` to avoid double-spacing. To prevent redundant executions and potential state conflicts, the utility marks the body with a `data-scroll-lock` attribute, ensuring that subsequent calls do not override existing styles while the lock is active.

On iOS devices, where `overflow: hidden` on the body is often ignored by Safari, the utility automatically switches to a `position: fixed` strategy. It meticulously tracks the user's scroll position and visual viewport offsets to ensure the background remains perfectly static without snapping to the top. Additionally, it exports a `--scrollbar-width` CSS variable to the document element, allowing you to synchronize other UI elements with the locked state.

```ts
import { preventBodyScroll } from '@entry-ui/utilities/prevent-body-scroll';

const unlock = preventBodyScroll();

// Later, to restore scrolling:
unlock();
```

## API reference

This section provides a technical overview of the `preventBodyScroll` function and its internal logic.

### Parameters

The `preventBodyScroll` function accepts an optional parameter to define the document context:

| Parameter | Type       | Default    | Description                                                                                                                                 |
| :-------- | :--------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `doc`     | `Document` | `document` | The document instance to apply the lock to. Useful when working with iframes or environments where the global `document` is not the target. |

### Returns

The `preventBodyScroll` function returns a cleanup utility:

| Type         | Description                                                                                                                                                                                                                                                   |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `() => void` | A function that, when executed, removes the scroll lock, clears the `data-scroll-lock` attribute, and deletes the `--scrollbar-width` CSS variable. It restores original body styles and, on iOS, instantly scrolls the window back to its original position. |
