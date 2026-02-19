# copyToClipboard

Asynchronously transfers a text string to the system clipboard using the modern Clipboard API.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/copy-to-clipboard)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20copyToClipboard]%20Issue)

## Import

```ts
import { copyToClipboard } from '@entry-ui/utilities/copy-to-clipboard';
```

## Usage

The `copyToClipboard` utility is a robust wrapper for `navigator.clipboard.writeText`. It abstracts the complexity of the asynchronous Clipboard API into a structured interface with dedicated success and error handlers. This makes it ideal for triggering UI feedback (like toasts or tooltips) without managing manual `try/catch` blocks at the call site.

> [!IMPORTANT]
> This utility expects a browser environment where `window` and `document` are globally available. Additionally, most modern browsers require a user gesture (such as a click event) to successfully execute clipboard operations due to security restrictions.

```ts
import { copyToClipboard } from '@entry-ui/utilities/copy-to-clipboard';

const buttonElement = document.querySelector<HTMLButtonElement>('#my-button');

if (buttonElement) {
  buttonElement.addEventListener('click', async () => {
    await copyToClipboard({
      value: 'Hello World',
      onSuccess: () => {
        console.log('Text successfully copied to clipboard!');
      },
      onError: (error) => {
        if (error.type === 'NOT_SUPPORTED') {
          console.error('Clipboard API is not supported in this browser.');
        } else {
          console.error('Copy failed:', error.message);
        }
      },
    });
  });
}
```

## API reference

This section provides a detailed technical overview of the `copyToClipboard` function, including its input parameters and handling of different execution outcomes.

### Parameters

The `copyToClipboard` function accepts a single configuration object as its parameter. This object contains the following properties, where those marked with an asterisk (`*`) are required:

| Property    | Type                              | Default | Description                                                                                                                                                                                                                                       |
| :---------- | :-------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value*`    | `string`                          | `-`     | The plaintext string to be transferred to the system clipboard. This value is processed as a standard UTF-16 string by the Clipboard API.                                                                                                         |
| `onSuccess` | `() => void`                      | `-`     | An optional callback executed immediately after the value has been successfully written to the clipboard. Use this to trigger UI feedback like "Copied!" toasts or success state updates.                                                         |
| `onError`   | `(error: ClipboardError) => void` | `-`     | An optional callback executed when the copy operation fails or is not supported. It provides structured error information to distinguish between environment limitations (`"NOT_SUPPORTED"`) and unexpected runtime rejections (`"COPY_FAILED"`). |

### Returns

The `copyToClipboard` function returns a `Promise` that resolves once the operation and its corresponding lifecycle hooks have finished:

| Type            | Description                                                                                                   |
| :-------------- | :------------------------------------------------------------------------------------------------------------ |
| `Promise<void>` | A promise that resolves once the copy operation is finished and the corresponding callback has been executed. |

## Type definitions

This section details the internal types used by `copyToClipboard` to ensure exhaustive TypeScript support and accurate error handling.

### ClipboardError

The `ClipboardError` interface represents a structured error object returned when a clipboard operation fails. It provides a uniform error shape to distinguish between environment-level limitations and unexpected runtime failures, allowing consumers to handle each case appropriately.

| Property   | Type                               | Description                                                                                                                                                                                             |
| :--------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`     | `"NOT_SUPPORTED" \| "COPY_FAILED"` | The classification of the failure. <br> - `"NOT_SUPPORTED"`: The browser lacks `navigator.clipboard.writeText` support. <br> - `"COPY_FAILED"`: The operation was rejected (e.g., lack of permissions). |
| `message?` | `string`                           | A descriptive message detailing the cause of the failure. Populated exclusively when `type` is `"COPY_FAILED"`, typically containing the message from the native `Error` object.                        |

```ts
interface ClipboardError {
  type: 'NOT_SUPPORTED' | 'COPY_FAILED';
  message?: string;
}
```
