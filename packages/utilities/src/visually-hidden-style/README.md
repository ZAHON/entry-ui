# visuallyHiddenStyle

A set of CSS properties used to hide an element visually while keeping it accessible to screen readers.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/visually-hidden-style)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20visuallyHiddenStyle]%20Issue)

## Import

```ts
import { visuallyHiddenStyle } from '@entry-ui/utilities/visually-hidden-style';
```

## Usage

The `visuallyHiddenStyle` utility is essential for providing additional context to assistive technologies without affecting the visual layout. It uses a combination of clipping, absolute positioning, and dimension constraints to ensure an element is effectively hidden from the screen while remaining fully "visible" in the accessibility tree.

This is commonly used for icon-only buttons, descriptive labels, or skip links that should only be detectable by screen reader users.

```tsx
import { visuallyHiddenStyle } from '@entry-ui/utilities/visually-hidden-style';

const SearchButton = () => (
  <button type="button">
    <SearchIcon />
    <span style={visuallyHiddenStyle}>Search site</span>
  </button>
);
```

## API reference

This section details the composition of the `visuallyHiddenStyle` object and the purpose of its specific CSS declarations.

The `visuallyHiddenStyle` is a frozen object that satisfies the `CSS.Properties<string | number>` type. This ensures full compatibility and seamless integration with the `style` attribute in modern frameworks such as [**Qwik**](https://qwik.dev/), [**React**](https://react.dev/), and [**Astro**](https://astro.build/).

The style object is composed of the following properties to ensure consistent behavior across all modern browsers:

- **Positioning**:
  Uses `position: "fixed"` combined with `top: 0` and `left: 0` to remove the element from the normal document flow without causing layout shifts.

- **Clipping**:
  Applies `clipPath: "inset(50%)"` and `overflow: "hidden"` to ensure no part of the element is rendered visually.

- **Dimensions**:
  Enforces a `1x1` pixel size with a `margin: -1px` to collapse the space it would otherwise occupy while maintaining a presence that screen readers can focus on.

- **Reset**:
  Zeroes out `border` and `padding` while forcing `whiteSpace: "nowrap"` to prevent the content from wrapping or affecting the size of parent containers.
