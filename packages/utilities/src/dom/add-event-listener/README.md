# addEventListener

Attaches an event listener to a target DOM node and returns a cleanup function to remove it.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/add-event-listener)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20addEventListener]%20Issue)

## Import

```ts
import { addEventListener } from '@entry-ui/utilities/add-event-listener';
```

## Usage

The `addEventListener` utility provides a streamlined, type-safe wrapper around the standard DOM [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) API. It simplifies event management across `Element`, `Document`, `Window`, and `SVGElement` targets by automatically inferring event types based on the target and event name. This offers full IDE autocompletion for standard event strings while remaining flexible enough to accept custom event names.

The function returns a dedicated teardown callback that immediately detaches the listener when invoked, eliminating the need to preserve function references manually and preventing memory leaks.

```ts
import { addEventListener } from '@entry-ui/utilities/add-event-listener';

// Attaching a window resize listener with passive options.
const cleanup = addEventListener({
  target: window,
  type: 'resize',
  listener: () => {
    console.log('Window dimensions:', window.innerWidth, window.innerHeight);
  },
  options: { passive: true },
});

// Easily remove the listener when cleaning up.
cleanup();
```

## API reference

This section provides a detailed technical overview of the `addEventListener` utility, its configuration properties, and its return values.

### Parameters

The `addEventListener` function accepts a single configuration object as its parameter to define the listener setup, where required properties are marked with an asterisk (`*`):

| Property    | Type                                                      | Default | Description                                                                                                                                                                                   |
| :---------- | :-------------------------------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target*`   | `T`                                                       | `—`     | The target DOM node or object (such as `Window`, `Document`, `HTMLElement`, or `SVGElement`) to which the event listener will be attached.                                                    |
| `type*`     | `K`                                                       | `—`     | A case-sensitive string representing the event type to listen for (e.g., `"click"`, `"keydown"`, `"resize"`). Provides autocompletion for standard events while accepting custom event names. |
| `listener*` | `(this: T, ev: AddEventListenerEventMapOf<T>[K]) => void` | `—`     | The callback function triggered when the specified event occurs. Automatically receives a strongly-typed event object inferred from the `target` and event `type`.                            |
| `options`   | `boolean \| AddEventListenerOptions \| undefined`         | `—`     | An optional configuration object or boolean flag that specifies characteristics about the event `listener` (e.g., `capture`, `once`, `passive`).                                              |

### Returns

The `addEventListener` function returns a teardown callback function:

| Type         | Description                                                                                                                                             |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `() => void` | A cleanup function that detaches the event `listener` from the `target` node when executed. Calling this function prevents event listener accumulation. |
