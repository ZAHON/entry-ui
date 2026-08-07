import type { Signal } from '@qwik.dev/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { isSignal } from '@qwik.dev/core';
import { unwrapSignal } from '.';

vi.mock('@qwik.dev/core', () => ({
  isSignal: vi.fn(),
}));

describe('unwrapSignal', () => {
  const mockedIsSignal = vi.mocked(isSignal);

  /**
   * Helper that builds an object satisfying the full `Signal<T>` type.
   * The actual "is this a signal" decision is delegated to the mocked
   * `isSignal` function, so the extra members (`untrackedValue`, `trigger`)
   * only exist to keep TypeScript happy and are not exercised by `unwrapSignal`.
   */
  const createMockSignal = <T>(value: T): Signal<T> =>
    ({
      value,
      untrackedValue: value,
      trigger: vi.fn(),
    }) as unknown as Signal<T>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the raw value when input is a number and not a signal', () => {
    mockedIsSignal.mockReturnValue(false);

    expect(unwrapSignal(42)).toBe(42);
  });

  it('should return the raw value when input is a string and not a signal', () => {
    mockedIsSignal.mockReturnValue(false);

    expect(unwrapSignal('hello')).toBe('hello');
  });

  it('should return the raw value when input is a boolean false and not a signal', () => {
    mockedIsSignal.mockReturnValue(false);

    expect(unwrapSignal(false)).toBe(false);
  });

  it('should return the raw value when input is zero and not a signal', () => {
    mockedIsSignal.mockReturnValue(false);

    expect(unwrapSignal(0)).toBe(0);
  });

  it('should return the raw value when input is an empty string and not a signal', () => {
    mockedIsSignal.mockReturnValue(false);

    expect(unwrapSignal('')).toBe('');
  });

  it('should return null when input is null and not a signal', () => {
    mockedIsSignal.mockReturnValue(false);

    expect(unwrapSignal(null)).toBeNull();
  });

  it('should return undefined when input is undefined and not a signal', () => {
    mockedIsSignal.mockReturnValue(false);

    expect(unwrapSignal(undefined)).toBeUndefined();
  });

  it('should return the same object reference when input is a plain object and not a signal', () => {
    mockedIsSignal.mockReturnValue(false);
    const obj = { foo: 'bar' };

    expect(unwrapSignal(obj)).toBe(obj);
  });

  it('should return the same array reference when input is an array and not a signal', () => {
    mockedIsSignal.mockReturnValue(false);
    const arr = [1, 2, 3];

    expect(unwrapSignal(arr)).toBe(arr);
  });

  it('should return the unwrapped value when input is a signal wrapping a number', () => {
    mockedIsSignal.mockReturnValue(true);
    const signal = createMockSignal(10);

    expect(unwrapSignal(signal)).toBe(10);
  });

  it('should return the unwrapped value when input is a signal wrapping a string', () => {
    mockedIsSignal.mockReturnValue(true);
    const signal = createMockSignal('qwik');

    expect(unwrapSignal(signal)).toBe('qwik');
  });

  it('should return false when input is a signal wrapping a falsy boolean', () => {
    mockedIsSignal.mockReturnValue(true);
    const signal = createMockSignal(false);

    expect(unwrapSignal(signal)).toBe(false);
  });

  it('should return zero when input is a signal wrapping a falsy number', () => {
    mockedIsSignal.mockReturnValue(true);
    const signal = createMockSignal(0);

    expect(unwrapSignal(signal)).toBe(0);
  });

  it('should return null when input is a signal wrapping null', () => {
    mockedIsSignal.mockReturnValue(true);
    const signal = createMockSignal(null);

    expect(unwrapSignal(signal)).toBeNull();
  });

  it('should return the same object reference when input is a signal wrapping an object', () => {
    mockedIsSignal.mockReturnValue(true);
    const innerObj = { foo: 'bar' };
    const signal = createMockSignal(innerObj);

    expect(unwrapSignal(signal)).toBe(innerObj);
  });

  it('should return the unwrapped value when input is a readonly signal', () => {
    mockedIsSignal.mockReturnValue(true);
    const readonlySignal: Readonly<Signal<string>> = createMockSignal('readonly-value');

    expect(unwrapSignal(readonlySignal)).toBe('readonly-value');
  });

  it('should reflect the current signal value after it has been updated', () => {
    mockedIsSignal.mockReturnValue(true);
    const signal = createMockSignal('initial');

    expect(unwrapSignal(signal)).toBe('initial');

    signal.value = 'updated';

    expect(unwrapSignal(signal)).toBe('updated');
  });

  it('should call isSignal exactly once with the provided argument', () => {
    mockedIsSignal.mockReturnValue(false);
    const value = 'some-value';

    unwrapSignal(value);

    expect(mockedIsSignal).toHaveBeenCalledTimes(1);
    expect(mockedIsSignal).toHaveBeenCalledWith(value);
  });

  it('should not access the .value property when input is not a signal', () => {
    mockedIsSignal.mockReturnValue(false);
    const valueGetterSpy = vi.fn();
    const notASignal = {
      get value() {
        valueGetterSpy();
        return 'should-not-be-accessed';
      },
    } as unknown as Signal<string>;

    unwrapSignal(notASignal);

    expect(valueGetterSpy).not.toHaveBeenCalled();
  });
});
