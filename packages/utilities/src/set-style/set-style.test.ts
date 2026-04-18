import { describe, it, expect, beforeEach } from 'vitest';
import { setStyle } from '.';

describe('setStyle', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it('should apply a single style to the element', () => {
    setStyle({ element, style: { overflow: 'hidden' } });

    expect(element.style.overflow).toBe('hidden');
  });

  it('should apply multiple styles to the element', () => {
    setStyle({ element, style: { overflow: 'hidden', paddingRight: '15px' } });

    expect(element.style.overflow).toBe('hidden');
    expect(element.style.paddingRight).toBe('15px');
  });

  it('should not affect styles that are not in the style param', () => {
    element.style.color = 'red';
    setStyle({ element, style: { overflow: 'hidden' } });

    expect(element.style.color).toBe('red');
  });

  it('should overwrite an existing inline style with a new value', () => {
    element.style.overflow = 'scroll';
    setStyle({ element, style: { overflow: 'hidden' } });

    expect(element.style.overflow).toBe('hidden');
  });

  it('should return a function', () => {
    const cleanup = setStyle({ element, style: { overflow: 'hidden' } });

    expect(typeof cleanup).toBe('function');
  });

  it('should return a no-op function when styles are already applied', () => {
    element.style.overflow = 'hidden';
    const cleanup = setStyle({ element, style: { overflow: 'hidden' } });
    cleanup();

    expect(element.style.overflow).toBe('hidden');
  });

  it('should restore previous style value on cleanup', () => {
    element.style.overflow = 'scroll';
    const cleanup = setStyle({ element, style: { overflow: 'hidden' } });
    cleanup();

    expect(element.style.overflow).toBe('scroll');
  });

  it('should restore multiple styles on cleanup', () => {
    element.style.overflow = 'scroll';
    element.style.paddingRight = '10px';
    const cleanup = setStyle({ element, style: { overflow: 'hidden', paddingRight: '15px' } });
    cleanup();

    expect(element.style.overflow).toBe('scroll');
    expect(element.style.paddingRight).toBe('10px');
  });

  it('should remove style attribute on cleanup when no inline styles remain', () => {
    const cleanup = setStyle({ element, style: { overflow: 'hidden' } });
    cleanup();

    expect(element.hasAttribute('style')).toBe(false);
  });

  it('should not remove style attribute on cleanup when other inline styles remain', () => {
    element.style.color = 'red';
    const cleanup = setStyle({ element, style: { overflow: 'hidden' } });
    cleanup();

    expect(element.hasAttribute('style')).toBe(true);
    expect(element.style.color).toBe('red');
  });

  it('should restore style to empty string when there was no previous value', () => {
    const cleanup = setStyle({ element, style: { overflow: 'hidden' } });
    cleanup();

    expect(element.style.overflow).toBe('');
  });

  it('should not apply styles when called with an empty style object', () => {
    setStyle({ element, style: {} });

    expect(element.getAttribute('style')).toBeNull();
  });

  it('should be idempotent when cleanup is called multiple times', () => {
    const cleanup = setStyle({ element, style: { overflow: 'hidden' } });
    cleanup();
    cleanup();

    expect(element.style.overflow).toBe('');
    expect(element.hasAttribute('style')).toBe(false);
  });

  it('should not mutate the element when styles are already matching', () => {
    element.style.overflow = 'hidden';
    const attributeBefore = element.getAttribute('style');
    setStyle({ element, style: { overflow: 'hidden' } });

    expect(element.getAttribute('style')).toBe(attributeBefore);
  });

  it('should apply styles when only one of multiple styles differs', () => {
    element.style.overflow = 'hidden';
    element.style.paddingRight = '10px';
    setStyle({ element, style: { overflow: 'hidden', paddingRight: '15px' } });

    expect(element.style.paddingRight).toBe('15px');
  });
});
