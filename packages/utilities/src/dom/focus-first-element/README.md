# focusFirstElement

Attempts to focus the first available element from a list of candidates.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/focus-first-element)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20focusFirstElement]%20Issue)

## Import

```ts
import { focusFirstElement } from '@entry-ui/utilities/focus-first-element';
```

## Usage

The `focusFirstElement` utility is designed for managing focus in dynamic environments where the intended target might not always be available or focusable. It iterates through an ordered list of candidates and stops as soon as one successfully receives focus.

```ts
import { focusFirstElement } from '@entry-ui/utilities/focus-first-element';

const input = document.querySelector<HTMLElement>('#search-input');
const button = document.querySelector<HTMLElement>('#submit-button');

// Focus the first available candidate (e.g. input) and select its text without auto-scrolling.
if (input && button) {
  focusFirstElement({ candidates: [input, button], preventScroll: true, select: true });
}
```

## API reference

This section provides a technical overview of the `focusFirstElement` function and its iteration logic.

### Parameters

The `focusFirstElement` function accepts a single configuration object as its parameter to define the target candidate list and focus options, where required properties are marked with an asterisk (`*`):

| Property        | Type                   | Default | Description                                                                                                                                                                                                                                |
| :-------------- | :--------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `candidates*`   | `HTMLElement[]`        | `—`     | An ordered array of DOM elements to be evaluated for focusing. The utility iterates through this list and attempts to focus each element sequentially until one successfully receives focus.                                               |
| `focusVisible`  | `boolean \| undefined` | `false` | Whether the focus indicator (e.g., focus ring) should be visible. This mimics the behavior of the `:focus-visible` CSS pseudo-class, ensuring the element appears focused to the user, typically used for keyboard navigation consistency. |
| `preventScroll` | `boolean \| undefined` | `false` | Whether the browser should scroll the element into view after focusing. If set to `true`, it prevents the default scrolling behavior, which is useful for maintaining the current viewport position.                                       |
| `select`        | `boolean \| undefined` | `false` | Whether to select the text content within the candidate element. Selection is only performed if the focused candidate is an `HTMLInputElement` that supports text selection.                                                               |

### Returns

The `focusFirstElement` function is a void utility and does not return a value:

| Type   | Description                                                                                                          |
| :----- | :------------------------------------------------------------------------------------------------------------------- |
| `void` | The function performs sequential focus attempts and terminates once a candidate is focused or the list is exhausted. |
