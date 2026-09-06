import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createAnimationFrame } from '../create-animation-frame';
import { resetAnimationFrameScheduler } from '.';

describe('resetAnimationFrameScheduler', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    resetAnimationFrameScheduler();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not throw when called with no pending callbacks', () => {
    expect(() => resetAnimationFrameScheduler()).not.toThrow();
  });

  it('should not throw when called multiple times in a row', () => {
    expect(() => {
      resetAnimationFrameScheduler();
      resetAnimationFrameScheduler();
      resetAnimationFrameScheduler();
    }).not.toThrow();
  });

  it('should prevent a callback scheduled before the reset from running once its frame fires', () => {
    const animationFrame = createAnimationFrame();
    const callback = vi.fn();

    animationFrame.request(callback);
    resetAnimationFrameScheduler();

    vi.advanceTimersToNextFrame();

    expect(callback).not.toHaveBeenCalled();
  });

  it('should allow a callback scheduled after the reset to run normally', () => {
    resetAnimationFrameScheduler();

    const animationFrame = createAnimationFrame();
    const callback = vi.fn();

    animationFrame.request(callback);

    vi.advanceTimersToNextFrame();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should isolate callbacks scheduled on either side of the reset from each other', () => {
    const beforeCallback = vi.fn();
    const afterCallback = vi.fn();

    createAnimationFrame().request(beforeCallback);
    resetAnimationFrameScheduler();
    createAnimationFrame().request(afterCallback);

    vi.advanceTimersToNextFrame();

    expect(beforeCallback).not.toHaveBeenCalled();
    expect(afterCallback).toHaveBeenCalledTimes(1);
  });

  it('should not let cancel() from an instance created before the reset affect a callback scheduled after the reset', () => {
    const staleAnimationFrame = createAnimationFrame();
    staleAnimationFrame.request(vi.fn());

    resetAnimationFrameScheduler();

    const freshAnimationFrame = createAnimationFrame();
    const freshCallback = vi.fn();
    freshAnimationFrame.request(freshCallback);

    staleAnimationFrame.cancel();

    vi.advanceTimersToNextFrame();

    expect(freshCallback).toHaveBeenCalledTimes(1);
  });

  it('should not invoke a callback again after a reset if it already fired before the reset', () => {
    const animationFrame = createAnimationFrame();
    const callback = vi.fn();

    animationFrame.request(callback);
    vi.advanceTimersToNextFrame();

    resetAnimationFrameScheduler();
    vi.advanceTimersToNextFrame();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
