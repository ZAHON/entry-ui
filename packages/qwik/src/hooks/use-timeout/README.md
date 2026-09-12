# useTimeout

A hook that provides a reactive controller for scheduling and managing delayed callbacks.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-timeout)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20useTimeout]%20Issue)

## Import

```ts
import { useTimeout } from '@entry-ui/qwik/use-timeout';
```

## Usage

The `useTimeout` hook encapsulates isolated, stateful timer logic, exposing `QRL` functions to schedule, cancel, and inspect timeouts safely across Qwik's runtime boundaries. It provides a deterministic execution model that automatically handles single-timer statefulness, ensuring that scheduling a new timeout automatically clears any pending operations.

It manages automatic cleanup upon component unmounting to prevent memory leaks and dangling background execution. Built with SSR-safety in mind, the hook includes development-time checks to ensure that browser-native timer scheduling operations are strictly invoked within client-side environments.

```tsx
import { component$, useSignal, $ } from '@qwik.dev/core';
import { useTimeout } from '@entry-ui/qwik/use-timeout';

const Usage = component$(() => {
  const randomValue = useSignal('');
  const { start$, clear$ } = useTimeout();

  return (
    <>
      <p>
        Random value: <code>{randomValue.value}</code>
      </p>

      <button
        type="button"
        onClick$={() =>
          start$({
            callback: $(() => (randomValue.value = `${Math.random()}`)),
            delayMs: 3000,
          })
        }
      >
        Start
      </button>
      <button type="button" onClick$={clear$}>
        Clear
      </button>
    </>
  );
});
```

## API reference

This section provides a detailed technical overview of the `useTimeout` hook, including its input parameters and the structure of the returned object.

### Parameters

The `useTimeout` hook does not accept any input parameters upon initialization.

### Returns

The `useTimeout` hook returns an object containing `QRL` functions for scheduling, canceling, and inspecting delayed timer execution:

| Property     | Type                                                                       | Description                                                                                                                                                                                                                                                                    |
| :----------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start$`     | `QRL<(params: { callback: QRL<() => unknown>; delayMs: number }) => void>` | A `QRL` function that schedules a delayed execution of the provided callback after a specified duration. If a timer is already active when invoked, it automatically cancels the pending execution before scheduling the new task, guaranteeing single-execution statefulness. |
| `clear$`     | `QRL<() => void>`                                                          | A `QRL` function that immediately cancels any currently active or scheduled timer execution. Performs a safe no-op if no timer is currently running, ensuring deterministic cleanup without runtime errors.                                                                    |
| `isStarted$` | `QRL<() => boolean>`                                                       | A `QRL` function that evaluates whether a timer execution is currently pending. Returns `true` if a timer has been scheduled and is awaiting execution, otherwise `false`.                                                                                                     |
