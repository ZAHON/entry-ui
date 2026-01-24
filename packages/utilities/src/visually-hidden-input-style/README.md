# visuallyHiddenInputStyle

Visually hides an input element while keeping it functional and accessible.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/visually-hidden-input-style)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20visuallyHiddenInputStyle]%20Issue)

## Import

```ts
import { visuallyHiddenInputStyle } from '@entry-ui/utilities/visually-hidden-input-style';
```

## Usage

The `visuallyHiddenInputStyle` utility is specifically designed for styling native form elements like checkboxes, radio buttons, or file inputs. It hides the default browser UI while ensuring the underlying input remains fully functional, focusable, and reachable by assistive technologies.

This allows developers to build custom-designed form controls that maintain standard browser behaviors and accessibility compliance.

```tsx
import { visuallyHiddenInputStyle } from '@entry-ui/utilities/visually-hidden-input-style';

const CustomCheckbox = () => (
  <>
    <input type="checkbox" id="terms" style={visuallyHiddenInputStyle} />
    <label htmlFor="terms">I agree to the terms</label>
  </>
);
```

## API reference

This section details the composition of the `visuallyHiddenInputStyle` object and the purpose of its specific CSS declarations.

The `visuallyHiddenInputStyle` is a frozen object that satisfies the `CSS.Properties<string | number>` type. This ensures full compatibility and seamless integration with the `style` attribute in modern frameworks such as [**Qwik**](https://qwik.dev/), [**React**](https://react.dev/), and [**Astro**](https://astro.build/).

The style object is composed of the following properties to ensure consistent behavior across all modern browsers:

- **Positioning**:
  Uses `position: "absolute"` to remove the input from the visual flow while keeping it logically tied to its associated label and position in the DOM.

- **Clipping**:
  Applies `clipPath: "inset(50%)"` and `overflow: "hidden"` to ensure the native browser element is not rendered visually.

- **Dimensions**:
  Enforces a `1x1` pixel size with a `margin: -1px` to collapse its visual footprint while remaining detectable by screen readers and focus managers.

- **Reset**:
  Zeroes out `border` and `padding` while forcing `whiteSpace: "nowrap"` to prevent the element from affecting the layout of parent containers or wrapping content.
