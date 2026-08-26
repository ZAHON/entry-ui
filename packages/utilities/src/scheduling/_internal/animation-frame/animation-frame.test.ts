import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createAnimationFrameScheduler, resetAnimationFrameScheduler, createAnimationFrame } from './animation-frame';

describe('createAnimationFrameScheduler', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  describe('request', () => {
    it('should assign sequential ids starting from 1 for a fresh instance', () => {
      const scheduler = createAnimationFrameScheduler();

      const firstId = scheduler.request(vi.fn());
      const secondId = scheduler.request(vi.fn());
      const thirdId = scheduler.request(vi.fn());

      expect([firstId, secondId, thirdId]).toEqual([1, 2, 3]);
    });

    it('should not invoke the callback synchronously', () => {
      const scheduler = createAnimationFrameScheduler();
      const callback = vi.fn();

      scheduler.request(callback);

      expect(callback).not.toHaveBeenCalled();
    });

    it('should invoke the callback on the next animation frame', () => {
      const scheduler = createAnimationFrameScheduler();
      const callback = vi.fn();

      scheduler.request(callback);
      vi.advanceTimersToNextFrame();

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should invoke all callbacks batched into the same frame', () => {
      const scheduler = createAnimationFrameScheduler();
      const firstCallback = vi.fn();
      const secondCallback = vi.fn();
      const thirdCallback = vi.fn();

      scheduler.request(firstCallback);
      scheduler.request(secondCallback);
      scheduler.request(thirdCallback);
      vi.advanceTimersToNextFrame();

      expect(firstCallback).toHaveBeenCalledTimes(1);
      expect(secondCallback).toHaveBeenCalledTimes(1);
      expect(thirdCallback).toHaveBeenCalledTimes(1);
    });

    it('should invoke callbacks in the order they were requested', () => {
      const scheduler = createAnimationFrameScheduler();
      const callOrder: string[] = [];

      scheduler.request(() => callOrder.push('first'));
      scheduler.request(() => callOrder.push('second'));
      scheduler.request(() => callOrder.push('third'));
      vi.advanceTimersToNextFrame();

      expect(callOrder).toEqual(['first', 'second', 'third']);
    });

    it('should only call the native requestAnimationFrame once for requests batched into the same tick', () => {
      const rafSpy = vi.spyOn(globalThis, 'requestAnimationFrame');
      const scheduler = createAnimationFrameScheduler();

      scheduler.request(vi.fn());
      scheduler.request(vi.fn());
      scheduler.request(vi.fn());

      expect(rafSpy).toHaveBeenCalledTimes(1);
    });

    it('should schedule a new native frame for requests made after a tick has completed', () => {
      const rafSpy = vi.spyOn(globalThis, 'requestAnimationFrame');
      const scheduler = createAnimationFrameScheduler();

      scheduler.request(vi.fn());
      vi.advanceTimersToNextFrame();

      scheduler.request(vi.fn());

      expect(rafSpy).toHaveBeenCalledTimes(2);
    });

    it('should not reset the id sequence between ticks', () => {
      const scheduler = createAnimationFrameScheduler();

      const firstId = scheduler.request(vi.fn());
      vi.advanceTimersToNextFrame();

      const secondId = scheduler.request(vi.fn());

      expect(firstId).toBe(1);
      expect(secondId).toBe(2);
    });

    it('should allow scheduling a new frame from within a currently firing callback', () => {
      const scheduler = createAnimationFrameScheduler();
      const secondCallback = vi.fn();
      const firstCallback = vi.fn(() => {
        scheduler.request(secondCallback);
      });

      scheduler.request(firstCallback);
      vi.advanceTimersToNextFrame();

      expect(firstCallback).toHaveBeenCalledTimes(1);
      expect(secondCallback).not.toHaveBeenCalled();

      vi.advanceTimersToNextFrame();

      expect(secondCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('cancel', () => {
    it('should prevent a pending callback from executing', () => {
      const scheduler = createAnimationFrameScheduler();
      const callback = vi.fn();

      const id = scheduler.request(callback);
      scheduler.cancel(id);
      vi.advanceTimersToNextFrame();

      expect(callback).not.toHaveBeenCalled();
    });

    it('should only cancel the targeted callback, leaving others in the same frame intact', () => {
      const scheduler = createAnimationFrameScheduler();
      const firstCallback = vi.fn();
      const secondCallback = vi.fn();
      const thirdCallback = vi.fn();

      scheduler.request(firstCallback);
      const secondId = scheduler.request(secondCallback);
      scheduler.request(thirdCallback);

      scheduler.cancel(secondId);
      vi.advanceTimersToNextFrame();

      expect(firstCallback).toHaveBeenCalledTimes(1);
      expect(secondCallback).not.toHaveBeenCalled();
      expect(thirdCallback).toHaveBeenCalledTimes(1);
    });

    it('should not throw for an id that was never requested', () => {
      const scheduler = createAnimationFrameScheduler();

      expect(() => scheduler.cancel(999)).not.toThrow();
    });

    it('should not throw when cancel is called twice for the same id', () => {
      const scheduler = createAnimationFrameScheduler();
      const id = scheduler.request(vi.fn());

      expect(() => {
        scheduler.cancel(id);
        scheduler.cancel(id);
      }).not.toThrow();
    });

    it('should not throw when cancelling an id that already fired', () => {
      const scheduler = createAnimationFrameScheduler();
      const id = scheduler.request(vi.fn());

      vi.advanceTimersToNextFrame();

      expect(() => scheduler.cancel(id)).not.toThrow();
    });

    it('should be a safe no-op for an id from a batch that has already ticked away', () => {
      const scheduler = createAnimationFrameScheduler();
      const staleId = scheduler.request(vi.fn());
      vi.advanceTimersToNextFrame();

      const freshCallback = vi.fn();
      scheduler.request(freshCallback);
      scheduler.cancel(staleId);
      vi.advanceTimersToNextFrame();

      expect(freshCallback).toHaveBeenCalledTimes(1);
    });

    it('should not prevent other pending callbacks from running when cancel is called twice for the same id', () => {
      const scheduler = createAnimationFrameScheduler();
      const firstCallback = vi.fn();
      const secondCallback = vi.fn();

      const firstId = scheduler.request(firstCallback);
      scheduler.request(secondCallback);

      scheduler.cancel(firstId);
      scheduler.cancel(firstId); // duplikat - nie powinien nic dodatkowo zdekrementować

      vi.advanceTimersToNextFrame();

      expect(firstCallback).not.toHaveBeenCalled();
      expect(secondCallback).toHaveBeenCalledTimes(1);
    });

    it('should not underflow the active callback count when cancel is called more times than there are pending callbacks', () => {
      const scheduler = createAnimationFrameScheduler();
      const callback = vi.fn();

      const id = scheduler.request(callback);
      scheduler.cancel(id);
      scheduler.cancel(id);
      scheduler.cancel(id);

      const freshCallback = vi.fn();
      scheduler.request(freshCallback);

      vi.advanceTimersToNextFrame();

      expect(callback).not.toHaveBeenCalled();
      expect(freshCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('nextId / startId accessors', () => {
    it('should expose 1 as the initial nextId and startId for a fresh instance', () => {
      const scheduler = createAnimationFrameScheduler();

      expect(scheduler.nextId).toBe(1);
      expect(scheduler.startId).toBe(1);
    });

    it('should increment nextId after each request', () => {
      const scheduler = createAnimationFrameScheduler();

      scheduler.request(vi.fn());
      expect(scheduler.nextId).toBe(2);

      scheduler.request(vi.fn());
      expect(scheduler.nextId).toBe(3);
    });

    it('should assign the overridden nextId to the following request', () => {
      const scheduler = createAnimationFrameScheduler();

      scheduler.nextId = 100;
      const id = scheduler.request(vi.fn());

      expect(id).toBe(100);
      expect(scheduler.nextId).toBe(101);
    });

    it('should advance startId to the pre-tick nextId once a batch finishes executing', () => {
      const scheduler = createAnimationFrameScheduler();

      scheduler.request(vi.fn());
      scheduler.request(vi.fn());
      expect(scheduler.startId).toBe(1);

      vi.advanceTimersToNextFrame();

      expect(scheduler.startId).toBe(3);
    });

    it('should reflect an overridden startId via the getter', () => {
      const scheduler = createAnimationFrameScheduler();

      scheduler.startId = 42;

      expect(scheduler.startId).toBe(42);
    });
  });

  describe('clearCallbacks', () => {
    it('should not throw when called on an empty queue', () => {
      const scheduler = createAnimationFrameScheduler();

      expect(() => scheduler.clearCallbacks()).not.toThrow();
    });

    it('should prevent queued callbacks from executing once their frame fires', () => {
      const scheduler = createAnimationFrameScheduler();
      const callback = vi.fn();

      scheduler.request(callback);
      scheduler.clearCallbacks();
      vi.advanceTimersToNextFrame();

      expect(callback).not.toHaveBeenCalled();
    });

    it('should not affect callbacks requested after it was called', () => {
      const scheduler = createAnimationFrameScheduler();
      const staleCallback = vi.fn();

      scheduler.request(staleCallback);
      scheduler.clearCallbacks();

      const freshCallback = vi.fn();
      scheduler.request(freshCallback);
      vi.advanceTimersToNextFrame();

      expect(staleCallback).not.toHaveBeenCalled();
      expect(freshCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('requestAnimationFrame reference swap detection', () => {
    it('should schedule against the current requestAnimationFrame implementation after it changes', () => {
      const scheduler = createAnimationFrameScheduler();

      const firstRaf = vi.fn();
      vi.stubGlobal('requestAnimationFrame', firstRaf);
      scheduler.request(vi.fn());

      expect(firstRaf).toHaveBeenCalledTimes(1);

      const secondRaf = vi.fn();
      vi.stubGlobal('requestAnimationFrame', secondRaf);
      scheduler.request(vi.fn());

      expect(secondRaf).toHaveBeenCalledTimes(1);
    });

    it('should not schedule against a new requestAnimationFrame reference when no frame is pending', () => {
      const scheduler = createAnimationFrameScheduler();

      const raf = vi.fn();
      vi.stubGlobal('requestAnimationFrame', raf);
      scheduler.request(vi.fn());

      expect(raf).toHaveBeenCalledTimes(1);

      scheduler.request(vi.fn());

      expect(raf).toHaveBeenCalledTimes(1);
    });
  });
});

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
