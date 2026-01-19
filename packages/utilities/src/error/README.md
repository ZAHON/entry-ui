# error

Logs a formatted error message to the console with a specific prefix.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/error)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20error]%20Issue)

## Import

```tsx
import { error } from '@entry-ui/utilities/error';
```

## Usage

The `error` utility is designed to standardize how errors are reported across your applications. By enforcing a prefix and allowing message segments, it ensures that logs are easily searchable and provide clear context about their origin (e.g., which package or service triggered the error).

```ts
import { error } from '@entry-ui/utilities/error';

error({ prefix: '[Parser]', messages: ['Failed to', 'process', 'the style string.'] });

// Console outputs:
// [Parser] Failed to process the style string.
```

## API reference

This section provides a detailed technical overview of the `error` function, including its input parameters and expected behavior.

### Parameters

The `error` function accepts a single object as its parameter, with the following properties:

| Property    | Type       | Default | Description                                                                                                                                            |
| :---------- | :--------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix*`   | `string`   | `-`     | A string that identifies the origin or category of the error. Prepended to the logged error message to provide context about where the issue occurred. |
| `messages*` | `string[]` | `-`     | An array of message segments that will be joined with a space. Useful for constructing a detailed error description from multiple parts.               |

### Returns

The `error` function is a void utility, meaning it performs an action (logging to the console) but does not return a value:

| Type   | Description                              |
| :----- | :--------------------------------------- |
| `void` | This function does not return any value. |
