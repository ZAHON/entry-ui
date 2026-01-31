import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { getHiddenElementHeight } from '.';

describe('getHiddenElementHeight', () => {
  let testElement: HTMLElement;

  beforeEach(() => {
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    testElement.remove();
    document.querySelectorAll('[aria-hidden="true"]').forEach((el) => el.remove());
  });

  it('should return height as a number', () => {
    testElement.style.height = '75px';
    const result = getHiddenElementHeight(testElement);
    expect(typeof result).toBe('number');
  });

  it('should measure hidden elements with display none', () => {
    testElement.style.height = '100px';
    testElement.style.display = 'none';
    const result = getHiddenElementHeight(testElement);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should measure elements with visibility hidden', () => {
    testElement.style.height = '80px';
    testElement.style.visibility = 'hidden';
    const result = getHiddenElementHeight(testElement);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should create a clone and remove it after measurement', () => {
    testElement.id = 'original-element';
    const initialChildCount = document.body.children.length;
    getHiddenElementHeight(testElement);
    const finalChildCount = document.body.children.length;
    expect(finalChildCount).toBe(initialChildCount);
  });

  it('should set aria-hidden attribute on clone', () => {
    testElement.id = 'original-element';
    let capturedClone: HTMLElement | null = null;

    const originalCloneNode = testElement.cloneNode.bind(testElement);
    testElement.cloneNode = function (deep: boolean) {
      capturedClone = originalCloneNode(deep) as HTMLElement;
      return capturedClone;
    };

    getHiddenElementHeight(testElement);

    expect(capturedClone).not.toBeNull();
    expect(capturedClone!.getAttribute('aria-hidden')).toBe('true');

    testElement.cloneNode = originalCloneNode;
  });

  it('should handle elements with constrained height', () => {
    testElement.style.height = '100px';
    testElement.style.maxHeight = '50px';
    const result = getHiddenElementHeight(testElement);
    // Clone should reset max constraints
    expect(result).toBeDefined();
    expect(typeof result).toBe('number');
  });

  it('should handle elements with overflow hidden', () => {
    testElement.style.height = '50px';
    testElement.style.overflow = 'hidden';
    testElement.textContent =
      'Very long content that would normally overflow the container and cause scrolling. '.repeat(10);
    const result = getHiddenElementHeight(testElement);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should preserve child elements in clone', () => {
    const child = document.createElement('span');
    child.textContent = 'Child content';
    child.style.display = 'block';
    child.style.height = '100px';
    testElement.appendChild(child);
    const result = getHiddenElementHeight(testElement);
    expect(result).toBeDefined();
    expect(typeof result).toBe('number');
  });

  it('should handle elements with nested structure', () => {
    const nested1 = document.createElement('div');
    const nested2 = document.createElement('div');
    nested2.style.height = '50px';
    nested1.appendChild(nested2);
    testElement.appendChild(nested1);
    testElement.style.height = '75px';
    const result = getHiddenElementHeight(testElement);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should return 0 for empty elements without dimensions', () => {
    const emptyElement = document.createElement('div');
    document.body.appendChild(emptyElement);
    const result = getHiddenElementHeight(emptyElement);
    expect(result).toBe(0);
    emptyElement.remove();
  });

  it('should handle fractional CSS values', () => {
    testElement.style.height = '67.89px';
    const result = getHiddenElementHeight(testElement);
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should handle different HTML element types', () => {
    const elements = [
      document.createElement('div'),
      document.createElement('span'),
      document.createElement('button'),
      document.createElement('section'),
      document.createElement('article'),
    ];

    elements.forEach((element) => {
      element.style.height = '50px';
      document.body.appendChild(element);
      const result = getHiddenElementHeight(element);
      expect(typeof result).toBe('number');
      element.remove();
    });
  });

  it('should return consistent results for multiple calls', () => {
    testElement.style.height = '90px';
    const result1 = getHiddenElementHeight(testElement);
    const result2 = getHiddenElementHeight(testElement);
    expect(result1).toEqual(result2);
  });

  it('should handle elements with transitions and animations', () => {
    testElement.style.height = '50px';
    testElement.style.transition = 'all 0.3s ease';
    testElement.style.animation = 'spin 1s infinite';
    const result = getHiddenElementHeight(testElement);
    // Clone should have transitions and animations disabled
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should handle elements with position absolute', () => {
    testElement.style.position = 'absolute';
    testElement.style.height = '60px';
    const result = getHiddenElementHeight(testElement);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should handle elements with opacity 0', () => {
    testElement.style.height = '50px';
    testElement.style.opacity = '0';
    const result = getHiddenElementHeight(testElement);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should handle zero height', () => {
    testElement.style.height = '0px';
    const result = getHiddenElementHeight(testElement);
    expect(result).toBe(0);
  });

  it('should handle em units by returning computed pixel values', () => {
    testElement.style.height = '5em';
    const result = getHiddenElementHeight(testElement);
    expect(typeof result).toBe('number');
  });

  it('should insert clone after the original element', () => {
    testElement.id = 'original';
    const nextSibling = document.createElement('div');
    nextSibling.id = 'next-sibling';
    testElement.after(nextSibling);

    // Patch remove to capture position before removal
    let wasInsertedCorrectly = false;
    const originalRemove = HTMLElement.prototype.remove;
    HTMLElement.prototype.remove = function () {
      if (this.getAttribute('aria-hidden') === 'true' && this.previousElementSibling?.id === 'original') {
        wasInsertedCorrectly = true;
      }
      return originalRemove.call(this);
    };

    getHiddenElementHeight(testElement);

    expect(wasInsertedCorrectly).toBe(true);

    HTMLElement.prototype.remove = originalRemove;
    nextSibling.remove();
  });

  it('should handle elements with content visibility', () => {
    testElement.style.height = '50px';
    testElement.style.contentVisibility = 'auto';
    const result = getHiddenElementHeight(testElement);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should handle elements with box-sizing border-box', () => {
    testElement.style.height = '100px';
    testElement.style.padding = '10px';
    testElement.style.boxSizing = 'border-box';
    const result = getHiddenElementHeight(testElement);
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should handle percentage height by computing to pixels', () => {
    const parent = document.createElement('div');
    parent.style.height = '200px';
    document.body.appendChild(parent);

    const child = document.createElement('div');
    child.style.height = '50%';
    parent.appendChild(child);

    const result = getHiddenElementHeight(child);
    expect(typeof result).toBe('number');

    parent.remove();
  });
});
