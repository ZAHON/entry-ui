# Direction

A provider that enables RTL behavior for Entry UI Qwik components.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/components/direction)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20Direction]%20Issue)

## Import

```tsx
import { Direction } from '@entry-ui/qwik/direction';
```

## Anatomy

```tsx
import { component$ } from '@qwik.dev/core';
import { Direction } from '@entry-ui/qwik/direction';

const Anatomy = component$(() => {
  return <Direction.Provider>{/* Your app or a group of components. */}</Direction.Provider>;
});
```

## Usage

To set up reading direction context, use the `<Direction.Provider>` component to wrap your application or a specific section of your component tree. Passing the `direction` prop (either `"ltr"` or `"rtl"`) enables descendant Entry UI Qwik components to adjust their behavior—such as keyboard navigation—based on the active text direction, without modifying HTML or CSS. The `dir="rtl"` HTML attribute or `direction: rtl` CSS style must still be set additionally in your own application code.

Below is a basic example of how to configure a right-to-left (RTL) reading direction context:

```tsx
import { component$ } from '@qwik.dev/core';
import { Direction } from '@entry-ui/qwik/direction';
import { Tabs } from '@entry-ui/qwik/tabs';

const Usage = component$(() => {
  return (
    <div dir="rtl">
      <Direction.Provider direction="rtl">
        <Tabs.Root defaultValue="account">
          <Tabs.List>
            <Tabs.Tab value="account">Account</Tabs.Tab>
            <Tabs.Tab value="documents">Documents</Tabs.Tab>
            <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="account">Account details</Tabs.Panel>
          <Tabs.Panel value="documents">Documents details</Tabs.Panel>
          <Tabs.Panel value="notifications">Notifications details</Tabs.Panel>
          <Tabs.Panel value="settings">Settings details</Tabs.Panel>
        </Tabs.Root>
      </Direction.Provider>
    </div>
  );
});
```

## Rendered elements

Each of `Direction` subcomponents renders a default HTML element that is sensible for its role. This overview outlines the default element rendered by each part of the component.

| Component  | Default rendered element |
| :--------- | :----------------------- |
| `Provider` | `—`                      |

## API Reference

The `Direction` component is built using a provider pattern to manage reading direction context across your application. This section provides a detailed breakdown of the properties available for the provider, as well as the custom hook provided for accessing and reacting to the active text direction.

### Provider

Provides reading direction context for localized applications requiring right-to-left (RTL) support. Wrapping your application ensures that all Entry UI Qwik components adjust their behavior based on the `direction` prop. This only affects component behavior and does not modify HTML or CSS. The `dir="rtl"` HTML attribute or `direction: rtl` CSS style must be set additionally by your own application code. Doesn’t render its own HTML element.

| Prop        | Type                          | Default | Description                                                                                               |
| :---------- | :---------------------------- | :------ | :-------------------------------------------------------------------------------------------------------- |
| `direction` | `"ltr" \| "rtl" \| undefined` | `"ltr"` | The global reading direction of your application. This will be inherited by all Entry UI Qwik components. |

### useDirectionProviderContext

A hook that provides access to the `<Direction.Provider>` component's internal state. It exposes a readonly signal containing the active reading direction, allowing descendant components to adapt their behavior to the active text flow. This hook returns an object containing the following properties:

| Property    | Type                               | Description                                                                                                                                                                                                                                                                               |
| :---------- | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `direction` | `Readonly<Signal<"ltr" \| "rtl">>` | A readonly signal whose value indicates the active reading direction. Its value is `"ltr"` for left-to-right text layout or `"rtl"` for right-to-left layout. If consumed outside of a `<Direction.Provider>` component, it automatically falls back to `"ltr"` as the default direction. |
