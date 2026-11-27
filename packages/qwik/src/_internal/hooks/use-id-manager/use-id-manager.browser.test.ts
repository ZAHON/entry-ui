import { describe, it, expect } from 'vitest';
import { renderHook } from 'vitest-browser-qwik';
import { useIdManager } from '.';

describe('useIdManager', () => {
  it('should initialize with undefined when shouldInitialize is false by default', async () => {
    const { result } = await renderHook(() => useIdManager());

    expect(result.id.value).toBeUndefined();
  });

  it('should initialize with prefixed auto-generated ID when shouldInitialize is true', async () => {
    const { result } = await renderHook(() => useIdManager({ shouldInitialize: true }));

    expect(result.id.value).toBeDefined();
    expect(result.id.value).toMatch(/^entry-ui-qwik-[a-zA-Z0-9]+$/);
  });

  it('should use custom prefix when provided', async () => {
    const { result } = await renderHook(() => useIdManager({ prefix: 'my-custom-', shouldInitialize: true }));

    expect(result.id.value).toMatch(/^my-custom-[a-zA-Z0-9]+$/);
  });

  it('should trim whitespace from custom prefix on initialization', async () => {
    const { result } = await renderHook(() =>
      useIdManager({
        prefix: '  my-prefix-  ',
        shouldInitialize: true,
      })
    );

    expect(result.id.value).toMatch(/^my-prefix-[a-zA-Z0-9]+$/);
  });

  it('should work with empty string prefix', async () => {
    const { result } = await renderHook(() =>
      useIdManager({
        prefix: '',
        shouldInitialize: true,
      })
    );

    expect(result.id.value).toMatch(/^[a-zA-Z0-9]+$/);
    expect(result.id.value).not.toMatch(/^entry-ui-qwik-/);
  });

  it('should set id to specific value using set$', async () => {
    const { result } = await renderHook(() => useIdManager());

    await result.set$('my-specific-id');

    expect(result.id.value).toBe('my-specific-id');
  });

  it('should override initialized id when set$ is called', async () => {
    const { result } = await renderHook(() => useIdManager({ shouldInitialize: true }));

    const initialId = result.id.value;
    await result.set$('new-id');

    expect(result.id.value).toBe('new-id');
    expect(result.id.value).not.toBe(initialId);
  });

  it('should fallback to default format when set$ receives empty string', async () => {
    const { result } = await renderHook(() => useIdManager({ shouldInitialize: true }));

    const initialId = result.id.value;
    await result.set$('custom-id');
    expect(result.id.value).toBe('custom-id');

    await result.set$('');
    expect(result.id.value).toBe(initialId);
  });

  it('should fallback to default format when set$ receives undefined', async () => {
    const { result } = await renderHook(() => useIdManager());

    await result.set$(undefined);

    expect(result.id.value).toMatch(/^entry-ui-qwik-[a-zA-Z0-9]+$/);
  });

  it('should fallback to default format when set$ receives whitespace only', async () => {
    const { result } = await renderHook(() => useIdManager());

    await result.set$('   ');

    expect(result.id.value).toMatch(/^entry-ui-qwik-[a-zA-Z0-9]+$/);
  });

  it('should preserve custom prefix when using set$ with empty value', async () => {
    const { result } = await renderHook(() => useIdManager({ prefix: 'custom-' }));

    await result.set$('');

    expect(result.id.value).toMatch(/^custom-[a-zA-Z0-9]+$/);
  });

  it('should delete id using delete$', async () => {
    const { result } = await renderHook(() => useIdManager({ shouldInitialize: true }));

    expect(result.id.value).toBeDefined();

    await result.delete$();

    expect(result.id.value).toBeUndefined();
  });

  it('should set id to undefined when delete$ is called on uninitialized hook', async () => {
    const { result } = await renderHook(() => useIdManager());

    await result.delete$();

    expect(result.id.value).toBeUndefined();
  });

  it('should allow setting id again after delete$', async () => {
    const { result } = await renderHook(() => useIdManager({ shouldInitialize: true }));

    await result.delete$();
    expect(result.id.value).toBeUndefined();

    await result.set$('restored-id');
    expect(result.id.value).toBe('restored-id');
  });

  it('should handle multiple set$ calls correctly', async () => {
    const { result } = await renderHook(() => useIdManager());

    await result.set$('first-id');
    expect(result.id.value).toBe('first-id');

    await result.set$('second-id');
    expect(result.id.value).toBe('second-id');

    await result.set$('third-id');
    expect(result.id.value).toBe('third-id');
  });

  it('should handle multiple delete$ calls correctly', async () => {
    const { result } = await renderHook(() => useIdManager({ shouldInitialize: true }));

    await result.delete$();
    expect(result.id.value).toBeUndefined();

    await result.delete$();
    expect(result.id.value).toBeUndefined();
  });

  it('should handle complex id values with special characters', async () => {
    const { result } = await renderHook(() => useIdManager());

    await result.set$('my-id_with-special.chars:123');

    expect(result.id.value).toBe('my-id_with-special.chars:123');
  });

  it('should maintain id value across multiple operations', async () => {
    const { result } = await renderHook(() => useIdManager());

    await result.set$('custom-1');
    expect(result.id.value).toBe('custom-1');

    await result.set$('custom-2');
    expect(result.id.value).toBe('custom-2');

    await result.set$('');
    expect(result.id.value).toMatch(/^entry-ui-qwik-[a-zA-Z0-9]+$/);

    await result.delete$();
    expect(result.id.value).toBeUndefined();

    await result.set$('custom-3');
    expect(result.id.value).toBe('custom-3');
  });
});
