# getComputedStyle

Retrieves the computed style properties for a specified HTML element.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-computed-style)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getComputedStyle]%20Issue)

## Import

```ts
import { getComputedStyle } from '@entry-ui/utilities/get-computed-style';
```

## Usage

The `getComputedStyle` utility is a reliable wrapper around the native browser API. Standard calls to `window.getComputedStyle(element)` may return incorrect values or fail if the element resides within a different execution context, such as an `iframe` or a popup window.

This utility ensures that the styles are always retrieved from the context where the element actually exists, guaranteeing that the returned `CSSStyleDeclaration` reflects the true computed state of the node.

```ts
import { getComputedStyle } from '@entry-ui/utilities/get-computed-style';

const element = document.querySelector('.my-element');
const styles = getComputedStyle(element);

console.log(styles.color);
// Returns: e.g., "rgb(0, 0, 0)"

// Safe to use with elements from different contexts (e.g., iframes)
const iframeElement = myIframe.contentDocument.getElementById('inner-element');
const iframeStyles = getComputedStyle(iframeElement);
```

## API reference

This section provides a technical overview of the `getComputedStyle` function and its return type.

### Parameters

The `getComputedStyle` function accepts a single required parameter (marked with an asterisk `*`) that points to the element to be inspected:

| Parameter  | Type      | Default | Description                                                                                                                             |
| :--------- | :-------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `element*` | `Element` | `-`     | The target element for which you want to retrieve the styles. The function will automatically resolve the correct window for this node. |

### Returns

The `getComputedStyle` function returns an object containing the resolved styles:

| Type                  | Description                                                                                                                                                           |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CSSStyleDeclaration` | A live object that updates when the element's styles change. It contains all CSS properties of the element after all stylesheets and inline styles have been applied. |
