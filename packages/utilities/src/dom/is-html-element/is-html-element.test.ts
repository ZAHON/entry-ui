import { describe, beforeEach, it, expect } from 'vitest';
import { isHTMLElement } from '.';

describe('isHTMLElement', () => {
  let testElement: HTMLElement;

  beforeEach(() => {
    testElement = document.createElement('div');
  });

  it('should return true for a valid HTMLElement', () => {
    const result = isHTMLElement(testElement);
    expect(result).toBe(true);
  });

  it('should return true for various HTML element types', () => {
    expect(isHTMLElement(document.createElement('div'))).toBe(true);
    expect(isHTMLElement(document.createElement('span'))).toBe(true);
    expect(isHTMLElement(document.createElement('button'))).toBe(true);
    expect(isHTMLElement(document.createElement('input'))).toBe(true);
    expect(isHTMLElement(document.createElement('section'))).toBe(true);
  });

  it('should return true for document.body', () => {
    const result = isHTMLElement(document.body);
    expect(result).toBe(true);
  });

  it('should return false for null', () => {
    const result = isHTMLElement(null);
    expect(result).toBe(false);
  });

  it('should return false for undefined', () => {
    const result = isHTMLElement(undefined);
    expect(result).toBe(false);
  });

  it('should return false for a string', () => {
    const result = isHTMLElement('div');
    expect(result).toBe(false);
  });

  it('should return false for a number', () => {
    const result = isHTMLElement(123);
    expect(result).toBe(false);
  });

  it('should return false for a plain object', () => {
    const result = isHTMLElement({ tagName: 'div' });
    expect(result).toBe(false);
  });

  it('should return false for an array', () => {
    const result = isHTMLElement([]);
    expect(result).toBe(false);
  });

  it('should return false for a text node', () => {
    const textNode = document.createTextNode('test');
    const result = isHTMLElement(textNode);
    expect(result).toBe(false);
  });

  it('should return false for a comment node', () => {
    const commentNode = document.createComment('test comment');
    const result = isHTMLElement(commentNode);
    expect(result).toBe(false);
  });

  it('should return false for a document fragment', () => {
    const fragment = document.createDocumentFragment();
    const result = isHTMLElement(fragment);
    expect(result).toBe(false);
  });

  it('should return false for document object', () => {
    const result = isHTMLElement(document);
    expect(result).toBe(false);
  });

  it('should return false for window object', () => {
    const result = isHTMLElement(window);
    expect(result).toBe(false);
  });

  it('should work with elements added to the DOM', () => {
    document.body.appendChild(testElement);
    const result = isHTMLElement(testElement);
    expect(result).toBe(true);
    testElement.remove();
  });

  it('should work with elements not added to the DOM', () => {
    const detachedElement = document.createElement('p');
    const result = isHTMLElement(detachedElement);
    expect(result).toBe(true);
  });

  it('should narrow the type correctly', () => {
    const value: unknown = document.createElement('div');

    if (isHTMLElement(value)) {
      expect(value.tagName).toBeDefined();
      expect(value.style).toBeDefined();
    }
  });
});
