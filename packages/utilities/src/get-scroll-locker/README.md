# getScrollLocker

Retrieves the shared reference-counted viewport scroll locker singleton.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-scroll-locker)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getScrollLocker]%20Issue)

## Import

```ts
import { getScrollLocker } from '@entry-ui/utilities/get-scroll-locker';
```

## Usage

The `getScrollLocker` accessor utility provides access to a global, reference-counted viewport scroll locker instance. It coordinates scroll locks across independent UI components, custom hooks, and overlapping overlays.

When multiple components attempt to lock page scrolling simultaneously, `getScrollLocker` increments an internal reference counter. It defers execution to the next event loop tick to batch DOM state mutations, evaluates dynamic layout shift requirements, and respects external locks. The viewport scroll lock remains active until every subscriber invokes its respective release callback.

```ts
import { getScrollLocker } from '@entry-ui/utilities/get-scroll-locker';

// Acquire a scroll lock session when mounting a modal overlay.
const releaseScroll = getScrollLocker().acquire({
  win: window,
  doc: document,
  html: document.documentElement,
  body: document.body,
});

// Later, release the lock session when the modal unmounts or closes.
releaseScroll();
```

## API reference

This section provides a technical overview of the `getScrollLocker` function, including its returned interface methods and parameter definitions.

### Parameters

The `getScrollLocker` function does not accept any parameters.

### Returns

The `getScrollLocker` function returns an object containing the scroll locker management API:

| Property  | Type                                                                                                  | Description                                                                                                                                              |
| :-------- | :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `acquire` | `(params: { win: typeof window; doc: Document; html: HTMLElement; body: HTMLElement }) => () => void` | Acquires a viewport scroll lock session and increments reference counter. Schedules lock execution on first acquire call and returns a release callback. |
