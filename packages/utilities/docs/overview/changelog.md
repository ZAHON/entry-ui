# Changelog

Changelogs for each `@entry-ui/utilities` release.

## 0.10.0 (2026-07-04)

### Breaking changes

- **Remove `isValidNumber` utility in favor of native solutions.**
  The `isValidNumber` utility has been completely removed from the package. If your project relies on this function to filter out `NaN` or `Infinity` values, you should migrate to using the native JavaScript `Number.isFinite()` method directly at the call site.

### Features

- **Introduce `isNumber` utility for reliable number type guarding.**
  A robust TypeScript type guard designed to verify if a value is a valid primitive number. Unlike the native `typeof` operator, which erroneously classifies `NaN` as a number, this utility explicitly filters out `NaN` values to ensure numeric integrity. It provides a clean, safe interface for narrowing types, making it ideal for preventing unexpected runtime errors during mathematical calculations or data parsing operations.

## 0.9.0 (2026-04-19)

### Features

- **Introduce `getPlatform` utility for reliable OS detection.**
  A robust environment detection helper that identifies the user's operating system with a focus on modern standards. It prioritizes the User-Agent Client Hints API (`navigator.userAgentData`) to ensure future-proof compatibility and privacy compliance, while providing a seamless fallback to legacy properties for older browsers. This utility is essential for implementing platform-specific logic, such as dynamic keyboard shortcut hints or OS-aware UI adjustments, through a unified and safe interface.

- **Introduce `isIos` utility for specialized Apple device detection.**
  A specialized detection helper that accurately identifies iPhone and iPad devices. It features advanced logic to handle modern iPadOS versions that default to desktop-class reporting, using hardware capability verification (`maxTouchPoints`) to distinguish touch-enabled iPads from standard macOS environments. This utility is essential for applying device-specific UI fixes, optimizing touch interactions, and ensuring consistent behavior across the Apple mobile ecosystem.

- **Introduce `hasStableScrollbarGutter` utility for layout shift prevention.**
  A specialized helper that detects if an element has a stable scrollbar gutter configured via CSS. It inspects computed styles to identify the `scrollbar-gutter: stable` property, including multi-value variants like `stable both-edges`. This utility is crucial for maintaining visual alignment in complex layouts, allowing components to adapt to reserved scrollbar spaces and preventing jarring "layout jumps" when content height changes dynamically.

- **Introduce `isShallowSubset` utility for optimized partial comparisons.**
  A performance-oriented helper that determines if a target object contains all key-value pairs from a source object. Unlike standard equality checks, it focuses exclusively on the subset of properties defined in the source, ignoring any extra data in the target. This utility is particularly useful for state change detection, configuration validation, and implementing granular updates in complex data structures without the performance cost of deep recursive comparisons.

- **Introduce `setStyle` utility for managed inline styling.**
  A robust helper for applying temporary inline styles with a built-in state restoration mechanism. It returns a cleanup function that reverts the element to its original style state, ensuring predictable DOM behavior during animations, modal interactions, or drag-and-drop operations. The utility optimizes performance by preventing redundant mutations and maintains a clean DOM by automatically stripping empty `style` attributes upon restoration.

- **Introduce `setStyleProperty` utility for granular style control.**
  A lightweight helper designed to safely apply individual CSS properties or custom variables with built-in restoration support. It returns a cleanup function that reverts the specific property to its previous state, preventing unwanted side effects on other inline styles. The utility optimizes performance by avoiding unnecessary DOM updates and maintains HTML cleanliness by automatically stripping empty `style` attributes upon cleanup, making it ideal for managing dynamic theme variables or transient visual states.

- **Introduce `preventBodyScroll` utility for advanced scroll management.**
  A high-level utility designed to lock background scrolling while preventing layout instability. Unlike standard approaches, it calculates scrollbar dimensions to eliminate "layout jumps" and includes a specialized `position: fixed` strategy for iOS Safari to ensure consistent behavior across mobile devices. It features intelligent state tracking via `data-scroll-lock`, supports `scrollbar-gutter: stable` awareness, and provides a global `--scrollbar-width` CSS variable for fine-tuning fixed UI components during the locked state.

## 0.8.0 (2026-03-11)

### Breaking changes

- **Refactor `clamp` utility to remove internal validation and dependencies.**
  The `clamp` utility has been streamlined by removing manual runtime checks and its dependencies on `isValidNumber` and `fail`. This change optimizes execution performance and reduces the package's internal dependency graph. As a result, the function no longer throws errors for non-finite numbers or invalid ranges (where `min > max`); it now operates as a high-performance, pure mathematical wrapper. Consumers are now responsible for ensuring input validity at the call site or through higher-level schema validation.

### Features

- **Introduce `getDocument` utility for context-aware DOM operations.**
  A reliable helper that retrieves the correct `ownerDocument` for a given DOM node. This utility is critical for applications using `iframes` or multiple windows, as it ensures that document-level APIs (like `createElement` or `getElementById`) are accessed from the node's actual execution context rather than the global document. It includes a safe fallback that defaults to the standard `document` object if the provided node is `null` or invalid.

