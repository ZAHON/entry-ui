# Utilities

Utilities are a collection of helper functions within Entry UI Qwik, designed to simplify common development tasks and ensure consistent behavior across the library. These tools handle complex low-level operations, allowing you to focus on building features while maintaining high code quality and performance.

## UI and DOM

Utilities designed to simplify interaction with the DOM and manage UI-related properties. They provide reliable patterns for handling element references and dynamic styling.

| Utility                                                                                               | Description                                                       |
| :---------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| [`mergeRefs`](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/utilities/merge-refs)     | Merges multiple references into a single callback ref.            |
| [`mergeStyles`](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/utilities/merge-styles) | Merges multiple style values into a single, unified style object. |

## Reactivity and execution

Utilities designed to handle asynchronous lazy-loading references and abstract away reactive data checks.

| Utility                                                                                                 | Description                                                                                          |
| :------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------- |
| [`resolveQrl`](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/utilities/resolve-qrl)     | Asynchronously resolves a QRL reference into its underlying value or symbol.                         |
| [`unwrapSignal`](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/utilities/unwrap-signal) | Unwraps a potential signal, returning its current value or the original value if it is not a signal. |

## Events

Utilities for managing and augmenting standard DOM events within the component lifecycle. These tools offer granular control over event handling and internal state updates.

| Utility                                                                                                                  | Description                                                              |
| :----------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| [`makeEventPreventable`](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/utilities/make-event-preventable) | Augments a standard event with internal handler prevention capabilities. |
