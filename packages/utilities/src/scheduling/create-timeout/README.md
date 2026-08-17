# createTimeout

Creates an isolated, stateful timer controller instance.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/create-timeout)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20createTimeout]%20Issue)

## Import

```ts
import { createTimeout } from '@entry-ui/utilities/create-timeout';
```

## Usage

The `createTimeout` utility creates an isolated, stateful timer controller. It encapsulates native window timeout scheduling into a clean API that prevents overlapping callback executions by automatically clearing pending timers when a new execution is scheduled.

This component-friendly abstraction is particularly valuable when managing ephemeral UI behaviors like auto-dismissing notifications, delayed tooltips, or debounced actions. By encapsulating internal handle state within closure scopes, it eliminates manually tracking numeric timer identifiers and simplifies cleanup hooks during component unmounts.

```ts
import { createTimeout } from '@entry-ui/utilities/create-timeout';

// Create a standalone timer instance for managing delayed executions.
const timer = createTimeout();

// Schedule a task after 500ms.
timer.start({
  callback: () => console.log('Executed!'),
  delayMs: 500,
});

// Inspect whether the timer is currently waiting to execute.
timer.isStarted();

// Cancel execution if needed.
timer.clear();
```

## API reference

This section provides a technical overview of the `createTimeout` function and its returned controller methods.

### Parameters

The `createTimeout` function does not accept any parameters.

### Returns

The `createTimeout` function returns an object containing controller methods to manage the timer:

| Property    | Type                                                          | Description                                                                                                                                                                                                                                               |
| :---------- | :------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start`     | `(params: { callback: () => void; delayMs: number }) => void` | Schedules a delayed callback execution after the specified duration. If a timer is already active when this method is invoked, it automatically cancels the pending execution before scheduling the new task, guaranteeing single-execution statefulness. |
| `clear`     | `() => void`                                                  | Immediately cancels any currently active or scheduled timer execution. If no timer is active at the time of invocation, this method safely performs a no-op, ensuring deterministic cleanup without throwing runtime errors.                              |
| `isStarted` | `() => boolean`                                               | Evaluates whether a timer execution is currently pending. Returns `true` if a timer has been scheduled and is awaiting execution, otherwise `false`.                                                                                                      |
