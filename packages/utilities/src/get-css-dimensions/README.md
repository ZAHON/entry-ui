# getCssDimensions

Calculates the visual dimensions of an element, reconciling CSS styles with layout geometry.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-css-dimensions)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getCssDimensions]%20Issue)

## Import

```ts
import { getCssDimensions } from '@entry-ui/utilities/get-css-dimensions';
```

## Usage

The `getCssDimensions` utility provides a robust way to retrieve an element's width and height. It addresses inconsistencies that occur when relying solely on `getComputedStyle`, especially in testing environments (like JSDOM) or when working with SVG elements.

The function compares the CSS-calculated size with the element's actual `offsetWidth` and `offsetHeight`. If a discrepancy is detected, it prioritizes the offset dimensions to ensure the values match what is actually rendered on the screen.

```ts
import { getCssDimensions } from '@entry-ui/utilities/get-css-dimensions';

const element = document.getElementById('container');
const dimensions = getCssDimensions(element);

console.log(dimensions);
// Returns: { width: 150, height: 42 }

// Useful for logic that requires precise pixel values regardless of box-sizing
const { width, height } = getCssDimensions(svgElement);
```

## API reference

This section provides a technical overview of the `getCssDimensions` function and its return structure.

### Parameters

The `getCssDimensions` function accepts a single required parameter (marked with an asterisk `*`):

| Parameter  | Type      | Default | Description                                                                                             |
| :--------- | :-------- | :------ | :------------------------------------------------------------------------------------------------------ |
| `element*` | `Element` | `-`     | The target DOM element or SVG element for which you want to calculate the accurate physical dimensions. |

### Returns

The `getCssDimensions` function returns an object containing the following properties:

| Property | Type     | Description                                                                                                                                                                                                      |
| :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `width`  | `number` | The calculated horizontal size of the element in pixels. This value prioritizes the actual rendered offset width while falling back to computed CSS values where layout geometry is unavailable or inconsistent. |
| `height` | `number` | The calculated vertical size of the element in pixels. Similar to the width, this property reflects the most accurate height by reconciling layout-driven dimensions with the styles defined in the CSS cascade. |
