# isWebKit

Evaluates whether the runtime environment is driven by the WebKit rendering engine.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/is-webkit)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20isWebKit]%20Issue)

## Import

```ts
import { isWebKit } from '@entry-ui/utilities/is-webkit';
```

## Usage

The `isWebKit` utility provides a reliable feature-detection mechanism to identify WebKit-based browser environments (such as [**Safari**](https://www.apple.com/safari/), [**all iOS browsers**](https://developer.apple.com/documentation/webkit), or [**GNOME Web**](https://apps.gnome.org/Epiphany/)) while excluding Blink-based browsers.

[**Blink**](https://www.chromium.org/blink/) forked from [**WebKit**](https://webkit.org/) in 2013 and only supports the unprefixed `backdrop-filter` property. In contrast, WebKit retains support for the legacy `-webkit-backdrop-filter` vendor prefix. This utility leverages `CSS.supports` to check for `-webkit-backdrop-filter: none`, offering a lightweight and robust engine check.

```ts
import { isWebKit } from '@entry-ui/utilities/is-webkit';

// Check if the current browser engine is WebKit.
if (isWebKit()) {
  // Apply WebKit-specific fixes for Safari, iOS browsers, or GNOME Web.
}
```

## API reference

This section provides a technical overview of the `isWebKit` function, including its parameters and return values.

### Parameters

The `isWebKit` function does not accept any parameters.

### Returns

The `isWebKit` function returns a boolean indicating whether the current environment uses the WebKit engine:

| Type      | Description                                                                                                                                                                                                                                  |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if the runtime environment supports the `-webkit-backdrop-filter` CSS feature, indicating a WebKit browser. Returns `false` in non-WebKit environments (e.g., Blink, Gecko) or SSR runtime contexts where `CSS` is undefined. |
