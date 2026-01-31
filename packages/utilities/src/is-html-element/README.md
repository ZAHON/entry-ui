# isHTMLElement

Verifies whether a given value is an instance of HTMLElement, with support for cross-realm environments.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/is-html-element)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20isHTMLElement]%20Issue)

## Import

```ts
import { isHTMLElement } from '@entry-ui/utilities/is-html-element';
```

## Usage

The `isHTMLElement` utility serves as a robust TypeScript type guard. Unlike a simple `instanceof HTMLElement` check, this utility is "cross-realm safe." In web development, elements originating from an `iframe` have a different constructor than those in the main window, which often leads to false negatives.

This function ensures that the check is performed against both the global environment and the element's specific window context, making it ideal for complex applications, dashboard widgets, or library development.

```ts
import { isHTMLElement } from '@entry-ui/utilities/is-html-element';

isHTMLElement(document.createElement('div'));
// Returns: true

isHTMLElement(null);
// Returns: false

isHTMLElement(iframeElement.contentDocument.body);
// Returns: true (even if the instance comes from another window context)
```

## API reference

This section provides a technical overview of the `isHTMLElement` function and its behavior as a type guard.

### Parameters

The `isHTMLElement` function accepts a single required parameter (marked with an asterisk `*`) to be evaluated:

| Parameter | Type      | Default | Description                                                                                     |
| :-------- | :-------- | :------ | :---------------------------------------------------------------------------------------------- |
| `value*`  | `unknown` | `-`     | The value to check. Can be any type, as the function safely handles non-object and null inputs. |

### Returns

The `isHTMLElement` function returns a boolean that acts as a type predicate.

| Type                   | Description                                                                                                                                                                  |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value is HTMLElement` | Returns `true` if the value is an instance of `HTMLElement` (considering its own window context). Returns `false` if the window is undefined or the value is not an element. |
