import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { preventBodyScroll } from './prevent-body-scroll';

type MockVisualViewport = {
  offsetLeft: number;
  offsetTop: number;
};

type MockWindow = {
  innerWidth: number;
  scrollX: number;
  scrollY: number;
  scrollTo: ReturnType<typeof vi.fn>;
  visualViewport: MockVisualViewport | null;
};

type MockDocument = Document & {
  defaultView: MockWindow;
};

const createMockDocument = (): MockDocument => {
  const documentElement = document.createElement('html') as HTMLElement;
  const body = document.createElement('body') as HTMLElement;

  Object.defineProperty(documentElement, 'clientWidth', { value: 1024, configurable: true });
  Object.defineProperty(documentElement, 'scrollLeft', { value: 0, configurable: true });
  Object.defineProperty(documentElement, 'getBoundingClientRect', {
    value: () => ({ left: 0, top: 0, right: 1024, bottom: 768, width: 1024, height: 768 }),
    configurable: true,
  });

  const mockDoc = {
    documentElement,
    body,
    defaultView: {
      innerWidth: 1024,
      scrollX: 0,
      scrollY: 0,
      scrollTo: vi.fn(),
      visualViewport: null as MockVisualViewport | null,
    },
  };

  return mockDoc as unknown as MockDocument;
};

const setNavigatorPlatform = (platform: string) => {
  Object.defineProperty(navigator, 'platform', {
    value: platform,
    configurable: true,
  });
  Object.defineProperty(navigator, 'maxTouchPoints', {
    value: 0,
    configurable: true,
  });
};

