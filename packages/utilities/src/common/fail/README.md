# fail

Throws a formatted error message with a specific prefix to immediately terminate execution.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/fail)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20fail]%20Issue)

## Import

```ts
import { fail } from '@entry-ui/utilities/fail';
```

## Usage

The `fail` utility is used for critical error handling where the execution flow must be stopped immediately. It ensures consistent error reporting by enforcing a prefix and joining message segments into a single, cohesive error message.

```ts
import { fail } from '@entry-ui/utilities/fail';

// Standard usage with a component prefix and multiple message parts.
fail({ prefix: '[Core]', messages: ['Critical', 'failure', 'detected.'] });
// Throws: Error: [Core] Critical failure detected.

// Throwing an error with a single message element.
fail({ prefix: '[Auth]', messages: ['Unauthorized access attempt.'] });
// Throws: Error: [Auth] Unauthorized access attempt.

// Passing an empty messages array for a minimal header exception.
fail({ prefix: '[Database]', messages: [] });
// Throws: Error: [Database]
```

## API reference

This section provides a detailed technical overview of the `fail` function, including its input parameters and expected behavior.

### Parameters

The `fail` function accepts a single configuration object as its parameter to define the error prefix and contextual messages, where all properties are required and marked with an asterisk (`*`):

| Property    | Type       | Default | Description                                                                                                                                                        |
| :---------- | :--------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix*`   | `string`   | `—`     | A string that identifies the origin or category of the failure. This prefix is prepended to the thrown error message to help pinpoint the source of the exception. |
| `messages*` | `string[]` | `—`     | An array of message segments that will be joined by a single space. Allows for dynamic construction of a comprehensive error message from multiple strings.        |

### Returns

The `fail` function is a terminal utility, meaning it throws an error and never returns a value:

| Type    | Description                                                                                         |
| :------ | :-------------------------------------------------------------------------------------------------- |
| `never` | This function never returns a value because it always throws an `Error`, terminating the execution. |
