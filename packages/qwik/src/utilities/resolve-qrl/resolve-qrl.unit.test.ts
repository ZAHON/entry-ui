import type { QRL } from '@qwik.dev/core';
import { describe, expect, it, vi } from 'vitest';
import { resolveQrl } from '.';

describe('resolveQrl', () => {
  /**
   * Helper that builds an object satisfying the `QRL<T>` type for testing purposes.
   * Only `resolved` and `resolve` are actually exercised by `resolveQrl`, so the
   * remaining internal members of `QRL` are irrelevant here and safely bypassed
   * via `as unknown as QRL<T>`.
   */
  const createMockQrl = <T>(options: { resolved?: T; resolveImpl?: () => Promise<T> }): QRL<T> => {
    const resolve = vi.fn(options.resolveImpl ?? (async () => undefined as unknown as T));

    return {
      resolved: options.resolved,
      resolve,
    } as unknown as QRL<T>;
  };

  it('should return the cached resolved value when qrl.resolved is already defined', async () => {
    const qrl = createMockQrl({ resolved: 'cached-value' });

    await expect(resolveQrl(qrl)).resolves.toBe('cached-value');
  });

  it('should not call qrl.resolve when the resolved value is already cached', async () => {
    const qrl = createMockQrl({ resolved: 'cached-value' });

    await resolveQrl(qrl);

    expect(qrl.resolve).not.toHaveBeenCalled();
  });

  it('should call qrl.resolve when resolved is undefined', async () => {
    const qrl = createMockQrl<string>({
      resolved: undefined,
      resolveImpl: async () => 'resolved-value',
    });

    await resolveQrl(qrl);

    expect(qrl.resolve).toHaveBeenCalledTimes(1);
  });

  it('should return the value produced by qrl.resolve when resolved is undefined', async () => {
    const qrl = createMockQrl<string>({
      resolved: undefined,
      resolveImpl: async () => 'resolved-value',
    });

    await expect(resolveQrl(qrl)).resolves.toBe('resolved-value');
  });

  it('should await the promise returned by qrl.resolve before returning', async () => {
    let resolveDeferred!: (value: string) => void;
    const deferred = new Promise<string>((res) => {
      resolveDeferred = res;
    });
    const qrl = createMockQrl<string>({
      resolved: undefined,
      resolveImpl: () => deferred,
    });

    const resultPromise = resolveQrl(qrl);
    resolveDeferred('deferred-value');

    await expect(resultPromise).resolves.toBe('deferred-value');
  });

  it('should return the cached value when resolved is null instead of calling resolve', async () => {
    const qrl = createMockQrl<string | null>({ resolved: null });

    await expect(resolveQrl(qrl)).resolves.toBeNull();
    expect(qrl.resolve).not.toHaveBeenCalled();
  });

  it('should return the cached value when resolved is zero instead of calling resolve', async () => {
    const qrl = createMockQrl<number>({ resolved: 0 });

    await expect(resolveQrl(qrl)).resolves.toBe(0);
    expect(qrl.resolve).not.toHaveBeenCalled();
  });

  it('should return the cached value when resolved is false instead of calling resolve', async () => {
    const qrl = createMockQrl<boolean>({ resolved: false });

    await expect(resolveQrl(qrl)).resolves.toBe(false);
    expect(qrl.resolve).not.toHaveBeenCalled();
  });

  it('should return the cached value when resolved is an empty string instead of calling resolve', async () => {
    const qrl = createMockQrl<string>({ resolved: '' });

    await expect(resolveQrl(qrl)).resolves.toBe('');
    expect(qrl.resolve).not.toHaveBeenCalled();
  });

  it('should return the same object reference when resolved is a cached object', async () => {
    const cachedObj = { foo: 'bar' };
    const qrl = createMockQrl<{ foo: string }>({ resolved: cachedObj });

    const result = await resolveQrl(qrl);

    expect(result).toBe(cachedObj);
  });

  it('should propagate rejection when qrl.resolve rejects', async () => {
    const error = new Error('failed to load chunk');
    const qrl = createMockQrl<string>({
      resolved: undefined,
      resolveImpl: async () => {
        throw error;
      },
    });

    await expect(resolveQrl(qrl)).rejects.toThrow('failed to load chunk');
  });

  it('should call resolve exactly once when resolved is undefined', async () => {
    const qrl = createMockQrl<string>({
      resolved: undefined,
      resolveImpl: async () => 'resolved-value',
    });

    await resolveQrl(qrl);

    expect(qrl.resolve).toHaveBeenCalledTimes(1);
  });
});
