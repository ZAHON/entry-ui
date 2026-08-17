import { describe, expect, it } from 'vitest';
import { hasWindow } from '.';

describe('hasWindow', () => {
  it('should return true in a browser environment', () => {
    const result = hasWindow();
    expect(result).toBe(true);
  });

  it('should return true when window object is defined', () => {
    expect(typeof window).toBe('object');
    const result = hasWindow();
    expect(result).toBe(true);
  });

  it('should return false when window is undefined', () => {
    const originalWindow = globalThis.window;
    // @ts-expect-error - intentionally deleting window for testing
    delete globalThis.window;

    const result = hasWindow();
    expect(result).toBe(false);

    globalThis.window = originalWindow;
  });

  it('should work consistently across multiple calls', () => {
    const firstCall = hasWindow();
    const secondCall = hasWindow();
    const thirdCall = hasWindow();

    expect(firstCall).toBe(secondCall);
    expect(secondCall).toBe(thirdCall);
  });

  it('should return a boolean value', () => {
    const result = hasWindow();
    expect(typeof result).toBe('boolean');
  });
});
