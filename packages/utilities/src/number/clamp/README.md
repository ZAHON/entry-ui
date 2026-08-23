# clamp

Clamps a number between a minimum and maximum value.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/clamp)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20clamp]%20Issue)

## Import

```ts
import { clamp } from '@entry-ui/utilities/clamp';
```

## Usage

The `clamp` utility is used to ensure that a value does not exceed a predefined range. This is particularly useful for UI elements like sliders, progress bars, or any numerical inputs where boundaries are required.

The function applies the following mathematical constraints:

- **Below minimum**:
  If the `value` is lower than the `min` boundary, the `min` value is returned.

- **Above maximum**:
  If the `value` is higher than the `max` boundary, the `max` value is returned.

- **Within range**:
  If the `value` is between `min` and `max`, the original `value` is returned.

```ts
import { clamp } from '@entry-ui/utilities/clamp';

// Values exceeding the maximum boundary return the maximum threshold.
clamp({ value: 150, min: 0, max: 100 });
// Returns: 100

// Values below the minimum boundary return the minimum threshold.
clamp({ value: -20, min: 0, max: 100 });
// Returns: 0

// Values within the valid boundary range are returned unchanged.
clamp({ value: 50, min: 0, max: 100 });
// Returns: 50
```

## API reference

This section provides a detailed technical overview of the `clamp` utility, its configuration properties, and its return values.

### Parameters

The `clamp` function accepts a single configuration object as its parameter to define the target value and range boundaries, where all properties are required and marked with an asterisk (`*`):

| Property | Type     | Default | Description                                                                                 |
| :------- | :------- | :------ | :------------------------------------------------------------------------------------------ |
| `value*` | `number` | `—`     | The numerical value to be restricted within the specified range.                            |
| `min*`   | `number` | `—`     | The lower bound of the range. If `value` is less than `min`, the function returns `min`.    |
| `max*`   | `number` | `—`     | The upper bound of the range. If `value` is greater than `max`, the function returns `max`. |

### Returns

The `clamp` function returns a single number that is guaranteed to fall within the specified range:

| Type     | Description                                                                                                                              |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `number` | The resulting value after applying the clamping logic. It will always be greater than or equal to `min` and less than or equal to `max`. |
