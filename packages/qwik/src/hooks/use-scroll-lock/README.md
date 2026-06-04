# useScrollLock

A hook that provides a reactive interface for managing background scroll locking.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-scroll-lock)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20useScrollLock]%20Issue)

## Import

```ts
import { useScrollLock } from '@entry-ui/qwik/use-scroll-lock';
```

## Usage

The `useScrollLock` hook facilitates the management of document scrolling, which is essential for maintaining focus and preventing background movement when overlays, modals, or drawers are active. It automatically compensates for scrollbar width to prevent horizontal layout shifts and implements specialized strategies for mobile environments where standard overflow rules may be ignored.

When the lock is engaged, the hook marks the `<body>` element with a `data-scroll-lock` attribute and sets a `--scrollbar-width` CSS variable on the `<html>` element for layout synchronization. On iOS devices, it uses a fixed positioning strategy to bypass Safari's background scrolling behavior, meticulously restoring the scroll position once the lock is released.

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

The `useScrollLock` hook accepts an optional `QRL` function:

| Parameter          | Type                  | Default | Description                                                                                                                                                                   |
| :----------------- | :-------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resolveDocument$` | `QRL<() => Document>` | `-`     | An optional `QRL` that resolves to a `document` instance. This is useful for targeting specific document contexts, such as iframes or popups, instead of the global document. |

### Returns

The `useScrollLock` hook returns an object containing `QRL` functions for managing the scroll state:

| Property  | Type              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :-------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `lock$`   | `QRL<() => void>` | A `QRL` function that activates the scroll lock. When executed in a browser environment, it disables background scrolling by locking the body element and calculating layout shifts to prevent content "jumping". It handles platform-specific inconsistencies, such as iOS Safari's background scrolling, and marks the `<body>` element with a `data-scroll-lock` attribute to manage the lock state. Additionally, it sets a `--scrollbar-width` CSS variable on the `<html>` (document element) for layout synchronization. |
| `unlock$` | `QRL<() => void>` | A `QRL` function that deactivates the scroll lock. It restores the original styles of the `<body>`, removes the `data-scroll-lock` attribute from it, and deletes the `--scrollbar-width` CSS variable from the `<html>` element. On iOS, it also ensures the window is scrolled back to its original position to maintain user context.                                                                                                                                                                                        |
