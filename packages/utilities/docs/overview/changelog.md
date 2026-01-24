# Changelog

Changelogs for each `@entry-ui/utilities` release.

## 0.3.0 (2026-01-25)

### Features

- **Introduce `wait` utility for asynchronous execution delays.**
  A clean, Promise-based approach for pausing asynchronous execution for a specified duration. This utility replaces the need for manual Promise wrappers around `setTimeout`, offering a non-blocking way to manage execution timing, throttle operations, or simulate latency in testing environments with full async/await compatibility.

- **Introduce `addEventListenerOnce` utility for managed one-time events.**
  A specialized helper for registering event listeners that are automatically removed after their first execution. It enforces the `once: true` behavior internally and returns a manual cleanup function, providing a type-safe and reliable way to handle transient interactions across `HTMLElement`, `Document`, and `Window` targets.

- **Introduce `visuallyHiddenStyle` constant for improved accessibility.**
  A specialized CSS-in-JS object designed to hide elements visually while keeping them fully accessible to screen readers. It utilizes a combination of modern clipping techniques and fixed positioning to ensure zero visual presence without affecting the layout, while maintaining full compatibility with frameworks like Qwik, React, and Astro.

- **Introduce `visuallyHiddenInputStyle` constant for custom form elements.**
  A specialized CSS-in-JS object tailored for hiding native form inputs (checkboxes, radio buttons, file inputs) without losing focusability or accessibility. It utilizes absolute positioning to remove the element from the visual flow while preserving its functional presence, enabling the creation of custom-styled form controls across Qwik, React, and Astro.

## 0.2.0 (2026-01-22)

### Features

- **Introduce `mergeStyles` utility for flexible style management.**
  A specialized function designed to merge multiple style sources, including CSS strings and objects, into a single unified object. It automatically handles property normalization (kebab-case to camelCase), manages vendor prefixes, and preserves CSS variables, making it ideal for dynamic styling in JavaScript environments.

- **Introduce `warn` utility for standardized developer logging.**
  A helper function designed to output formatted warning messages to the console. It supports custom prefixes and message segments, ensuring consistency in identifying and filtering non-critical issues or API deprecations across the codebase.

- **Introduce `error` utility for consistent error reporting.**
  Provides a standardized way to log errors to the console with clear origin identification. By utilizing mandatory prefixes and joined message segments, it ensures that critical issues are easily traceable and consistently formatted throughout the application.

- **Introduce `fail` utility for critical exception handling.**
  A terminal function that throws a formatted `Error` with a specific prefix and joined message segments. It is designed to immediately halt execution when unrecoverable conditions are met, ensuring that exceptions carry clear context and origin data.

### Dependencies

- **Remove `style-to-object` dependency.**
  The external dependency has been removed to reduce bundle size and improve maintenance. Its core functionality for style parsing has been integrated directly into the internal logic of the package.

## 0.1.0 (2026-01-15)

### Features

- **Initial release of the `@entry-ui/utilities` package.**
