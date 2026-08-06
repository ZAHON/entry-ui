import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createScrollLocker } from './get-scroll-locker';

describe('createScrollLocker', () => {
  let originalPlatform: PropertyDescriptor | undefined;
  let originalMaxTouchPoints: PropertyDescriptor | undefined;
  let originalInnerWidth: PropertyDescriptor | undefined;
  let originalClientWidth: PropertyDescriptor | undefined;

  let createdRoots: HTMLElement[] = [];

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

  const mockPlatform = (platform: string) =>
    Object.defineProperty(navigator, 'platform', { value: platform, configurable: true });

  const mockMaxTouchPoints = (value: number) =>
    Object.defineProperty(navigator, 'maxTouchPoints', { value, configurable: true });

  // Forces `hasInsetScrollbars` to resolve `true`, which routes the locker through
  // `preventScrollInsetScrollbars` (observable via the `data-entry-ui-scroll-locked` marker).
  const forceInsetScrollbars = () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1024 });
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1000 });
  };

  // Creates an isolated, detached `<html>`/`<body>` pair so each test can observe its own
  // scroll-lock side effects without touching (or being polluted by) the real document root.
  const createParams = () => {
    const html = document.createElement('html');
    const body = document.createElement('body');
    html.appendChild(body);
    document.body.appendChild(html);
    createdRoots.push(html);

    return { win: window, doc: document, html, body };
  };

  beforeEach(() => {
    originalPlatform = Object.getOwnPropertyDescriptor(navigator, 'platform');
    originalMaxTouchPoints = Object.getOwnPropertyDescriptor(navigator, 'maxTouchPoints');
    originalInnerWidth = Object.getOwnPropertyDescriptor(window, 'innerWidth');
    originalClientWidth = Object.getOwnPropertyDescriptor(document.documentElement, 'clientWidth');

    Object.defineProperty(navigator, 'userAgentData', { value: undefined, configurable: true });

    // Sensible defaults: a non-iOS desktop platform with no native scrollbar-gutter support,
    // so most tests exercise the fallback locking branch unless a test overrides this.
    mockPlatform('Win32');
    mockMaxTouchPoints(0);
    stubCssSupports();

    createdRoots = [];

    vi.useFakeTimers();
  });

  afterEach(() => {
    createdRoots.forEach((el) => el.remove());
    createdRoots = [];

    if (originalPlatform) Object.defineProperty(navigator, 'platform', originalPlatform);
    if (originalMaxTouchPoints) Object.defineProperty(navigator, 'maxTouchPoints', originalMaxTouchPoints);
    if (originalInnerWidth) Object.defineProperty(window, 'innerWidth', originalInnerWidth);
    if (originalClientWidth) Object.defineProperty(document.documentElement, 'clientWidth', originalClientWidth);

    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('should return an object with an acquire function', () => {
    const locker = createScrollLocker();

    expect(typeof locker.acquire).toBe('function');
  });

  it('should return a new, independent locker instance on every call', () => {
    expect(createScrollLocker()).not.toBe(createScrollLocker());
  });

  it('should return a release function from acquire', () => {
    const { win, doc, html, body } = createParams();

    const release = createScrollLocker().acquire({ win, doc, html, body });

    expect(typeof release).toBe('function');

    release();
    vi.advanceTimersByTime(0);
  });

  it('should return the same release function reference for every acquire call on the same locker', () => {
    const { win, doc, html, body } = createParams();
    const locker = createScrollLocker();

    const releaseA = locker.acquire({ win, doc, html, body });
    const releaseB = locker.acquire({ win, doc, html, body });

    expect(releaseA).toBe(releaseB);

    releaseA();
    vi.advanceTimersByTime(0);
  });

  it('should not share lock state between two independent locker instances', () => {
    forceInsetScrollbars();

    const first = createParams();
    const second = createParams();

    const lockerA = createScrollLocker();
    const lockerB = createScrollLocker();

    lockerA.acquire(first);
    vi.advanceTimersByTime(0);

    expect(first.html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
    expect(second.html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);

    lockerB.acquire(second);
    vi.advanceTimersByTime(0);

    expect(second.html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
  });

  it('should not modify the DOM synchronously when acquire is called', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    createScrollLocker().acquire({ win, doc, html, body });

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
    expect(body.style.overflowY).toBe('');
  });

  it('should apply the scroll lock only after the pending timer fires', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    createScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
  });

  it('should not apply any lock when release is called before the pending lock timer has fired', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    const release = createScrollLocker().acquire({ win, doc, html, body });
    release();

    vi.advanceTimersByTime(1000);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
    expect(html.hasAttribute('style')).toBe(false);
    expect(body.hasAttribute('style')).toBe(false);
  });

  it('should keep the lock active while at least one acquisition has not been released', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    const locker = createScrollLocker();

    const release = locker.acquire({ win, doc, html, body });
    locker.acquire({ win, doc, html, body });

    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    // Releasing once only accounts for one of the two acquisitions.
    release();
    vi.advanceTimersByTime(1000);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
  });

  it('should unlock once every acquisition has been released', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    const locker = createScrollLocker();

    const release = locker.acquire({ win, doc, html, body });
    locker.acquire({ win, doc, html, body });

    vi.advanceTimersByTime(0);

    release();
    release();
    vi.advanceTimersByTime(0);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
  });

  it('should not unlock synchronously when release is called; it debounces the unlock via a timer', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    const release = createScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    release();
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
  });

  it('should remain locked when a new acquire happens before the pending unlock timer fires', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    const locker = createScrollLocker();

    const release = locker.acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    release();
    locker.acquire({ win, doc, html, body });

    vi.advanceTimersByTime(1000);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
  });

  it('should allow acquiring a fresh lock again after a full lock/unlock cycle has completed', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    const locker = createScrollLocker();

    const release = locker.acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);
    release();
    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);

    locker.acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
  });

  it('should restore the original html and body inline styles once fully unlocked', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    html.style.color = 'red';

    const release = createScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    release();
    vi.advanceTimersByTime(0);

    expect(html.style.color).toBe('red');
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
    expect(body.hasAttribute('style')).toBe(false);
  });

  it('should lock scroll via hidden overflow instead of inset compensation when running on iOS', () => {
    mockPlatform('iPhone');
    // Even with inset-style scrollbar metrics, iOS should always take the overlay path.
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    createScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(body.style.overflowY).toBe('hidden');
    expect(body.style.overflowX).toBe('hidden');
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
  });

  it('should lock scroll via hidden overflow when the viewport does not use classic inset scrollbars', () => {
    mockPlatform('Win32');
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1000 });
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1000 });

    const { win, doc, html, body } = createParams();

    createScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(body.style.overflowY).toBe('hidden');
    expect(body.style.overflowX).toBe('hidden');
  });

  it('should restore the original overflow styles once an overlay-locked viewport is fully unlocked', () => {
    mockPlatform('iPhone');
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    body.style.overflowY = 'auto';

    const release = createScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    release();
    vi.advanceTimersByTime(0);

    expect(body.style.overflowY).toBe('auto');
  });

  it('should wait instead of locking immediately when the viewport is already scroll-locked by an external source', () => {
    const { win, doc, html, body } = createParams();
    html.style.overflowY = 'hidden';

    createScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
    expect(html.style.overflowX).toBe('');
    expect(body.style.overflowY).toBe('');
  });

  it('should apply its own lock once the external scroll lock is cleared', async () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    html.style.overflowY = 'hidden';

    createScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);

    // Clearing the externally-applied lock should be picked up by the internal MutationObserver.
    html.style.overflowY = '';
    await Promise.resolve();
    await Promise.resolve();

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
  });

  it('should not throw when release is called while still waiting on an externally-locked viewport', () => {
    const { win, doc, html, body } = createParams();
    html.style.overflowY = 'hidden';

    const release = createScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(() => {
      release();
      vi.advanceTimersByTime(0);
    }).not.toThrow();
  });

  it('should use the params from the first acquire call and ignore params from subsequent concurrent acquisitions', () => {
    forceInsetScrollbars();

    const first = createParams();
    const second = createParams();
    const locker = createScrollLocker();

    locker.acquire(first);
    locker.acquire(second);

    vi.advanceTimersByTime(0);

    expect(first.html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
    expect(second.html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
  });

  it('should not throw when release is called more times than acquire, even though this drives the lock count negative', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    const release = createScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(() => {
      release();
      release();
      release();
      vi.advanceTimersByTime(0);
    }).not.toThrow();
  });

  it('should leave the lock permanently applied when over-releasing drives the lock count below zero at the time the unlock timer fires', () => {
    // Only the release call that brings `lockCount` to exactly 0 schedules the unlock timer.
    // Extra release calls beyond that push it negative, so by the time the timer fires the
    // `lockCount === 0` check fails and the lock is never actually torn down.
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    const release = createScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    release();
    release();
    release();
    vi.advanceTimersByTime(0);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
  });
});

