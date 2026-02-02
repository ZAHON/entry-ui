# useLifecycle

A hook that manages component lifecycle events with reliable server-to-browser continuity.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-lifecycle)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20useLifecycle]%20Issue)

## Import

```ts
import { useLifecycle } from '@entry-ui/qwik/use-lifecycle';
```

## Usage

The `useLifecycle` hook provides a robust solution for managing mount and unmount events in Qwik applications. It solves a critical challenge where standard `cleanup` functions defined in `useTask$` are not transferred from the server to the browser, often leading to "lost" teardown logic for server-rendered components.

Unlike `useVisibleTask$`, which triggers eager JavaScript execution and can negatively impact performance metrics like TBT (Total Blocking Time), `useLifecycle` is designed to be resumable-friendly. It leverages a global `MutationObserver` to track the presence of elements in the DOM and the `qresume` event to re-register cleanup tasks upon resumption. This ensures that your `onUnmount$` logic is reliably executed even if the component was rendered on the server and never triggered a client-side task.

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

This section provides a detailed technical overview of the `useLifecycle` hook, covering its configuration properties and the requirements for proper element tracking.

### Parameters

The `useLifecycle` hook accepts a single configuration object as its parameter. This object contains the following properties, where those marked with an asterisk (`*`) are required for the hook to function correctly:

| Property     | Type                                                       | Default | Description                                                                                                                                                                                                                                                                                                                               |
| :----------- | :--------------------------------------------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `element*`   | `SignalOrReadonlySignal<HTMLElement \| undefined \| null>` | `-`     | A signal containing the reference to the target element. This reference is essential for the global unmount observer to track the element's presence in the DOM. It ensures that the unmount logic is correctly associated with the specific node, enabling reliable detection of its removal even across the server-to-browser boundary. |
| `onMount$`   | `QRL<() => void> \| QRL<() => Promise<void>>`              | `-`     | A `QRL` function executed when the component is first initialized or mounted. Unlike standard effects, this callback is designed to run within the `useTask$` scope, allowing for consistent initialization logic across both server and client environments.                                                                             |
| `onUnmount$` | `QRL<() => void> \| QRL<() => Promise<void>>`              | `-`     | A `QRL` function executed when the element is removed from the DOM. This callback is the primary solution for the "lost cleanup" problem in Qwik. It is reliably triggered by a `MutationObserver` when the associated `element` leaves the document tree.                                                                                |

### Returns

The `useLifecycle` hook does not return any value. It operates exclusively through side effects by registering lifecycle callbacks and managing element tracking within the global unmount observer.

## The challenge of cleanup in resumable apps

When building components, a common requirement is to execute code during mounting and cleaning up resources upon unmounting. A developer's first instinct is often to use the standard `useTask$` hook with its `cleanup` function. However, in a resumable framework like Qwik, this leads to unexpected behavior.

### The problem with `useTask$`

Consider the following scenario where we log component mount and unmount events:

```tsx
import { component$, useTask$, useSignal } from '@qwik.dev/core';

const Component = component$(() => {
  useTask$(({ cleanup }) => {
    console.log('Component is mounted');

    cleanup(() => {
      console.log('Component is not mounted');
    });
  });

  return <p>Child</p>;
});

const Example = component$(() => {
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

If component is server-rendered, you will see both logs on the server console sequentially. When the application resumes in the browser, the component is already mounted, but clicking an "Unmount" button will yield no logs in the browser console. The cleanup only triggers in the browser if the task re-runs on the client first.

Even adding an `isBrowser` guard doesn't solve this, because - as stated in the Qwik documentation - the `cleanup` function is not transferable from server to browser. It is designed to release resources on the specific VM (server or client) where the task was executed.

```tsx
import { component$, useTask$, useSignal } from '@qwik.dev/core';
import { isBrowser } from '@qwik.dev/core/build';

const Component = component$(() => {
  useTask$(({ cleanup }) => {
    console.log('Component is mounted');

    if (isBrowser) {
      cleanup(() => {
        console.log('Component is not mounted');
      });
    }
  });

  return <p>Child</p>;
});

const Example = component$(() => {
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

### The `useVisibleTask$` dilemma

To fix this, one might switch to `useVisibleTask$`, which runs exclusively on the client:

```tsx
import { component$, useVisibleTask$, useSignal } from '@qwik.dev/core';
import { isBrowser } from '@qwik.dev/core/build';

const Component = component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    console.log('Component is mounted');

    if (isBrowser) {
      cleanup(() => {
        console.log('Component is not mounted');
      });
    }
  });

  return <p>Child</p>;
});

const Example = component$(() => {
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

While this works as expected, `useVisibleTask$` is considered a "last resort." It forces eager JavaScript execution, bypassing Qwik's core benefit of delaying code execution until it's actually needed. This can negatively impact your application's Total Blocking Time (TBT).

### The solution: `useLifecycle`

The `useLifecycle` hook bridges this gap. It provides the reliability of `useVisibleTask$` for unmounting logic but maintains the performance benefits of `useTask$`. By using a global `MutationObserver`, it ensures that unmount logic is always executed - even for server-rendered components without requiring eager JS execution upon mount.
