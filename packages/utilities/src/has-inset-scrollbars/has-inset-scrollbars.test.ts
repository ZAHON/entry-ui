import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { hasInsetScrollbars } from '.';

describe('hasInsetScrollbars', () => {
  let originalInnerWidth: number;
  let originalClientWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    originalClientWidth = document.documentElement.clientWidth;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      value: originalClientWidth,
    });
  });

  it('should return true when window innerWidth is greater than document clientWidth', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1024 });
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1007 });

    const result = hasInsetScrollbars({ win: window, doc: document });

    expect(result).toBe(true);
  });

  it('should return false when window innerWidth is equal to document clientWidth', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1024 });
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1024 });

    const result = hasInsetScrollbars({ win: window, doc: document });

    expect(result).toBe(false);
  });

  it('should return false when window innerWidth is less than document clientWidth', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1000 });
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1024 });

    const result = hasInsetScrollbars({ win: window, doc: document });

    expect(result).toBe(false);
  });

  it('should return true when the difference between innerWidth and clientWidth is exactly 1', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 801 });
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 800 });

    const result = hasInsetScrollbars({ win: window, doc: document });

    expect(result).toBe(true);
  });

  it('should return true for a typical desktop scrollbar width difference (e.g. 17px)', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1920 });
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1903 });

    const result = hasInsetScrollbars({ win: window, doc: document });

    expect(result).toBe(true);
  });

  it('should return false when both innerWidth and clientWidth are zero', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 0 });
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 0 });

    const result = hasInsetScrollbars({ win: window, doc: document });

    expect(result).toBe(false);
  });

  it('should call innerWidth and clientWidth accessors from the provided win and doc parameters', () => {
    const innerWidthSpy = vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1200);
    const clientWidthSpy = vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1185);

    hasInsetScrollbars({ win: window, doc: document });

    expect(innerWidthSpy).toHaveBeenCalled();
    expect(clientWidthSpy).toHaveBeenCalled();
  });

  it('should work correctly with a custom win object that mimics the Window interface', () => {
    const customWin = { innerWidth: 1300 } as typeof window;
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1280 });

    const result = hasInsetScrollbars({ win: customWin, doc: document });

    expect(result).toBe(true);
  });

  it('should work correctly with a custom doc object that mimics the Document interface', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1300 });
    const customDoc = { documentElement: { clientWidth: 1300 } } as Document;

    const result = hasInsetScrollbars({ win: window, doc: customDoc });

    expect(result).toBe(false);
  });

  it('should be usable to evaluate a separate iframe context independently of the main window', () => {
    const iframeWin = { innerWidth: 500 } as typeof window;
    const iframeDoc = { documentElement: { clientWidth: 483 } } as Document;

    const result = hasInsetScrollbars({ win: iframeWin, doc: iframeDoc });

    expect(result).toBe(true);
  });

  it('should return a boolean type as the result', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1024 });
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1000 });

    const result = hasInsetScrollbars({ win: window, doc: document });

    expect(typeof result).toBe('boolean');
  });
});
