import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetAnimationFrameScheduler } from '../reset-animation-frame-scheduler';
import { createAnimationFrame } from '.';

describe('createAnimationFrame', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    resetAnimationFrameScheduler();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return an object exposing request and cancel functions', () => {
    const animationFrame = createAnimationFrame();

    expect(animationFrame).toEqual({
      request: expect.any(Function),
      cancel: expect.any(Function),
    });
  });

  it('should not invoke the callback synchronously when request is called', () => {
    const animationFrame = createAnimationFrame();
    const callback = vi.fn();

    animationFrame.request(callback);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should invoke the callback on the next animation frame', () => {
    const animationFrame = createAnimationFrame();
    const callback = vi.fn();

    animationFrame.request(callback);
    vi.advanceTimersToNextFrame();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not invoke the callback again on subsequent frames', () => {
    const animationFrame = createAnimationFrame();
    const callback = vi.fn();

    animationFrame.request(callback);
    vi.advanceTimersToNextFrame();
    vi.advanceTimersToNextFrame();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not invoke the callback if cancel is called before the frame fires', () => {
    const animationFrame = createAnimationFrame();
    const callback = vi.fn();

    animationFrame.request(callback);
    animationFrame.cancel();
    vi.advanceTimersToNextFrame();

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not throw when cancel is called without a pending request', () => {
    const animationFrame = createAnimationFrame();

    expect(() => animationFrame.cancel()).not.toThrow();
  });

  it('should not throw when cancel is called multiple times in a row', () => {
    const animationFrame = createAnimationFrame();
    const callback = vi.fn();

    animationFrame.request(callback);

    expect(() => {
      animationFrame.cancel();
      animationFrame.cancel();
      animationFrame.cancel();
    }).not.toThrow();
  });

  it('should not throw when cancel is called after the callback has already fired', () => {
    const animationFrame = createAnimationFrame();
    const callback = vi.fn();

    animationFrame.request(callback);
    vi.advanceTimersToNextFrame();

    expect(() => animationFrame.cancel()).not.toThrow();
  });

  it('should cancel a previously scheduled callback when request is called again before it fires', () => {
    const animationFrame = createAnimationFrame();
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    animationFrame.request(firstCallback);
    animationFrame.request(secondCallback);
    vi.advanceTimersToNextFrame();

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it('should allow request to be called again after a previous callback has already fired', () => {
    const animationFrame = createAnimationFrame();
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    animationFrame.request(firstCallback);
    vi.advanceTimersToNextFrame();

    animationFrame.request(secondCallback);
    vi.advanceTimersToNextFrame();

    expect(firstCallback).toHaveBeenCalledTimes(1);
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it('should run callbacks from independent instances on the same frame without interfering with each other', () => {
    const firstAnimationFrame = createAnimationFrame();
    const secondAnimationFrame = createAnimationFrame();
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    firstAnimationFrame.request(firstCallback);
    secondAnimationFrame.request(secondCallback);
    vi.advanceTimersToNextFrame();

    expect(firstCallback).toHaveBeenCalledTimes(1);
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it('should not affect another instance when cancel is called on a different instance', () => {
    const firstAnimationFrame = createAnimationFrame();
    const secondAnimationFrame = createAnimationFrame();
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    firstAnimationFrame.request(firstCallback);
    secondAnimationFrame.request(secondCallback);
    firstAnimationFrame.cancel();
    vi.advanceTimersToNextFrame();

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it('should not invoke a cancelled callback that sits between other pending callbacks on the same frame', () => {
    const first = createAnimationFrame();
    const second = createAnimationFrame();
    const third = createAnimationFrame();
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();
    const thirdCallback = vi.fn();

    first.request(firstCallback);
    second.request(secondCallback);
    third.request(thirdCallback);

    second.cancel();

    vi.advanceTimersToNextFrame();

    expect(firstCallback).toHaveBeenCalledTimes(1);
    expect(secondCallback).not.toHaveBeenCalled();
    expect(thirdCallback).toHaveBeenCalledTimes(1);
  });

  it('should invoke callbacks scheduled within the same frame in the order they were requested', () => {
    const callOrder: string[] = [];
    const firstAnimationFrame = createAnimationFrame();
    const secondAnimationFrame = createAnimationFrame();

    firstAnimationFrame.request(() => callOrder.push('first'));
    secondAnimationFrame.request(() => callOrder.push('second'));

    vi.advanceTimersToNextFrame();

    expect(callOrder).toEqual(['first', 'second']);
  });

  it('should allow scheduling a new animation frame from within a currently firing callback', () => {
    const animationFrame = createAnimationFrame();
    const secondCallback = vi.fn();
    const firstCallback = vi.fn(() => {
      animationFrame.request(secondCallback);
    });

    animationFrame.request(firstCallback);
    vi.advanceTimersToNextFrame();

    expect(firstCallback).toHaveBeenCalledTimes(1);
    expect(secondCallback).not.toHaveBeenCalled();

    vi.advanceTimersToNextFrame();

    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it('should schedule the callback via the global requestAnimationFrame', () => {
    const rafSpy = vi.spyOn(globalThis, 'requestAnimationFrame');
    const animationFrame = createAnimationFrame();

    animationFrame.request(vi.fn());

    expect(rafSpy).toHaveBeenCalled();
  });
});
