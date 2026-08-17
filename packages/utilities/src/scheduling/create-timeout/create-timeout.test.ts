import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createTimeout } from '.';

describe('createTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return an object with start, clear, and isStarted methods', () => {
    const timer = createTimeout();

    expect(typeof timer.start).toBe('function');
    expect(typeof timer.clear).toBe('function');
    expect(typeof timer.isStarted).toBe('function');
  });

  it('should return false from isStarted immediately after creation', () => {
    const timer = createTimeout();

    expect(timer.isStarted()).toBe(false);
  });

  it('should return true from isStarted after start is called', () => {
    const timer = createTimeout();

    timer.start({ callback: () => {}, delayMs: 500 });

    expect(timer.isStarted()).toBe(true);
  });

  it('should not call the callback synchronously when start is invoked', () => {
    const timer = createTimeout();
    const callback = vi.fn();

    timer.start({ callback, delayMs: 500 });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should call the callback after the specified delay has elapsed', () => {
    const timer = createTimeout();
    const callback = vi.fn();

    timer.start({ callback, delayMs: 500 });
    vi.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback before the specified delay has elapsed', () => {
    const timer = createTimeout();
    const callback = vi.fn();

    timer.start({ callback, delayMs: 500 });
    vi.advanceTimersByTime(499);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should call the callback exactly once even if time advances well past the delay', () => {
    const timer = createTimeout();
    const callback = vi.fn();

    timer.start({ callback, delayMs: 500 });
    vi.advanceTimersByTime(5000);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should return false from isStarted after the callback has executed', () => {
    const timer = createTimeout();
    const callback = vi.fn();

    timer.start({ callback, delayMs: 500 });
    vi.advanceTimersByTime(500);

    expect(timer.isStarted()).toBe(false);
  });

  it('should execute the callback immediately when delayMs is 0', () => {
    const timer = createTimeout();
    const callback = vi.fn();

    timer.start({ callback, delayMs: 0 });
    vi.advanceTimersByTime(0);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should cancel the pending execution when clear is called before the delay elapses', () => {
    const timer = createTimeout();
    const callback = vi.fn();

    timer.start({ callback, delayMs: 500 });
    timer.clear();
    vi.advanceTimersByTime(500);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should return false from isStarted after clear is called', () => {
    const timer = createTimeout();

    timer.start({ callback: () => {}, delayMs: 500 });
    timer.clear();

    expect(timer.isStarted()).toBe(false);
  });

  it('should not throw when clear is called without an active timer', () => {
    const timer = createTimeout();

    expect(() => timer.clear()).not.toThrow();
  });

  it('should not throw when clear is called multiple times in a row', () => {
    const timer = createTimeout();

    timer.start({ callback: () => {}, delayMs: 500 });

    expect(() => {
      timer.clear();
      timer.clear();
      timer.clear();
    }).not.toThrow();
  });

  it('should remain idle (isStarted false) when clear is called without any prior start', () => {
    const timer = createTimeout();

    timer.clear();

    expect(timer.isStarted()).toBe(false);
  });

  it('should cancel a previously scheduled callback when start is called again before it fires', () => {
    const timer = createTimeout();
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    timer.start({ callback: firstCallback, delayMs: 500 });
    timer.start({ callback: secondCallback, delayMs: 500 });
    vi.advanceTimersByTime(500);

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it('should apply the delay of the most recent start call, not the original one', () => {
    const timer = createTimeout();
    const callback = vi.fn();

    timer.start({ callback, delayMs: 1000 });
    timer.start({ callback, delayMs: 200 });
    vi.advanceTimersByTime(200);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not fire the earlier callback even after the original delay would have elapsed', () => {
    const timer = createTimeout();
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    timer.start({ callback: firstCallback, delayMs: 100 });
    timer.start({ callback: secondCallback, delayMs: 1000 });
    vi.advanceTimersByTime(100);

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).not.toHaveBeenCalled();
  });

  it('should allow scheduling a new timer after a previous one has already executed', () => {
    const timer = createTimeout();
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    timer.start({ callback: firstCallback, delayMs: 200 });
    vi.advanceTimersByTime(200);

    timer.start({ callback: secondCallback, delayMs: 300 });
    vi.advanceTimersByTime(300);

    expect(firstCallback).toHaveBeenCalledTimes(1);
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it('should allow scheduling a new timer after a previous one has been cleared', () => {
    const timer = createTimeout();
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    timer.start({ callback: firstCallback, delayMs: 500 });
    timer.clear();

    timer.start({ callback: secondCallback, delayMs: 300 });
    vi.advanceTimersByTime(300);

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it('should mark isStarted as true again after restarting following a clear', () => {
    const timer = createTimeout();

    timer.start({ callback: () => {}, delayMs: 500 });
    timer.clear();
    timer.start({ callback: () => {}, delayMs: 500 });

    expect(timer.isStarted()).toBe(true);
  });

  it('should invoke the callback with no arguments', () => {
    const timer = createTimeout();
    const callback = vi.fn();

    timer.start({ callback, delayMs: 500 });
    vi.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledWith();
  });

  it('should keep separate independent state across multiple createTimeout instances', () => {
    const timerA = createTimeout();
    const timerB = createTimeout();
    const callbackA = vi.fn();
    const callbackB = vi.fn();

    timerA.start({ callback: callbackA, delayMs: 200 });
    timerB.start({ callback: callbackB, delayMs: 500 });

    vi.advanceTimersByTime(200);

    expect(callbackA).toHaveBeenCalledTimes(1);
    expect(callbackB).not.toHaveBeenCalled();
    expect(timerA.isStarted()).toBe(false);
    expect(timerB.isStarted()).toBe(true);
  });

  it('should not affect one instance when clear is called on a different instance', () => {
    const timerA = createTimeout();
    const timerB = createTimeout();
    const callbackA = vi.fn();
    const callbackB = vi.fn();

    timerA.start({ callback: callbackA, delayMs: 500 });
    timerB.start({ callback: callbackB, delayMs: 500 });

    timerA.clear();
    vi.advanceTimersByTime(500);

    expect(callbackA).not.toHaveBeenCalled();
    expect(callbackB).toHaveBeenCalledTimes(1);
  });

  it('should return false from isStarted when clear is called immediately after start with delayMs 0, before timers advance', () => {
    const timer = createTimeout();

    timer.start({ callback: () => {}, delayMs: 0 });
    timer.clear();

    expect(timer.isStarted()).toBe(false);
  });

  it('should not execute a delayMs 0 callback if clear is called synchronously before flushing timers', () => {
    const timer = createTimeout();
    const callback = vi.fn();

    timer.start({ callback, delayMs: 0 });
    timer.clear();
    vi.advanceTimersByTime(0);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should allow the callback itself to call start again, scheduling a new timer', () => {
    const timer = createTimeout();
    const secondCallback = vi.fn();
    const firstCallback = vi.fn(() => {
      timer.start({ callback: secondCallback, delayMs: 200 });
    });

    timer.start({ callback: firstCallback, delayMs: 500 });
    vi.advanceTimersByTime(500);

    expect(firstCallback).toHaveBeenCalledTimes(1);
    expect(timer.isStarted()).toBe(true);

    vi.advanceTimersByTime(200);

    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it('should allow the callback to call clear on itself without throwing, reflecting an already-idle state', () => {
    const timer = createTimeout();
    const callback = vi.fn(() => {
      timer.clear();
    });

    timer.start({ callback, delayMs: 500 });

    expect(() => vi.advanceTimersByTime(500)).not.toThrow();
    expect(timer.isStarted()).toBe(false);
  });
});
