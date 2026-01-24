import type { CSSProperties } from '@qwik.dev/core';

/**
 * Represents the accepted formats for style declarations.
 *
 * This type allows for flexibility in how styles are defined, supporting:
 *
 * - `string`: Standard inline CSS strings (e.g., `"color: red; padding: 10px"`).
 *
 * - `CSSProperties`: A structured object of CSS declarations (e.g., `{ color: "red" }`).
 *
 * - `undefined`: Useful for conditional styling where a style might not be present.
 * Since `boolean` is not accepted, use ternary operators or logical OR
 * to ensure a valid type (e.g., `isActive ? "color: red" : undefined`).
 */
export type PossibleStyle = string | CSSProperties | undefined;
