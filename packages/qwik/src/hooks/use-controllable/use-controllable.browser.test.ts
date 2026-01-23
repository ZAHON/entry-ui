import { describe, it, expect } from 'vitest';
import { renderHook } from 'vitest-browser-qwik';
import { useSignal, $ } from '@qwik.dev/core';
import { useControllable } from '.';

// TODO: move to `@entry-ui/utilities` in the next release
const wait = (delayMs: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
};

describe('useControllable', () => {
  it('should initialize with default value in uncontrolled mode', async () => {
    const { result } = await renderHook(() => useControllable({ defaultValue: 0 }));

    expect(result.state.value).toBe(0);
    expect(result.controlled).toBe(false);
  });

  it('should update internal state when setState$ is called in uncontrolled mode', async () => {
    const { result } = await renderHook(() => useControllable({ defaultValue: 0 }));

    await result.setState$(5);

    expect(result.state.value).toBe(5);
    expect(result.controlled).toBe(false);
  });

  it('should invoke onChange$ callback after state changes in uncontrolled mode', async () => {
    const { result } = await renderHook(() => {
      const callbackValue = useSignal<number | undefined>(undefined);
      const onChange$ = $((value: number) => {
        callbackValue.value = value;
      });

      return {
        hook: useControllable({ defaultValue: 0, onChange$ }),
        callbackValue,
      };
    });

    await result.hook.setState$(10);
    await wait(1000);

    expect(result.callbackValue.value).toBe(10);
    expect(result.hook.controlled).toBe(false);
  });

  it('should handle multiple state updates correctly in uncontrolled mode', async () => {
    const { result } = await renderHook(() => useControllable({ defaultValue: 0 }));

    await result.setState$(5);
    expect(result.state.value).toBe(5);

    await result.setState$(10);
    expect(result.state.value).toBe(10);

    await result.setState$(15);
    expect(result.state.value).toBe(15);
  });

  it('should use value from external controlled signal in controlled mode', async () => {
    const { result } = await renderHook(() => {
      const controlledSignal = useSignal(42);
      return useControllable({ controlledSignal });
    });

    expect(result.state.value).toBe(42);
    expect(result.controlled).toBe(true);
  });

  it('should not modify external signal directly when setState$ is called in controlled mode', async () => {
    const { result } = await renderHook(() => {
      const controlledSignal = useSignal(42);
      return {
        hook: useControllable({ controlledSignal }),
        controlledSignal,
      };
    });

    await result.hook.setState$(100);

    expect(result.controlledSignal.value).toBe(42);
    expect(result.hook.controlled).toBe(true);
  });

  it('should invoke onChange$ callback to notify parent of requested changes in controlled mode', async () => {
    const { result } = await renderHook(() => {
      const controlledSignal = useSignal(42);
      const callbackValue = useSignal<number | undefined>(undefined);
      const onChange$ = $((value: number) => {
        callbackValue.value = value;
      });

      return {
        hook: useControllable({ controlledSignal, onChange$ }),
        callbackValue,
      };
    });

    await result.hook.setState$(99);
    await wait(1000);

    expect(result.callbackValue.value).toBe(99);
    expect(result.hook.controlled).toBe(true);
  });

  it('should reflect changes when parent updates the external signal in controlled mode', async () => {
    const { result } = await renderHook(() => {
      const controlledSignal = useSignal(10);
      return {
        hook: useControllable({ controlledSignal }),
        controlledSignal,
      };
    });

    result.controlledSignal.value = 50;

    expect(result.hook.state.value).toBe(50);
    expect(result.hook.controlled).toBe(true);
  });

  it('should work correctly when parent handles onChange$ and updates signal in controlled mode', async () => {
    const { result } = await renderHook(() => {
      const controlledSignal = useSignal(10);
      const onChange$ = $((value: number) => {
        controlledSignal.value = value;
      });

      return {
        hook: useControllable({ controlledSignal, onChange$ }),
        controlledSignal,
      };
    });

    await result.hook.setState$(25);
    await wait(1000);

    expect(result.controlledSignal.value).toBe(25);
    expect(result.hook.state.value).toBe(25);
    expect(result.hook.controlled).toBe(true);
  });

  it('should return controlled flag as true when controlledSignal is provided', async () => {
    const { result } = await renderHook(() => {
      const controlledSignal = useSignal(0);
      return useControllable({ controlledSignal });
    });

    expect(result.controlled).toBe(true);
  });

  it('should return controlled flag as false when controlledSignal is not provided', async () => {
    const { result } = await renderHook(() => useControllable({ defaultValue: 0 }));

    expect(result.controlled).toBe(false);
  });

  it('should handle different data types correctly', async () => {
    const { result } = await renderHook(() => useControllable({ defaultValue: 'initial' }));

    expect(result.state.value).toBe('initial');

    await result.setState$('updated');

    expect(result.state.value).toBe('updated');
  });

  it('should handle object values correctly in uncontrolled mode', async () => {
    const { result } = await renderHook(() => useControllable({ defaultValue: { count: 0 } }));

    expect(result.state.value).toEqual({ count: 0 });

    await result.setState$({ count: 5 });

    expect(result.state.value).toEqual({ count: 5 });
  });

  it('should not throw error when onChange$ is not provided in uncontrolled mode', async () => {
    const { result } = await renderHook(() => useControllable({ defaultValue: 0 }));

    await result.setState$(5);

    expect(result.state.value).toBe(5);
  });

  it('should not throw error when onChange$ is not provided in controlled mode', async () => {
    const { result } = await renderHook(() => {
      const controlledSignal = useSignal(0);
      return useControllable({ controlledSignal });
    });

    await result.setState$(5);

    expect(result.controlled).toBe(true);
  });

  it('should work with controlledSignal even when defaultValue is undefined', async () => {
    const { result } = await renderHook(() => {
      const controlledSignal = useSignal(100);
      return useControllable({ controlledSignal });
    });

    expect(result.state.value).toBe(100);
    expect(result.controlled).toBe(true);
  });
});
