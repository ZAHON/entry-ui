# isIos

Verifies whether the current device is running on the iOS or iPadOS platform.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/is-ios)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20isIos]%20Issue)

## Import

```ts
import { isIos } from '@entry-ui/utilities/is-ios';
```

## Usage

The `isIos` utility provides a reliable way to detect iPhone, iPad, and iPod devices. Beyond simple platform matching, it specifically addresses the behavior of modern iPadOS versions (13+), where iPads report as a `MacIntel` platform to request desktop-class layout rendering.

By inspecting normalized platform strings alongside touchscreen capability detection (`navigator.maxTouchPoints > 1`), this utility accurately disambiguates iPadOS from traditional macOS environments. This ensures precise identification for touch-specific optimizations and iOS-specific UI behavior adjustments.

```ts
import { isIos } from '@entry-ui/utilities/is-ios';

// Check if the current execution environment is an iOS/iPadOS device.
isIos();

// Returns: true (when running on an iPhone, iPad, or iPadOS in desktop mode)
// Returns: false (when running on Android, macOS, Windows, or Linux)
```

## API reference

This section provides a technical overview of the `isIos` function and its detection logic.

### Parameters

The `isIos` function does not accept any parameters.

### Returns

The `isIos` function returns a boolean based on the device detection:

| Type      | Description                                                                                                                                                                                                        |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if the device is identified as an iPhone, iPad, iPod, or a touch-enabled Macintosh (`MacIntel` iPadOS). Returns `false` for Android, standard macOS, Windows, Linux, or other non-iOS environments. |
