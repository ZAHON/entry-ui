import { describe, it, expect, beforeEach } from 'vitest';
import { setStyleProperty } from '.';

describe('setStyleProperty', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it('should apply a standard CSS property to the element', () => {
    setStyleProperty({ element, property: 'opacity', value: '0.5' });

    expect(element.style.getPropertyValue('opacity')).toBe('0.5');
  });

  it('should apply a CSS custom property to the element', () => {
    setStyleProperty({ element, property: '--accent-color', value: 'blue' });

    expect(element.style.getPropertyValue('--accent-color')).toBe('blue');
  });

  it('should overwrite an existing property value', () => {
    element.style.setProperty('opacity', '0.3');
    setStyleProperty({ element, property: 'opacity', value: '0.8' });

    expect(element.style.getPropertyValue('opacity')).toBe('0.8');
  });

  it('should not affect other properties on the element', () => {
    element.style.setProperty('color', 'red');
    setStyleProperty({ element, property: 'opacity', value: '0.5' });

    expect(element.style.getPropertyValue('color')).toBe('red');
  });

  it('should return a function', () => {
    const cleanup = setStyleProperty({ element, property: 'opacity', value: '0.5' });

    expect(typeof cleanup).toBe('function');
  });

  it('should return a no-op function when the property already has the target value', () => {
    element.style.setProperty('opacity', '0.5');
    const cleanup = setStyleProperty({ element, property: 'opacity', value: '0.5' });
    cleanup();

    expect(element.style.getPropertyValue('opacity')).toBe('0.5');
  });

  it('should restore the previous property value on cleanup', () => {
    element.style.setProperty('opacity', '0.3');
    const cleanup = setStyleProperty({ element, property: 'opacity', value: '0.8' });
    cleanup();

    expect(element.style.getPropertyValue('opacity')).toBe('0.3');
  });

  it('should restore a CSS custom property on cleanup', () => {
    element.style.setProperty('--accent-color', 'red');
    const cleanup = setStyleProperty({ element, property: '--accent-color', value: 'blue' });
    cleanup();

    expect(element.style.getPropertyValue('--accent-color')).toBe('red');
  });

  it('should remove style attribute on cleanup when no inline styles remain', () => {
    const cleanup = setStyleProperty({ element, property: 'opacity', value: '0.5' });
    cleanup();

    expect(element.hasAttribute('style')).toBe(false);
  });

  it('should not remove style attribute on cleanup when other inline styles remain', () => {
    element.style.setProperty('color', 'red');
    const cleanup = setStyleProperty({ element, property: 'opacity', value: '0.5' });
    cleanup();

    expect(element.hasAttribute('style')).toBe(true);
    expect(element.style.getPropertyValue('color')).toBe('red');
  });

  it('should set property to empty string on cleanup when there was no previous value', () => {
    const cleanup = setStyleProperty({ element, property: 'opacity', value: '0.5' });
    cleanup();

    expect(element.style.getPropertyValue('opacity')).toBe('');
  });

  it('should be idempotent when cleanup is called multiple times', () => {
    const cleanup = setStyleProperty({ element, property: 'opacity', value: '0.5' });
    cleanup();
    cleanup();

    expect(element.style.getPropertyValue('opacity')).toBe('');
    expect(element.hasAttribute('style')).toBe(false);
  });

  it('should not mutate the element when property already has the target value', () => {
    element.style.setProperty('opacity', '0.5');
    const attributeBefore = element.getAttribute('style');
    setStyleProperty({ element, property: 'opacity', value: '0.5' });

    expect(element.getAttribute('style')).toBe(attributeBefore);
  });
});
