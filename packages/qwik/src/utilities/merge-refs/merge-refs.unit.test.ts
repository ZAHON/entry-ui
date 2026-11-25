import type { QRL, Signal } from '@qwik.dev/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { isSignal } from '@qwik.dev/core';
import { mergeRefs } from '.';

vi.mock('@qwik.dev/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@qwik.dev/core')>();
  return {
    ...actual,
    isSignal: vi.fn(),
  };
});

describe('mergeRefs', () => {
  const mockedIsSignal = vi.mocked(isSignal);

  /**
   * Helper that builds an object satisfying `Signal<T>` for testing purposes.
   * Carries an internal `__isMockSignal` marker so the mocked `isSignal`
   * implementation can reliably tell mock signals apart from callback refs
   * or plain objects within a mixed refs array.
   */
  const createMockSignal = <T>(value: T): Signal<T> =>
    ({
      value,
      untrackedValue: value,
      trigger: vi.fn(),
      __isMockSignal: true,
    }) as unknown as Signal<T>;

  const invokeMergedRef = async <T extends Element>(merged: QRL<(node: T) => void>, node: T): Promise<void> => {
    await merged(node);
  };

  type FakeElement = Element;
  const createFakeNode = (): FakeElement => ({}) as FakeElement;

  beforeEach(() => {
    vi.clearAllMocks();
    mockedIsSignal.mockImplementation((val: unknown) =>
      Boolean(val && typeof val === 'object' && '__isMockSignal' in val)
    );
  });

  it('should return a callable function', () => {
    const merged = mergeRefs<FakeElement>([]);

    expect(typeof merged).toBe('function');
  });

  it('should update the .value property of a single signal ref when invoked', async () => {
    const signal = createMockSignal<FakeElement | undefined>(undefined);
    const merged = mergeRefs<FakeElement>([signal]);
    const node = createFakeNode();

    await invokeMergedRef(merged, node);

    expect(signal.value).toBe(node);
  });

  it('should call a single callback ref with the node when invoked', async () => {
    const callbackRef = vi.fn();
    const merged = mergeRefs<FakeElement>([callbackRef]);
    const node = createFakeNode();

    await invokeMergedRef(merged, node);

    expect(callbackRef).toHaveBeenCalledTimes(1);
    expect(callbackRef).toHaveBeenCalledWith(node);
  });

  it('should update multiple signal refs when invoked', async () => {
    const signalA = createMockSignal<FakeElement | undefined>(undefined);
    const signalB = createMockSignal<FakeElement | undefined>(undefined);
    const merged = mergeRefs<FakeElement>([signalA, signalB]);
    const node = createFakeNode();

    await invokeMergedRef(merged, node);

    expect(signalA.value).toBe(node);
    expect(signalB.value).toBe(node);
  });

  it('should call multiple callback refs when invoked', async () => {
    const callbackA = vi.fn();
    const callbackB = vi.fn();
    const merged = mergeRefs<FakeElement>([callbackA, callbackB]);
    const node = createFakeNode();

    await invokeMergedRef(merged, node);

    expect(callbackA).toHaveBeenCalledWith(node);
    expect(callbackB).toHaveBeenCalledWith(node);
  });

  it('should handle a mixed array of signal and callback refs correctly', async () => {
    const signal = createMockSignal<FakeElement | undefined>(undefined);
    const callbackRef = vi.fn();
    const merged = mergeRefs<FakeElement>([signal, callbackRef]);
    const node = createFakeNode();

    await invokeMergedRef(merged, node);

    expect(signal.value).toBe(node);
    expect(callbackRef).toHaveBeenCalledWith(node);
  });

  it('should ignore undefined entries without throwing', async () => {
    const merged = mergeRefs<FakeElement>([undefined]);
    const node = createFakeNode();

    await expect(invokeMergedRef(merged, node)).resolves.not.toThrow();
  });

  it('should skip undefined entries while still processing valid refs in the same array', async () => {
    const signal = createMockSignal<FakeElement | undefined>(undefined);
    const callbackRef = vi.fn();
    const merged = mergeRefs<FakeElement>([undefined, signal, undefined, callbackRef]);
    const node = createFakeNode();

    await invokeMergedRef(merged, node);

    expect(signal.value).toBe(node);
    expect(callbackRef).toHaveBeenCalledWith(node);
  });

  it('should do nothing and not throw when given an empty refs array', async () => {
    const merged = mergeRefs<FakeElement>([]);
    const node = createFakeNode();

    await expect(invokeMergedRef(merged, node)).resolves.not.toThrow();
  });

  it('should call isSignal for each non-undefined ref to distinguish it from a callback', async () => {
    const signal = createMockSignal<FakeElement | undefined>(undefined);
    const callbackRef = vi.fn();
    const merged = mergeRefs<FakeElement>([signal, callbackRef, undefined]);
    const node = createFakeNode();

    await invokeMergedRef(merged, node);

    expect(mockedIsSignal).toHaveBeenCalledWith(signal);
    expect(mockedIsSignal).toHaveBeenCalledWith(callbackRef);
  });

  it('should overwrite a previously set signal value on subsequent invocations with a new node', async () => {
    const signal = createMockSignal<FakeElement | undefined>(undefined);
    const merged = mergeRefs<FakeElement>([signal]);
    const firstNode = createFakeNode();
    const secondNode = createFakeNode();

    await invokeMergedRef(merged, firstNode);
    expect(signal.value).toBe(firstNode);

    await invokeMergedRef(merged, secondNode);
    expect(signal.value).toBe(secondNode);
  });

  it('should not call a callback ref again on its own when a different node triggers a second invocation', async () => {
    const callbackRef = vi.fn();
    const merged = mergeRefs<FakeElement>([callbackRef]);
    const firstNode = createFakeNode();
    const secondNode = createFakeNode();

    await invokeMergedRef(merged, firstNode);
    await invokeMergedRef(merged, secondNode);

    expect(callbackRef).toHaveBeenCalledTimes(2);
    expect(callbackRef).toHaveBeenNthCalledWith(1, firstNode);
    expect(callbackRef).toHaveBeenNthCalledWith(2, secondNode);
  });
});
