# Changelog

Changelogs for each `@entry-ui/qwik` release.

## 0.6.0 (2026-02-05)

### Features

- **Introduce `Collapsible` component for expandable panels.**
  A modular disclosure component controlled by a trigger button, built following the WAI-ARIA Disclosure pattern. It supports both controlled and uncontrolled states, full keyboard navigation, and nested structures for multi-level disclosures. Features include automatic height calculation via CSS variables for smooth animations, and a `hiddenUntilFound` mode that allows browser-native searching within collapsed content.

- **Introduce `useLifecycle` hook for robust component lifecycle management.**
  A performance-optimized hook that ensures reliable execution of mount and unmount logic across the server-to-browser boundary. It solves the "lost cleanup" problem in resumable applications by using a global `MutationObserver` to track element presence without requiring eager JavaScript execution. This allows for dependable teardown logic in server-rendered components while maintaining low Total Blocking Time (TBT).

- **Introduce `useCounter` hook for managed numeric state.**
  A specialized hook for handling numeric values with built-in boundary control and validation. It provides a readonly state accessible only through validated methods, ensuring the count remains a finite number within specified minimum and maximum limits. Ideal for building quantity selectors, pagination, and other UI elements requiring strict numerical constraints.

- **Introduce `SignalOrReadonlySignal` type for flexible signal handling.**
  A utility type that facilitates the development of components and hooks by accepting both mutable `Signal` and `ReadonlySignal` types. It simplifies prop definitions and internal logic when a component only needs to read a value, regardless of whether it originates from a standard signal or a computed one.

### Dependencies

- **Update `@entry-ui/utilities` to version `0.5.0`.**

## 0.5.0 (2026-01-28)

### Features

- **Introduce `Toggle` component for two-state interactive buttons.**
  A two-state button that allows users to switch between on and off states. It supports both controlled and uncontrolled modes, provides full keyboard navigation, and adheres to WAI-ARIA button patterns. Includes data attributes for state-based styling and a dedicated hook for accessing internal state.

- **Introduce `makeEventPreventable` utility for granular event control.**
  A utility that augments standard DOM events with the ability to prevent internal library handlers. It allows developers to intercept events and conditionally skip default component behaviors or state updates without stopping native event propagation.

- **Introduce `EntryUIQwikEvent` type for augmented event handling.**
  A specialized type that extends standard DOM events with custom prevention logic. It provides the `preventEntryUIQwikHandler` method and the `entryUIQwikHandlerPrevented` flag, enabling type-safe management of internal component logic within the Entry UI Qwik ecosystem.

- **Introduce `EntryUIQwikEventState` type for internal event state checking.**
  A specialized version of the event object that includes only the prevention state flag. It is designed for use in internal handlers to determine if a preceding handler in the execution chain has requested to skip default logic.

### Dependencies

- **Update `@entry-ui/utilities` to version `0.3.0`.**

## 0.4.0 (2026-01-23)

### Features

- **Introduce `useControllable` hook for hybrid state management.**
  Provides a flexible way to manage component state in either controlled or uncontrolled mode. It allows components to work out-of-the-box with internal state while remaining fully synchronizable with external values when needed.

- **Introduce `useBoolean` hook for simplified boolean state management.**
  A utility hook designed to handle common UI patterns like toggles, modals, and visibility states. It provides a set of intuitive methods to explicitly set or toggle the state, ensuring a clear and predictable way to manage logical flags.

- **Introduce `useCycle` hook for navigating through a sequence of options.**
  Provides a robust way to cycle through a predefined set of values. It is ideal for building components like carousels, multi-step forms, or theme switchers, supporting both linear and looping navigation.

- **Introduce `mergeRefs` utility for consolidating multiple references.**
  A helper function that allows assigning a single DOM element to multiple reference sources. It is essential for creating flexible components that need to maintain internal references while still exposing the underlying element to parent components.

- **Introduce `mergeStyles` utility for unified style management.**
  A powerful utility that combines different style formats—such as CSS strings, objects, and props—into a single, normalized style object. It follows the CSS cascade principle, ensuring that styles are applied correctly and consistently across different platforms.

### Dependencies

- **Update `@entry-ui/utilities` to version `0.2.0`.**

## 0.3.0 (2026-01-17)

### Features

- **Introduce `Alert` component for important feedback messages.**
  A new accessible component following the WAI-ARIA alert pattern. It supports polymorphic rendering via the `as` prop, allows for flexible composition with icons and titles, and ensures automatic announcements by screen readers.

## 0.2.0 (2026-01-17)

### Features

- **Introduce `Separator` component for visual and semantic content separation.**
  Adds support for both `horizontal` and `vertical` orientations, adheres to accessibility standards, and offers full styling customization. Includes a `decorative` prop to properly handle screen reader visibility.

## 0.1.0 (2026-01-14)

### Features

- **Initial release of the `@entry-ui/qwik` package.**
