# useCounter

A hook that manages a numeric state with built-in clamping and validation logic.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-counter)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20useCounter]%20Issue)

## Import

```tsx
import { useCounter } from '@entry-ui/qwik/use-counter';
```

## Usage

The `useCounter` hook provides a secure and robust way to manage numeric states within your Qwik components. It is designed for UI elements that require strict boundary control, such as quantity selectors, pagination, or volume controls.

The hook is highly configurable through its parameters: `initialCount` sets the starting point, `step` defines the increment/decrement interval, while `min` and `max` establish strict numerical boundaries. To ensure a predictable data flow, the returned `count` is a readonly signal. This guarantees that state transitions occur exclusively through the provided `QRL` functions: `increment$`, `decrement$`, `reset$`, and the validated `set$` method.

> [!CAUTION]
> In development mode, an error will be thrown in the following cases:
>
> - **Invalid numbers**:
>   If any of the parameters (`initialCount`, `step`, `min`, or `max`) are not finite numbers (e.g., `NaN` or `Infinity`).
> - **Invalid range**:
>   If the `min` value is strictly greater than the `max` value.

```tsx
import { component$ } from '@qwik.dev/core';
import { useCounter } from '@entry-ui/qwik/use-counter';

const Usage = component$(() => {
  const { count, increment$, decrement$, set$, reset$ } = useCounter();

  return (
    <>
      <p>Count: {count.value}</p>

      <button type="button" onClick$={increment$}>
        Increment
      </button>
      <button type="button" onClick$={decrement$}>
        Decrement
      </button>
      <button type="button" onClick$={() => set$(5)}>
        Set 5
      </button>
      <button type="button" onClick$={reset$}>
        Reset
      </button>
    </>
  );
});
```

## API reference

This section provides a detailed technical overview of the `useCounter` hook, including its configuration properties and return values.

### Parameters

The `useCounter` hook accepts a single configuration object as its parameter. All properties are optional:

| Property       | Type     | Default             | Description                                                                                                                                           |
| :------------- | :------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `initialCount` | `number` | `0`                 | The starting value of the counter. Must be a finite number. It will be automatically clamped if it falls outside the specified `min` and `max` range. |
| `step`         | `number` | `1`                 | The amount by which the counter increases or decreases during increment and decrement operations. Must be a finite number.                            |
| `min`          | `number` | `-Number.MAX_VALUE` | The lower numerical boundary of the counter. The counter value will never go below this limit. Must be less than or equal to `max`.                   |
| `max`          | `number` | `Number.MAX_VALUE`  | The upper numerical boundary of the counter. The counter value will never exceed this limit. Must be greater than or equal to `min`.                  |

### Returns

The `useCounter` hook returns an object containing the following properties:

| Property     | Type                           | Description                                                                                                                                                                                                                                                                            |
| :----------- | :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `count`      | `ReadonlySignal<number>`       | A readonly signal representing the current numeric state of the counter. This signal is read-only, meaning its value can only be modified by calling specific `QRL` functions like `increment$`, `decrement$`, `set$`, or `reset$`, ensuring consistent and predictable state updates. |
| `increment$` | `QRL<() => void>`              | A `QRL` function that increases the counter value by the defined `step`. The resulting value is automatically clamped between `min` and `max`. Includes validation to ensure the operation results in a finite number.                                                                 |
| `decrement$` | `QRL<() => void>`              | A `QRL` function that decreases the counter value by the defined `step`. The resulting value is automatically clamped between `min` and `max`. Includes validation to ensure the operation results in a finite number.                                                                 |
| `set$`       | `QRL<(value: number) => void>` | A `QRL` function that directly sets the counter to a specific numeric value. This function includes built-in validation; the value will only be updated if it is a finite number, and it will be clamped between `min` and `max`.                                                      |
| `reset$`     | `QRL<() => void>`              | A `QRL` function that restores the counter to its defined `initialCount`. The `initialCount` value is re-clamped during this operation to ensure it still adheres to the current `min` and `max` constraints.                                                                          |
