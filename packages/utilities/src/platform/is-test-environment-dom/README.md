# isTestEnvironmentDOM

Determines whether the current environment is a simulated test DOM (e.g., JSDOM or Happy DOM).

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/is-test-environment-dom)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20isTestEnvironmentDOM]%20Issue)

## Import

```ts
import { isTestEnvironmentDOM } from '@entry-ui/utilities/is-test-environment-dom';
```

## Usage

The `isTestEnvironmentDOM` utility checks whether the current execution environment is running inside a simulated or headless DOM implementation, such as [**JSDOM**](https://github.com/jsdom/jsdom) or [**Happy DOM**](https://github.com/capricorn86/happy-dom).

It inspects the user agent string to identify virtual browser signatures. This is particularly useful for skipping browser-only side effects, bypassing unsupported Web APIs, or adjusting behavior during automated unit testing in environments like [**Jest**](https://jestjs.io/) or [**Vitest**](https://vitest.dev/).

```ts
import { isTestEnvironmentDOM } from '@entry-ui/utilities/is-test-environment-dom';

// Check if the current execution runtime is a simulated test DOM.
isTestEnvironmentDOM();

// Returns: true (when running inside JSDOM or Happy DOM)
// Returns: false (when running in a real browser)
```

## API reference

This section provides a technical overview of the `isTestEnvironmentDOM` function, including its parameters and return values.

### Parameters

The `isTestEnvironmentDOM` function does not accept any parameters.

### Returns

The `isTestEnvironmentDOM` function returns a boolean value:

| Type      | Description                                                                                        |
| :-------- | :------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if simulated test DOM signatures are detected in the user agent, otherwise `false`. |
