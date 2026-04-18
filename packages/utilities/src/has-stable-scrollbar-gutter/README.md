# hasStableScrollbarGutter

Determines whether an element has a stable scrollbar gutter configured via CSS.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/has-stable-scrollbar-gutter)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20hasStableScrollbarGutter]%20Issue)

## Import

```ts
import { hasStableScrollbarGutter } from '@entry-ui/utilities/has-stable-scrollbar-gutter';
```

## Usage

The `hasStableScrollbarGutter` utility is used to detect if an element is using the CSS `scrollbar-gutter: stable` property. This property is crucial for maintaining layout stability, as it instructs the browser to reserve space for the scrollbar even when the content doesn't overflow, preventing "layout jumps" when dynamic content is added.

This utility is particularly helpful when building modals, sidebars, or fixed-position components that need to align perfectly with the rest of the application's grid, regardless of the scroll state.

```ts
import { hasStableScrollbarGutter } from '@entry-ui/utilities/has-stable-scrollbar-gutter';

const element = document.querySelector('#element');

if (element && hasStableScrollbarGutter(element)) {
  console.log('Element has a stable layout gutter.');
}
```

## API reference

This section provides a technical overview of the `hasStableScrollbarGutter` function and its style detection logic.

### Parameters

The `hasStableScrollbarGutter` function accepts a single required parameter (marked with an asterisk `*`) to be evaluated:

| Parameter  | Type          | Default | Description                                                                                              |
| :--------- | :------------ | :------ | :------------------------------------------------------------------------------------------------------- |
| `element*` | `HTMLElement` | `-`     | The HTML element to inspect. The utility checks its computed styles for the `scrollbar-gutter` property. |

### Returns

The `hasStableScrollbarGutter` function returns a boolean based on the computed CSS values of the element:

| Type      | Description                                                                                                                                                                  |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if `scrollbar-gutter` is set to `"stable"` or starts with `"stable"` (e.g., `"stable" both-edges`). Returns `false` if the property is auto or not supported. |
