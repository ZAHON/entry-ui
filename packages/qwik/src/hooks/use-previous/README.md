# usePrevious

A hook that tracks and retains the previous value of a reactive signal.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-previous)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20usePrevious]%20Issue)

## Import

```tsx
import { usePrevious } from '@entry-ui/qwik/use-previous';
```

## Usage

The `usePrevious` hook facilitates the monitoring of historical state transitions by comparing current and incoming signal values across updates. It leverages Qwik's reactive tasks to safely capture state changes without triggering unnecessary cascading renders, providing a readonly signal containing the prior value.

This hook accepts either a mutable `Signal` or a `Readonly<Signal>`, making it highly versatile for tracking props, derived states, or local component variables. During the initial render, the previous value defaults to `undefined`.

```tsx
import { component$, useSignal } from '@qwik.dev/core';
import { usePrevious } from '@entry-ui/qwik/use-previous';

const Usage = component$(() => {
  const currentValue = useSignal('');
  const previousValue = usePrevious(currentValue);

  return (
    <>
      <label for="text-input">Enter some text here</label>
      <input
        type="text"
        id="text-input"
        autocomplete="off"
        value={currentValue.value}
        onInput$={(_, currentTarget) => (currentValue.value = currentTarget.value)}
      />
      <p>Current value: {currentValue.value}</p>
      <p>Previous value: {previousValue.value}</p>
    </>
  );
});
```

## API reference

This section provides a detailed technical overview of the `usePrevious` hook, including its parameters and the structure of the returned value.

### Parameters

The `usePrevious` hook accepts a single required signal parameter to track, marked with an asterisk (`*`):

| Parameter | Type                               | Default | Description                                                     |
| :-------- | :--------------------------------- | :------ | :-------------------------------------------------------------- |
| `value*`  | `Signal<T> \| Readonly<Signal<T>>` | `—`     | The mutable or readonly reactive signal whose history to track. |

### Returns

The `usePrevious` hook returns a readonly signal containing the prior value of the tracked input:

| Type                               | Description                                                                                                  |
| :--------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `Readonly<Signal<T \| undefined>>` | A readonly signal holding the previous value of the source signal, or `undefined` during the initial render. |
