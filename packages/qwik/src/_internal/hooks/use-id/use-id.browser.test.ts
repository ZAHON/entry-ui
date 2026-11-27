import { describe, it, expect } from 'vitest';
import { renderHook } from 'vitest-browser-qwik';
import { useId } from '.';

describe('useId', () => {
  it('should generate ID with default prefix when no prefix provided', async () => {
    const { result } = await renderHook(() => useId());

    expect(result).toBeDefined();
    expect(result).toMatch(/^entry-ui-qwik-[a-zA-Z0-9]+$/);
  });

  it('should generate ID with default prefix when undefined is passed', async () => {
    const { result } = await renderHook(() => useId(undefined));

    expect(result).toMatch(/^entry-ui-qwik-[a-zA-Z0-9]+$/);
  });

  it('should generate ID with custom prefix', async () => {
    const { result } = await renderHook(() => useId('my-custom-'));

    expect(result).toMatch(/^my-custom-[a-zA-Z0-9]+$/);
  });

  it('should trim whitespace from custom prefix', async () => {
    const { result } = await renderHook(() => useId('  my-prefix-  '));

    expect(result).toMatch(/^my-prefix-[a-zA-Z0-9]+$/);
  });

  it('should work with empty string prefix', async () => {
    const { result } = await renderHook(() => useId(''));

    expect(result).toMatch(/^[a-zA-Z0-9]+$/);
    expect(result).not.toMatch(/^entry-ui-qwik-/);
  });

  it('should handle whitespace-only prefix as empty prefix', async () => {
    const { result } = await renderHook(() => useId('   '));

    expect(result).toMatch(/^[a-zA-Z0-9]+$/);
    expect(result).not.toMatch(/^entry-ui-qwik-/);
  });

  it('should handle custom prefix with special characters', async () => {
    const { result } = await renderHook(() => useId('my-prefix_with-special.chars:123-'));

    expect(result).toMatch(/^my-prefix_with-special\.chars:123-[a-zA-Z0-9]+$/);
  });
});
