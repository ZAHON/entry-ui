# hasWindow

Checks whether the window object is defined in the current execution environment.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/has-window)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20hasWindow]%20Issue)

## Import

```ts
import { hasWindow } from '@entry-ui/utilities/has-window';
```

## Usage

The `hasWindow` utility is a simple check to determine if the code is executing in a browser environment. It is particularly useful in modern web development frameworks (like [**Next.js**](https://nextjs.org/), [**Remix**](https://remix.run/), or [**Astro**](https://astro.build/)) where code may be executed both on the server ([**Node.js**](https://nodejs.org/en)) and the client.

By using `hasWindow`, you can safely wrap browser-only logic such as accessing `localStorage`, `sessionStorage`, or adding window event listeners to prevent "window is not defined" reference errors during Server-Side Rendering (SSR).

```ts
import { hasWindow } from '@entry-ui/utilities/has-window';

if (hasWindow()) {
  console.log('Running in the browser. Safe to access window APIs.');
} else {
  console.log('Running on the server.');
}
```

## API reference

This section provides a technical overview of the `hasWindow` function and its environment detection logic.

### Parameters

The `hasWindow` function does not accept any parameters.

### Returns

The hasWindow function returns a boolean indicating the presence of the global `window` object:

| Type      | Description                                                                                                                                  |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if the `window` object is defined (client-side). `Returns` false if the `window` object is `undefined` (server-side/Node.js). |
