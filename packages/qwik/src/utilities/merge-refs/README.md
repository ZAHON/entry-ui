# mergeRefs

Merges multiple references into a single callback ref.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/utilities/merge-refs)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20mergeRefs]%20Issue)

## Import

```tsx
import { mergeRefs } from '@entry-ui/qwik/merge-refs';
```

## Usage

Use `mergeRefs` when you need to assign a single DOM node to multiple references - for example, when combining a `ref` passed from a parent component with a local signal. This is essential for building flexible components that need to manage internal logic while still exposing the underlying element to consumers.

Additionally, `mergeRefs` handles different types of references seamlessly under the hood, ensuring that `Signal` objects, callback `function` items, and optional or `undefined` values are all invoked or updated correctly without requiring manual conditional checks in your components.

```tsx
import type { PropsOf } from '@qwik.dev/core';
import { component$, useSignal } from '@qwik.dev/core';
import { mergeRefs } from '@entry-ui/qwik/merge-refs';

const Usage = component$<PropsOf<'div'>>((props) => {
  const { ref, ...others } = props;

  const localRef = useSignal<HTMLElement | undefined>(undefined);

  // Merge the parent's ref and the local signal.
  // Assign the resulting callback ref to the element.
  return <div ref={mergeRefs([ref, localRef])} {...others} />;
});
```

## API reference

The `mergeRefs` utility provides a type-safe way to consolidate multiple reference handlers. Below are the specifications for the input parameters and the resulting callback function.

### Parameters

The `mergeRefs` function accepts a single required parameter (marked with an asterisk `*`) containing an array of reference sources. Each element in the array is evaluated, allowing for a seamless mix of signals, callback functions, and optional refs to be assigned to the same DOM node:

| Parameter | Type                                                                                             | Default | Description                                                                                                                                                                             |
| :-------- | :----------------------------------------------------------------------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `refs*`   | `(Signal<Element \| undefined> \| Signal<T \| undefined> \| ((node: T) => void) \| undefined)[]` | `—`     | An array of refs that can be either `Signal` objects, callback `function` items, or `undefined`. Each ref will be assigned the provided DOM node when the returned function is invoked. |

### Returns

The `mergeRefs` function returns a `QRL` callback function that efficiently manages the assignment of a DOM node to all provided refs:

| Type                     | Description                                                                            |
| :----------------------- | :------------------------------------------------------------------------------------- |
| `QRL<(node: T) => void>` | A `QRL` callback function that accepts a DOM node and assigns it to each provided ref. |
