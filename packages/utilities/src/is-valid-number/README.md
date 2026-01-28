# isValidNumber

Determines whether the provided value is a valid, finite number.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/is-valid-number)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20isValidNumber]%20Issue)

## Import

```ts
import { isValidNumber } from '@entry-ui/utilities/is-valid-number';
```

## Usage

The `isValidNumber` utility serves as a TypeScript type guard that goes beyond a simple `typeof` check. While JavaScript's native `typeof` operator returns `"number"` for values like `NaN` or `Infinity`, this utility ensures the value is a usable numeric value by excluding these edge cases.

This is particularly useful when dealing with mathematical operations or API responses where a numeric type is expected, but the value might be corrupted or represent an illegal state.

```ts
import { isValidNumber } from '@entry-ui/utilities/is-valid-number';

isValidNumber(10);
// Returns: true

isValidNumber(NaN);
// Returns: false

isValidNumber(Infinity);
// Returns: false
```

## API reference

This section provides a technical overview of the `isValidNumber` function and its behavior as a type guard.

### Parameters

The `isValidNumber` function accepts a single parameter (marked with an asterisk `*`) which is evaluated for its numeric validity:

| Parameter | Type     | Default | Description                                                                                                               |
| :-------- | :------- | :------ | :------------------------------------------------------------------------------------------------------------------------ |
| `value*`  | `number` | `-`     | The numeric value to be validated. Typically used on variables already typed as `number` to filter out non-finite states. |

### Returns

The `isValidNumber` function returns a boolean that acts as a type predicate, narrowing the type within the conditional scope.

| Type              | Description                                                                                                               |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `value is number` | Returns `true` if the value is a number and is finite (not `NaN`, `Infinity`, or `-Infinity`). Returns `false` otherwise. |
