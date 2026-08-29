import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { isTestEnvironmentDOM } from '../../../platform/is-test-environment-dom';
import { isViewportScrollLocked } from '.';

describe('isViewportScrollLocked', () => {
  let html: HTMLElement;
  let body: HTMLElement;

  beforeEach(() => {
    html = document.documentElement;
    body = document.body;
  });

  afterEach(() => {
    // Reset any inline styles applied to the real document root and body
    // so that each test starts from a clean, predictable state.
    html.removeAttribute('style');
    body.removeAttribute('style');
  });

  it('should return true when the resolved scroller has overflowY set to "hidden"', () => {
    html.style.overflowY = 'hidden';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(true);
  });

  it('should return true when the resolved scroller has overflowY set to "clip"', () => {
    html.style.overflowY = 'clip';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(true);
  });

  // Per the CSS spec and real-browser behavior, setting the `overflow` shorthand propagates
  // its value to both longhand properties (`overflowX`/`overflowY`) in computed style. jsdom
  // does not implement this propagation, so `getComputedStyle(html).overflowY` returns the
  // default "visible" there instead of the inherited "hidden" — this is a limitation of jsdom's
  // CSSOM engine, not a bug in `isViewportScrollLocked`'s logic. We therefore skip this test only
  // in a simulated DOM (jsdom/happy-dom); in a real browser (e.g. Vitest Browser Mode) it will
  // run normally and verify the actual behavior.
  it.skipIf(isTestEnvironmentDOM())(
    'should return true when the resolved scroller has overflow shorthand set to "hidden"',
    () => {
      html.style.overflow = 'hidden';

      expect(isViewportScrollLocked({ win: window, html, body })).toBe(true);
    }
  );

  it('should return false when the resolved scroller has overflowY set to "auto"', () => {
    html.style.overflowY = 'auto';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(false);
  });

  it('should return false when the resolved scroller has overflowY set to "scroll"', () => {
    html.style.overflowY = 'scroll';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(false);
  });

  it('should return false when the resolved scroller has overflowY set to "visible"', () => {
    html.style.overflowY = 'visible';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(false);
  });

  it('should return false when neither html nor body declare any overflow', () => {
    expect(isViewportScrollLocked({ win: window, html, body })).toBe(false);
  });

  it('should fall back to evaluating the body element when html does not establish its own scroll container', () => {
    body.style.overflowY = 'hidden';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(true);
  });

  it('should return false when body has overflowY "auto" and html does not establish its own scroll container', () => {
    body.style.overflowY = 'auto';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(false);
  });

  it('should evaluate the html element and ignore the body when html establishes its own scroll container', () => {
    html.style.overflowY = 'auto';
    body.style.overflowY = 'hidden';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(false);
  });

  it('should return true when html establishes its own scroll container and its own overflowY is locked, regardless of body', () => {
    html.style.overflowY = 'hidden';
    body.style.overflowY = 'auto';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(true);
  });

  it('should return false when html qualifies as a scroller via overflow shorthand "hidden" but its effective overflowY is overridden to "auto"', () => {
    html.style.overflow = 'hidden';
    html.style.overflowY = 'auto';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(false);
  });

  it('should return false when html qualifies as a scroller only via overflowX "hidden" while overflowY remains "visible"', () => {
    html.style.overflowX = 'hidden';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(false);
  });

  it('should return true when html qualifies as a scroller via overflowX "auto" and overflowY is explicitly "hidden"', () => {
    html.style.overflowX = 'auto';
    html.style.overflowY = 'hidden';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(true);
  });

  it('should return false when html has overflow active but display is "inline", causing the resolver to fall back to body', () => {
    html.style.overflow = 'hidden';
    html.style.display = 'inline';
    body.style.overflowY = 'auto';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(false);
  });

  it('should return true when html has overflow active but display is "contents", causing the resolver to fall back to a locked body', () => {
    html.style.overflow = 'auto';
    html.style.display = 'contents';
    body.style.overflowY = 'hidden';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(true);
  });

  it('should work correctly with custom detached html and body elements', () => {
    const customHtml = document.createElement('html');
    const customBody = document.createElement('body');
    customHtml.appendChild(customBody);
    document.body.appendChild(customHtml);

    customBody.style.overflowY = 'hidden';

    expect(isViewportScrollLocked({ win: window, html: customHtml, body: customBody })).toBe(true);

    document.body.removeChild(customHtml);
  });

  it('should use the getComputedStyle API from the provided win parameter', () => {
    html.style.overflowY = 'hidden';

    expect(isViewportScrollLocked({ win: window, html, body })).toBe(
      /hidden|clip/.test(window.getComputedStyle(html).overflowY)
    );
  });
});
