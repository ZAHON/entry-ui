# useClipboard

A hook that provides an interface for interacting with the system clipboard.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-clipboard)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20useClipboard]%20Issue)

## Import

```ts
import { useClipboard } from '@entry-ui/qwik/use-clipboard';
```

## Usage

The `useClipboard` hook encapsulates the complexity of the asynchronous Clipboard API, exposing its state through readonly signals for a predictable, unidirectional data flow. It handles both success and error states, ensuring consistent UI feedback across different browser environments.

The hook features a built-in auto-reset mechanism: after a successful copy, the `copied` and `error` signals automatically reset once `timeoutMs` has elapsed. You can also monitor state transitions globally via the `onStatusChange$` callback or reset the state manually using the `reset$` function.

To ensure stability and security, the hook includes development-time checks that warn against server-side execution, as the Clipboard API is browser-only and typically requires a user gesture.

```tsx
import { component$ } from '@qwik.dev/core';
import { useClipboard } from '@entry-ui/qwik/use-clipboard';

const Usage = component$(() => {
  const { copied, error, copy$, reset$ } = useClipboard();

  return (
    <>
      <button onClick$={() => copy$('Hello from Entry UI Qwik!')}>
        {copied.value ? 'Copied!' : 'Copy to clipboard'}
      </button>

      <button onClick$={reset$}>Reset state</button>

      {error.value === 'NOT_SUPPORTED' && <p>Your browser does not support clipboard operations.</p>}
      {error.value === 'COPY_FAILED' && <p>Copying failed. Please check permissions.</p>}
    </>
  );
});
```

## API reference

This section provides a detailed technical overview of the `useClipboard` hook, including its input parameters and the structure of the returned object.

### Parameters

The `useClipboard` hook accepts a single configuration object as its parameter. All properties are optional:

| Property          | Type                                                                                           | Default | Description                                                                                                                                                                                                                                                                                                                                                |
| :---------------- | :--------------------------------------------------------------------------------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `timeoutMs`       | `number`                                                                                       | `3000`  | The duration in milliseconds before the `copied` signal automatically reverts to `false` and the `error` state is cleared after a successful copy operation.                                                                                                                                                                                               |
| `onStatusChange$` | `QRL<(details: { copied: boolean; error: "NOT_SUPPORTED" \| "COPY_FAILED" \| null }) => void>` | `-`     | An optional `QRL` callback invoked whenever the clipboard operation status changes. It provides a detailed object containing the current `copied` state and any associated `error`. This callback is triggered upon a successful copy, when an error occurs, or when the state is reset (either automatically after `timeoutMs` or manually via `reset$`). |

### Returns

The `useClipboard` hook returns an object containing readonly signals for state monitoring and `QRL` functions for clipboard management:

| Property | Type                                                       | Description                                                                                                                                                                                                                                                                                                              |
| :------- | :--------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `copied` | `ReadonlySignal<boolean>`                                  | A readonly signal that indicates whether a text string was successfully copied. This value is set to `true` immediately after a successful copy operation and automatically reverts to `false` after the specified `timeoutMs` duration has elapsed or if the state is manually reset.                                   |
| `error`  | `ReadonlySignal<"NOT_SUPPORTED" \| "COPY_FAILED" \| null>` | A readonly signal representing the current error state of the clipboard operation. Returns `"NOT_SUPPORTED"` if the Clipboard API is unavailable in the environment, `"COPY_FAILED"` if the operation was rejected (e.g., due to lack of permissions), or `null` if the last operation was successful or has been reset. |
| `copy$`  | `QRL<(value: string) => Promise<void>>`                    | A `QRL` function that asynchronously transfers a provided string to the system clipboard. This function must be invoked in a browser environment, typically as a result of a user gesture (like a click), and updates the `copied` and `error` signals based on the outcome of the operation.                            |
| `reset$` | `QRL<() => void>`                                          | A `QRL` function that restores the hook's state to its initial values. It sets `copied` to `false`, clears any active `error`, and cancels any pending timeout scheduled to reset the success state.                                                                                                                     |
