import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { wait } from '.';

describe('wait', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should resolve after the specified delay', async () => {
    const delayMs = 1000;
    const promise = wait(delayMs);

    vi.advanceTimersByTime(delayMs);

    await expect(promise).resolves.toBeUndefined();
  });

  it('should not resolve before the specified delay', async () => {
    const delayMs = 1000;
    let resolved = false;

    wait(delayMs).then(() => {
      resolved = true;
    });

    vi.advanceTimersByTime(delayMs - 1);
    await Promise.resolve();

    expect(resolved).toBe(false);
  });

  it('should resolve immediately when delay is 0', async () => {
    const promise = wait(0);

    vi.advanceTimersByTime(0);

    await expect(promise).resolves.toBeUndefined();
  });

  it('should handle multiple concurrent waits independently', async () => {
    const results: number[] = [];

    wait(100).then(() => results.push(1));
    wait(200).then(() => results.push(2));
    wait(50).then(() => results.push(3));

    vi.advanceTimersByTime(50);
    await Promise.resolve();
    expect(results).toEqual([3]);

    vi.advanceTimersByTime(50);
    await Promise.resolve();
    expect(results).toEqual([3, 1]);

    vi.advanceTimersByTime(100);
    await Promise.resolve();
    expect(results).toEqual([3, 1, 2]);
  });

  it('should work correctly with async/await syntax', async () => {
    const startTime = Date.now();
    const delayMs = 500;

    const waitPromise = (async () => {
      await wait(delayMs);
      return Date.now();
    })();

    vi.advanceTimersByTime(delayMs);
    const endTime = await waitPromise;

    expect(endTime - startTime).toBeGreaterThanOrEqual(delayMs);
  });
});
