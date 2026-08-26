// Re-export public animation frame creation utilities from the shared internal module.
// The core implementation resides in `_internal/` because `createAnimationFrame` shares
// internal batch scheduler state with `resetAnimationFrameScheduler`.

export type { CreateAnimationFrameReturnValue } from '../_internal/animation-frame';
export { createAnimationFrame } from '../_internal/animation-frame';
