# resetAnimationFrameScheduler

Replaces the shared global animation frame scheduler and drops all pending frame callbacks.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/create-animation-frame)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20resetAnimationFrameScheduler]%20Issue)

## Import

```ts
import { resetAnimationFrameScheduler } from '@entry-ui/utilities/reset-animation-frame-scheduler';
```

## Usage

The `resetAnimationFrameScheduler` utility drops pending frame execution queues and resets the shared batching scheduler instance. It is specifically designed for unit testing environments to enforce state isolation between tests.

Because the underlying animation frame scheduler operates as a process-global instance, callbacks requested during a test suite (for example, under fake timers or unfinished test cycles) can leak across boundaries. If left uncleaned, these leftover tasks may fire in subsequent tests against stale context or torn-down DOM elements. Invoking `resetAnimationFrameScheduler` flushes pre-existing queues while preserving safe ID sequence tracking across old and new instances.

```ts
import { resetAnimationFrameScheduler } from '@entry-ui/utilities/reset-animation-frame-scheduler';

// Reset the shared global scheduler instance before each test run.
beforeEach(() => {
  resetAnimationFrameScheduler();
});
```

## API reference

This section provides a technical overview of the `resetAnimationFrameScheduler` function, including its parameters and execution behavior.

### Parameters

The `resetAnimationFrameScheduler` function does not accept any parameters.

### Returns

The `resetAnimationFrameScheduler` function is a void utility, meaning it performs an action (resetting internal scheduler state and flushing pending frame queues) but does not return a value:

| Type   | Description                                                                                                                                                                                                                                            |
| :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `void` | Instantiates a fresh global scheduler instance, synchronizes the auto-incrementing ID counters to prevent ID collisions, and safely clears all pending callback arrays from the previous instance, converting orphaned ticks into low-overhead no-ops. |
