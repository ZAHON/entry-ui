# visuallyHiddenInputStyle

Defines the immutable CSS property object used to visually hide form input elements while preserving interactive accessibility.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/visually-hidden-input-style)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20visuallyHiddenInputStyle]%20Issue)

## Import

```ts
import { visuallyHiddenInputStyle } from '@entry-ui/utilities/visually-hidden-input-style';
```

## Usage

The `visuallyHiddenInputStyle` utility provides an immutable CSS property object specifically designed for native form elements such as checkboxes, radio buttons, or file inputs. It strips default browser controls of their visual layout footprint while keeping them fully focusable, reachable, and interactive for keyboard and screen reader users.

It combines absolute positioning, zeroed padding and borders, a 1x1 pixel bounding box, and inset clipping to enable building custom UI controls on top of fully accessible native form inputs.

```tsx
import { visuallyHiddenInputStyle } from '@entry-ui/utilities/visually-hidden-input-style';

// Visually hide a native checkbox input while preserving custom label interactivity and focus.
const CustomCheckbox = () => (
  <>
    <input type="checkbox" id="terms" style={visuallyHiddenInputStyle} />
    <label htmlFor="terms">I agree to the terms</label>
  </>
);
```

## API reference

This section details the composition of the visuallyHiddenInputStyle object and the technical purpose of its CSS declarations.

The `visuallyHiddenInputStyle` constant is a frozen object (`Object.freeze`) that satisfies `CSS.Properties<string | number`>. This guarantees immutability and ensures seamless compatibility with `style` attributes in modern frameworks such as [**Qwik**](https://qwik.dev/), [**React**](https://react.dev/), and [**Astro**](https://astro.build/).

The style object is composed of the following properties to ensure consistent behavior across all modern browsers:

- **Positioning (`position: "absolute"`)**:
  Removes the input from the visual layout flow while keeping it logically positioned near its label for focus management and DOM accessibility.

- **Clipping (`clipPath: "inset(50%)"`, `overflow: "hidden"`)**:
  Applies spatial clipping to ensure no visual rendered content spills outside the bounding box.

- **Dimensions (`width: 1`, `height: 1`, `margin: -1`)**:
  Restricts the spatial bounding box to a 1x1 pixel size while collapsing surrounding layout space.

- **Reset (`border: 0`, `padding: 0`, `whiteSpace: "nowrap"`)**:
  Zeroes out structural spacing and prevents inline text wrapping from expanding parent dimensions.
