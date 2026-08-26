# visuallyHiddenStyle

Defines the immutable CSS property object used to visually hide an element while preserving accessibility.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/visually-hidden-style)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20visuallyHiddenStyle]%20Issue)

## Import

```ts
import { visuallyHiddenStyle } from '@entry-ui/utilities/visually-hidden-style';
```

## Usage

The `visuallyHiddenStyle` utility provides an immutable CSS property object that strips an element of its visual layout footprint while keeping it fully accessible to screen readers and assistive technologies.

It combines fixed positioning, zeroed padding and borders, a 1x1 pixel bounding box, and inset clipping to guarantee that element content is hidden visually without being removed from the accessibility tree. This makes it ideal for icon-only buttons, descriptive screen-reader labels, or skip links.

```tsx
import { visuallyHiddenStyle } from '@entry-ui/utilities/visually-hidden-style';

// Visually hide the label text while maintaining screen reader accessibility.
const SearchButton = () => (
  <button type="button">
    <Icon name="search" />
    <span style={visuallyHiddenStyle}>Search</span>
  </button>
);
```

## API reference

This section details the composition of the `visuallyHiddenStyle` object and the technical purpose of its CSS declarations.

The `visuallyHiddenStyle` constant is a frozen object (`Object.freeze`) that satisfies `CSS.Properties<string | number>`. This guarantees immutability and ensures seamless compatibility with `style` attributes in modern frameworks such as [**Qwik**](https://qwik.dev/), [**React**](https://react.dev/), and [**Astro**](https://astro.build/).

The style object is composed of the following properties to ensure consistent behavior across all modern browsers:

- **Positioning (`position: "fixed"`, `top: 0`, `left: 0`)**:
  Removes the element from the standard document flow, preventing layout shifts and scrolling side effects.

- **Clipping (`clipPath: "inset(50%)"`, `overflow: "hidden"`)**:
  Applies spatial clipping to ensure no visual rendered content spills outside the bounding box.

- **Dimensions (`width: 1`, `height: 1`, `margin: -1`)**:
  Restricts the spatial bounding box to a 1x1 pixel size while collapsing surrounding layout space.

- **Reset (`border: 0`, `padding: 0`, `whiteSpace: "nowrap"`)**:
  Zeroes out structural spacing and prevents inline text wrapping from expanding parent dimensions.
