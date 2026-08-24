# isOverflowElement

Determines whether an element acts as an overflow or scroll container for its content.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/is-overflow-element)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20isOverflowElement]%20Issue)

## Import

```ts
import { isOverflowElement } from '@entry-ui/utilities/is-overflow-element';
```

## Usage

The `isOverflowElement` utility checks whether a target DOM element can act as a scrollable or clipping container for its content.

It verifies if any of the element's overflow CSS rules (`overflow`, `overflowX`, `overflowY`) are active, while filtering out elements with `display: inline` or `display: contents` which cannot physically clip or scroll child elements.

```ts
import { isOverflowElement } from '@entry-ui/utilities/is-overflow-element';

const container = document.querySelector('#container');

// Check if an element manages overflow or scroll boundaries.
if (container && isOverflowElement(container)) {
  // Safe to use as a scroll boundary or containment target.
}
```

## API reference

This section provides a technical overview of the `isOverflowElement` function, including its parameters and return values.

### Parameters

The `isOverflowElement` function accepts a single required parameter (marked with an asterisk `*`) representing the target element to inspect:

| Parameter  | Type      | Default | Description                                                       |
| :--------- | :-------- | :------ | :---------------------------------------------------------------- |
| `element*` | `Element` | `—`     | The target DOM element to evaluate for overflow and scroll state. |

### Returns

The `isOverflowElement` function returns a boolean value:

| Type      | Description                                                                               |
| :-------- | :---------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if the element can actively clip or scroll its content, otherwise `false`. |
