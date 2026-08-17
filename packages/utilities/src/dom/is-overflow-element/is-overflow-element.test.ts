import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { isOverflowElement } from '.';

describe('isOverflowElement', () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should return true when overflow is set to "auto"', () => {
    element.style.overflow = 'auto';

    expect(isOverflowElement(element)).toBe(true);
  });

  it('should return true when overflow is set to "scroll"', () => {
    element.style.overflow = 'scroll';

    expect(isOverflowElement(element)).toBe(true);
  });

  it('should return true when overflow is set to "hidden"', () => {
    element.style.overflow = 'hidden';

    expect(isOverflowElement(element)).toBe(true);
  });

  it('should return true when overflow is set to "clip"', () => {
    element.style.overflow = 'clip';

    expect(isOverflowElement(element)).toBe(true);
  });

  it('should return true when overflow is set to "overlay"', () => {
    element.style.overflow = 'overlay';

    expect(isOverflowElement(element)).toBe(true);
  });

  it('should return true when only overflowX is set to a matching value', () => {
    element.style.overflowX = 'auto';
    element.style.overflowY = 'visible';

    expect(isOverflowElement(element)).toBe(true);
  });

  it('should return true when only overflowY is set to a matching value', () => {
    element.style.overflowX = 'visible';
    element.style.overflowY = 'scroll';

    expect(isOverflowElement(element)).toBe(true);
  });

  it('should return false when overflow is set to "visible"', () => {
    element.style.overflow = 'visible';

    expect(isOverflowElement(element)).toBe(false);
  });

  it('should return false when no overflow property is set', () => {
    expect(isOverflowElement(element)).toBe(false);
  });

  it('should return false when display is set to "inline", even if overflow is active', () => {
    element.style.overflow = 'auto';
    element.style.display = 'inline';

    expect(isOverflowElement(element)).toBe(false);
  });

  it('should return false when display is set to "contents", even if overflow is active', () => {
    element.style.overflow = 'auto';
    element.style.display = 'contents';

    expect(isOverflowElement(element)).toBe(false);
  });

  it('should return true when display is set to "block" and overflow is active', () => {
    element.style.overflow = 'hidden';
    element.style.display = 'block';

    expect(isOverflowElement(element)).toBe(true);
  });

  it('should return true when display is set to "inline-block" and overflow is active', () => {
    element.style.overflow = 'auto';
    element.style.display = 'inline-block';

    expect(isOverflowElement(element)).toBe(true);
  });

  it('should return true when display is set to "flex" and overflow is active', () => {
    element.style.overflow = 'scroll';
    element.style.display = 'flex';

    expect(isOverflowElement(element)).toBe(true);
  });
});
