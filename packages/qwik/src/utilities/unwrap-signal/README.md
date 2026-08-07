# unwrapSignal

Unwraps a potential signal, returning its current value or the original value if it is not a signal.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/utilities/unwrap-signal)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20unwrapSignal]%20Issue)

## Import

```ts
import { unwrapSignal } from '@entry-ui/qwik/unwrap-signal';
```

## Usage

Use `unwrapSignal` when you need to handle flexible component props or parameters that can accept either raw values or reactive signals. This abstracts away the conditional check, verifying whether the provided input is a Qwik `Signal` and extracting its underlying value or returning the input as-is.

Additionally, `unwrapSignal` improves code readability and reduces boilerplate when writing components or hooks that need to support both reactive and static data sources seamlessly.

```tsx
import type { Signal } from '@qwik.dev/core';
import { component$, $ } from '@qwik.dev/core';
import { unwrapSignal } from '@entry-ui/qwik/unwrap-signal';

interface UsageProps {
  /**
   * The value to be processed, which can be a static value or a reactive signal.
   * Passed down from the parent component.
   */
  value: string | Signal<string>;
}

const Usage = component$<UsageProps>((props) => {
  const { value } = props;

  const handleClick$ = $(() => {
    // Extract the raw value from the potential signal input.
    // This safely resolves either a static value or an active signal instance.
    const resolvedValue = unwrapSignal(value);

    // Perform operations using the unwrapped value.
    // Ensures reliable logic execution regardless of the input type.
    console.log(resolvedValue);
  });

  return <button onClick$={handleClick$}>Click to unwrap value</button>;
});
```

## API reference

The `unwrapSignal` utility provides a type-safe way to simplify working with flexible reactive inputs. Below are the specifications for the input parameters and the resulting return value.

### Parameters

The `unwrapSignal` function accepts a single required parameter (marked with an asterisk `*`) representing the potential signal to be unwrapped:

| Parameter      | Type                                    | Default | Description                                              |
| :------------- | :-------------------------------------- | :------ | :------------------------------------------------------- |
| `maybeSignal*` | `T \| Signal<T> \| Readonly<Signal<T>>` | `—`     | The value or signal to unwrap into its underlying value. |

### Returns

The `unwrapSignal` function returns the resolved value:

| Type | Description                                                                                           |
| :--- | :---------------------------------------------------------------------------------------------------- |
| `T`  | The current value extracted from the signal if it is a signal, or the original raw input value as-is. |
