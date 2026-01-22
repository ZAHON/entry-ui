# Internal

This directory contains a collection of components, hooks, and utilities intended **strictly for internal library usage**.

## Guidelines

- **No public exports:** Items in this directory must not be exported through the main entry points or any public-facing API.
- **Shared logic:** This space is reserved for shared logic that is used across multiple components or hooks to avoid duplication, but isn't part of the library's official feature set.
- **Stability:** Since these are internal, they may undergo breaking changes without the versioning constraints applied to the public API.

## Structure

- `components/`: Foundation components used to build complex public components.
- `hooks/`: Supporting hooks for internal logic and shared behaviors.
- `utilities/`: Low-level helpers.
