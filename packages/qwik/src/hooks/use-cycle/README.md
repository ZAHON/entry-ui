# useCycle

A hook that manages navigation through a predefined sequence of options.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-cycle)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20useCycle]%20Issue)

## Import

```tsx
import { useCycle } from '@entry-ui/qwik/use-cycle';
```

## Usage

The `useCycle` hook provides a robust way to manage navigation through a predefined sequence of values. It is designed to simplify complex UI patterns that require moving through multiple states, such as carousels, multi-step processes, or advanced theme switchers.

The hook is highly configurable through its parameters: `options` defines the available values, `defaultOption` sets the initial state (falling back to the first option if the provided value is invalid), and `loop` determines whether the sequence should restart when reaching the boundaries.

To ensure a predictable data flow, the returned `option` is a readonly signal. This guarantees that state transitions occur exclusively through the provided `QRL` navigation functions: `next$`, `previous$`, `first$`, `last$`, and the validated `set$` method.

```tsx
import { component$ } from '@qwik.dev/core';
import { useCycle } from '@entry-ui/qwik/use-cycle';

const Usage = component$(() => {
  const { option, next$, previous$, first$, last$, set$ } = useCycle({
    options: ['crimson', 'royalblue', 'seagreen', 'rebeccapurple'] as const,
  });

  return (
    <>
      <p>
        Option: <code style={{ color: option.value }}>{option.value}</code>
      </p>

      <button type="button" onClick$={next$}>
        Next
      </button>
      <button type="button" onClick$={previous$}>
        Previous
      </button>
      <button type="button" onClick$={first$}>
        First
      </button>
      <button type="button" onClick$={last$}>
        Last
      </button>
      <button type="button" onClick$={() => set$('royalblue')}>
        Set royalblue
      </button>
    </>
  );
});
```

## API reference

This section provides a detailed technical overview of the `useCycle` hook, its configuration properties, and its return values.

### Parameters

The `useCycle` hook accepts a single configuration object as its parameter. This object contains the following properties, where those marked with an asterisk (`*`) are required for the hook to function correctly:

| Property        | Type           | Default      | Description                                                                                                                                                                                                                                       |
| :-------------- | :------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options*`      | `readonly T[]` | `-`          | A readonly array of values to cycle through. This defines the sequence and the scope of all possible states the hook can manage.                                                                                                                  |
| `defaultOption` | `T`            | `options[0]` | The initial value to be set when the hook is first initialized. If provided, it must be present in the `options` array. If the provided value is not found within the `options` array, the hook will fall back to the first element of the array. |
| `loop`          | `boolean`      | `true`       | Determines the behavior when navigating past the boundaries of the `options` array. If set to `true`, the sequence will wrap around (e.g., from last to first). If `false`, navigation will stop at the first or last element.                    |

### Returns

The `useCycle` hook returns an object containing the following properties:

| Property    | Type                      | Description                                                                                                                                                                                                                                                                           |
| :---------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `option`    | `ReadonlySignal<T>`       | A readonly signal whose value represents the currently active option from the provided array. This signal is read-only, which means its value can only be changed by calling navigation `QRL` functions like `next$`, `previous$`, or `set$`, ensuring predictable state transitions. |
| `next$`     | `QRL<() => void>`         | A `QRL` function that advances the value to the next option in the sequence. If `loop` is enabled, it cycles back to the first item upon reaching the end.                                                                                                                            |
| `previous$` | `QRL<() => void>`         | A `QRL` function that moves the value to the previous option in the sequence. If `loop` is enabled, it cycles back to the last item upon reaching the start.                                                                                                                          |
| `first$`    | `QRL<() => void>`         | A `QRL` function that jumps directly to the first item in the `options` array.                                                                                                                                                                                                        |
| `last$`     | `QRL<() => void>`         | A `QRL` function that jumps directly to the last item in the `options` array.                                                                                                                                                                                                         |
| `set$`      | `QRL<(value: T) => void>` | A `QRL` function that directly sets the `option` to a new value. This function includes a built-in validation check; the value will only be updated if it is present in the original `options` array.                                                                                 |

## Type inference and assertions

The `useCycle` hook is built with full TypeScript support, leveraging generics to ensure that the `option` readonly signal and the `set$` function are strictly typed based on your input.

By default, TypeScript might infer a broad type (like `string`) if the `options` array is passed as a standard mutable array. To achieve maximum type safety and enable autocompletion for specific literal values, you can use the `as const` assertion or explicitly define the generic type. This ensures that the state can only ever hold one of the predefined values from your sequence:

```tsx
// TypeScript infers `ReadonlySignal<string>` for `option`, which is less specific.
const { option } = useCycle({ options: ['option 1', 'option 2', 'option 3'] });

// Using `as const` asserts a literal type, so `option` is inferred as `ReadonlySignal<"option 1" | "option 2" | "option 3">`.
const { option } = useCycle({ options: ['option 1', 'option 2', 'option 3'] as const });

// Explicitly defining the generic type achieves the same precise inference.
const { option } = useCycle<'option 1' | 'option 2' | 'option 3'>({ options: ['option 1', 'option 2', 'option 3'] });
```
