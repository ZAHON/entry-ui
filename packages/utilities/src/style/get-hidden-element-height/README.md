# getHiddenElementHeight

Calculates the natural height of an element that is otherwise hidden from the layout.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-hidden-element-height)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getHiddenElementHeight]%20Issue)

## Import

```ts
import { getHiddenElementHeight } from '@entry-ui/utilities/get-hidden-element-height';
```

## Usage

The `getHiddenElementHeight` utility is designed for cases where you need to know the height of an element before it is shown, for example, to animate a "collapse" or "accordion" component. Since elements with `display: none` have no height in the DOM, this utility temporarily renders a hidden clone to measure its intrinsic size.

The utility ensures that the measurement process does not interfere with the user experience by applying the following style and attribute strategy:

- **Positioning (`position: absolute`, `top: -9999px`, measurable width)**:
  Removes the clone from the normal document flow and places it far outside the visible viewport, applying ancestor-based width constraints to ensure proper block sizing.

- **Invisibility (`display: block`, `visibility: hidden`, `opacity: 0`, `contentVisibility: visible`)**:
  Forces block display for layout calculation while keeping the element completely transparent and invisible on screen.

- **Layout reset (`height: auto`, `maxHeight: none`, `overflow: visible`)**:
  Removes vertical size limits and clipping constraints to allow the element to expand to its full natural height.

- **Interaction (`transition: none`, `animation: none`)**:
  Disables all active animations and transitions to ensure an immediate, static measurement snapshot without layout delays.

- **Accessibility (`inert`, `aria-hidden="true"`)**:
  Applies the `inert` attribute to block focus and pointer interactions while removing the node from the accessibility tree, paired with `aria-hidden="true"` to ensure screen readers completely ignore the temporary measurement clone.

```ts
import { getHiddenElementHeight } from '@entry-ui/utilities/get-hidden-element-height';

const element = document.querySelector<HTMLElement>('#hidden-element');

// Retrieve the natural height of the hidden element.
if (element) {
  const height = getHiddenElementHeight(element);
}
```

## API reference

This section provides a technical overview of the `getHiddenElementHeight` function and its return type.

### Parameters

The `getHiddenElementHeight` function accepts a single required parameter (marked with an asterisk `*`) that points to the hidden element whose height you want to calculate:

| Parameter  | Type          | Default | Description                                                    |
| :--------- | :------------ | :------ | :------------------------------------------------------------- |
| `element*` | `HTMLElement` | `—`     | The hidden element whose natural height you want to calculate. |

### Returns

The `getHiddenElementHeight` function returns a numeric value representing the intrinsic height of the element in pixels:

| Type     | Description                                                                                             |
| :------- | :------------------------------------------------------------------------------------------------------ |
| `number` | The intrinsic height of the element in pixels, measured as if it were rendered as a block-level entity. |
