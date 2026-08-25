# mergeStyles

Merges multiple style values into a single, unified style object.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/merge-styles)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20mergeStyles]%20Issue)

## Import

```ts
import { mergeStyles } from '@entry-ui/utilities/merge-styles';
```

## Usage

The `mergeStyles` utility consolidates heterogeneous style inputs (inline `string` declarations, `object` records, and falsy values like `undefined` or `false`) into a single unified `object`.

To ensure full compatibility with JavaScript-based styling engines, the function applies the following property transformations during normalization:

- **Falsy values and conditional guards**:
  Falsy entries (`false`, `undefined`, `null`), boolean values within style objects (e.g., `{ padding: isFocused && '10px' }`), and stringified boolean tokens inside inline CSS (e.g., `font-size: ${false}`) are safely ignored, enabling clean short-circuit conditional styling.

- **Kebab-case to camelCase**:
  Standard property names like `background-color` or `margin-top` are transformed into `backgroundColor` and `marginTop`.

- **Vendor prefixes**:
  Standard browser prefixes like `-webkit-` or `-moz-` are normalized to PascalCase (e.g., `-webkit-transform` becomes `WebkitTransform`).

- **IE vendor prefix**:
  The `-ms-` prefix is specifically mapped to start with a lowercase "m" (e.g., `-ms-transform` becomes `msTransform`).

- **CSS custom properties**:
  CSS variables starting with `--` retain their original kebab-case format (e.g., `--primary-color`).

```ts
import { mergeStyles } from '@entry-ui/utilities/merge-styles';

// Consolidate inline strings, objects, and conditional falsy values.
mergeStyles([
  'color: red; margin-top: 10px;',
  false && 'padding: 10px',
  { marginTop: '20px', '--spacing-unit': '20px' },
]);

// Returns: { color: "red", marginTop: "20px", "--spacing-unit": "20px" }
```

## API reference

This section provides a detailed technical overview of the `mergeStyles` function and its input types.

### Parameters

The `mergeStyles` function accepts a single required parameter (marked with an asterisk `*`) containing an array of style sources. Each element in the array is evaluated and merged into the final result, allowing for a mix of different formats:

| Parameter | Type                                                                                           | Default | Description                                                                                                                                                               |
| :-------- | :--------------------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `styles*` | `(string \| Record<string, string \| number \| boolean \| undefined> \| false \| undefined)[]` | `—`     | An array of heterogeneous styles to be merged. Accepts inline `string` declarations, `object` records, or falsy values (`false`, `undefined`) for conditional evaluation. |

### Returns

The `mergeStyles` function returns a single consolidated object representing the final computed styles. This object is ready to be used directly as a style prop in most JavaScript-based UI frameworks:

| Type                                            | Description                                                                               |
| :---------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `Record<string, string \| number \| undefined>` | A unified object with normalized keys and the final values determined by the merge order. |
