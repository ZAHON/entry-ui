# hasInsetScrollbars

Determines whether the viewport renders classic, space-consuming scrollbars instead of overlay scrollbars.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/has-inset-scrollbars)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20hasInsetScrollbars]%20Issue)

## Import

```ts
import { hasInsetScrollbars } from '@entry-ui/utilities/has-inset-scrollbars';
```

## Usage

The `hasInsetScrollbars` utility detects whether the current browser viewport displays classic scrollbars that occupy physical layout width.

It evaluates the difference between the full viewport width (including scrollbars) and the layout width available to content (excluding scrollbars). If traditional space-consuming scrollbars are detected, layout adjustments can be made to prevent visual shifting when scrollbars appear or disappear.

```ts
import { hasInsetScrollbars } from '@entry-ui/utilities/has-inset-scrollbars';

// Check if scrollbars occupy physical layout space in the current context.
const hasScrollbars = hasInsetScrollbars({
  win: window,
  doc: document,
});

if (hasScrollbars) {
  // Apply layout padding or offset to prevent content jumping when scrollbars toggle.
}
```

## API reference

This section provides a technical overview of the `hasInsetScrollbars` function, including its parameters and return values.

### Parameters

The `hasInsetScrollbars` function accepts a single required configuration object as its parameter, where all properties are required (marked with an asterisk `*`):

| Property | Type            | Default | Description                                                                                                                                                                                                                                        |
| :------- | :-------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `win*`   | `typeof window` | `-`     | The target `Window` object context. Provides access to the active execution context's viewport measurement properties. Explicitly passing this context ensures accurate size evaluations across cross-frame, iframe, or multi-window environments. |
| `doc*`   | `Document`      | `-`     | The target `Document` object context. Provides access to the root element's content layout dimensions. Serves as the baseline to determine whether native scrollbars consume actual spatial layout width.                                          |

### Returns

The `hasInsetScrollbars` function returns a boolean:

| Type      | Description                                                                                                                                                        |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if the viewport uses traditional, space-occupying scrollbars that reduce the usable content layout area, otherwise returns `false` (overlays used). |
