import { describe, it, expect } from 'vitest';
import { renderHook } from 'vitest-browser-qwik';
import { useId } from '.';

describe('useId', () => {
  it('should generate ID with default prefix when no params provided', async () => {
    const { result } = await renderHook(() => useId());

    expect(result).toBeDefined();
    expect(result).toMatch(/^entry-ui-qwik-/);
  });

  it('should generate ID with custom prefix', async () => {
    const { result } = await renderHook(() => useId({ prefix: 'my-custom-' }));

    expect(result).toMatch(/^my-custom-/);
  });

  it('should generate ID with custom generatedId', async () => {
    const { result } = await renderHook(() => useId({ generatedId: 'custom-id' }));

    expect(result).toBe('entry-ui-qwik-custom-id');
  });

  it('should combine custom prefix with generatedId', async () => {
    const { result } = await renderHook(() => useId({ prefix: 'my-app-', generatedId: 'header' }));

    expect(result).toBe('my-app-header');
  });

  it('should trim whitespace from custom prefix', async () => {
    const { result } = await renderHook(() => useId({ prefix: '  my-prefix-  ', generatedId: 'test' }));

    expect(result).toBe('my-prefix-test');
  });

  it('should trim whitespace from generatedId', async () => {
    const { result } = await renderHook(() => useId({ generatedId: '  custom-id  ' }));

    expect(result).toBe('entry-ui-qwik-custom-id');
  });

  it('should work with empty string prefix', async () => {
    const { result } = await renderHook(() => useId({ prefix: '', generatedId: 'test' }));

    expect(result).toBe('test');
  });

  it('should generate unique IDs for different hook instances', async () => {
    const { result: result1 } = await renderHook(() => useId());
    const { result: result2 } = await renderHook(() => useId());

    expect(result1).toBeDefined();
    expect(result2).toBeDefined();
    expect(result1).not.toBe(result2);
  });

  it('should handle generatedId with special characters', async () => {
    const { result } = await renderHook(() => useId({ generatedId: 'my-id_with-special.chars:123' }));

    expect(result).toBe('entry-ui-qwik-my-id_with-special.chars:123');
  });

  it('should handle empty generatedId by using auto-generated ID', async () => {
    const { result } = await renderHook(() => useId({ generatedId: '' }));

    expect(result).toMatch(/^entry-ui-qwik-[a-zA-Z0-9]+$/);
  });

  it('should handle whitespace-only generatedId', async () => {
    const { result } = await renderHook(() => useId({ generatedId: '   ' }));

    expect(result).toMatch(/^entry-ui-qwik-[a-zA-Z0-9]*$/);
  });

  it('should maintain consistency with same params', async () => {
    const params = { prefix: 'consistent-', generatedId: 'test-id' };

    const { result: result1 } = await renderHook(() => useId(params));
    const { result: result2 } = await renderHook(() => useId(params));

    expect(result1).toBe('consistent-test-id');
    expect(result2).toBe('consistent-test-id');
  });
});
