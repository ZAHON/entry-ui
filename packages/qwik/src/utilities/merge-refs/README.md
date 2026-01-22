# mergeRefs

Combines multiple references into a single callback ref.

## Import

```tsx
import { mergeRefs } from '@entry-ui/qwik/merge-refs';
```

## Usage

Use `mergeRefs` when you need to assign a single DOM node to multiple references - for example, when combining a `ref` passed from a parent component with a local signal. This is essential for building flexible components that need to manage internal logic while still exposing the underlying element to consumers.

```tsx
import type { PropsOf } from '@qwik.dev/core';
import { component$, useSignal } from '@qwik.dev/core';
import { mergeRefs } from '@entry-ui/qwik/merge-refs';

const Usage = component$<PropsOf<'div'>>((props) => {
  const { ref, ...others } = props;

  const localRef = useSignal<HTMLElement | undefined>(undefined);

  return <div ref={mergeRefs([ref, localRef])} {...others} />;
});
```

## API reference

The `mergeRefs` utility provides a type-safe way to consolidate multiple reference handlers. Below are the specifications for the input parameters and the resulting callback function.

### Parameters

The `mergeRefs` function accepts a single required parameter (marked with an asterisk `*`) containing an array of reference sources. Each element in the array is evaluated, allowing for a seamless mix of signals, callback functions, and optional refs to be assigned to the same DOM node.

| Parameter | Type               | Default | Description                                                                                                                                                      |
| :-------- | :----------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `refs*`   | `PossibleRef<T>[]` | `-`     | An array of refs that can be either signals, callback refs, or undefined. Each ref will be assigned the provided DOM node when the returned function is invoked. |

### Returns

The `mergeRefs` function returns a single `QRL` callback function that efficiently manages the assignment of a DOM node to all provided refs.

| Type                     | Description                                                                   |
| :----------------------- | :---------------------------------------------------------------------------- |
| `QRL<(node: T) => void>` | A `QRL` function that accepts a DOM node and assigns it to each provided ref. |

## Type definitions

This section details the internal types used by `mergeRefs` to ensure full TypeScript support and seamless integration with Qwik's reactivity system.

### PossibleRef\<T>

The `PossibleRef<T>` type is a union that ensures compatibility with various ways of handling DOM elements in Qwik.

```ts
type PossibleRef<T> = Signal<Element | undefined> | Signal<T | undefined> | ((node: T) => void) | undefined;
```
