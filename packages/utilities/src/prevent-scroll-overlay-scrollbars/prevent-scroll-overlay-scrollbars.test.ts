import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { preventScrollOverlayScrollbars } from '.';

describe('preventScrollOverlayScrollbars', () => {
  let html: HTMLElement;
  let body: HTMLElement;

  beforeEach(() => {
    html = document.documentElement;
    body = document.body;
  });

  afterEach(() => {
    html.removeAttribute('style');
    body.removeAttribute('style');
  });

  it('should set overflowY to "hidden" on the body when html does not establish its own scroll container', () => {
    preventScrollOverlayScrollbars({ html, body });

    expect(body.style.overflowY).toBe('hidden');
  });

  it('should set overflowX to "hidden" on the body when html does not establish its own scroll container', () => {
    preventScrollOverlayScrollbars({ html, body });

    expect(body.style.overflowX).toBe('hidden');
  });

  it('should not modify the overflow styles of the html element when body is the active viewport scroller', () => {
    preventScrollOverlayScrollbars({ html, body });

    expect(html.style.overflowY).toBe('');
    expect(html.style.overflowX).toBe('');
  });

  it('should set overflowY to "hidden" on the html element when it establishes its own scroll container', () => {
    html.style.overflow = 'auto';

    preventScrollOverlayScrollbars({ html, body });

    expect(html.style.overflowY).toBe('hidden');
  });

  it('should set overflowX to "hidden" on the html element when it establishes its own scroll container', () => {
    html.style.overflow = 'auto';

    preventScrollOverlayScrollbars({ html, body });

    expect(html.style.overflowX).toBe('hidden');
  });

  it('should not modify the overflow styles of the body element when html is the active viewport scroller', () => {
    html.style.overflow = 'auto';

    preventScrollOverlayScrollbars({ html, body });

    expect(body.style.overflowY).toBe('');
    expect(body.style.overflowX).toBe('');
  });

  it('should return a function', () => {
    const restore = preventScrollOverlayScrollbars({ html, body });

    expect(typeof restore).toBe('function');
  });

  it('should restore the original overflowY value on the body after calling the returned function', () => {
    body.style.overflowY = 'auto';

    const restore = preventScrollOverlayScrollbars({ html, body });
    restore();

    expect(body.style.overflowY).toBe('auto');
  });

  it('should restore the original overflowX value on the body after calling the returned function', () => {
    body.style.overflowX = 'scroll';

    const restore = preventScrollOverlayScrollbars({ html, body });
    restore();

    expect(body.style.overflowX).toBe('scroll');
  });

  it('should restore the original overflowY value on the html element after calling the returned function', () => {
    html.style.overflow = 'auto';
    html.style.overflowY = 'scroll';

    const restore = preventScrollOverlayScrollbars({ html, body });
    restore();

    expect(html.style.overflowY).toBe('scroll');
  });

  it('should restore the original overflowX value on the html element after calling the returned function', () => {
    html.style.overflow = 'auto';
    html.style.overflowX = 'hidden';

    const restore = preventScrollOverlayScrollbars({ html, body });
    restore();

    expect(html.style.overflowX).toBe('hidden');
  });

  it('should remove the style attribute from the body when no inline styles remain after restoration', () => {
    const restore = preventScrollOverlayScrollbars({ html, body });
    restore();

    expect(body.hasAttribute('style')).toBe(false);
  });

  it('should remove the style attribute from the html element when no inline styles remain after restoration', () => {
    const styleEl = document.createElement('style');
    styleEl.textContent = 'html { overflow: scroll; }';
    document.head.appendChild(styleEl);

    const restore = preventScrollOverlayScrollbars({ html, body });
    restore();

    expect(html.hasAttribute('style')).toBe(false);

    document.head.removeChild(styleEl);
  });

  it('should keep the style attribute on the body when other inline styles remain after restoration', () => {
    body.style.color = 'red';

    const restore = preventScrollOverlayScrollbars({ html, body });
    restore();

    expect(body.hasAttribute('style')).toBe(true);
    expect(body.style.color).toBe('red');
  });

  it('should keep the style attribute on the html element when other inline styles remain after restoration', () => {
    html.style.overflow = 'auto';
    html.style.fontSize = '16px';

    const restore = preventScrollOverlayScrollbars({ html, body });
    restore();

    expect(html.hasAttribute('style')).toBe(true);
    expect(html.style.fontSize).toBe('16px');
  });

  it('should keep the style attribute on the body when overflowY was originally set to a non-empty value', () => {
    body.style.overflowY = 'auto';

    const restore = preventScrollOverlayScrollbars({ html, body });
    restore();

    expect(body.hasAttribute('style')).toBe(true);
  });

  it('should not throw when the returned restoration function is called multiple times', () => {
    const restore = preventScrollOverlayScrollbars({ html, body });

    expect(() => {
      restore();
      restore();
      restore();
    }).not.toThrow();
  });

  it('should leave the style attribute removed when the returned restoration function is called multiple times', () => {
    const restore = preventScrollOverlayScrollbars({ html, body });
    restore();
    restore();

    expect(body.hasAttribute('style')).toBe(false);
  });

  it('should not affect the body when html is the active viewport scroller even after restoration', () => {
    html.style.overflow = 'auto';

    const restore = preventScrollOverlayScrollbars({ html, body });
    restore();

    expect(body.hasAttribute('style')).toBe(false);
  });

  it('should not affect the html element when body is the active viewport scroller even after restoration', () => {
    const restore = preventScrollOverlayScrollbars({ html, body });
    restore();

    expect(html.hasAttribute('style')).toBe(false);
  });

  it('should support locking scroll independently across multiple nested calls with separate restore functions', () => {
    const restoreFirst = preventScrollOverlayScrollbars({ html, body });
    body.style.overflowY = 'hidden';
    body.style.overflowX = 'hidden';

    const restoreSecond = preventScrollOverlayScrollbars({ html, body });

    expect(body.style.overflowY).toBe('hidden');
    expect(body.style.overflowX).toBe('hidden');

    restoreSecond();

    expect(body.style.overflowY).toBe('hidden');
    expect(body.style.overflowX).toBe('hidden');

    restoreFirst();

    expect(body.hasAttribute('style')).toBe(false);
  });

  it('should work correctly with custom detached html and body elements', () => {
    const customHtml = document.createElement('html');
    const customBody = document.createElement('body');
    customHtml.appendChild(customBody);
    document.body.appendChild(customHtml);

    const restore = preventScrollOverlayScrollbars({ html: customHtml, body: customBody });

    expect(customBody.style.overflowY).toBe('hidden');
    expect(customBody.style.overflowX).toBe('hidden');

    restore();

    expect(customBody.hasAttribute('style')).toBe(false);

    document.body.removeChild(customHtml);
  });

  it('should target the html element as scroller for custom detached elements when it establishes overflow', () => {
    const customHtml = document.createElement('html');
    const customBody = document.createElement('body');
    customHtml.appendChild(customBody);
    document.body.appendChild(customHtml);

    customHtml.style.overflow = 'scroll';

    const restore = preventScrollOverlayScrollbars({ html: customHtml, body: customBody });

    expect(customHtml.style.overflowY).toBe('hidden');
    expect(customHtml.style.overflowX).toBe('hidden');
    expect(customBody.style.overflowY).toBe('');

    restore();

    document.body.removeChild(customHtml);
  });
});
