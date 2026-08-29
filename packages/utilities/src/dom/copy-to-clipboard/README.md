# copyToClipboard

Asynchronously transfers text to the system clipboard using the native Clipboard API.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/copy-to-clipboard)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20copyToClipboard]%20Issue)

## Import

```ts
import { copyToClipboard } from '@entry-ui/utilities/copy-to-clipboard';
```

## Usage

The `copyToClipboard` utility is a robust wrapper for [`navigator.clipboard.writeText`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText). It abstracts the complexity of the asynchronous [**Clipboard API**](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) into a structured interface with dedicated success and error handlers. This makes it ideal for triggering UI feedback (like toasts or tooltips) without managing manual `try/catch` blocks at the call site.

```ts
import { copyToClipboard } from '@entry-ui/utilities/copy-to-clipboard';

// Safely attempt to copy a string to the clipboard with handleable callbacks.
copyToClipboard({
  value: "Hello World",
  onSuccess: () => console.log("Text successfully copied to clipboard"'),
  onError: (err) => console.error(`Copy operation failed: ${err.type}`, err.message),
});
```

## API reference

This section provides a detailed technical overview of the `copyToClipboard` function, including its input parameters and handling of different execution outcomes.

### Parameters

The `copyToClipboard` function accepts a single configuration object as its parameter to define the target text and its lifecycle callbacks, where required properties are marked with an asterisk (`*`):

| Property    | Type                                                                                                        | Default | Description                                                                                                                                                                                                                                       |
| :---------- | :---------------------------------------------------------------------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value*`    | `string`                                                                                                    | `—`     | The plaintext string to be transferred to the system clipboard. This value is processed as a standard UTF-16 string by the Clipboard API.                                                                                                         |
| `onSuccess` | `(() => void) \| undefined`                                                                                 | `—`     | An optional callback executed immediately after the value has been successfully written to the clipboard. Use this to trigger UI feedback like "Copied!" toasts or success state updates.                                                         |
| `onError`   | `((error: { type: 'NOT_SUPPORTED' \| 'COPY_FAILED'; message?: string \| undefined }) => void) \| undefined` | `—`     | An optional callback executed when the copy operation fails or is not supported. It provides structured error information to distinguish between environment limitations (`"NOT_SUPPORTED"`) and unexpected runtime rejections (`"COPY_FAILED"`). |

### Returns

The `copyToClipboard` function returns a `Promise` that resolves once the operation and its corresponding lifecycle hooks have finished:

| Type            | Description                                                                                                   |
| :-------------- | :------------------------------------------------------------------------------------------------------------ |
| `Promise<void>` | A promise that resolves once the copy operation is finished and the corresponding callback has been executed. |
