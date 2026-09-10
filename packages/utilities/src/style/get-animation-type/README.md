# getAnimationType

Resolves the active type of CSS animation or transition currently applied to a DOM element.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/get-animation-type)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20getAnimationType]%20Issue)

## Import

```ts
import { getAnimationType } from '@entry-ui/utilities/get-animation-type';
```

## Usage

The `getAnimationType` utility inspects an element's computed styles for `animation-name`, `animation-duration`, and `transition-duration` to categorize its motion state.

It safely handles multi-valued property strings and zero-duration rules using performance-optimized loops to ensure accurate motion detection, returning one of four states: `"both"`, `"css-animation"`, `"css-transition"`, or `"none"`. Additionally, it allows bypassing the animation-name check via `ignoreAnimationName` when keyframe names are suppressed or managed externally during lifecycle transitions.

```ts
import { getAnimationType } from '@entry-ui/utilities/get-animation-type';

const element = document.querySelector('#my-element');

// Determine the active motion or transition type applied to the element.
if (element) {
  const animationType = getAnimationType({ element });
}
```

## API reference

This section provides a technical overview of the `getAnimationType` function, its configuration properties, and its return type.

### Parameters

The `getAnimationType` function accepts a single configuration object as its parameter to define the target element and its evaluation options, where required properties are marked with an asterisk (`*`):

| Property              | Type                   | Default | Description                                                                                                                                                                                                                                                                                                              |
| :-------------------- | :--------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `element*`            | `Element`              | `—`     | The target DOM element whose active motion or transition type you want to resolve. Serves as the source for extracting `animation-name`, `animation-duration`, and `transition-duration` properties.                                                                                                                     |
| `ignoreAnimationName` | `boolean \| undefined` | `false` | Determines whether to bypass validation of the computed `animation-name` property. When set to `true`, keyframe motion detection relies solely on non-zero `animation-duration` rules, accommodating scenarios where keyframe identifiers are temporarily suppressed or managed externally during lifecycle transitions. |

### Returns

The `getAnimationType` function returns a string representing the classified motion state:

| Type                                                       | Description                                                                                                            |
| :--------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| ` "both" \| "css-animation" \| "css-transition" \| "none"` | The classified motion state indicating whether keyframe animations, property transitions, both, or neither are active. |
