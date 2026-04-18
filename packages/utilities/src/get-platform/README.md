# getPlatform

Identifies the operating system platform on which the current browser is running.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-platform)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getPlatform]%20Issue)

## Import

```ts
import { getPlatform } from '@entry-ui/utilities/get-platform';
```

## Usage

The `getPlatform` utility provides a reliable way to detect the user's operating system. Modern browsers are moving away from `navigator.platform` (which is now deprecated) in favor of the more secure **User-Agent Client Hints API** (`navigator.userAgentData`).

This utility prioritizes the modern API while providing a seamless fallback to legacy properties. This is particularly useful for applying platform-specific logic, such as adjusting keyboard shortcuts (e.g., <kbd>Cmd</kbd> vs <kbd>Ctrl</kbd>) or fine-tuning UI components for different operating systems.

```ts
import { getPlatform } from '@entry-ui/utilities/get-platform';

getPlatform();
// Returns: "macOS", "Windows", or "Linux" (on modern browsers)
// Returns: "Win32" or "MacIntel" (as a legacy fallback)
```

## API reference

This section provides a technical overview of the `getPlatform` function and its detection priority.

### Parameters

The `getPlatform` function does not accept any parameters.

### Returns

The `getPlatform` function returns a string representing the platform:

| Type     | Description                                                                                                                                                                                             |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `string` | The platform name retrieved from `navigator.userAgentData.platform` if available. Otherwise, it falls back to the legacy `navigator.platform` string. Returns an empty string if neither is accessible. |
