import { describe, it, expect, vi, afterEach } from 'vitest';
import { isWebKit } from '.';

describe('isWebKit', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return true when CSS.supports confirms -webkit-backdrop-filter support', () => {
    vi.stubGlobal('CSS', {
      supports: vi.fn().mockReturnValue(true),
    });

    expect(isWebKit()).toBe(true);
  });

  it('should return false when CSS.supports returns false for -webkit-backdrop-filter', () => {
    vi.stubGlobal('CSS', {
      supports: vi.fn().mockReturnValue(false),
    });

    expect(isWebKit()).toBe(false);
  });

  it('should call CSS.supports with the correct property and value', () => {
    const supportsMock = vi.fn().mockReturnValue(true);
    vi.stubGlobal('CSS', { supports: supportsMock });

    isWebKit();

    expect(supportsMock).toHaveBeenCalledWith('-webkit-backdrop-filter', 'none');
    expect(supportsMock).toHaveBeenCalledTimes(1);
  });

  it('should return false when CSS is undefined', () => {
    vi.stubGlobal('CSS', undefined);

    expect(isWebKit()).toBe(false);
  });

  it('should return false when CSS.supports is undefined', () => {
    vi.stubGlobal('CSS', {});

    expect(isWebKit()).toBe(false);
  });

  it('should not throw when CSS.supports is undefined', () => {
    vi.stubGlobal('CSS', {});

    expect(() => isWebKit()).not.toThrow();
  });

  it('should return false when CSS.supports is null', () => {
    vi.stubGlobal('CSS', { supports: null });

    expect(isWebKit()).toBe(false);
  });

  it('should coerce a truthy non-boolean return value from CSS.supports to true', () => {
    vi.stubGlobal('CSS', {
      supports: vi.fn().mockReturnValue('yes' as unknown as boolean),
    });

    expect(isWebKit()).toBe(true);
  });

  it('should coerce a falsy non-boolean return value from CSS.supports to false', () => {
    vi.stubGlobal('CSS', {
      supports: vi.fn().mockReturnValue(0 as unknown as boolean),
    });

    expect(isWebKit()).toBe(false);
  });

  it('should return a boolean value regardless of CSS.supports output', () => {
    vi.stubGlobal('CSS', {
      supports: vi.fn().mockReturnValue(true),
    });

    expect(typeof isWebKit()).toBe('boolean');
  });
});
