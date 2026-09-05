# useLifecycle

A hook that manages component lifecycle events with reliable server-to-browser continuity.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-lifecycle)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20useLifecycle]%20Issue)

## Import

```ts
import { useLifecycle } from '@entry-ui/qwik/use-lifecycle';
```

## Usage

The `useLifecycle` hook delivers a specialized solution for coordinating component mounting and unmounting within Qwik's resumable architecture. Standard `cleanup` closures registered inside `useTask$` are not serialized across the network boundary, leaving server-rendered components without reliable client-side teardown paths.

Rather than relying on `useVisibleTask$`, which forces eager script downloads and increases [**Total Blocking Time (TBT)**](https://web.dev/articles/tbt), `useLifecycle` preserves Qwik's zero-cost resumption benefits. It binds element node references to a global `MutationObserver` and listens to document-level `qresume` dispatches, ensuring teardown handlers execute deterministically upon DOM node detachment.

```tsx
import { component$, useSignal, $ } from '@qwik.dev/core';
import { useLifecycle } from '@entry-ui/qwik/use-lifecycle';

const Component = component$(() => {
  const elementRef = useSignal<HTMLElement | undefined>(undefined);

  useLifecycle({
    element: elementRef,
    onMount$: $(() => console.log('Component is mounted')),
    onUnmount$: $(() => console.log('Component is not mounted')),
  });

  return <p ref={elementRef}>Child</p>;
});

const Usage = component$(() => {
  const mounted = useSignal(true);

  return (
    <>
      <button type="button" onClick$={() => (mounted.value = !mounted.value)}>
        {mounted.value ? 'Unmount' : 'Mount'} component
      </button>

      {mounted.value && <Component />}
    </>
  );
});
```

## API reference

This section provides a detailed technical overview of the `useLifecycle` hook, covering its element-tracking parameters and the requirements for server-to-browser lifecycle synchronization.

### Parameters

The `useLifecycle` hook accepts a single configuration object as its parameter to define element tracking and lifecycle callbacks, where properties marked with an asterisk (`*`) are required:

| Property     | Type                                                                             | Default | Description                                                                                                                                                                                                                                                                                  |
| :----------- | :------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `element*`   | `Signal<HTMLElement \| undefined> \| Readonly<Signal<HTMLElement \| undefined>>` | `—`     | A signal holding the reference to the target DOM element. Provides the central node binding monitored by the global unmount observer to track presence within the document tree, enabling reliable detachment detection and lifecycle synchronization across the server-to-browser boundary. |
| `onMount$`   | `QRL<() => void> \| QRL<() => Promise<void>> \| undefined`                       | `—`     | A `QRL` function executed during component initialization or DOM attachment. Invoked within the `useTask$` execution scope to provide consistent setup and initialization logic across both server-side rendering and client-side execution contexts.                                        |
| `onUnmount$` | `QRL<() => void> \| QRL<() => Promise<void>> \| undefined`                       | `—`     | AA `QRL` function executed when the target element is detached from the DOM. Triggered by the centralized `MutationObserver` when the associated element leaves the document tree, offering a resilient solution to Qwik's "lost cleanup" problem across component boundaries.               |

### Returns

The `useLifecycle` hook is a void utility, meaning it performs side effects (registering lifecycle callbacks and tracking DOM elements) but does not return a value:

| Type   | Description                          |
| :----- | :----------------------------------- |
| `void` | This hook does not return any value. |
