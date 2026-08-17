# getHiddenElementHeight

Calculates the natural height of an element that is otherwise hidden from the layout.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-hidden-element-height)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getHiddenElementHeight]%20Issue)

## Import

```ts
import { getHiddenElementHeight } from '@entry-ui/utilities/get-hidden-element-height';
```

## Usage

The `getHiddenElementHeight` utility is designed for cases where you need to know the height of an element before it is shown, for example, to animate a "collapse" or "accordion" component. Since elements with `display: "none"` have no height in the DOM, this utility temporarily renders a hidden clone to measure its intrinsic size.

The utility ensures that the measurement process does not interfere with the user experience by applying the following strategy:

- **Invisibility**:
  Applies `visibility: "hidden"`, `opacity: "0"`, and `aria-hidden="true"` to ensure the cloned element remains completely invisible to both sighted users and assistive technologies.

- **Positioning**:
  Uses `position: "absolute"` with a significant negative offset (`top: "-9999px"`) to render the clone far outside the visible viewport, preventing any accidental scrollbars or layout shifts.

- **Interaction reset**:
  Enforces `pointerEvents: "none"` and `userSelect: "none"` to disable all mouse and keyboard interactions, while stripping `transition` and `animation` to ensure immediate, static measurement.

- **Layout neutrality**:
  Forces `display: "block"` and `height: "auto"` with no constraints (`maxHeight: "none"`) to capture the element's natural height before it is immediately removed from the DOM.

```ts
import { getHiddenElementHeight } from '@entry-ui/utilities/get-hidden-element-height';

const hiddenPanel = document.getElementById('accordion-panel');

const targetHeight = getHiddenElementHeight(hiddenPanel);

console.log(`The element will be ${targetHeight}px tall when opened.`);
```

## API reference

This section provides a technical overview of the `getHiddenElementHeight` function.

### Parameters

The `getHiddenElementHeight` function accepts a single required parameter (marked with an asterisk `*`):

| Parameter  | Type          | Default | Description                                                    |
| :--------- | :------------ | :------ | :------------------------------------------------------------- |
| `element*` | `HTMLElement` | `-`     | The hidden element whose natural height you want to calculate. |

### Returns

The `getHiddenElementHeight` function returns the calculated height as a number:

| Type     | Description                                                                                             |
| :------- | :------------------------------------------------------------------------------------------------------ |
| `number` | The intrinsic height of the element in pixels, measured as if it were rendered as a block-level entity. |
