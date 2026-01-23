# useControllable

A hook that manages state in either controlled or uncontrolled mode.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-controllable)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20useControllable]%20Issue)

## Import

```tsx
import { useControllable } from '@entry-ui/qwik/use-controllable';
```

## Usage

The `useControllable` hook provides a flexible way to manage component state in either controlled or uncontrolled mode. It is designed to simplify the creation of reusable UI components that need to support both standalone internal state management and external synchronization with a parent component.

The hook's behavior is determined by its configuration: providing a `controlledSignal` puts the hook in controlled mode, where state authority is delegated to the parent. If omitted, it operates in uncontrolled mode, using the `defaultValue` to initialize and manage an internal signal. This dual-mode capability ensures that components remain highly adaptable to different architectural needs.

To maintain a predictable data flow, the hook returns a `state` as a readonly signal. Regardless of the operating mode, all state updates are performed through the `setState$` state-dispatching `QRL` function. In controlled mode, this function triggers the `onChange$` callback to notify the parent of requested changes, while in uncontrolled mode, it updates the internal state directly and then invokes the callback.

```tsx
import type { Signal, QRL } from '@qwik.dev/core';
import { component$ } from '@qwik.dev/core';
import { useControllable } from '@entry-ui/qwik/use-controllable';

interface CustomInputProps {
  /**
   * The default value of the custom input when initially rendered.
   * Use when you do not need to control its the value.
   */
  defaultValue?: string;

  /**
   * The controlled value of the custom input.
   * Must be used in conjunction with `onValueChange$`.
   */
  value?: Signal<string>;

  /**
   * A `QRL` callback function that is called when the value of the custom input changes.
   */
  onValueChange$?: QRL<(value: string) => void>;
}

const CustomInput = component$<CustomInputProps>((props) => {
  const { defaultValue, value, onValueChange$ } = props;

  const { state, setState$ } = useControllable({
    defaultValue: defaultValue ?? '',
    controlledSignal: value,
    onChange$: onValueChange$,
  });

  return (
    <input
      type="text"
      autocomplete="off"
      value={state.value}
      onInput$={(_, currentTarget) => setState$(currentTarget.value)}
    />
  );
});

const Usage = component$(() => {
  return <CustomInput />;
});
```

## API reference

This section provides a detailed technical overview of the `useControllable` hook, covering its dual-mode configuration properties and the structure of the returned state-management interface.

### Parameters

The `useControllable` hook accepts a single configuration object as its parameter, which defines the state-handling behavior through the following properties:

| Property           | Type                      | Default | Description                                                                                                                                                                                                                        |
| :----------------- | :------------------------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultValue`     | `T`                       | `-`     | The initial value used when the component is in uncontrolled mode. This value is only used to initialize the internal state if `controlledSignal` is not provided.                                                                 |
| `controlledSignal` | `Signal<T>`               | `-`     | An optional external signal for controlled state management. If provided, the hook operates in controlled mode, delegating state authority to the parent. If omitted, the hook operates in uncontrolled mode using internal state. |
| `onChange$`        | `QRL<(value: T) => void>` | `-`     | An optional `QRL` callback invoked whenever the state value changes. In controlled mode, it notifies the parent to update the external signal. In uncontrolled mode, it acts as a listener for internal state changes.             |

### Returns

The `useControllable` hook returns a stable interface object that provides access to the current state and its associated mutation logic:

| Property     | Type                      | Description                                                                                                                                                                                               |
| :----------- | :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`      | `ReadonlySignal<T>`       | A readonly signal representing the current state. Provides the value from the `controlledSignal` in controlled mode, or the internal signal in uncontrolled mode.                                         |
| `setState$`  | `QRL<(value: T) => void>` | A `QRL` function to update the state. In controlled mode, it triggers `onChange$` to request a change from the parent. In uncontrolled mode, it updates the internal signal and then invokes `onChange$`. |
| `controlled` | `boolean`                 | A boolean flag indicating the current management mode. Returns `true` if the state is managed externally via `controlledSignal`, and `false` if managed internally.                                       |
