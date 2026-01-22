# mergeStyles

Merges multiple style values into a single, unified style object.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/merge-styles)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20mergeStyles]%20Issue)

## Import

```ts
import { mergeStyles } from '@entry-ui/utilities/merge-styles';
```

## Usage

The `mergeStyles` utility is designed to handle the complexity of CSS styling in JavaScript environments. It allows developers to combine inline strings and structured objects while ensuring that property keys are correctly normalized.

To ensure compatibility with JavaScript-based styling engines, the function applies the following transformations:

- **Kebab-case to camelCase:** `background-color` becomes `backgroundColor`.

- **Vendor Prefixes:** Standard prefixes like `-webkit-` or `-moz-` are converted to PascalCase (e.g., `WebkitTransform`).

- **IE Prefix:** The `-ms-` prefix is specifically handled to start with a lowercase "m" (e.g., `msTransform`).

- **CSS Variables**: Properties starting with `--` are preserved in their original format.

```ts
import { mergeStyles } from '@entry-ui/utilities/merge-styles';

mergeStyles([
  'color: red; margin-top: 10px;',
  { marginTop: '20px', '--spacing-unit': '20px' },
  undefined,
  'background-color: blue',
]);

// Returns:
// {
//   color: "red",
//   marginTop: "20px",
//   "--spacing-unit": "20px",
//   backgroundColor: "blue"
// }
```

## API reference

This section provides a detailed technical overview of the `mergeStyles` function and its input types.

### Parameters

The `mergeStyles` function accepts a single required parameter (marked with an asterisk `*`) containing an array of style sources. Each element in the array is evaluated and merged into the final result, allowing for a mix of different formats:

| Parameter | Type              | Default | Description                                                                                                                                                                     |
| :-------- | :---------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `styles*` | `PossibleStyle[]` | `-`     | An array of styles to be merged. Can contain `string` values, style objects (`Record<string, string \| number \| undefined>`), or `undefined` values for conditional rendering. |

### Returns

The `mergeStyles` function returns a single consolidated object representing the final computed styles. This object is ready to be used directly as a style prop in most JavaScript-based UI frameworks.

| Type                                            | Description                                                                               |
| :---------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `Record<string, string \| number \| undefined>` | A unified object with normalized keys and the final values determined by the merge order. |

## Type definitions

This section details the internal types used by `mergeStyles` to ensure full TypeScript support and seamless integration with CSS-in-JS patterns.

### PossibleStyle

The `PossibleStyle` type is a union that ensures flexibility in how styles are defined, supporting various formats out of the box.

```ts
type PossibleStyle = string | Record<string, string | number | undefined> | undefined;
```
