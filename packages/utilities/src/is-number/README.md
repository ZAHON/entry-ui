# isNumber

Verifies whether a given value is a valid number, excluding `NaN`.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/is-number)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20isNumber]%20Issue)

## Import

```ts
import { isNumber } from '@entry-ui/utilities/is-number';
```

## Usage

The `isNumber` utility serves as a reliable TypeScript type guard. In standard JavaScript, checking a value's type using `typeof value === "number"` introduces a well-known edge case: it evaluates to true for NaN (Not-a-Number), which can lead to runtime calculation errors.

This utility addresses that behavior by combining a strict `typeof` check with `Number.isNaN()`, ensuring that the validated value is a genuine, usable numeric value before allowing mathematical operations.

```ts
import { isNumber } from '@entry-ui/utilities/is-number';

isNumber(42);
// Returns: true

isNumber(NaN);
// Returns: false

isNumber('42');
// Returns: false
```

## API reference

This section provides a technical overview of the `isNumber` function and its behavior as a type guard.

### Parameters

The `isNumber` function accepts a single required parameter (marked with an asterisk `*`) to be evaluated:

| Parameter | Type  | Default | Description                                                                                      |
| :-------- | :---- | :------ | :----------------------------------------------------------------------------------------------- |
| `value*`  | `any` | `-`     | The value to check. Can be any type, as the function safely handles non-numeric and null inputs. |

### Returns

The `isNumber` function returns a boolean that acts as a type predicate.

| Type              | Description                                                                                                                                                |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value is number` | Returns `true` if the value is a primitive `number` and is not `NaN`. Returns `false` for strings, booleans, objects, `NaN`, or any other non-number type. |
