// Re-export the scheduler reset test utility from the shared internal module.
// The implementation resides in `_internal/` to access and manipulate the process-global
// batch scheduler instance shared with `createAnimationFrame`.

export { resetAnimationFrameScheduler } from '../_internal/animation-frame';
