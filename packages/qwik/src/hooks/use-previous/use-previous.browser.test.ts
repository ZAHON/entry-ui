import { describe, it, expect } from 'vitest';
import { renderHook } from 'vitest-browser-qwik';
import { useSignal } from '@qwik.dev/core';
import { wait } from '@entry-ui/utilities/wait';
import { usePrevious } from '.';

describe('usePrevious', () => {
  it('should return undefined as the initial previous value', async () => {
    const { result } = await renderHook(() => {
      const value = useSignal(0);
      return usePrevious(value);
    });

    expect(result.value).toBe(undefined);
  });

  it('should update previous value after the tracked signal changes', async () => {
    const { result } = await renderHook(() => {
      const value = useSignal(0);
      return { previous: usePrevious(value), value };
    });

    result.value.value = 5;
    await wait(100);
    expect(result.previous.value).toBe(0);
  });

  it('should keep updating previous value on subsequent changes', async () => {
    const { result } = await renderHook(() => {
      const value = useSignal(0);
      return { previous: usePrevious(value), value };
    });

    result.value.value = 5;
    await wait(100);
    expect(result.previous.value).toBe(0);

    result.value.value = 10;
    await wait(100);
    expect(result.previous.value).toBe(5);

    result.value.value = 15;
    await wait(100);
    expect(result.previous.value).toBe(10);
  });

  it('should not update previous value when the new value is the same primitive', async () => {
    const { result } = await renderHook(() => {
      const value = useSignal(0);
      return { previous: usePrevious(value), value };
    });

    result.value.value = 5;
    await wait(100);
    expect(result.previous.value).toBe(0);

    result.value.value = 5;
    await wait(100);
    expect(result.previous.value).toBe(0);
  });

  it('should not update previous value when the new value is the same object reference', async () => {
    const sharedRef = { count: 0 };

    const { result } = await renderHook(() => {
      const value = useSignal(sharedRef);
      return { previous: usePrevious(value), value };
    });

    result.value.value = sharedRef;
    await wait(100);
    expect(result.previous.value).toBe(undefined);
  });

  it('should update previous value when the object reference changes even with equal content', async () => {
    const { result } = await renderHook(() => {
      const value = useSignal({ count: 0 });
      return { previous: usePrevious(value), value };
    });

    const firstValue = result.value.value;
    result.value.value = { count: 0 };
    await wait(100);
    expect(result.previous.value).toBe(firstValue);
  });

  // `NaN` is the only practical case where `Object.is` vs `!==` actually differ in behavior
  // reachable through a plain Qwik signal assignment. Qwik itself uses `===` to decide
  // whether to re-run the task, and `NaN === NaN` is `false`, so the task DOES re-run here
  // (unlike e.g. `+0`/`-0`, where Qwik's own `===` check would already skip the re-run).
  // `Object.is(NaN, NaN)` is `true`, so the hook correctly treats this as "no real change".
  it('should treat NaN as equal to itself using Object.is semantics', async () => {
    const { result } = await renderHook(() => {
      const value = useSignal(NaN);
      return { previous: usePrevious(value), value };
    });

    result.value.value = NaN;
    await wait(100);
    expect(result.previous.value).toBe(undefined);
  });

  it('should work correctly with string values', async () => {
    const { result } = await renderHook(() => {
      const value = useSignal('initial');
      return { previous: usePrevious(value), value };
    });

    result.value.value = 'updated';
    await wait(100);
    expect(result.previous.value).toBe('initial');
  });

  it('should work correctly with boolean values', async () => {
    const { result } = await renderHook(() => {
      const value = useSignal(false);
      return { previous: usePrevious(value), value };
    });

    result.value.value = true;
    await wait(100);
    expect(result.previous.value).toBe(false);
  });

  it('should work correctly with array values', async () => {
    const { result } = await renderHook(() => {
      const value = useSignal<number[]>([1, 2, 3]);
      return { previous: usePrevious(value), value };
    });

    const firstArray = result.value.value;
    result.value.value = [4, 5, 6];
    await wait(100);
    expect(result.previous.value).toBe(firstArray);
  });

  it('should handle transitions to and from undefined', async () => {
    const { result } = await renderHook(() => {
      const value = useSignal<number | undefined>(0);
      return { previous: usePrevious(value), value };
    });

    result.value.value = undefined;
    await wait(100);
    expect(result.previous.value).toBe(0);

    result.value.value = 5;
    await wait(100);
    expect(result.previous.value).toBe(undefined);
  });

  it('should not mutate or reset previous value on unrelated re-renders without value change', async () => {
    const { result } = await renderHook(() => {
      const value = useSignal(1);
      const unrelated = useSignal(0);
      return { previous: usePrevious(value), value, unrelated };
    });

    result.value.value = 2;
    await wait(100);
    expect(result.previous.value).toBe(1);

    result.unrelated.value = 100;
    await wait(100);
    expect(result.previous.value).toBe(1);
  });
});
