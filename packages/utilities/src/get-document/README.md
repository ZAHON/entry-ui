# getDocument

Retrieves the document object associated with a given DOM node, ensuring the correct execution context.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-document)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getDocument]%20Issue)

## Import

```ts
import { getDocument } from '@entry-ui/utilities/get-document';
```

## Usage

The `getDocument` utility identifies the correct `ownerDocument` for a specific DOM node. This is particularly useful when working with applications that utilize `iframes` or multiple windows, as it ensures that document-level APIs are accessed from the node's actual environment rather than the current global document.

By using this utility, you ensure that document-specific methods (like `createElement`, `getElementById`, or `addEventListener`) are executed within the correct context relative to the element.

```ts
import { getDocument } from '@entry-ui/utilities/get-document';

const element = document.getElementById('my-element');
const targetDocument = getDocument(element);

// Now you can safely use document-specific APIs
const newElement = targetDocument.createElement('div');

// If node is null, it falls back to the current global document
getDocument(null);
// Returns: document
```

## API reference

This section provides a technical overview of the `getDocument` function and how it resolves the execution context.

### Parameters

The `getDocument` function accepts a single required parameter (marked with an asterisk `*`) that represents the starting point for finding the document context:

| Parameter | Type  | Default | Description                                                                                                                                                                  |
| :-------- | :---- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node*`   | `any` | `-`     | The DOM node or object to inspect. The utility attempts to access `node.ownerDocument`. If the node is null or lacks this property, it returns the global `document` object. |

### Returns

The `getDocument` function returns the resolved `Document` object:

| Type       | Description                                                                                                                                         |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Document` | The `document` object where the node resides, or the current global `document` if the node is invalid or resides in the standard top-level context. |
