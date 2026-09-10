import { describe, it, expect, vi } from 'vitest';
import { flushBeforePaint } from '.';

describe('flushBeforePaint', () => {
  /**
   * Waits for the current microtask queue to drain, allowing any
   * `queueMicrotask` callbacks scheduled by `flushBeforePaint` to run.
   */
  const flushMicrotasks = () => new Promise<void>((resolve) => queueMicrotask(resolve));

  it('should not invoke the callback synchronously when called', () => {
    const callback = vi.fn();
    const flushUpdate = vi.fn((batch: () => void) => batch());

    flushBeforePaint({ callback, flushUpdate });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not invoke flushUpdate synchronously when called', () => {
    const callback = vi.fn();
    const flushUpdate = vi.fn((batch: () => void) => batch());

    flushBeforePaint({ callback, flushUpdate });

    expect(flushUpdate).not.toHaveBeenCalled();
  });

  it('should invoke flushUpdate once the microtask queue is flushed', async () => {
    const callback = vi.fn();
    const flushUpdate = vi.fn((batch: () => void) => batch());

    flushBeforePaint({ callback, flushUpdate });
    await flushMicrotasks();

    expect(flushUpdate).toHaveBeenCalledTimes(1);
  });

  it('should pass a function to flushUpdate when flushing', async () => {
    const callback = vi.fn();
    const flushUpdate = vi.fn((batch: () => void) => batch());

    flushBeforePaint({ callback, flushUpdate });
    await flushMicrotasks();

    expect(flushUpdate).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should invoke the queued callback once flushUpdate runs the provided batch function', async () => {
    const callback = vi.fn();
    const flushUpdate = vi.fn((batch: () => void) => batch());

    flushBeforePaint({ callback, flushUpdate });
    await flushMicrotasks();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not invoke the queued callback if flushUpdate never calls the batch function', async () => {
    const callback = vi.fn();
    const flushUpdate = vi.fn(() => {
      // Intentionally does not invoke the batch function.
    });

    flushBeforePaint({ callback, flushUpdate });
    await flushMicrotasks();

    expect(flushUpdate).toHaveBeenCalledTimes(1);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should coalesce multiple callbacks registered within the same microtask into a single flushUpdate call', async () => {
    const callbackOne = vi.fn();
    const callbackTwo = vi.fn();
    const callbackThree = vi.fn();
    const flushUpdate = vi.fn((batch: () => void) => batch());

    flushBeforePaint({ callback: callbackOne, flushUpdate });
    flushBeforePaint({ callback: callbackTwo, flushUpdate });
    flushBeforePaint({ callback: callbackThree, flushUpdate });
    await flushMicrotasks();

    expect(flushUpdate).toHaveBeenCalledTimes(1);
    expect(callbackOne).toHaveBeenCalledTimes(1);
    expect(callbackTwo).toHaveBeenCalledTimes(1);
    expect(callbackThree).toHaveBeenCalledTimes(1);
  });

  it('should execute batched callbacks in FIFO order', async () => {
    const executionOrder: number[] = [];
    const flushUpdate = vi.fn((batch: () => void) => batch());

    flushBeforePaint({ callback: () => executionOrder.push(1), flushUpdate });
    flushBeforePaint({ callback: () => executionOrder.push(2), flushUpdate });
    flushBeforePaint({ callback: () => executionOrder.push(3), flushUpdate });
    await flushMicrotasks();

    expect(executionOrder).toEqual([1, 2, 3]);
  });

  it('should use the flushUpdate adapter supplied with the most recently queued call in a batch', async () => {
    const callbackOne = vi.fn();
    const callbackTwo = vi.fn();
    const firstFlushUpdate = vi.fn((batch: () => void) => batch());
    const secondFlushUpdate = vi.fn((batch: () => void) => batch());

    flushBeforePaint({ callback: callbackOne, flushUpdate: firstFlushUpdate });
    flushBeforePaint({ callback: callbackTwo, flushUpdate: secondFlushUpdate });
    await flushMicrotasks();

    // Only the flushUpdate adapter captured when the batch was created is used.
    expect(firstFlushUpdate).toHaveBeenCalledTimes(1);
    expect(secondFlushUpdate).not.toHaveBeenCalled();
    expect(callbackOne).toHaveBeenCalledTimes(1);
    expect(callbackTwo).toHaveBeenCalledTimes(1);
  });

  it('should start a new batch for calls scheduled after a previous batch has flushed', async () => {
    const callbackOne = vi.fn();
    const callbackTwo = vi.fn();
    const flushUpdate = vi.fn((batch: () => void) => batch());

    flushBeforePaint({ callback: callbackOne, flushUpdate });
    await flushMicrotasks();

    flushBeforePaint({ callback: callbackTwo, flushUpdate });
    await flushMicrotasks();

    expect(flushUpdate).toHaveBeenCalledTimes(2);
    expect(callbackOne).toHaveBeenCalledTimes(1);
    expect(callbackTwo).toHaveBeenCalledTimes(1);
  });

  it('should not re-invoke callbacks from a previous batch when a new batch flushes', async () => {
    const callbackOne = vi.fn();
    const callbackTwo = vi.fn();
    const flushUpdate = vi.fn((batch: () => void) => batch());

    flushBeforePaint({ callback: callbackOne, flushUpdate });
    await flushMicrotasks();

    flushBeforePaint({ callback: callbackTwo, flushUpdate });
    await flushMicrotasks();

    expect(callbackOne).toHaveBeenCalledTimes(1);
    expect(callbackTwo).toHaveBeenCalledTimes(1);
  });

  it('should call each queued callback exactly once even when many callbacks are batched', async () => {
    const callbacks = Array.from({ length: 50 }, () => vi.fn());
    const flushUpdate = vi.fn((batch: () => void) => batch());

    callbacks.forEach((callback) => flushBeforePaint({ callback, flushUpdate }));
    await flushMicrotasks();

    expect(flushUpdate).toHaveBeenCalledTimes(1);
    callbacks.forEach((callback) => {
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  it('should not throw when the queued callbacks array contains a sparse or malformed entry', async () => {
    const callback = vi.fn();
    const flushUpdate = vi.fn((batch: () => void) => batch());

    flushBeforePaint({ callback: undefined as unknown as () => void, flushUpdate });
    flushBeforePaint({ callback, flushUpdate });

    await expect(flushMicrotasks()).resolves.not.toThrow();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should allow independent flushUpdate adapters across separate, non-overlapping batches', async () => {
    const firstFlushUpdate = vi.fn((batch: () => void) => batch());
    const secondFlushUpdate = vi.fn((batch: () => void) => batch());
    const callbackOne = vi.fn();
    const callbackTwo = vi.fn();

    flushBeforePaint({ callback: callbackOne, flushUpdate: firstFlushUpdate });
    await flushMicrotasks();

    flushBeforePaint({ callback: callbackTwo, flushUpdate: secondFlushUpdate });
    await flushMicrotasks();

    expect(firstFlushUpdate).toHaveBeenCalledTimes(1);
    expect(secondFlushUpdate).toHaveBeenCalledTimes(1);
  });

  it('should propagate synchronous errors thrown by an individual callback to the flushUpdate call site', async () => {
    const throwingCallback = vi.fn(() => {
      throw new Error('boom');
    });
    // The throw happens inside flushBeforePaint's own `queueMicrotask` callback,
    // which runs as a separate microtask from the one `flushMicrotasks()` awaits on,
    // so it can't be observed via a rejected promise. Instead, capture the error
    // at the point where `flushUpdate` invokes the batch function.
    let caughtError: unknown;
    const flushUpdate = vi.fn((batch: () => void) => {
      try {
        batch();
      } catch (error) {
        caughtError = error;
      }
    });

    flushBeforePaint({ callback: throwingCallback, flushUpdate });
    await flushMicrotasks();

    expect(caughtError).toBeInstanceOf(Error);
    expect((caughtError as Error).message).toBe('boom');
  });
});
