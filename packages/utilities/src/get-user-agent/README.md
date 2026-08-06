# getUserAgent

Retrieves the normalized user agent string representing the current browser environment.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-user-agent)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getUserAgent]%20Issue)

## Import

```ts
import { getUserAgent } from '@entry-ui/utilities/get-user-agent';
```

## Usage

The `getUserAgent` utility provides a structured way to identify the current browser environment. Modern browsers are shifting away from monolithic `navigator.userAgent` strings in favor of the [**User-Agent Client Hints API**](https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API) (`navigator.userAgentData`), which provides cleaner, structured brand and version information.

This utility prioritizes the modern API by constructing a space-separated brand-version string derived from `navigator.userAgentData.brands` when available. If Client Hints are unsupported, it falls back seamlessly to the traditional `navigator.userAgent` property.

```ts
import { getUserAgent } from '@entry-ui/utilities/get-user-agent';

// Retrieve the user agent string in a browser runtime.
getUserAgent();

// Returns: "Chromium/122 Not(A:Brand/24 Google Chrome/122" (on modern browsers)
// Returns: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)..." (as a legacy fallback)
```

## API reference

This section provides a technical overview of the `getUserAgent` function, including its parameters and return values.

### Parameters

The `getUserAgent` function does not accept any parameters.

### Returns

The `getUserAgent` function returns a string representing the user agent:

| Type     | Description                                                                                                                                                                                                                               |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `string` | A space-separated brand-version string derived from `navigator.userAgentData.brands` if available. Otherwise, it falls back to the legacy `navigator.userAgent` string. Returns an empty string if `brands` exists but contains no items. |
