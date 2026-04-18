import { describe, it, expect } from 'vitest';
import { hasStableScrollbarGutter } from '.';

describe('hasStableScrollbarGutter', () => {
  it('should return true when scrollbarGutter is exactly "stable"', () => {
    const element = document.createElement('div');
    element.style.scrollbarGutter = 'stable';

    expect(hasStableScrollbarGutter(element)).toBe(true);
  });

  it('should return true when scrollbarGutter starts with "stable " (with space)', () => {
    const element = document.createElement('div');
    element.style.scrollbarGutter = 'stable both-edges';

    expect(hasStableScrollbarGutter(element)).toBe(true);
  });

  it('should return false when scrollbarGutter is "auto"', () => {
    const element = document.createElement('div');
    element.style.scrollbarGutter = 'auto';

    expect(hasStableScrollbarGutter(element)).toBe(false);
  });

  it('should return false when scrollbarGutter is not set', () => {
    const element = document.createElement('div');

    expect(hasStableScrollbarGutter(element)).toBe(false);
  });

  it('should return false when scrollbarGutter contains "stable" but not at the start', () => {
    const element = document.createElement('div');
    element.style.scrollbarGutter = 'both-edges stable';

    expect(hasStableScrollbarGutter(element)).toBe(false);
  });

  it('should return false when scrollbarGutter is "stableX" (no space after stable)', () => {
    const element = document.createElement('div');
    element.style.scrollbarGutter = 'stableX';

    expect(hasStableScrollbarGutter(element)).toBe(false);
  });

  it('should work correctly for different HTML element types', () => {
    const elements = ['section', 'article', 'main', 'aside', 'nav'].map((tag) => {
      const el = document.createElement(tag);
      el.style.scrollbarGutter = 'stable';
      return el;
    });

    elements.forEach((el) => expect(hasStableScrollbarGutter(el)).toBe(true));
  });

  it('should return false after scrollbarGutter style is removed', () => {
    const element = document.createElement('div');
    element.style.scrollbarGutter = 'stable';
    element.style.scrollbarGutter = '';

    expect(hasStableScrollbarGutter(element)).toBe(false);
  });

  it('should return false after scrollbarGutter is changed from "stable" to "auto"', () => {
    const element = document.createElement('div');
    element.style.scrollbarGutter = 'stable';
    element.style.scrollbarGutter = 'auto';

    expect(hasStableScrollbarGutter(element)).toBe(false);
  });

  it('should return true after scrollbarGutter is changed from "auto" to "stable"', () => {
    const element = document.createElement('div');
    element.style.scrollbarGutter = 'auto';
    element.style.scrollbarGutter = 'stable';

    expect(hasStableScrollbarGutter(element)).toBe(true);
  });
});
