import type { QwikIntrinsicElements } from '@qwik.dev/core';

/**
 * Represents any valid native HTML or SVG element tag name supported by Qwik.
 *
 * This type is useful for polymorphic components, dynamic element rendering, or props
 * that need to restrict inputs specifically to built-in DOM tags rather than custom Qwik components.
 * It supports:
 *
 * - Standard HTML element tags (e.g., `"div"`, `"button"`, `"input"`).
 * - SVG element tags (e.g., `"svg"`, `"path"`, `"g"`).
 */
export type IntrinsicTagName = keyof QwikIntrinsicElements;
