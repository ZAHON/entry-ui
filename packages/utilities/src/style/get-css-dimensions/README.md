# getCssDimensions

Calculates the reconciled spatial dimensions of a target DOM element.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-css-dimensions)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getCssDimensions]%20Issue)

## Import

```ts
import { getCssDimensions } from '@entry-ui/utilities/get-css-dimensions';
```

## Usage

The `getCssDimensions` utility determines the reconciled spatial dimensions of a target DOM element. It addresses layout measurement inconsistencies that occur when relying solely on [`getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle), particularly in non-standard or testing environments (such as [**JSDOM**](https://github.com/jsdom/jsdom)).

The utility evaluates the computed CSS dimensions against the element's rendered [`offsetWidth`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth) and [`offsetHeight`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight). When a discrepancy is detected between style declarations and layout geometry, it automatically prioritizes layout bounds to ensure accurate pixel values matching the actual rendered element.

```ts
import { getCssDimensions } from '@entry-ui/utilities/get-css-dimensions';

const element = document.querySelector('#my-element');

// Retrieve reconciled spatial dimensions for the target element.
if (element) {
  const dimensions = getCssDimensions(element);
}
```

## API reference

This section provides a technical overview of the `getCssDimensions` function and its return structure.

### Parameters

The `getCssDimensions` function accepts a single required parameter (marked with an asterisk `*`) that points to the target DOM element to be measured:

| Parameter  | Type      | Default | Description                                                                                                                                                         |
| :--------- | :-------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `element*` | `Element` | `—`     | The target element for which you want to calculate spatial dimensions. The function will automatically reconcile computed CSS values with rendered layout geometry. |

### Returns

The `getCssDimensions` function returns an object containing the reconciled spatial dimensions:

| Property | Type     | Description                                                                                                                                                                                                      |
| :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `width`  | `number` | The calculated horizontal size of the element in pixels. This value prioritizes the actual rendered offset width while falling back to computed CSS values where layout geometry is unavailable or inconsistent. |
| `height` | `number` | The calculated vertical size of the element in pixels. Similar to the width, this property reflects the most accurate height by reconciling layout-driven dimensions with the styles defined in the CSS cascade. |
