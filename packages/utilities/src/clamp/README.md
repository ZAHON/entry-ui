# clamp

Clamps a number between a minimum and maximum value.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/clamp)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20clamp]%20Issue)

## Import

```ts
import { clamp } from '@entry-ui/utilities/clamp';
```

## Usage

The `clamp` utility is used to ensure that a value does not exceed a predefined range. This is particularly useful for UI elements like sliders, progress bars, or any numerical inputs where strict boundaries are required.

The function applies the following mathematical constraints:

- **Below minimum**:
  If the `value` is lower than the `min` boundary, the `min` value is returned.

- **Above maximum**:
  If the `value` is higher than the `max` boundary, the `max` value is returned.

- **Within range**:
  If the `value` is between `min` and `max`, the original `value` is returned.

The function will throw an error in the following cases:

- **Invalid numbers**:
  If any of the parameters (`value`, `min`, or `max`) are not finite numbers (e.g., `NaN` or `Infinity`).

- **Invalid range**:
  If the `min` value is strictly greater than the `max` value.

```ts
import { clamp } from '@entry-ui/utilities/clamp';

clamp({ value: 150, min: 0, max: 100 });
// Returns: 100

clamp({ value: -20, min: 0, max: 100 });
// Returns: 0

clamp({ value: 50, min: 0, max: 100 });
// Returns: 50
```

## API reference

This section provides a detailed technical overview of the `clamp` function, its requirements, and its error-handling behavior.

### Parameters

The `clamp` function accepts a single configuration object as its parameter. This object contains the following properties, where those marked with an asterisk (`*`) are required for the utility to function correctly:

| Property | Type     | Default | Description                                                                                                                                             |
| :------- | :------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value*` | `number` | `-`     | The numerical value to be restricted within the specified range. Must be a finite number.                                                               |
| `min*`   | `number` | `-`     | The lower bound of the range. If `value` is less than `min`, the function returns `min`. Must be a finite number and less than or equal to `max`.       |
| `max*`   | `number` | `-`     | The upper bound of the range. If `value` is greater than `max`, the function returns `max`. Must be a finite number and greater than or equal to `min`. |

### Returns

The `clamp` function returns a single number that is guaranteed to fall within the specified range:

| Type     | Description                                                                                                                              |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `number` | The resulting value after applying the clamping logic. It will always be greater than or equal to `min` and less than or equal to `max`. |
