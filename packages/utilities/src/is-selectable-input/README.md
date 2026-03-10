# isSelectableInput

Determines whether a given HTML element is an input that supports text selection.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/is-selectable-input)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20isSelectableInput]%20Issue)

## Import

```ts
import { isSelectableInput } from '@entry-ui/utilities/is-selectable-input';
```

## Usage

The `isSelectableInput` utility acts as a TypeScript type guard to safely identify elements that support the native `.select()` method. While many HTML elements are part of the DOM, only specific input types allow for programmatic text selection.

```ts
import { isSelectableInput } from '@entry-ui/utilities/is-selectable-input';

const element = document.activeElement;

if (isSelectableInput(element)) {
  // TypeScript now knows `element` is `HTMLInputElement`.
  element.select();
}
```

## API reference

This section provides a technical overview of the `isSelectableInput` function and its behavior as a type guard.

### Parameters

The `isSelectableInput` function accepts a single required parameter (marked with an asterisk `*`) to be evaluated:

| Parameter  | Type          | Default | Description                                                                                                   |
| :--------- | :------------ | :------ | :------------------------------------------------------------------------------------------------------------ |
| `element*` | `HTMLElement` | `-`     | The HTML element to inspect. The utility checks its instance type and the existence of the `select` property. |

### Returns

The `isSelectableInput` function returns a boolean that acts as a type predicate, narrowing the type within the conditional scope.

| Type                          | Description                                                                                                                                                        |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `element is HTMLInputElement` | Returns `true` if the element is an instance of `HTMLInputElement` and supports the `select` method. Returns `false` otherwise, preventing unsafe property access. |
