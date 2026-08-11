# useScrollLock

A hook that provides a reactive interface for managing background scroll locking.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-scroll-lock)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20useScrollLock]%20Issue)

## Import

```ts
import { useScrollLock } from '@entry-ui/qwik/use-scroll-lock';
```

## Usage

The `useScrollLock` hook facilitates the management of document scrolling, which is essential for maintaining focus and preventing background movement when overlays, modals, or drawers are active. It coordinates scroll prevention across concurrent UI components and application runtime execution contexts.

Additionally, the hook accepts an optional `getDocumentViewportContext$` parameter. This allows you to supply a custom `QRL` function that resolves to specific `Window` and `Document` contexts, as well as `<html>` and `<body>` elements—making it fully compatible with isolated environments such as iframes or custom viewports rather than relying solely on the global `Window` and `Document` objects.

The hook is built with SSR-safety in mind, including development-time checks to ensure that DOM-dependent locking operations are only triggered in the browser environment.

```tsx
import { component$ } from '@qwik.dev/core';
import { useScrollLock } from '@entry-ui/qwik/use-scroll-lock';

const Usage = component$(() => {
  const { lock$, unlock$ } = useScrollLock();

  return (
    <>
      <button type="button" onClick$={lock$}>
        Lock scroll
      </button>

      <button type="button" onClick$={unlock$}>
        Unlock scroll
      </button>
    </>
  );
});
```

## API reference

This section provides a detailed technical overview of the `useScrollLock` hook, including its optional parameter and the structure of the returned object.

### Parameters

The `useScrollLock` hook accepts an optional QRL function parameter to target specific document and viewport contexts:

| Parameter                     | Type                                                                                                  | Default | Description                                                                                                                                                                                                                                            |
| :---------------------------- | :---------------------------------------------------------------------------------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getDocumentViewportContext$` | `QRL<() => { win: typeof window; doc: Document; html: HTMLElement; body: HTMLElement }> \| undefined` | `—`     | An optional `QRL` that resolves to an object containing target `Window` and `Document` contexts, as well as `<html>` and `<body>` elements. Useful for targeting specific contexts like iframes instead of the global `Window` and `Document` objects. |

### Returns

The `useScrollLock` hook returns an object containing `QRL` functions for managing the scroll state:

| Property  | Type                       | Description                                                                                                                                                                                                                                                                                                             |
| :-------- | :------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lock$`   | `QRL<() => Promise<void>>` | A `QRL` function that activates the scroll lock. When executed in a browser environment, it disables background scrolling. It evaluates `Window` and `Document` contexts, as well as `<html>` and `<body>` elements, handles platform-specific inconsistencies, and manages layout shifts to prevent content "jumping". |
| `unlock$` | `QRL<() => void>`          | A `QRL` function that deactivates the scroll lock. It invokes the release callback associated with the current scroll lock session, restoring original `Document` context and viewport styles.                                                                                                                          |
