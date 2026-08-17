# warn

Logs a formatted warning message to the console.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/warn)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20warn]%20Issue)

## Import

```ts
import { warn } from '@entry-ui/utilities/warn';
```

## Usage

The `warn` utility is designed to communicate non-critical issues or reminders to developers, such as API deprecations or performance tips. It ensures that all warnings follow a predictable format, making them easy to identify and filter in the console.

```ts
import { warn } from '@entry-ui/utilities/warn';

warn({ prefix: '[Validator]', messages: ['The property', 'color', 'is deprecated.'] });

// Console outputs:
// [Validator] The property color is deprecated.
```

## API reference

This section provides a detailed technical overview of the `warn` function, including its input parameters and expected behavior.

### Parameters

The `warn` function accepts a single object as its parameter, with the following properties (required properties are marked with an asterisk `*`):

| Property    | Type       | Default | Description                                                                                                                                 |
| :---------- | :--------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `prefix*`   | `string`   | `-`     | A string that identifies the origin or category of the warning. Usually displayed at the beginning of the log message for easier filtering. |
| `messages*` | `string[]` | `-`     | An array of message segments that will be joined together into a single string. Allows for clean passing of multiple log parts.             |

### Returns

The `warn` function is a void utility, meaning it performs an action (logging to the console) but does not return a value:

| Type   | Description                              |
| :----- | :--------------------------------------- |
| `void` | This function does not return any value. |
