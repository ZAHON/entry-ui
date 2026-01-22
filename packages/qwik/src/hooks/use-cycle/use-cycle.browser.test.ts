import { describe, it, expect } from 'vitest';
import { renderHook } from 'vitest-browser-qwik';
import { useCycle } from '.';

describe('useCycle', () => {
  it('should initialize with the first option by default', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const }));

    expect(result.option.value).toBe('a');
  });

  it('should initialize with the provided defaultOption', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const, defaultOption: 'b' }));

    expect(result.option.value).toBe('b');
  });

  it('should fall back to first option when defaultOption is not in options array', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const, defaultOption: 'd' }));

    expect(result.option.value).toBe('a');
  });

  it('should move to next option when next$ is called', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const }));

    await result.next$();
    expect(result.option.value).toBe('b');
  });

  it('should loop back to first option when next$ is called at the end with loop enabled', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const, loop: true }));

    await result.last$();
    await result.next$();
    expect(result.option.value).toBe('a');
  });

  it('should stay at last option when next$ is called at the end with loop disabled', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const, loop: false }));

    await result.last$();
    await result.next$();
    expect(result.option.value).toBe('c');
  });

  it('should move to previous option when previous$ is called', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const, defaultOption: 'b' }));

    await result.previous$();
    expect(result.option.value).toBe('a');
  });

  it('should loop back to last option when previous$ is called at the start with loop enabled', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const, loop: true }));

    await result.previous$();
    expect(result.option.value).toBe('c');
  });

  it('should stay at first option when previous$ is called at the start with loop disabled', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const, loop: false }));

    await result.previous$();
    expect(result.option.value).toBe('a');
  });

  it('should jump to first option when first$ is called', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const, defaultOption: 'c' }));

    await result.first$();
    expect(result.option.value).toBe('a');
  });

  it('should jump to last option when last$ is called', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const }));

    await result.last$();
    expect(result.option.value).toBe('c');
  });

  it('should set option to valid value when set$ is called', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const }));

    await result.set$('c');
    expect(result.option.value).toBe('c');
  });

  it('should ignore invalid value when set$ is called', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await result.set$('d' as any);
    expect(result.option.value).toBe('a');
  });

  it('should cycle through all options correctly with next$', async () => {
    const { result } = await renderHook(() => useCycle({ options: [1, 2, 3, 4] as const }));

    expect(result.option.value).toBe(1);

    await result.next$();
    expect(result.option.value).toBe(2);

    await result.next$();
    expect(result.option.value).toBe(3);

    await result.next$();
    expect(result.option.value).toBe(4);
  });

  it('should cycle through all options correctly with previous$', async () => {
    const { result } = await renderHook(() => useCycle({ options: [1, 2, 3, 4] as const, defaultOption: 4 }));

    expect(result.option.value).toBe(4);

    await result.previous$();
    expect(result.option.value).toBe(3);

    await result.previous$();
    expect(result.option.value).toBe(2);

    await result.previous$();
    expect(result.option.value).toBe(1);
  });

  it('should handle single option array', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['only'] as const }));

    expect(result.option.value).toBe('only');

    await result.next$();
    expect(result.option.value).toBe('only');

    await result.previous$();
    expect(result.option.value).toBe('only');
  });

  it('should work with numeric options', async () => {
    const { result } = await renderHook(() => useCycle({ options: [10, 20, 30] as const, defaultOption: 20 }));

    expect(result.option.value).toBe(20);

    await result.next$();
    expect(result.option.value).toBe(30);
  });

  it('should work with object options', async () => {
    const options = [{ id: 1 }, { id: 2 }, { id: 3 }] as const;
    const { result } = await renderHook(() => useCycle({ options }));

    expect(result.option.value).toBe(options[0]);

    await result.next$();
    expect(result.option.value).toBe(options[1]);
  });

  it('should maintain state after calling first$ multiple times', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const }));

    await result.first$();
    await result.first$();
    expect(result.option.value).toBe('a');
  });

  it('should maintain state after calling last$ multiple times', async () => {
    const { result } = await renderHook(() => useCycle({ options: ['a', 'b', 'c'] as const }));

    await result.last$();
    await result.last$();
    expect(result.option.value).toBe('c');
  });
});
