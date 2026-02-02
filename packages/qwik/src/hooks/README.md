# Hooks

Hooks are special functions that let you reuse and share stateful logic across your Qwik apps. They're a powerful way to manage complex component behaviors, simplify common patterns, and keep your code tidy. Entry UI Qwik offers essential hooks to make your development smoother and your projects easier to maintain.

## State management

These hooks provide effective solutions for managing your component's internal data. They offer robust and easy-to-use tools to keep your application's state consistent and predictable.

| Hook                                                                                                      | Description                                                                      |
| :-------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| [`useBoolean`](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-boolean)           | A hook that manages a boolean state with common utility methods.                 |
| [`useControllable`](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-controllable) | A hook that manages state in either controlled or uncontrolled mode.             |
| [`useCounter`](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-counter)           | A hook that manages a numeric state with built-in clamping and validation logic. |
| [`useCycle`](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-cycle)               | A hook that manages navigation through a predefined sequence of options.         |

## Lifecycle

These hooks help you bridge the gap between server and browser by providing reliable ways to handle component events. They ensure your setup and teardown logic remain consistent throughout the entire component lifecycle.

| Hook                                                                                                | Description                                                                                |
| :-------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| [`useLifecycle`](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/hooks/use-lifecycle) | A hook that manages component lifecycle events with reliable server-to-browser continuity. |
