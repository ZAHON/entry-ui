# wait

Pauses the execution of the current asynchronous function for a specified duration.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/wait)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20wait]%20Issue)

## Import

```ts
import { wait } from '@entry-ui/utilities/wait';
```

## Usage

The `wait` utility wraps `setTimeout` within a native `Promise` to suspend asynchronous execution without blocking the main event loop. It simplifies asynchronous control flows, delay-based sequencing, and polling patterns when consumed with `async/await` syntax.

```ts
import { wait } from '@entry-ui/utilities/wait';

// Pause execution for 2 seconds before proceeding with the task.
const performTask = async () => {
  await wait(2000);
  console.log('Task resumed after 2 seconds.');
};
```

## API reference

This section provides a detailed technical overview of the `wait` function, including its input parameters and expected behavior

### Parameters

The `wait` function accepts a single required parameter (marked with an asterisk `*`) that defines the duration of the delay:

| Parameter  | Type     | Default | Description                                                                                |
| :--------- | :------- | :------ | :----------------------------------------------------------------------------------------- |
| `delayMs*` | `number` | `—`     | The duration in milliseconds to pause execution before resolving the underlying `Promise`. |

### Returns

The `wait` function returns a `Promise` that acts as a synchronization point in asynchronous execution:

| Type               | Description                                                                                                      |
| :----------------- | :--------------------------------------------------------------------------------------------------------------- |
| `Promise<unknown>` | A `Promise` that resolves once the specified `delayMs` timer expires, allowing asynchronous execution to resume. |
