# createAnimationFrame

Creates an isolated, stateful animation frame controller instance.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/create-animation-frame)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20createAnimationFrame]%20Issue)

## Import

```ts
import { createAnimationFrame } from '@entry-ui/utilities/create-animation-frame';
```

## Usage

The `createAnimationFrame` utility creates an isolated, stateful animation frame controller. It encapsulates native window animation frame scheduling into a clean API that prevents overlapping callback executions by automatically cancelling any pending frame when a new execution is scheduled.

Under the hood, all requests are routed through an internal shared scheduler that batches multiple frame callbacks into a single browser tick with `O(1)` cancellation overhead. This abstraction simplifies managing frame-bound UI behaviors, including smooth canvas renders, drag-and-drop tracking, or custom scroll animations. It eliminates manual identifier tracking and prevents layout thrashing or race conditions upon component unmounts.

```ts
import { createAnimationFrame } from '@entry-ui/utilities/create-animation-frame';

// Create a standalone animation frame controller instance.
const anim = createAnimationFrame();

// Schedule a callback to execute on the next frame.
anim.request(() => {
  console.log('Executed on animation frame!');
});

// Cancel execution if needed.
anim.cancel();
```

## API reference

This section provides a technical overview of the `createAnimationFrame` function and its returned controller methods.

### Parameters

The `createAnimationFrame` function does not accept any parameters.

### Returns

The `createAnimationFrame` function returns an object containing controller methods to manage the animation frame task:

| Property  | Type                             | Description                                                                                                                                                      |
| :-------- | :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `request` | `(callback: () => void) => void` | Schedules a callback to be executed on the next browser animation frame. Automatically cancels any previously scheduled frame for this specific handle instance. |
| `cancel`  | `() => void`                     | Immediately cancels any currently active or pending animation frame request. Performs a safe no-op if no frame is currently scheduled for this instance.         |
