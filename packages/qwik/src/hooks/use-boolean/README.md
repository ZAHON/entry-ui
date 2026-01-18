# useBoolean

A hook that manages a boolean state with common utility methods.

## Import

```tsx
import { useBoolean } from '@entry-ui/qwik/use-boolean';
```

## Usage

The `useBoolean` hook provides a simple yet powerful way to manage boolean state within your Qwik components. It's designed to simplify common UI patterns like controlling visibility (modals, drawers), managing toggles, or handling loading states.

The hook accepts a single optional `initialState` parameter to set the starting value. If no value is provided, it defaults to `false`.

To ensure a predictable data flow, the returned `state` is a readonly signal. Mutations can only be performed using the provided `QRL` functions: `setTrue$`, `setFalse$`, and `toggle$`.

```tsx
import { component$ } from '@qwik.dev/core';
import { useBoolean } from '@entry-ui/qwik/use-boolean';

const Usage = component$(() => {
  const { state, setFalse$, setTrue$, toggle$ } = useBoolean();

  return (
    <>
      <p>
        State is: <code>{state.value ? 'true' : 'false'}</code>
      </p>

      <button onClick$={setFalse$}>Set false</button>
      <button onClick$={setTrue$}>Set true</button>
      <button onClick$={toggle$}>Toggle</button>
    </>
  );
});
```

## API reference

This section provides a detailed technical overview of the `useBoolean` hook, including its input parameters and the structure of the returned object.

### Parameters

The `useBoolean` hook accepts a single, optional parameter to initialize the state:

| Param          | Type      | Default | Description                              |
| :------------- | :-------- | :------ | :--------------------------------------- |
| `initialState` | `boolean` | `false` | The initial value for the boolean state. |

### Returns

The `useBoolean` hook returns an object containing a readonly signal whose value indicates the current boolean state, along with `QRL` functions to manage it:

| Property    | Type                      | Description                                                        |
| :---------- | :------------------------ | :----------------------------------------------------------------- |
| `state`     | `ReadonlySignal<boolean>` | A readonly signal whose value indicates the current boolean state. |
| `setFalse$` | `QRL<() => void>`         | A `QRL` function to set the boolean state to `false`.              |
| `setTrue$`  | `QRL<() => void>`         | A `QRL` function to set the boolean state to `true`.               |
| `toggle$`   | `QRL<() => void>`         | A `QRL` function to toggle the boolean state.                      |
