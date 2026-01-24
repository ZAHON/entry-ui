# mergeStyles

Merges multiple style values into a single, unified style object.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/utilities/merge-styles)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20mergeStyles]%20Issue)

## Import

```tsx
import { mergeStyles } from '@entry-ui/qwik/merge-styles';
```

## Usage

Use `mergeStyles` when you need to combine different style formats — such as CSS strings, style objects, or props — into a single, normalized object. It follows the CSS cascade principle, where styles defined later in the array override earlier ones.

The utility is designed to handle the complexity of CSS styling in JavaScript environments. It allows developers to combine inline strings and structured objects while ensuring that property keys are correctly normalized. To ensure compatibility with Qwik and other JavaScript-based styling engines, the function applies the following transformations:

- **Kebab-case to camelCase:**
  `background-color` becomes `backgroundColor`.

- **Vendor prefixes**:
  Standard prefixes like `-webkit-` or `-moz-` are converted to PascalCase (e.g., `WebkitTransform`).

- **IE prefix**:
  The `-ms-` prefix is specifically handled to start with a lowercase "m" (e.g., `msTransform`).

- **CSS variables**:
  Properties starting with `--` (e.g., `--custom-color`) are preserved in their original format.

```tsx
import type { PropsOf } from '@qwik.dev/core';
import { component$ } from '@qwik.dev/core';
import { mergeStyles } from '@entry-ui/qwik/merge-styles';

const Usage = component$<PropsOf<'div'>>((props) => {
  const { style, ...others } = props;

  return (
    <div style={mergeStyles([{ height: '100px', width: '100px' }, 'background-color: purple;', style])} {...others} />
  );
});
```

## API reference

The `mergeStyles` utility provides a type-safe way to consolidate various style declarations. Below are the specifications for the input parameters and the resulting style object.

### Parameters

The `mergeStyles` function accepts a single required parameter (marked with an asterisk `*`) containing an array of style sources. Each element in the array is evaluated and merged into the final result, allowing for a mix of different formats:

| Parameter | Type              | Default | Description                                                                                                                                        |
| :-------- | :---------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `styles*` | `PossibleStyle[]` | `-`     | An array of styles to be merged. Supports `string`, `CSSProperties`, or `undefined` for conditional styling. All keys are normalized to camelCase. |

### Returns

The `mergeStyles` function returns a unified CSS properties object compatible with Qwik's `style` attribute.

| Type            | Description                                                                                              |
| :-------------- | :------------------------------------------------------------------------------------------------------- |
| `CSSProperties` | A normalized object containing all merged style declarations, with later values overriding earlier ones. |

## Type definitions

This section details the internal types used by `mergeStyles` to ensure full TypeScript support and seamless integration with CSS-in-JS patterns.

### PossibleStyle

The `PossibleStyle` type is a union that ensures flexibility in how styles are defined, supporting various formats out of the box:

- **`string`**:
  Standard inline CSS strings (e.g., `"color: red; padding: 10px"`).

- **`CSSProperties`**:
  A structured object of CSS declarations from `@qwik.dev/core` (e.g., `{ color: "red" }`).

- **`undefined`**:
  Useful for conditional styling where a style might not be present. Since `boolean` is not accepted, use ternary operators or logical OR to ensure a valid type (e.g., `isActive ? "color: red" : undefined`).

```ts
type PossibleStyle = string | CSSProperties | undefined;
```