describe('getScrollLocker', () => {
  let getScrollLocker: typeof import('.').getScrollLocker;

  let originalPlatform: PropertyDescriptor | undefined;
  let originalMaxTouchPoints: PropertyDescriptor | undefined;
  let originalInnerWidth: PropertyDescriptor | undefined;
  let originalClientWidth: PropertyDescriptor | undefined;

  let createdRoots: HTMLElement[] = [];

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

  const mockPlatform = (platform: string) =>
    Object.defineProperty(navigator, 'platform', { value: platform, configurable: true });

  const mockMaxTouchPoints = (value: number) =>
    Object.defineProperty(navigator, 'maxTouchPoints', { value, configurable: true });

  // Forces `hasInsetScrollbars` to resolve `true`, which routes the locker through
  // `preventScrollInsetScrollbars` (observable via the `data-entry-ui-scroll-locked` marker).
  const forceInsetScrollbars = () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1024 });
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1000 });
  };

  // Creates an isolated, detached `<html>`/`<body>` pair so each test can observe its own
  // scroll-lock side effects without touching (or being polluted by) the real document root.
  const createParams = () => {
    const html = document.createElement('html');
    const body = document.createElement('body');
    html.appendChild(body);
    document.body.appendChild(html);
    createdRoots.push(html);

    return { win: window, doc: document, html, body };
  };

  beforeEach(async () => {
    originalPlatform = Object.getOwnPropertyDescriptor(navigator, 'platform');
    originalMaxTouchPoints = Object.getOwnPropertyDescriptor(navigator, 'maxTouchPoints');
    originalInnerWidth = Object.getOwnPropertyDescriptor(window, 'innerWidth');
    originalClientWidth = Object.getOwnPropertyDescriptor(document.documentElement, 'clientWidth');

    Object.defineProperty(navigator, 'userAgentData', { value: undefined, configurable: true });

    // Sensible defaults: a non-iOS desktop platform with no native scrollbar-gutter support,
    // so most tests exercise the fallback locking branch unless a test overrides this.
    mockPlatform('Win32');
    mockMaxTouchPoints(0);
    stubCssSupports();

    createdRoots = [];

    // `getScrollLocker` wraps a module-level singleton, so each test gets a fresh module
    // instance (and therefore a fresh, isolated locker) instead of sharing state across tests.
    vi.resetModules();
    vi.useFakeTimers();

    ({ getScrollLocker } = await import('.'));
  });

  afterEach(() => {
    createdRoots.forEach((el) => el.remove());
    createdRoots = [];

    if (originalPlatform) Object.defineProperty(navigator, 'platform', originalPlatform);
    if (originalMaxTouchPoints) Object.defineProperty(navigator, 'maxTouchPoints', originalMaxTouchPoints);
    if (originalInnerWidth) Object.defineProperty(window, 'innerWidth', originalInnerWidth);
    if (originalClientWidth) Object.defineProperty(document.documentElement, 'clientWidth', originalClientWidth);

    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('should return an object with an acquire function', () => {
    const locker = getScrollLocker();

    expect(typeof locker.acquire).toBe('function');
  });

  it('should return the exact same locker instance on every call', () => {
    expect(getScrollLocker()).toBe(getScrollLocker());
  });

  it('should return a release function from acquire', () => {
    const { win, doc, html, body } = createParams();

    const release = getScrollLocker().acquire({ win, doc, html, body });

    expect(typeof release).toBe('function');

    release();
    vi.advanceTimersByTime(0);
  });

  it('should return the same release function reference for every acquire call on the same locker', () => {
    const { win, doc, html, body } = createParams();
    const locker = getScrollLocker();

    const releaseA = locker.acquire({ win, doc, html, body });
    const releaseB = locker.acquire({ win, doc, html, body });

    expect(releaseA).toBe(releaseB);

    releaseA();
    vi.advanceTimersByTime(0);
  });

  it('should not modify the DOM synchronously when acquire is called', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    getScrollLocker().acquire({ win, doc, html, body });

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
    expect(body.style.overflowY).toBe('');
  });

  it('should apply the scroll lock only after the pending timer fires', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    getScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
  });

  it('should not apply any lock when release is called before the pending lock timer has fired', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    const release = getScrollLocker().acquire({ win, doc, html, body });
    release();

    vi.advanceTimersByTime(1000);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
    expect(html.hasAttribute('style')).toBe(false);
    expect(body.hasAttribute('style')).toBe(false);
  });

  it('should keep the lock active while at least one acquisition has not been released', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    const locker = getScrollLocker();

    const release = locker.acquire({ win, doc, html, body });
    locker.acquire({ win, doc, html, body });

    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    // Releasing once only accounts for one of the two acquisitions.
    release();
    vi.advanceTimersByTime(1000);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
  });

  it('should unlock once every acquisition has been released', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    const locker = getScrollLocker();

    const release = locker.acquire({ win, doc, html, body });
    locker.acquire({ win, doc, html, body });

    vi.advanceTimersByTime(0);

    release();
    release();
    vi.advanceTimersByTime(0);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
  });

  it('should not unlock synchronously when release is called; it debounces the unlock via a timer', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    const release = getScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    release();
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
  });

  it('should remain locked when a new acquire happens before the pending unlock timer fires', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    const locker = getScrollLocker();

    const release = locker.acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    release();
    locker.acquire({ win, doc, html, body });

    vi.advanceTimersByTime(1000);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
  });

  it('should allow acquiring a fresh lock again after a full lock/unlock cycle has completed', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    const locker = getScrollLocker();

    const release = locker.acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);
    release();
    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);

    locker.acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
  });

  it('should restore the original html and body inline styles once fully unlocked', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    html.style.color = 'red';

    const release = getScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    release();
    vi.advanceTimersByTime(0);

    expect(html.style.color).toBe('red');
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
    expect(body.hasAttribute('style')).toBe(false);
  });

  it('should lock scroll via hidden overflow instead of inset compensation when running on iOS', () => {
    mockPlatform('iPhone');
    // Even with inset-style scrollbar metrics, iOS should always take the overlay path.
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    getScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(body.style.overflowY).toBe('hidden');
    expect(body.style.overflowX).toBe('hidden');
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
  });

  it('should lock scroll via hidden overflow when the viewport does not use classic inset scrollbars', () => {
    mockPlatform('Win32');
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1000 });
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1000 });

    const { win, doc, html, body } = createParams();

    getScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(body.style.overflowY).toBe('hidden');
    expect(body.style.overflowX).toBe('hidden');
  });

  it('should restore the original overflow styles once an overlay-locked viewport is fully unlocked', () => {
    mockPlatform('iPhone');
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    body.style.overflowY = 'auto';

    const release = getScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    release();
    vi.advanceTimersByTime(0);

    expect(body.style.overflowY).toBe('auto');
  });

  it('should wait instead of locking immediately when the viewport is already scroll-locked by an external source', () => {
    const { win, doc, html, body } = createParams();
    html.style.overflowY = 'hidden';

    getScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
    expect(html.style.overflowX).toBe('');
    expect(body.style.overflowY).toBe('');
  });

  it('should apply its own lock once the external scroll lock is cleared', async () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();
    html.style.overflowY = 'hidden';

    getScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);

    // Clearing the externally-applied lock should be picked up by the internal MutationObserver.
    html.style.overflowY = '';
    await Promise.resolve();
    await Promise.resolve();

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
  });

  it('should not throw when release is called while still waiting on an externally-locked viewport', () => {
    const { win, doc, html, body } = createParams();
    html.style.overflowY = 'hidden';

    const release = getScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(() => {
      release();
      vi.advanceTimersByTime(0);
    }).not.toThrow();
  });

  it('should use the params from the first acquire call and ignore params from subsequent concurrent acquisitions', () => {
    forceInsetScrollbars();

    const first = createParams();
    const second = createParams();
    const locker = getScrollLocker();

    locker.acquire(first);
    locker.acquire(second);

    vi.advanceTimersByTime(0);

    expect(first.html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
    expect(second.html.hasAttribute('data-entry-ui-scroll-locked')).toBe(false);
  });

  it('should not throw when release is called more times than acquire, even though this drives the lock count negative', () => {
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    const release = getScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);

    expect(() => {
      release();
      release();
      release();
      vi.advanceTimersByTime(0);
    }).not.toThrow();
  });

  it('should leave the lock permanently applied when over-releasing drives the lock count below zero at the time the unlock timer fires', () => {
    // Only the release call that brings `lockCount` to exactly 0 schedules the unlock timer.
    // Extra release calls beyond that push it negative, so by the time the timer fires the
    // `lockCount === 0` check fails and the lock is never actually torn down.
    forceInsetScrollbars();

    const { win, doc, html, body } = createParams();

    const release = getScrollLocker().acquire({ win, doc, html, body });
    vi.advanceTimersByTime(0);
    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);

    release();
    release();
    release();
    vi.advanceTimersByTime(0);

    expect(html.hasAttribute('data-entry-ui-scroll-locked')).toBe(true);
  });
});
