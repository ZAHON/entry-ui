# Changelog

Changelogs for each `@entry-ui/qwik` release.

## 0.10.0 (2026-06-09)

### Features

- **Introduce `Dialog` component for accessible, modular modal overlays.**
  A robust popup component that opens on top of the entire page, strictly adhering to the WAI-ARIA Dialog (Modal) design pattern to ensure full accessibility for keyboard and screen reader users. Built with a flexible compound component architecture (`Root`, `Trigger`, `Popup`, `Title`, `Description`, `Close`), it utilizes the native HTML `<dialog>` element and the browser's native Dialog API under the hood for reliable layout synchronization and focus management. The component supports both uncontrolled internal state and controlled operation via an `open` signal paired with an `onOpenChange$` callback. It features automatic focus trapping, body scroll locking with layout shift compensation via the `preventScroll` prop, and conditional dismissal handling through `closeOnEscapeKeyDown` and `closeOnClickOutside` options. Additionally, it exposes a reactive `data-state` attribute (`"open"` or `"closed"`) to enable fluid, interruptible CSS transitions or keyframe animations, offers an `onOpenChangeComplete$` callback for lifecycle settling, and provides deep state access through custom context hooks (`useDialogRootContext`, `useDialogTriggerContext`, and `useDialogCloseContext`).

- **Introduce `useScrollLock` hook for managing background scroll locking.**
  A robust hook that provides a reactive interface for managing document scrolling within Qwik components, essential for maintaining focus and preventing background movement when overlays, modals, or drawers are active. It automatically compensates for scrollbar width to prevent horizontal layout shifts by setting a `--scrollbar-width` CSS variable on the `<html>` element and marks the `<body>` element with a `data-scroll-lock` attribute for layout synchronization. The hook implements specialized fixed positioning strategies for mobile environments (like iOS Safari) where standard overflow rules may be ignored, meticulously restoring the scroll position upon release. Built with SSR-safety in mind, it includes environment checks to ensure DOM-dependent operations are only triggered in the browser, and supports an optional `resolveDocument$` QRL parameter to target specific document contexts such as iframes or popups.

### Dependencies

- **Update `@entry-ui/utilities` to version `0.9.0`.**

## 0.9.0 (2026-03-18)

### Features

- **Introduce `Tabs` component for organized, layered content interfaces.**
  A modular set of components used to organize content into layered sections, where only one panel is visible at a time. It strictly follows the WAI-ARIA Tabs design pattern, ensuring full accessibility for keyboard and screen reader users. Built with a compound component architecture (`Root`, `List`, `Tab`, `Panel`), it supports both uncontrolled (via `defaultValue`) and controlled (via `value` and `onValueChange$`) state management. The component features customizable orientations (`"horizontal"` or `"vertical"`), adjustable `activationMode` (`"automatic"` or `"manual"`), and built-in support for RTL layouts. It also includes performance and UX optimizations, such as the `containsFocusableContent` prop to refine tab order, and exposes internal state through dedicated hooks like `useTabsRootContext`, `useTabsTabContext`, and `useTabsPanelContext`.

- **Introduce `RovingFocusGroup` component for advanced focus management.**
  A utility component that implements the roving tabindex method to manage focus between items within a group, strictly adhering to the WAI-ARIA "Keyboard Navigation Inside Components" pattern. Built with a modular compound component architecture (`Root`, `Item`), it supports both controlled and uncontrolled focus states, allowing for seamless integration with external signals or internal management. The component features customizable navigation orientations (`"horizontal"`, `"vertical"`, or `"both"`), support for RTL layouts, and optional focus looping to enhance the keyboard experience. It provides granular control through a `focusable` prop to skip specific items and exposes internal state via `useRovingFocusGroupRootContext` and `useRovingFocusGroupItemContext` hooks, while utilizing data attributes for state-aware styling.

### Dependencies

- **Update `@entry-ui/utilities` to version `0.8.0`.**

## 0.8.0 (2026-02-19)

### Features

- **Introduce `CopyButton` component for streamlined text transfers.**
  A specialized component designed for transferring text to the system clipboard, strictly adhering to the WAI-ARIA Button design pattern. Built with a modular compound component architecture (`Root`, `Indicator`), it supports both controlled and uncontrolled text states and features a built-in auto-reset mechanism for visual feedback. The component provides granular status monitoring through an `onStatusChange$` callback, handles keyboard interactions (<kbd>Space</kbd>, <kbd>Enter</kbd>), and utilizes data attributes for flexible, state-aware styling of indicators and triggers.

- **Introduce `useClipboard` hook for seamless system clipboard interaction.**
  A robust hook that provides a declarative interface for the asynchronous Clipboard API within Qwik components. It ensures a predictable, unidirectional data flow by exposing the operation's state through `copied` and `error` readonly signals. Features include a built-in auto-reset mechanism via `timeoutMs`, an `onStatusChange$` callback for global state monitoring, and development-time guardrails to prevent server-side execution, ensuring the hook is only invoked in response to browser-native user gestures.

### Dependencies

- **Update `@entry-ui/utilities` to version `0.7.0`.**

## 0.7.0 (2026-02-16)

### Features

- **Introduce `Accordion` component for semantic, multi-section disclosures.**
  A robust implementation of the WAI-ARIA Accordion pattern that manages groups of collapsible panels. Built with a flexible compound component architecture, it enables seamless switching between single and multiple expansion modes. The component provides built-in accessibility through managed keyboard interactions (arrow key navigation with focus wrap) and enhances user experience with automatic height interpolation via CSS variables. It also leverages modern browser capabilities with `hiddenUntilFound` support for searchable collapsed content and offers full rendering flexibility through the polymorphic `as` prop.

- **Support `disabled` state in `Collapsible.Panel` component `hiddenUntilFound` logic.**
  The `Collapsible.Panel` component now correctly overrides the `until-found` behavior when the component is disabled. In this state, the panel uses a standard `hidden` attribute, preventing the browser from revealing non-interactive content during searches.

- **Enhance `Collapsible.Panel` component accessibility with semantic roles.**
  The panel now automatically receives a `role="group"` when associated with a trigger. This improves the experience for screen reader users by providing a clearer structural context for the collapsible content.

- **Make `onBeforematch$` preventable in `Collapsible.Panel` component.**
  Integrated the `makeEventPreventable` utility into `onBeforematch$` handlers. This allows developers to call `preventEntryUIQwikHandler()` to intercept and conditionally cancel the default search-and-reveal behavior (automatic opening and scrolling) without affecting native event propagation.

### Refactors

- **Improve `Collapsible.Panel` component search-and-reveal stability.**
  Optimized the `hiddenUntilFound` logic to ensure a seamless "Find-in-page" experience, specifically for Chromium-based browsers.

### Dependencies

- **Update `@entry-ui/utilities` to version `0.6.0`.**

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
