/**
 * An internal set of stringified boolean and falsy primitive tokens resulting from template literal interpolation.
 *
 * Used by `mergeStyles` utility to identify and ignore invalid CSS property values produced when a conditional
 * short-circuit evaluation fails inside an inline style string
 * (e.g.,  `color: ${isActive && "red"}` resulting in `"color: false"`).
 */
export const FALSY_GUARD_TOKENS = new Set(['false', 'true', 'undefined', 'null']);
