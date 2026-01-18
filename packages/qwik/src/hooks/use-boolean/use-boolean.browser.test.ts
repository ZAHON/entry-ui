import { describe, it, expect } from 'vitest';
import { renderHook } from 'vitest-browser-qwik';
import { useBoolean } from '.';

describe('useBoolean', () => {
  it('should initialize with false by default', async () => {
    const { result } = await renderHook(() => useBoolean());

    expect(result.state.value).toBe(false);
  });

  it('should initialize with provided initial state', async () => {
    const { result } = await renderHook(() => useBoolean(true));

    expect(result.state.value).toBe(true);
  });

  it('should set state to true when setTrue$ is called', async () => {
    const { result } = await renderHook(() => useBoolean(false));

    await result.setTrue$();

    expect(result.state.value).toBe(true);
  });

  it('should set state to false when setFalse$ is called', async () => {
    const { result } = await renderHook(() => useBoolean(true));

    await result.setFalse$();

    expect(result.state.value).toBe(false);
  });

  it('should toggle state from false to true', async () => {
    const { result } = await renderHook(() => useBoolean(false));

    await result.toggle$();

    expect(result.state.value).toBe(true);
  });

  it('should toggle state from true to false', async () => {
    const { result } = await renderHook(() => useBoolean(true));

    await result.toggle$();

    expect(result.state.value).toBe(false);
  });

  it('should toggle state multiple times correctly', async () => {
    const { result } = await renderHook(() => useBoolean(false));

    await result.toggle$();
    expect(result.state.value).toBe(true);

    await result.toggle$();
    expect(result.state.value).toBe(false);

    await result.toggle$();
    expect(result.state.value).toBe(true);
  });

  it('should maintain state after calling setTrue$ multiple times', async () => {
    const { result } = await renderHook(() => useBoolean(false));

    await result.setTrue$();
    await result.setTrue$();

    expect(result.state.value).toBe(true);
  });

  it('should maintain state after calling setFalse$ multiple times', async () => {
    const { result } = await renderHook(() => useBoolean(true));

    await result.setFalse$();
    await result.setFalse$();

    expect(result.state.value).toBe(false);
  });
});
