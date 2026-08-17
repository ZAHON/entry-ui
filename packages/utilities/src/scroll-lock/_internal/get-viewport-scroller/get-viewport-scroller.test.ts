import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getViewportScroller } from '.';

describe('getViewportScroller', () => {
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

  it('should return the html element when it has overflow set to "auto"', () => {
    html.style.overflow = 'auto';

    expect(getViewportScroller({ html, body })).toBe(html);
  });

  it('should return the html element when it has overflow set to "scroll"', () => {
    html.style.overflow = 'scroll';

    expect(getViewportScroller({ html, body })).toBe(html);
  });

  it('should return the html element when it has overflow set to "hidden"', () => {
    html.style.overflow = 'hidden';

    expect(getViewportScroller({ html, body })).toBe(html);
  });

  it('should return the html element when it has overflow set to "clip"', () => {
    html.style.overflow = 'clip';

    expect(getViewportScroller({ html, body })).toBe(html);
  });

  it('should return the html element when it has overflow set to "overlay"', () => {
    html.style.overflow = 'overlay';

    expect(getViewportScroller({ html, body })).toBe(html);
  });

  it('should return the html element when only overflowX is set to a matching value', () => {
    html.style.overflowX = 'auto';

    expect(getViewportScroller({ html, body })).toBe(html);
  });

  it('should return the html element when only overflowY is set to a matching value', () => {
    html.style.overflowY = 'scroll';

    expect(getViewportScroller({ html, body })).toBe(html);
  });

  it('should return the body element when html has no explicit overflow declared', () => {
    expect(getViewportScroller({ html, body })).toBe(body);
  });

  it('should return the body element when html has overflow set to "visible"', () => {
    html.style.overflow = 'visible';

    expect(getViewportScroller({ html, body })).toBe(body);
  });

  it('should return the body element when html has overflow active but display set to "inline"', () => {
    html.style.overflow = 'auto';
    html.style.display = 'inline';

    expect(getViewportScroller({ html, body })).toBe(body);
  });

  it('should return the body element when html has overflow active but display set to "contents"', () => {
    html.style.overflow = 'auto';
    html.style.display = 'contents';

    expect(getViewportScroller({ html, body })).toBe(body);
  });

  it('should return the body element even when body itself has overflow set, if html does not', () => {
    body.style.overflow = 'auto';

    expect(getViewportScroller({ html, body })).toBe(body);
  });

  it('should ignore overflow declared on the body element when html already qualifies as a scroller', () => {
    html.style.overflow = 'auto';
    body.style.overflow = 'visible';

    expect(getViewportScroller({ html, body })).toBe(html);
  });

  it('should work with custom detached elements passed as html and body params', () => {
    const customHtml = document.createElement('html');
    const customBody = document.createElement('body');
    customHtml.appendChild(customBody);
    document.body.appendChild(customHtml);

    customHtml.style.overflow = 'scroll';

    expect(getViewportScroller({ html: customHtml, body: customBody })).toBe(customHtml);

    document.body.removeChild(customHtml);
  });

  it('should return the html element when overflowX is "hidden" and overflowY is "visible" (mixed axes)', () => {
    html.style.overflowX = 'hidden';
    html.style.overflowY = 'visible';

    expect(getViewportScroller({ html, body })).toBe(html);
  });

  it('should return the html element when overflowX is "visible" and overflowY is "auto" (mixed axes)', () => {
    html.style.overflowX = 'visible';
    html.style.overflowY = 'auto';

    expect(getViewportScroller({ html, body })).toBe(html);
  });

  it('should return the body element when overflowX and overflowY are both "visible"', () => {
    html.style.overflowX = 'visible';
    html.style.overflowY = 'visible';

    expect(getViewportScroller({ html, body })).toBe(body);
  });

  it('should return the body element when html overflow is set to "unset"', () => {
    html.style.overflow = 'unset';

    expect(getViewportScroller({ html, body })).toBe(body);
  });

  it('should return the body element when html overflow is set to "initial"', () => {
    html.style.overflow = 'initial';

    expect(getViewportScroller({ html, body })).toBe(body);
  });

  it('should return the html element even when its display is set to "none", as long as overflow is active', () => {
    html.style.display = 'none';
    html.style.overflow = 'auto';

    expect(getViewportScroller({ html, body })).toBe(html);
  });

  it('should not mutate the params object passed in', () => {
    const params = { html, body };
    html.style.overflow = 'auto';

    getViewportScroller(params);

    expect(params.html).toBe(html);
    expect(params.body).toBe(body);
  });

  it('should return a value that is strictly equal to either the html or body reference, never a new element', () => {
    html.style.overflow = 'scroll';
    const resultWhenHtmlScrolls = getViewportScroller({ html, body });

    html.removeAttribute('style');
    const resultWhenBodyScrolls = getViewportScroller({ html, body });

    expect([resultWhenHtmlScrolls, resultWhenBodyScrolls]).toEqual([html, body]);
  });
});