- **Introduce `getActiveElement` utility for deep shadow DOM focus tracking.**
  A specialized helper designed to pinpoint the actual focused element across Shadow DOM boundaries. Unlike the native `activeElement` API, which stops at the shadow host, this utility recursively traverses through nested shadow roots to return the true focus target. This is essential for building accessible focus management systems and handling keyboard interactions in modern, component-based architectures.

- **Introduce `isSelectableInput` utility for safe text selection guarding.**
  A specialized TypeScript type guard that identifies whether an HTML element is an input that supports the native `.select()` method. It ensures type safety by narrowing the element type to `HTMLInputElement`, preventing runtime errors when programmatically highlighting text in search bars, forms, or editable fields.

- **Introduce `wrapArray` utility for circular array rearrangement.**
  A specialized helper that reorders an array based on a new starting index. It performs a "circular shift," moving elements before the index to the end of the collection while maintaining their relative order. This is a pure, immutable function ideal for implementing infinite carousels, cyclic navigation, or any UI component requiring wrap-around behavior.

- **Introduce `focusElement` utility for enhanced focus management.**
  A robust wrapper for the native focus API that provides granular control over focus behavior. It supports advanced configuration options including `preventScroll`, `focusVisible` for consistent focus ring styling, and an integrated `select` flag for automatic text selection in compatible inputs. This utility simplifies focus orchestration in accessible UI components and complex interaction flows.

- **Introduce `focusFirstElement` utility for sequential focus attempts.**
  A specialized helper for managing focus in dynamic UIs where the intended target might be missing or disabled. It iterates through an ordered list of candidate elements and applies focus (with optional selection and scroll prevention) to the first available one. This ensures reliable focus management for accessible components like modals, drawers, and multi-step forms.

## 0.7.0 (2026-02-19)

### Features

- **Introduce `copyToClipboard` utility for asynchronous clipboard management.**
  A robust, Promise-based wrapper for the modern Clipboard API that simplifies transferring text to the system clipboard. It abstracts the complexity of `navigator.clipboard.writeText` into a structured interface, featuring dedicated `onSuccess` and `onError` callbacks for easy UI feedback integration. The utility includes built-in error classification to distinguish between browser support limitations and runtime permission rejections, ensuring a reliable and type-safe experience across different environments.

## 0.6.0 (2026-02-13)

### Features

- **Introduce `scrollIntoViewIfNeeded` utility for smart element visibility.**
  A "smart-scroll" wrapper that ensures an element is visible in the viewport only when necessary. It prioritizes the Chromium/WebKit-specific `scrollIntoViewIfNeeded` method to prevent jarring layout jumps if the element is already visible, while providing a seamless fallback to the standard `scrollIntoView` API for browsers like Firefox. Key features include configurable centering logic and a focus on non-disruptive user experience during automated focus management.

## 0.5.0 (2026-01-31)

### Features

- **Introduce `hasWindow` utility for environment detection.**
  A reliable check to determine if the code is executing in a browser environment. It prevents "window is not defined" reference errors during Server-Side Rendering (SSR) in frameworks like Next.js or Astro by safely verifying the presence of the global `window` object before accessing browser-only APIs.

- **Introduce `getWindow` utility for cross-context window retrieval.**
  A specialized helper that identifies the correct global `window` object for a given DOM node. This ensures that window-level APIs are accessed from the correct execution context, which is essential when working with elements residing in `iframes` or multiple browser windows.

- **Introduce `isHTMLElement` utility for cross-realm type guarding.**
  A robust TypeScript type guard that verifies if a value is an instance of `HTMLElement`. Unlike standard checks, it is "cross-realm safe," accurately identifying elements even when they originate from different window contexts (like iframes) where standard constructors may differ.

- **Introduce `getComputedStyle` utility for context-aware style retrieval.**
  A reliable wrapper around the native browser API that ensures style properties are retrieved from the element's actual execution context. It automatically resolves the correct owner window, guaranteeing accurate `CSSStyleDeclaration` results for elements across various DOM environments.

- **Introduce `getCssDimensions` utility for accurate layout measurement.**
  A hybrid measurement tool that calculates an element's physical dimensions by reconciling computed CSS values with actual layout geometry. It addresses inconsistencies in testing environments (like JSDOM) and provides a "source of truth" for sizing, even for complex elements like SVGs.

- **Introduce `getHiddenElementHeight` utility for measuring intrinsic dimensions.**
  A specialized utility designed to measure the natural height of hidden elements (e.g., `display: none`) without disrupting the user experience. By using a temporary, off-screen cloning strategy, it enables precise animations for components like accordions or collapsibles.

## 0.4.0 (2026-01-28)

### Features

- **Introduce `isValidNumber` utility for robust numeric validation.**
  A TypeScript type guard designed to verify if a value is a valid, finite number. Unlike the native `typeof` operator, this utility explicitly excludes `NaN` and `Infinity`, providing a reliable way to ensure numeric integrity during mathematical operations or API data processing by narrowing the type to a usable, finite state.

- **Introduce `clamp` utility for numerical range restriction.**
  A specialized function that restricts a number to remain within a specified minimum and maximum boundary. It provides strict validation, throwing errors if parameters are non-finite or if the minimum boundary exceeds the maximum, making it ideal for maintaining state integrity in UI components like sliders, progress bars, or scroll controllers.

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
