# addEventListenerOnce

Registers an event listener that is automatically removed after its first invocation.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/add-event-listener-once)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20addEventListenerOnce]%20Issue)

## Import

```ts
import { addEventListenerOnce } from '@entry-ui/utilities/add-event-listener-once';
```

## Usage

The `addEventListenerOnce` utility simplifies the management of one-time events by wrapping the native `addEventListener` method and enforcing the `once: true` option. It returns a cleanup function that allows for manual removal of the listener before the event occurs, ensuring robust memory management.

```ts
import { addEventListenerOnce } from '@entry-ui/utilities/add-event-listener-once';

const cleanup = addEventListenerOnce({
  target: window,
  type: 'scroll',
  listener: (event) => {
    console.log('First scroll detected!', event);
  },
  options: { passive: true },
});

// If the listener is no longer needed before the first scroll:
// cleanup();
```

## API reference

This section provides a detailed technical overview of the `addEventListenerOnce` function, including its input parameters and expected behavior.

### Parameters

The `addEventListenerOnce` function accepts a single configuration object as its parameter. This object contains the following properties, where those marked with an asterisk (`*`) are required for the utility to function correctly:

| Property    | Type                                                                    | Default | Description                                                                                                                                                                                                                                                           |
| :---------- | :---------------------------------------------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target*`   | `HTMLElement \| Document \| Window`                                     | `-`     | The DOM node or global object to which the event listener will be attached. Supports `HTMLElement`, `Document`, and `Window` targets.                                                                                                                                 |
| `type*`     | `K extends keyof AllEventMaps`                                          | `-`     | A case-sensitive string representing the event type to monitor. The available types are dynamically inferred based on the `target` category.                                                                                                                          |
| `listener*` | `(this: HTMLElement \| Document \| Window, ev: AllEventMaps[K]) => any` | `-`     | The callback function executed when the event is dispatched. It receives a strictly typed event object corresponding to the provided event `type`.                                                                                                                    |
| `options`   | `Omit<AddEventListenerOptions, "once">`                                 | `-`     | An optional configuration object that specifies characteristics about the event listener. While most native options are supported, the `once` property is internally enforced as `true` and cannot be overridden to ensure the utility's one-time execution behavior. |

### Returns

The `addEventListenerOnce` function returns a cleanup utility to provide manual control over the listener's lifecycle:

| Type         | Description                                                                                                                                           |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `() => void` | A cleanup function that, when invoked, manually removes the event listener from the `target`. This is useful for preventing the listener from firing. |

## Type definitions

This section details the internal types used by `addEventListenerOnce` to ensure exhaustive TypeScript support and accurate event inference across different DOM targets.

### AllEventMaps

The `AllEventMaps` type is a comprehensive union that aggregates event definitions from the core browser environments. This ensures that regardless of the `target` provided, the `type` and listener remain strictly typed:

- **`HTMLElementEventMap`**:
  Includes all standard element events such as `click`, `input`, `keydown`, and mouse interactions.

- **`DocumentEventMap`**:
  Covers document-level events like `DOMContentLoaded`, `visibilitychange`, or `fullscreenchange`.

- **`WindowEventMap`**:
  Provides support for global events including `resize`, `load`, `popstate`, and `message`.

By combining these maps, the utility provides a unified interface for event handling without losing the specific event object signatures (e.g., `MouseEvent`, `KeyboardEvent`) associated with each type.

```ts
type AllEventMaps = HTMLElementEventMap & DocumentEventMap & WindowEventMap;
```
