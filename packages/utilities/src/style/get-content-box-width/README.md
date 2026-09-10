# getContentBoxWidth

Calculates the content-box width of a specified DOM element in pixels.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-content-box-width)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getContentBoxWidth]%20Issue)

## Import

```ts
import { getContentBoxWidth } from '@entry-ui/utilities/get-content-box-width';
```

## Usage

The `getContentBoxWidth` utility determines the interior width of an element by subtracting its horizontal padding (left and right) from its `clientWidth`.

It works correctly regardless of the element's `box-sizing` model (including `border-box`), because [`clientWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth) already accounts for padding dimensions. The utility also safely handles unparsable or missing padding values by treating them as zero, clamps negative values to `0`, and optimizes performance by skipping computed style lookups when the element's client width is zero.

```ts
import { getContentBoxWidth } from '@entry-ui/utilities/get-content-box-width';

const element = document.querySelector('#my-element');

// Retrieve the precise content-box width accounting for padding.
if (element) {
  const width = getContentBoxWidth(element);
}
```

## API reference

This section provides a technical overview of the `getContentBoxWidth` function and its return type.

### Parameters

The `getContentBoxWidth` function accepts a single required parameter (marked with an asterisk `*`) that points to the element to be measured:

| Parameter  | Type      | Default | Description                                                                   |
| :--------- | :-------- | :------ | :---------------------------------------------------------------------------- |
| `element*` | `Element` | `—`     | The target DOM element for which you want to calculate the content-box width. |

### Returns

The `getContentBoxWidth` function returns a numeric value representing the width:

| Type     | Description                                                                       |
| :------- | :-------------------------------------------------------------------------------- |
| `number` | The precise interior width of the element in pixels, clamped to a minimum of `0`. |
