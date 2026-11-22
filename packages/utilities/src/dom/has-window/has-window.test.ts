import { afterEach, describe, expect, it, vi } from 'vitest';
import { hasWindow } from '.';

describe('hasWindow', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return true in a browser environment', () => {
    expect(hasWindow()).toBe(true);
  });

  it('should return true when window object is defined', () => {
    expect(typeof window).toBe('object');
    expect(hasWindow()).toBe(true);
  });

  it('should return false when window is undefined', () => {
    vi.stubGlobal('window', undefined);

    expect(hasWindow()).toBe(false);
  });

  it('should work consistently across multiple calls', () => {
    const firstCall = hasWindow();
    const secondCall = hasWindow();
    const thirdCall = hasWindow();

    expect(firstCall).toBe(secondCall);
    expect(secondCall).toBe(thirdCall);
  });

  it('should return a boolean value', () => {
    expect(typeof hasWindow()).toBe('boolean');
  });
});
