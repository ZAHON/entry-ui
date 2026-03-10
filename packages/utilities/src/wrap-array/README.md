# wrapArray

Rearranges an array by shifting its starting point to a specified index.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/wrap-array)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20wrapArray]%20Issue)

## Import

```ts
import { wrapArray } from '@entry-ui/utilities/wrap-array';
```

## Usage

The `wrapArray` utility is designed for scenarios where you need to reorder a collection based on a new starting element while preserving the original relative order of all items. This is particularly useful for carousels, cyclic navigation, or any UI component that requires an infinite-loop behavior.

The function performs a circular shift:

- Elements from the `startIndex` to the end of the array move to the beginning.

- Elements originally appearing before the `startIndex` are appended to the end.

- The original array remains immutable, as the utility returns a new array instance.

```ts
import { wrapArray } from '@entry-ui/utilities/wrap-array';

const data = ['a', 'b', 'c', 'd'];

wrapArray({ array: data, startIndex: 2 });
// Returns: ["c", "d", "a", "b"]

wrapArray({ array: data, startIndex: 3 });
// Returns: ["d", "a", "b", "c"]

wrapArray({ array: data, startIndex: 0 });
// Returns: ["a", "b", "c", "d"]
```

## API reference

This section provides a detailed technical overview of the `wrapArray` function, its generic type support, and parameter requirements.

### Parameters

The `wrapArray` function accepts a single configuration object as its parameter. All properties are required and marked with an asterisk (`*`):

| Property      | Type     | Default | Description                                                                                                                                                                                                            |
| :------------ | :------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `array*`      | `T[]`    | `-`     | The source array to be rearranged. This array remains unmodified as the function returns a new mapped instance.                                                                                                        |
| `startIndex*` | `number` | `-`     | The zero-based index in the original array that will serve as the new starting point. Elements before this index will be appended to the end of the new array, maintaining their relative order in a circular fashion. |

### Returns

The `wrapArray` function returns a new array containing the same elements in the new circular order:

| Type  | Description                                                                                                                          |
| :---- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `T[]` | A new array instance of the same type as the input, rearranged based on the `startIndex`. The length of the array remains unchanged. |
