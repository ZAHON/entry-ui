# isShallowSubset

Verifies if a source object's properties strictly match a target object.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/utilities/src/is-shallow-subset)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Utilities%20isShallowSubset]%20Issue)

## Import

```ts
import { isShallowSubset } from '@entry-ui/utilities/is-shallow-subset';
```

## Usage

The `isShallowSubset` utility performs a partial shallow equality check. Unlike a full deep equality comparison, it iterates exclusively over the keys defined in the `source` object to verify their presence and value integrity within the `target`.

This is particularly useful for performance-optimized updates, state change detection, or validating configuration subsets where the `target` might contain additional properties that should be ignored by the logic.

```ts
import { isShallowSubset } from '@entry-ui/utilities/is-shallow-subset';

// Target contains all key-value pairs defined in source.
isShallowSubset({ source: { id: 1 }, target: { id: 1, name: 'John' } });
// Returns: true

// Target is missing a required property or value does not match.
isShallowSubset({ source: { id: 1, type: 'admin' }, target: { id: 1 } });
// Returns: false
```

## API reference

This section provides a detailed technical overview of the `isShallowSubset` utility, its configuration properties, and its return values.

### Parameters

The `isShallowSubset` function accepts a single configuration object as its parameter to define the source and target objects for comparison, where all properties are required and marked with an asterisk (`*`):

| Property  | Type                      | Default | Description                                                                                                                                                                                                                                                             |
| :-------- | :------------------------ | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source*` | `Record<string, unknown>` | `—`     | The reference object containing the key-value pairs that must be matched. The utility iterates only over the keys defined in this object to determine if the target satisfies the subset criteria.                                                                      |
| `target*` | `Record<string, unknown>` | `—`     | The target object to be inspected against the source. For a successful match, this object must contain all keys present in the source with strictly equal values (`===`). Any additional properties present in the target that are missing from the source are ignored. |

### Returns

The `isShallowSubset` function returns a boolean based on the comparison result:

| Type      | Description                                                                                                                                                                      |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `boolean` | Returns `true` if every key in the `source` object exists in the `target` and their values are strictly equal (`===`). Returns `false` if any value differs or a key is missing. |
