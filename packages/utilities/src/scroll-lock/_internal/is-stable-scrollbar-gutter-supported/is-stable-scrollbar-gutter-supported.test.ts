import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { isStableScrollbarGutterSupported } from '.';

interface MockCSS {
  supports: (property: string, value: string) => boolean;
}

describe('isStableScrollbarGutterSupported', () => {
  let html: HTMLElement;
  let body: HTMLElement;

  beforeEach(() => {
    html = document.documentElement;
    body = document.body;
  });

  afterEach(() => {
    html.removeAttribute('style');
    body.removeAttribute('style');
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should return false when CSS is undefined in the runtime environment', () => {
    vi.stubGlobal('CSS', undefined);

    const result = isStableScrollbarGutterSupported({ html, body });

    expect(result).toBe(false);
  });

  it('should return false when CSS.supports is not a function', () => {
    vi.stubGlobal('CSS', {});

    const result = isStableScrollbarGutterSupported({ html, body });

    expect(result).toBe(false);
  });

  it('should return false when CSS.supports reports no support for scrollbar-gutter stable', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(false) };
    vi.stubGlobal('CSS', mockCSS);

    const result = isStableScrollbarGutterSupported({ html, body });

    expect(result).toBe(false);
  });

  it('should call CSS.supports with "scrollbar-gutter" and "stable" as arguments', () => {
    const supportsSpy = vi.fn<MockCSS['supports']>().mockReturnValue(false);
    vi.stubGlobal('CSS', { supports: supportsSpy });

    isStableScrollbarGutterSupported({ html, body });

    expect(supportsSpy).toHaveBeenCalledWith('scrollbar-gutter', 'stable');
  });

  it('should not perform any layout measurement when CSS.supports returns false', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(false) };
    vi.stubGlobal('CSS', mockCSS);
    const offsetWidthSpy = vi.spyOn(body, 'offsetWidth', 'get');

    isStableScrollbarGutterSupported({ html, body });

    expect(offsetWidthSpy).not.toHaveBeenCalled();
  });

  it('should return true when CSS.supports returns true and offsetWidth stays identical before and after hiding overflow', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(true) };
    vi.stubGlobal('CSS', mockCSS);
    // html has no explicit overflow -> body is the resolved viewport scroller
    vi.spyOn(body, 'offsetWidth', 'get').mockReturnValueOnce(984).mockReturnValueOnce(984);

    const result = isStableScrollbarGutterSupported({ html, body });

    expect(result).toBe(true);
  });

  it('should return false when CSS.supports returns true but offsetWidth changes between overflow states', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(true) };
    vi.stubGlobal('CSS', mockCSS);
    vi.spyOn(body, 'offsetWidth', 'get').mockReturnValueOnce(967).mockReturnValueOnce(984);

    const result = isStableScrollbarGutterSupported({ html, body });

    expect(result).toBe(false);
  });

  it('should measure offsetWidth on the html element when html establishes its own scroll container', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(true) };
    vi.stubGlobal('CSS', mockCSS);
    html.style.overflow = 'auto';
    const htmlOffsetWidthSpy = vi.spyOn(html, 'offsetWidth', 'get').mockReturnValueOnce(1200).mockReturnValueOnce(1200);
    const bodyOffsetWidthSpy = vi.spyOn(body, 'offsetWidth', 'get');

    const result = isStableScrollbarGutterSupported({ html, body });

    expect(htmlOffsetWidthSpy).toHaveBeenCalled();
    expect(bodyOffsetWidthSpy).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should measure offsetWidth on the body element when html does not establish its own scroll container', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(true) };
    vi.stubGlobal('CSS', mockCSS);
    const bodyOffsetWidthSpy = vi.spyOn(body, 'offsetWidth', 'get').mockReturnValueOnce(800).mockReturnValueOnce(800);
    const htmlOffsetWidthSpy = vi.spyOn(html, 'offsetWidth', 'get');

    const result = isStableScrollbarGutterSupported({ html, body });

    expect(bodyOffsetWidthSpy).toHaveBeenCalled();
    expect(htmlOffsetWidthSpy).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should apply "stable" to the scrollbarGutter style of the html element during measurement', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(true) };
    vi.stubGlobal('CSS', mockCSS);

    let scrollbarGutterValue = '';
    Object.defineProperty(html.style, 'scrollbarGutter', {
      configurable: true,
      get: () => scrollbarGutterValue,
      set: (v: string) => {
        scrollbarGutterValue = v;
      },
    });

    let capturedValue: string | undefined;
    vi.spyOn(body, 'offsetWidth', 'get').mockImplementation(() => {
      capturedValue = scrollbarGutterValue;
      return 900;
    });

    isStableScrollbarGutterSupported({ html, body });

    expect(capturedValue).toBe('stable');

    Reflect.deleteProperty(html.style, 'scrollbarGutter');
  });

  it('should set overflowY to "scroll" on the viewport scroller before taking the first measurement', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(true) };
    vi.stubGlobal('CSS', mockCSS);

    let overflowYDuringFirstRead: string | undefined;
    vi.spyOn(body, 'offsetWidth', 'get')
      .mockImplementationOnce(() => {
        overflowYDuringFirstRead = body.style.overflowY;
        return 900;
      })
      .mockImplementationOnce(() => 900);

    isStableScrollbarGutterSupported({ html, body });

    expect(overflowYDuringFirstRead).toBe('scroll');
  });

  it('should set overflowY to "hidden" on the viewport scroller before taking the second measurement', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(true) };
    vi.stubGlobal('CSS', mockCSS);

    let overflowYDuringSecondRead: string | undefined;
    vi.spyOn(body, 'offsetWidth', 'get')
      .mockImplementationOnce(() => 900)
      .mockImplementationOnce(() => {
        overflowYDuringSecondRead = body.style.overflowY;
        return 900;
      });

    isStableScrollbarGutterSupported({ html, body });

    expect(overflowYDuringSecondRead).toBe('hidden');
  });

  it('should restore the original overflowY style on the viewport scroller after the check completes', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(true) };
    vi.stubGlobal('CSS', mockCSS);
    body.style.overflowY = 'clip';
    vi.spyOn(body, 'offsetWidth', 'get').mockReturnValueOnce(900).mockReturnValueOnce(900);

    isStableScrollbarGutterSupported({ html, body });

    expect(body.style.overflowY).toBe('clip');
  });

  it('should restore an empty overflowY style on the viewport scroller when none was set beforehand', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(true) };
    vi.stubGlobal('CSS', mockCSS);
    vi.spyOn(body, 'offsetWidth', 'get').mockReturnValueOnce(900).mockReturnValueOnce(900);

    isStableScrollbarGutterSupported({ html, body });

    expect(body.style.overflowY).toBe('');
  });

  it('should restore the original scrollbarGutter style on the html element after the check completes', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(true) };
    vi.stubGlobal('CSS', mockCSS);
    vi.spyOn(body, 'offsetWidth', 'get').mockReturnValueOnce(900).mockReturnValueOnce(900);

    let scrollbarGutterValue = 'both-edges';
    Object.defineProperty(html.style, 'scrollbarGutter', {
      configurable: true,
      get: () => scrollbarGutterValue,
      set: (v: string) => {
        scrollbarGutterValue = v;
      },
    });

    isStableScrollbarGutterSupported({ html, body });

    expect(scrollbarGutterValue).toBe('both-edges');

    Reflect.deleteProperty(html.style, 'scrollbarGutter');
  });

  it('should restore an empty scrollbarGutter style on the html element when none was set beforehand', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(true) };
    vi.stubGlobal('CSS', mockCSS);
    vi.spyOn(body, 'offsetWidth', 'get').mockReturnValueOnce(900).mockReturnValueOnce(900);

    let scrollbarGutterValue = '';
    Object.defineProperty(html.style, 'scrollbarGutter', {
      configurable: true,
      get: () => scrollbarGutterValue,
      set: (v: string) => {
        scrollbarGutterValue = v;
      },
    });

    isStableScrollbarGutterSupported({ html, body });

    expect(scrollbarGutterValue).toBe('');

    Reflect.deleteProperty(html.style, 'scrollbarGutter');
  });

  it('should restore styles even when the offsetWidth measurements indicate a layout shift', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(true) };
    vi.stubGlobal('CSS', mockCSS);
    body.style.overflowY = 'visible';

    let scrollbarGutterValue = 'auto';
    Object.defineProperty(html.style, 'scrollbarGutter', {
      configurable: true,
      get: () => scrollbarGutterValue,
      set: (v: string) => {
        scrollbarGutterValue = v;
      },
    });

    vi.spyOn(body, 'offsetWidth', 'get').mockReturnValueOnce(900).mockReturnValueOnce(883);

    const result = isStableScrollbarGutterSupported({ html, body });

    expect(result).toBe(false);
    expect(scrollbarGutterValue).toBe('auto');
    expect(body.style.overflowY).toBe('visible');

    Reflect.deleteProperty(html.style, 'scrollbarGutter');
  });

  it('should return a boolean type as the result when support is detected', () => {
    const mockCSS: MockCSS = { supports: vi.fn().mockReturnValue(true) };
    vi.stubGlobal('CSS', mockCSS);
    vi.spyOn(body, 'offsetWidth', 'get').mockReturnValueOnce(900).mockReturnValueOnce(900);

    const result = isStableScrollbarGutterSupported({ html, body });

    expect(typeof result).toBe('boolean');
  });

  it('should return a boolean type as the result when CSS.supports is unavailable', () => {
    vi.stubGlobal('CSS', undefined);

    const result = isStableScrollbarGutterSupported({ html, body });

    expect(typeof result).toBe('boolean');
  });
});
