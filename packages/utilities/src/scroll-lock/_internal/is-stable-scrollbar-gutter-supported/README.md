# isStableScrollbarGutterSupported

Evaluates whether the environment correctly supports stable scrollbar gutters at runtime.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/is-stable-scrollbar-gutter-supported)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20isStableScrollbarGutterSupported]%20Issue)

## Import

```ts
import { isStableScrollbarGutterSupported } from '@entry-ui/utilities/is-stable-scrollbar-gutter-supported';
```

## Usage

The `isStableScrollbarGutterSupported` utility verifies whether the current browser environment reliably honors stable scrollbar gutters to prevent layout shifts.

In addition to syntax checks, it performs a runtime layout measurement on the active viewport scroller. This ensures that preserving gutter space effectively prevents content jumping when scrollbars are toggled, even on platform or browser engine configurations with non-standard scrollbar behaviors.

```ts
import { isStableScrollbarGutterSupported } from '@entry-ui/utilities/is-stable-scrollbar-gutter-supported';

// Determine if stable scrollbar gutters can be safely relied upon to prevent layout shifts.
const isSupported = isStableScrollbarGutterSupported({
  html: document.documentElement,
  body: document.body,
});

if (isSupported) {
  // Apply CSS scrollbar-gutter strategies for scroll locking or layout stability.
}
```

## API reference

This section provides a technical overview of the `isStableScrollbarGutterSupported` function, including its parameters and return values.

### Parameters

The `isStableScrollbarGutterSupported` function accepts a single required configuration object as its parameter, where all properties are required (marked with an asterisk `*`):

| Property | Type          | Default | Description                                                                                                                                                             |
| :------- | :------------ | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `html*`  | `HTMLElement` | `-`     | The root `<html>` element of the document. Used as the target container to apply and test `scrollbar-gutter` styles and resolve viewport scroll propagation rules.      |
| `body*`  | `HTMLElement` | `-`     | The document `<body>` element. Serves as the fallback viewport scroll container when the root `<html>` element does not establish its own independent scroll container. |

### Returns

The `isStableScrollbarGutterSupported` function returns a boolean:

| Type      | Description                                                                                                                                              |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if stable scrollbar gutters are supported and effectively preserve layout width across overflow state changes, otherwise returns `false`. |
