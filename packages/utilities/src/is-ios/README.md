# isIos

Verifies whether the current device is running on the iOS or iPadOS platform.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/is-ios)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20isIos]%20Issue)

## Import

```ts
import { isIos } from '@entry-ui/utilities/is-ios';
```

## Usage

The `isIos` utility provides a reliable way to detect iPhone and iPad devices. Beyond simple string matching, it specifically addresses the behavior of modern iPadOS versions (13+), where iPads often identify as a "Macintosh" to request desktop-class websites.

By combining platform string validation with touch point capability detection (`maxTouchPoints`), this utility ensures accurate identification even when the browser attempts to mimic a desktop environment. This is essential for applying touch-specific optimizations or handling iOS-specific UI quirks.

```ts
import { isIos } from '@entry-ui/utilities/is-ios';

if (isIos()) {
  console.log('User is on an iOS/iPadOS device');
}
```

## API reference

This section provides a technical overview of the `isIos` function and its detection logic.

### Parameters

The `isIos` function does not accept any parameters.

### Returns

The `isIos` function returns a boolean based on the device detection:

| Type      | Description                                                                                                                                                                         |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if the device is identified as an iPhone, iPad, or a touch-enabled Macintosh (iPadOS). Returns `false` for Android, standard Desktop, or other non-iOS environments. |
