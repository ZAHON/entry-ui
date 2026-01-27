# makeEventPreventable

Augments a standard event with internal handler prevention capabilities.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/utilities/make-event-preventable)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20makeEventPreventable]%20Issue)

## Import

```tsx
import { makeEventPreventable } from '@entry-ui/qwik/make-event-preventable';
```

## Usage

Use `makeEventPreventable` when you need to intercept an event and conditionally prevent the internal Entry UI Qwik default behavior or state updates without stopping native DOM event propagation. This is particularly useful in complex components where a consumer might want to handle an event manually (e.g., based on custom business logic) and skip the library's internal response.

When `preventEntryUIQwikHandler()` is called:

- An internal flag `entryUIQwikHandlerPrevented` is set to `true`.

- Subsequent handlers in the Qwik event chain check this flag to decide whether to skip their execution.

```tsx
import { component$, $ } from '@qwik.dev/core';
import { makeEventPreventable } from '@entry-ui/qwik/make-event-preventable';
import { Toggle } from '@entry-ui/qwik/toggle';

const Usage = component$(() => {
  const handleClick$ = $((event: PointerEvent) => {
    const entryUIQwikEvent = makeEventPreventable(event);

    entryUIQwikEvent.preventEntryUIQwikHandler();
  });

  return <Toggle.Root onClick$={handleClick$}>Toggle</Toggle.Root>;
});
```

## API reference

The `makeEventPreventable` utility provides a type-safe way to add granular control to standard DOM events within the Entry UI Qwik ecosystem.

### Parameters

The `makeEventPreventable` function accepts a single required parameter (marked with an asterisk `*`) containing the standard DOM event to be augmented. This event is transformed into an `EntryUIQwikEvent`, allowing you to attach a prevention flag that can be checked by subsequent internal handlers in the Entry UI Qwik event chain.

| Parameter | Type | Default | Description                                                                                                 |
| :-------- | :--- | :------ | :---------------------------------------------------------------------------------------------------------- |
| `event*`  | `EV` | `-`     | The original DOM event (e.g., `PointerEvent`, `InputEvent`) to be augmented with internal prevention logic. |

### Returns

The `makeEventPreventable` function returns the same event object, now typed as `EntryUIQwikEvent<EV>`, which includes the prevention API.

| Type                   | Description                                                                                                                                                                     |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `EntryUIQwikEvent<EV>` | The original event object augmented with the `preventEntryUIQwikHandler` method and a read-only `entryUIQwikHandlerPrevented` flag, used to control internal component behavior |