describe('preventBodyScroll', () => {
  let mockDoc: MockDocument;

  beforeEach(() => {
    setNavigatorPlatform('Win32');
    mockDoc = createMockDocument();
  });

  afterEach(() => {
    (mockDoc.body as HTMLElement).removeAttribute('data-scroll-lock');
    (mockDoc.body as HTMLElement).removeAttribute('style');
    (mockDoc.documentElement as HTMLElement).removeAttribute('style');
  });

  it('should set data-scroll-lock attribute on body when called', () => {
    preventBodyScroll(mockDoc);

    expect(mockDoc.body.hasAttribute('data-scroll-lock')).toBe(true);
  });

  it('should remove data-scroll-lock attribute on cleanup', () => {
    const unlock = preventBodyScroll(mockDoc);

    unlock();

    expect(mockDoc.body.hasAttribute('data-scroll-lock')).toBe(false);
  });

  it('should set overflow hidden on body', () => {
    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.overflow).toBe('hidden');
  });

  it('should restore original overflow style on cleanup', () => {
    mockDoc.body.style.overflow = 'auto';

    const unlock = preventBodyScroll(mockDoc);
    unlock();

    expect(mockDoc.body.style.overflow).toBe('auto');
  });

  it('should set --scrollbar-width CSS variable on documentElement', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1009, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;

    preventBodyScroll(mockDoc);

    expect(mockDoc.documentElement.style.getPropertyValue('--scrollbar-width')).toBe('15px');
  });

  it('should remove --scrollbar-width CSS variable on cleanup', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1009, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;

    const unlock = preventBodyScroll(mockDoc);
    unlock();

    expect(mockDoc.documentElement.style.getPropertyValue('--scrollbar-width')).toBe('');
  });

  it('should add right padding equal to scrollbar width when scrollbar is present and no stable gutter', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1009, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.paddingRight).toBe('15px');
  });

  it('should not add padding when scrollbar width is zero', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1024, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.paddingRight).toBe('');
    expect(mockDoc.body.style.paddingLeft).toBe('');
  });

  it('should not add padding when documentElement has scrollbar-gutter stable', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1009, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;
    mockDoc.documentElement.style.setProperty('scrollbar-gutter', 'stable');

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.paddingRight).toBe('');
  });

  it('should not add padding when body has scrollbar-gutter stable', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1009, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;
    mockDoc.body.style.setProperty('scrollbar-gutter', 'stable');

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.paddingRight).toBe('');
  });

  it('should not add padding when scrollbar-gutter is stable both-edges', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1009, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;
    mockDoc.documentElement.style.setProperty('scrollbar-gutter', 'stable both-edges');

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.paddingRight).toBe('');
  });

  it('should apply left padding when RTL layout is detected via positive documentLeft', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1009, configurable: true });
    Object.defineProperty(mockDoc.documentElement, 'scrollLeft', { value: 0, configurable: true });
    Object.defineProperty(mockDoc.documentElement, 'getBoundingClientRect', {
      value: () => ({ left: 15, top: 0, right: 1024, bottom: 768, width: 1024, height: 768 }),
      configurable: true,
    });
    mockDoc.defaultView.innerWidth = 1024;

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.paddingLeft).toBe('15px');
    expect(mockDoc.body.style.paddingRight).toBe('');
  });

  it('should return no-op when body already has data-scroll-lock attribute', () => {
    mockDoc.body.setAttribute('data-scroll-lock', '');

    const unlock = preventBodyScroll(mockDoc);
    unlock();

    expect(mockDoc.body.hasAttribute('data-scroll-lock')).toBe(true);
    expect(mockDoc.body.style.overflow).toBe('');
  });

  it('should not apply styles twice if called when scroll lock is already active', () => {
    mockDoc.body.setAttribute('data-scroll-lock', '');

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.overflow).toBe('');
  });

  it('should remove style attribute from body completely on cleanup when no prior styles', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1009, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;

    const unlock = preventBodyScroll(mockDoc);
    unlock();

    expect(mockDoc.body.hasAttribute('style')).toBe(false);
  });

  it('should remove style attribute from documentElement on cleanup when no prior custom properties', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1009, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;

    const unlock = preventBodyScroll(mockDoc);
    unlock();

    expect(mockDoc.documentElement.hasAttribute('style')).toBe(false);
  });

  it('should use position fixed strategy on iOS iPhone', () => {
    setNavigatorPlatform('iPhone');

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.position).toBe('fixed');
    expect(mockDoc.body.style.overflow).toBe('hidden');
  });

  it('should use position fixed strategy on iOS iPad', () => {
    setNavigatorPlatform('iPad');

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.position).toBe('fixed');
  });

  it('should use position fixed strategy on Mac with touch points (iPadOS)', () => {
    setNavigatorPlatform('MacIntel');
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 5, configurable: true });

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.position).toBe('fixed');
  });

  it('should set correct top offset on iOS based on current scrollY', () => {
    setNavigatorPlatform('iPhone');
    mockDoc.defaultView.scrollY = 300;
    mockDoc.defaultView.scrollX = 0;

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.top).toBe('-300px');
  });

  it('should set correct left offset on iOS based on current scrollX', () => {
    setNavigatorPlatform('iPhone');
    mockDoc.defaultView.scrollX = 50;
    mockDoc.defaultView.scrollY = 0;

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.left).toBe('-50px');
  });

  it('should account for visualViewport offsets on iOS when available', () => {
    setNavigatorPlatform('iPhone');
    mockDoc.defaultView.scrollY = 300;
    mockDoc.defaultView.scrollX = 0;

    // @ts-expect-error - MockVisualViewport intentionally omits the full VisualViewport interface
    mockDoc.defaultView.visualViewport = { offsetLeft: 0, offsetTop: 10 };

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.top).toBe('-290px');
  });

  it('should fall back to zero offsets on iOS when visualViewport is unavailable', () => {
    setNavigatorPlatform('iPhone');
    mockDoc.defaultView.scrollY = 200;
    mockDoc.defaultView.scrollX = 0;
    mockDoc.defaultView.visualViewport = null;

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.top).toBe('-200px');
  });

  it('should set right to 0 on iOS to prevent horizontal overflow', () => {
    setNavigatorPlatform('iPhone');

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.right).toBe('0px');
  });

  it('should add padding on iOS when scrollbar is present and no stable gutter', () => {
    setNavigatorPlatform('iPhone');
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1009, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.paddingRight).toBe('15px');
  });

  it('should not add padding on iOS when scrollbar-gutter stable is set', () => {
    setNavigatorPlatform('iPhone');
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1009, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;
    mockDoc.documentElement.style.setProperty('scrollbar-gutter', 'stable');

    preventBodyScroll(mockDoc);

    expect(mockDoc.body.style.paddingRight).toBe('');
  });

  it('should restore scroll position after unlock on iOS', () => {
    setNavigatorPlatform('iPhone');
    mockDoc.defaultView.scrollX = 0;
    mockDoc.defaultView.scrollY = 300;

    const unlock = preventBodyScroll(mockDoc);
    unlock();

    expect(mockDoc.defaultView.scrollTo).toHaveBeenCalledWith({
      left: 0,
      top: 300,
      behavior: 'instant',
    });
  });

  it('should not call scrollTo on cleanup for non-iOS platforms', () => {
    setNavigatorPlatform('Win32');

    const unlock = preventBodyScroll(mockDoc);
    unlock();

    expect(mockDoc.defaultView.scrollTo).not.toHaveBeenCalled();
  });

  it('should restore body styles completely after unlock on iOS', () => {
    setNavigatorPlatform('iPhone');

    const unlock = preventBodyScroll(mockDoc);
    unlock();

    expect(mockDoc.body.style.position).toBe('');
    expect(mockDoc.body.style.top).toBe('');
    expect(mockDoc.body.style.left).toBe('');
    expect(mockDoc.body.style.right).toBe('');
    expect(mockDoc.body.style.overflow).toBe('');
  });

  it('should use window and document globals as fallback when no doc argument is passed', () => {
    document.body.removeAttribute('data-scroll-lock');

    const unlock = preventBodyScroll();

    expect(document.body.hasAttribute('data-scroll-lock')).toBe(true);

    unlock();

    expect(document.body.hasAttribute('data-scroll-lock')).toBe(false);
  });

  it('should not override an existing --scrollbar-width property if it already has the same value', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1009, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;
    mockDoc.documentElement.style.setProperty('--scrollbar-width', '15px');

    const setSpy = vi.spyOn(mockDoc.documentElement.style, 'setProperty');

    preventBodyScroll(mockDoc);

    expect(setSpy).not.toHaveBeenCalledWith('--scrollbar-width', '15px');
  });

  it('should restore a pre-existing --scrollbar-width value on cleanup', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1004, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;
    mockDoc.documentElement.style.setProperty('--scrollbar-width', '5px');

    const unlock = preventBodyScroll(mockDoc);
    unlock();

    expect(mockDoc.documentElement.style.getPropertyValue('--scrollbar-width')).toBe('5px');
  });

  it('should restore pre-existing padding on body cleanup', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1009, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;
    mockDoc.body.style.paddingRight = '8px';

    const unlock = preventBodyScroll(mockDoc);
    unlock();

    expect(mockDoc.body.style.paddingRight).toBe('8px');
  });

  it('should set --scrollbar-width to 0px when there is no scrollbar', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1024, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;

    preventBodyScroll(mockDoc);

    expect(mockDoc.documentElement.style.getPropertyValue('--scrollbar-width')).toBe('0px');
  });

  it('should handle fractional scrollbar widths by using raw pixel difference', () => {
    Object.defineProperty(mockDoc.documentElement, 'clientWidth', { value: 1007, configurable: true });
    mockDoc.defaultView.innerWidth = 1024;

    preventBodyScroll(mockDoc);

    expect(mockDoc.documentElement.style.getPropertyValue('--scrollbar-width')).toBe('17px');
    expect(mockDoc.body.style.paddingRight).toBe('17px');
  });
});
