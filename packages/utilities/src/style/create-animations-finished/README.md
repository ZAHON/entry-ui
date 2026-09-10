# createAnimationsFinished

Creates an isolated, stateful animation lifecycle controller instance.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/create-animations-finished)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20createAnimationsFinished]%20Issue)

## Import

```ts
import { createAnimationsFinished } from '@entry-ui/utilities/create-animations-finished';
```

## Usage

The `createAnimationsFinished` utility provides a stateful controller for observing [**Web Animations API**](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) completions on specific target DOM elements. It gracefully handles complex animation lifecycles—such as aborted, replaced, or chained animation tracks—while offering built-in support for microtask batching, attribute-based starting style synchronization, and custom framework flush adapters (e.g., [`ReactDOM.flushSync`](https://react.dev/reference/react-dom/flushSync#flushing-updates-for-third-party-integrations)).

It is particularly useful for coordinating exit/entry transitions, preventing layout race conditions, and executing cleanup tasks only after all ongoing element motion completely settles.

```ts
// Create a standalone animations finished controller instance.
const animationsFinished = createAnimationsFinished({
  batch: true,
  waitForStartingStyleRemoved: true,
});

const element = document.querySelector<HTMLElement>('#my-element');

// Wait for all active animations on the target element to finish.
if (element) {
  animationsFinished.waitForAnimations({
    element,
    callback: () => {
      console.log('All animations finished!');
    },
  });
}

// Cancel any active frame checks or pending callbacks if needed.
animationsFinished.cancel();
```

## API reference

This section provides a technical overview of the `createAnimationsFinished` function, its configuration options, and the returned controller methods.

### Parameters

The `createAnimationsFinished` function accepts an optional configuration object as its parameter to customize the operational behavior of the animation lifecycle controller:

| Property                      | Type                                            | Default | Description                                                                                                                                                                                                                                                                           |
| :---------------------------- | :---------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `batch`                       | `boolean \| undefined`                          | `false` | Determines whether completion callbacks resolving within the same microtask checkpoint should be coalesced into a single commit. When enabled, callbacks execute together before the browser paints, preventing redundant re-renders and visual flickering across concurrent updates. |
| `waitForStartingStyleRemoved` | `boolean \| undefined`                          | `false` | Indicates whether execution should wait for the `[data-starting-style]` attribute to be removed from the element. Ensures that initial entry styles and transition baseline attributes settle prior to evaluating active element animations.                                          |
| `flushUpdate`                 | `((callback: () => void) => void) \| undefined` | `—`     | A custom adapter for flushing state updates or DOM mutations synchronously. Delegates execution to framework-specific flush wrappers (e.g., `ReactDOM.flushSync`) to guarantee immediate, synchronous updates before the next browser paint cycle.                                    |

### Returns

The `createAnimationsFinished` function returns an object containing controller methods to manage animation completion observers and scheduled tasks:

| Property            | Type                                                                                                  | Description                                                                                                                                                                                                                                                                   |
| :------------------ | :---------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `waitForAnimations` | `(params: { element: HTMLElement; callback: () => void; signal?: AbortSignal \| undefined }) => void` | Waits for all active Web Animations API instances running on the specified element to reach a finished state. Safely handles replaced or aborted animations, respects lifecycle `AbortSignal` cancellation, and executes the provided callback once all motion phases settle. |
| `cancel`            | `() => void`                                                                                          | Immediately cancels any pending frame requests or active animation monitoring routines. Cleans up scheduled timers to prevent stale execution callbacks when unmounting or resetting context.                                                                                 |
