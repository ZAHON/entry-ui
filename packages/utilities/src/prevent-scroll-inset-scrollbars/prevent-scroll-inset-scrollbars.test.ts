import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { preventScrollInsetScrollbars } from '.';

describe('preventScrollInsetScrollbars', () => {
  interface CssSupportsOverrides {
    webkit?: boolean;
    scrollbarGutter?: boolean;
  }

  const stubCssSupports = (overrides: CssSupportsOverrides = {}) => {
    const supports = vi.fn((property: string) => {
      if (property === '-webkit-backdrop-filter') return overrides.webkit ?? false;
      if (property === 'scrollbar-gutter') return overrides.scrollbarGutter ?? false;
      return false;
    });

    vi.stubGlobal('CSS', { supports });

    return supports;
  };

  const defineMetric = (el: HTMLElement, prop: string, initialValue: number) => {
    let value = initialValue;
    Object.defineProperty(el, prop, {
      configurable: true,
      get: () => value,
      set: (next: number) => {
        value = next;
      },
    });
  };

  const stubStableOffsetWidth = (el: HTMLElement, value = 900) => {
    vi.spyOn(el, 'offsetWidth', 'get').mockReturnValue(value);
  };

  const stubUnstableOffsetWidth = (el: HTMLElement, before: number, after: number) => {
    vi.spyOn(el, 'offsetWidth', 'get').mockReturnValueOnce(before).mockReturnValueOnce(after);
  };

  let html: HTMLElement;
  let body: HTMLElement;
  let win: typeof window;

  beforeEach(() => {
    vi.useFakeTimers();

    html = document.documentElement;
    body = document.body;
    win = window;

    // Default: no WebKit, no native scrollbar-gutter support -> exercises the fallback branch.
    stubCssSupports();
  });

  afterEach(() => {
    html.removeAttribute('style');
    body.removeAttribute('style');
    html.removeAttribute('data-entry-ui-scroll-locked');
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should return a teardown function when invoked', () => {
    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(teardown).toEqual(expect.any(Function));

    teardown();
  });

  it('should reserve stable scrollbar-gutter space on the html element in fallback mode', () => {
    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.style.scrollbarGutter).toBe('stable');

    teardown();
  });

  it('should mark the html element with the scroll-locked data attribute in fallback mode', () => {
    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    teardown();
  });

  it('should hide vertical and horizontal overflow on the body element in fallback mode', () => {
    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(body.style.overflowY).toBe('hidden');
    expect(body.style.overflowX).toBe('hidden');

    teardown();
  });

  it('should set the body position to "relative" in fallback mode', () => {
    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(body.style.position).toBe('relative');

    teardown();
  });

  it('should size the body with plain 100dvh/100vw when there is no margin and no scrollbar offset to compensate for', () => {
    Object.defineProperty(win, 'innerWidth', { configurable: true, value: 1024 });
    Object.defineProperty(win, 'innerHeight', { configurable: true, value: 768 });
    defineMetric(body, 'clientWidth', 1024);
    defineMetric(body, 'clientHeight', 768);

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(body.style.height).toBe('100dvh');
    expect(body.style.width).toBe('100vw');

    teardown();
  });

  it('should subtract the horizontal scrollbar width from the body width calc when one is present', () => {
    Object.defineProperty(win, 'innerWidth', { configurable: true, value: 1024 });
    defineMetric(body, 'clientWidth', 1009);

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(body.style.width).toBe('calc(100vw - 15px)');

    teardown();
  });

  it('should subtract the vertical scrollbar height from the body height calc when one is present', () => {
    Object.defineProperty(win, 'innerHeight', { configurable: true, value: 768 });
    defineMetric(body, 'clientHeight', 751);

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(body.style.height).toBe('calc(100dvh - 17px)');

    teardown();
  });

  it('should include the body margin in the width calc alongside any scrollbar width', () => {
    Object.defineProperty(win, 'innerWidth', { configurable: true, value: 1024 });
    defineMetric(body, 'clientWidth', 1024);
    body.style.marginLeft = '5px';
    body.style.marginRight = '3px';

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(body.style.width).toBe('calc(100vw - 8px)');

    teardown();
  });

  it('should include the body margin in the height calc alongside any scrollbar height', () => {
    Object.defineProperty(win, 'innerHeight', { configurable: true, value: 768 });
    defineMetric(body, 'clientHeight', 768);
    body.style.marginTop = '4px';
    body.style.marginBottom = '6px';

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(body.style.height).toBe('calc(100dvh - 10px)');

    teardown();
  });

  it('should force a vertical scrollbar track on the html element when the document was already scrollable vertically', () => {
    defineMetric(html, 'scrollHeight', 2000);
    defineMetric(html, 'clientHeight', 800);

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.style.overflowY).toBe('scroll');

    teardown();
  });

  it('should force a horizontal scrollbar track on the html element when the document was already scrollable horizontally', () => {
    defineMetric(html, 'scrollWidth', 2000);
    defineMetric(html, 'clientWidth', 800);

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.style.overflowX).toBe('scroll');

    teardown();
  });

  it('should force a vertical scrollbar track when overflow-y is set to "scroll" via stylesheet even without overflowing content', () => {
    body.style.overflowY = 'scroll';

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.style.overflowY).toBe('scroll');

    teardown();
  });

  it('should force a horizontal scrollbar track when overflow-x is set to "scroll" via stylesheet even without overflowing content', () => {
    body.style.overflowX = 'scroll';

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.style.overflowX).toBe('scroll');

    teardown();
  });

  it('should default the html overflow-y to "hidden" when the document is not scrollable vertically', () => {
    defineMetric(html, 'scrollHeight', 500);
    defineMetric(html, 'clientHeight', 500);

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.style.overflowY).toBe('hidden');

    teardown();
  });

  it('should preserve a pre-existing "both-edges" scrollbar-gutter declaration instead of collapsing it to plain "stable"', () => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = 'html { scrollbar-gutter: stable both-edges; }';
    document.head.appendChild(styleSheet);

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.style.scrollbarGutter).toBe('stable both-edges');

    teardown();
    document.head.removeChild(styleSheet);
  });

  it('should copy the current scroll offsets onto the body element in fallback mode', () => {
    defineMetric(html, 'scrollTop', 120);
    defineMetric(html, 'scrollLeft', 40);

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(body.scrollTop).toBe(120);
    expect(body.scrollLeft).toBe(40);

    teardown();
  });

  it('should disable smooth scroll behavior on the html element in fallback mode', () => {
    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.style.scrollBehavior).toBe('unset');

    teardown();
  });

  it('should disable smooth scroll behavior on the body element in fallback mode', () => {
    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(body.style.scrollBehavior).toBe('unset');

    teardown();
  });

  it('should only reserve scrollbar-gutter space and hide overflow on the viewport scroller when native stable gutter support is detected', () => {
    stubCssSupports({ scrollbarGutter: true });
    stubStableOffsetWidth(body);

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.style.scrollbarGutter).toBe('stable');
    expect(body.style.overflowY).toBe('hidden');
    expect(body.style.overflowX).toBe('hidden');

    teardown();
  });

  it('should not set the scroll-locked data attribute when native scrollbar-gutter support is used', () => {
    stubCssSupports({ scrollbarGutter: true });
    stubStableOffsetWidth(body);

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);

    teardown();
  });

  it('should not modify the body position or dimensions when native scrollbar-gutter support is used', () => {
    stubCssSupports({ scrollbarGutter: true });
    stubStableOffsetWidth(body);

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(body.style.position).toBe('');
    expect(body.style.height).toBe('');
    expect(body.style.width).toBe('');

    teardown();
  });

  it('should target the html element instead of the body when html is the resolved viewport scroller in native gutter mode', () => {
    html.style.overflowX = 'auto';
    html.style.overflowY = 'auto';
    stubCssSupports({ scrollbarGutter: true });
    stubStableOffsetWidth(html);

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.style.overflowY).toBe('hidden');
    expect(html.style.overflowX).toBe('hidden');
    expect(body.style.overflowY).toBe('');

    teardown();
  });

  it('should fall back to manual dimension locking when native gutter support reports a layout shift', () => {
    stubCssSupports({ scrollbarGutter: true });
    stubUnstableOffsetWidth(body, 984, 967);

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(body.style.position).toBe('relative');
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    teardown();
  });

  it('should restore the original inline html styles once the teardown function is invoked', () => {
    html.style.overflowY = 'visible';

    const teardown = preventScrollInsetScrollbars({ win, html, body });
    teardown();

    expect(html.style.overflowY).toBe('visible');
  });

  it('should restore the original inline body styles once the teardown function is invoked', () => {
    body.style.position = 'sticky';

    const teardown = preventScrollInsetScrollbars({ win, html, body });
    teardown();

    expect(body.style.position).toBe('sticky');
  });

  it('should remove the scroll-locked data attribute once the teardown function is invoked in fallback mode', () => {
    const teardown = preventScrollInsetScrollbars({ win, html, body });
    teardown();

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
  });

  it('should restore the original scroll position on the html element once torn down in fallback mode', () => {
    defineMetric(html, 'scrollTop', 250);
    defineMetric(html, 'scrollLeft', 60);

    const teardown = preventScrollInsetScrollbars({ win, html, body });
    teardown();

    expect(html.scrollTop).toBe(250);
    expect(html.scrollLeft).toBe(60);
  });

  it('should remove the html style attribute entirely if no inline styles existed prior to locking', () => {
    const teardown = preventScrollInsetScrollbars({ win, html, body });
    teardown();

    expect(html.hasAttribute('style')).toBe(false);
  });

  it('should remove the body style attribute entirely if no inline styles existed prior to locking', () => {
    const teardown = preventScrollInsetScrollbars({ win, html, body });
    teardown();

    expect(body.hasAttribute('style')).toBe(false);
  });

  it('should preserve pre-existing inline styles on the html element instead of clearing the whole style attribute', () => {
    html.style.color = 'red';

    const teardown = preventScrollInsetScrollbars({ win, html, body });
    teardown();

    expect(html.hasAttribute('style')).toBe(true);
    expect(html.style.color).toBe('red');
  });

  it('should preserve pre-existing inline styles on the body element instead of clearing the whole style attribute', () => {
    body.style.color = 'blue';

    const teardown = preventScrollInsetScrollbars({ win, html, body });
    teardown();

    expect(body.hasAttribute('style')).toBe(true);
    expect(body.style.color).toBe('blue');
  });

  it('should not throw when the teardown function is invoked and win.removeEventListener is not a function', () => {
    // Uses a fully isolated fake window (rather than the real, shared `window`) so that the
    // listener this test registers can never leak into other tests.
    const fakeWin = {
      getComputedStyle: (el: Element) => window.getComputedStyle(el),
      innerWidth: 1024,
      innerHeight: 768,
      addEventListener: vi.fn(),
      removeEventListener: undefined,
      visualViewport: undefined,
    } as unknown as typeof window;

    const teardown = preventScrollInsetScrollbars({ win: fakeWin, html, body });

    expect(() => teardown()).not.toThrow();
  });

  it('should register a resize listener on the provided window object when invoked', () => {
    const addEventListenerSpy = vi.spyOn(win, 'addEventListener');

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    teardown();
  });

  it('should remove the resize listener from the provided window object when torn down', () => {
    const removeEventListenerSpy = vi.spyOn(win, 'removeEventListener');

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    teardown();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('should re-run the scroll lock on the next animation frame after a resize event fires', () => {
    const teardown = preventScrollInsetScrollbars({ win, html, body });

    // Simulate a resize widening the reserved gutter measurement.
    html.style.scrollbarGutter = '';
    win.dispatchEvent(new Event('resize'));

    // The lock should be torn down synchronously and reapplied on the next frame.
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);

    vi.advanceTimersToNextFrame();

    expect(html.style.scrollbarGutter).toBe('stable');
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    teardown();
  });

  it('should cancel any pending resize-triggered relock when teardown runs before the animation frame fires', () => {
    const teardown = preventScrollInsetScrollbars({ win, html, body });

    win.dispatchEvent(new Event('resize'));
    teardown();

    vi.advanceTimersToNextFrame();

    // Lock should remain fully torn down; the queued relock must not have run.
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
    expect(html.hasAttribute('style')).toBe(false);
  });

  it('should not lock the viewport and should return a no-op teardown function during active WebKit pinch-zoom', () => {
    stubCssSupports({ webkit: true });
    Object.defineProperty(win, 'visualViewport', {
      configurable: true,
      value: { scale: 1.5 },
    });

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
    expect(html.style.scrollbarGutter).toBe('');
    expect(() => teardown()).not.toThrow();

    Object.defineProperty(win, 'visualViewport', { configurable: true, value: undefined });
  });

  it('should not register a resize listener when it exits early due to WebKit pinch-zoom', () => {
    stubCssSupports({ webkit: true });
    Object.defineProperty(win, 'visualViewport', {
      configurable: true,
      value: { scale: 1.5 },
    });
    const addEventListenerSpy = vi.spyOn(win, 'addEventListener');

    preventScrollInsetScrollbars({ win, html, body });

    expect(addEventListenerSpy).not.toHaveBeenCalled();

    Object.defineProperty(win, 'visualViewport', { configurable: true, value: undefined });
  });

  it('should lock the viewport normally in WebKit when the visual viewport scale is exactly 1', () => {
    stubCssSupports({ webkit: true });
    Object.defineProperty(win, 'visualViewport', {
      configurable: true,
      value: { scale: 1 },
    });

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    teardown();
    Object.defineProperty(win, 'visualViewport', { configurable: true, value: undefined });
  });

  it('should lock the viewport normally in WebKit when visualViewport is undefined', () => {
    stubCssSupports({ webkit: true });
    Object.defineProperty(win, 'visualViewport', { configurable: true, value: undefined });

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    teardown();
  });

  it('should not skip locking due to pinch-zoom scale in a non-WebKit browser', () => {
    stubCssSupports({ webkit: false });
    Object.defineProperty(win, 'visualViewport', {
      configurable: true,
      value: { scale: 1.5 },
    });

    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    teardown();
    Object.defineProperty(win, 'visualViewport', { configurable: true, value: undefined });
  });

  it('should operate independently across multiple concurrent invocations targeting different elements', () => {
    const otherHtml = document.createElement('html');
    const otherBody = document.createElement('body');
    otherHtml.appendChild(otherBody);
    document.body.appendChild(otherHtml);

    const teardownA = preventScrollInsetScrollbars({ win, html, body });
    const teardownB = preventScrollInsetScrollbars({ win, html: otherHtml, body: otherBody });

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
    expect(otherHtml.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    teardownA();

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
    expect(otherHtml.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    teardownB();
    document.body.removeChild(otherHtml);
  });

  it('should not throw when the teardown function is called multiple times in a row', () => {
    const teardown = preventScrollInsetScrollbars({ win, html, body });

    expect(() => {
      teardown();
      teardown();
      teardown();
    }).not.toThrow();
  });
});
