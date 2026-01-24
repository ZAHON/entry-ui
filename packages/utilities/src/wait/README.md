# wait

Pauses the execution of the current asynchronous function for a specified duration.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/wait)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20wait]%20Issue)

## Import

```ts
import { wait } from '@entry-ui/utilities/wait';
```

## Usage

The `wait` utility provides a Promise-based wrapper around `setTimeout`, enabling a non-blocking delay within asynchronous workflows. It is particularly useful for controlling execution flow, throttling operations, or simulating network latency in tests.

```ts
import { wait } from '@entry-ui/utilities/wait';

const performTask = async () => {
  console.log('Starting task...');

  await wait(2000); // Pauses execution for 2 seconds

  console.log('Task resumed after 2 seconds.');
};
```

## API reference

This section provides a detailed technical overview of the `wait` function, including its input parameters and expected behavior

### Parameters

The `wait` function accepts a single required parameter (marked with an asterisk `*`) that defines the duration of the delay in milliseconds. This value is used to initialize the internal timer:

| Parameter  | Type     | Default | Description                                                                                                  |
| :--------- | :------- | :------ | :----------------------------------------------------------------------------------------------------------- |
| `delayMs*` | `number` | `-`     | The number of milliseconds to wait before the `Promise` resolves. This determines the duration of the pause. |

### Returns

The `wait` function returns a `Promise` that acts as a synchronization point in asynchronous execution:

| Type               | Description                                                         |
| :----------------- | :------------------------------------------------------------------ |
| `Promise<unknown>` | A `Promise` that resolves once the specified `delayMs` has elapsed. |
