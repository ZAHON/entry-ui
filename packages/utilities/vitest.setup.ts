import { beforeEach } from 'vitest';
import { resetAnimationFrameScheduler } from './src/scheduling/reset-animation-frame-scheduler';

beforeEach(() => {
  // Reset the shared global animation frame scheduler to drop pending callbacks
  // and prevent cross-test state pollution or unexpected execution against stale context.
  resetAnimationFrameScheduler();
});
