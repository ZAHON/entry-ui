import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from 'vitest-browser-qwik';
import { $ } from '@qwik.dev/core';
import { useScrollLock } from '.';

describe('useScrollLock', () => {
  beforeEach(() => {
    document.body.removeAttribute('data-scroll-lock');
    document.body.removeAttribute('style');
    document.documentElement.removeAttribute('style');
  });

  afterEach(() => {
    document.body.removeAttribute('data-scroll-lock');
    document.body.removeAttribute('style');
    document.documentElement.removeAttribute('style');
    vi.restoreAllMocks();
  });

  it('should return "lock$" and "unlock$" QRL functions', async () => {
    const { result } = await renderHook(() => useScrollLock());

    expect(typeof result.lock$).toBe('function');
    expect(typeof result.unlock$).toBe('function');
  });

  it('should set "data-scroll-lock" attribute on body when "lock$" is called', async () => {
    const { result } = await renderHook(() => useScrollLock());

    await result.lock$();

    expect(document.body.hasAttribute('data-scroll-lock')).toBe(true);
  });

  it('should set "overflow: hidden" on body when "lock$" is called', async () => {
    const { result } = await renderHook(() => useScrollLock());

    await result.lock$();

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should set "--scrollbar-width" CSS variable on documentElement when "lock$" is called', async () => {
    const { result } = await renderHook(() => useScrollLock());

    await result.lock$();

    expect(document.documentElement.style.getPropertyValue('--scrollbar-width')).not.toBe('');
  });

  it('should remove "data-scroll-lock" attribute from body when "unlock$" is called', async () => {
    const { result } = await renderHook(() => useScrollLock());

    await result.lock$();
    await result.unlock$();

    expect(document.body.hasAttribute('data-scroll-lock')).toBe(false);
  });

  it('should restore body "overflow" style when "unlock$" is called', async () => {
    const { result } = await renderHook(() => useScrollLock());

    await result.lock$();
    await result.unlock$();

    expect(document.body.style.overflow).toBe('');
  });

  it('should remove "--scrollbar-width" CSS variable when "unlock$" is called', async () => {
    const { result } = await renderHook(() => useScrollLock());

    await result.lock$();
    await result.unlock$();

    expect(document.documentElement.style.getPropertyValue('--scrollbar-width')).toBe('');
  });

  it('should not throw when "unlock$" is called without a prior "lock$"', async () => {
    const { result } = await renderHook(() => useScrollLock());

    await expect(result.unlock$()).resolves.not.toThrow();
  });

  it('should not modify body when "unlock$" is called without a prior "lock$"', async () => {
    const { result } = await renderHook(() => useScrollLock());

    await result.unlock$();

    expect(document.body.hasAttribute('data-scroll-lock')).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('should lock and unlock correctly across multiple cycles', async () => {
    const { result } = await renderHook(() => useScrollLock());

    await result.lock$();
    expect(document.body.hasAttribute('data-scroll-lock')).toBe(true);

    await result.unlock$();
    expect(document.body.hasAttribute('data-scroll-lock')).toBe(false);

    await result.lock$();
    expect(document.body.hasAttribute('data-scroll-lock')).toBe(true);

    await result.unlock$();
    expect(document.body.hasAttribute('data-scroll-lock')).toBe(false);
  });

  it('should not apply lock twice when "lock$" is called while already locked', async () => {
    const { result } = await renderHook(() => useScrollLock());

    await result.lock$();
    await result.lock$();

    expect(document.body.getAttribute('data-scroll-lock')).toBe('');
  });

  it('should use the document returned by "resolveDocument$" when provided', async () => {
    const { result } = await renderHook(() => {
      const resolveDocument$ = $(() => document);
      return useScrollLock(resolveDocument$);
    });

    await result.lock$();

    expect(document.body.hasAttribute('data-scroll-lock')).toBe(true);
  });

  it('should fall back to the default document when "resolveDocument$" throws', async () => {
    const { result } = await renderHook(() => {
      const resolveDocument$ = $(() => {
        throw new Error('resolution failed');
      });
      return useScrollLock(resolveDocument$);
    });

    await result.lock$();

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should work correctly without "resolveDocument$" provided', async () => {
    const { result } = await renderHook(() => useScrollLock());

    await result.lock$();

    expect(document.body.hasAttribute('data-scroll-lock')).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should preserve pre-existing body styles after "unlock$"', async () => {
    document.body.style.backgroundColor = 'red';

    const { result } = await renderHook(() => useScrollLock());

    await result.lock$();
    await result.unlock$();

    expect(document.body.style.backgroundColor).toBe('red');

    document.body.style.backgroundColor = '';
  });
});
