import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { getComputedStyle } from '.';

describe('getComputedStyle', () => {
  let testElement: HTMLElement;

  beforeEach(() => {
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    testElement.remove();
  });

  it('should return computed styles for a DOM element', () => {
    const styles = getComputedStyle(testElement);
    expect(styles).toBeInstanceOf(CSSStyleDeclaration);
  });

  it('should return correct display property for an element', () => {
    testElement.style.display = 'block';
    const styles = getComputedStyle(testElement);
    expect(styles.display).toBe('block');
  });

  it('should return correct color property for an element', () => {
    testElement.style.color = 'red';
    const styles = getComputedStyle(testElement);
    expect(styles.color).toBe('rgb(255, 0, 0)');
  });

  it('should return default styles for an unstyled element', () => {
    const styles = getComputedStyle(testElement);
    expect(styles).toBeDefined();
    expect(styles.display).toBeTruthy();
  });

  it('should handle elements with inline styles', () => {
    testElement.style.width = '100px';
    testElement.style.height = '50px';
    const styles = getComputedStyle(testElement);
    expect(styles.width).toBe('100px');
    expect(styles.height).toBe('50px');
  });

  it('should work with different element types', () => {
    const span = document.createElement('span');
    document.body.appendChild(span);
    const styles = getComputedStyle(span);
    expect(styles).toBeInstanceOf(CSSStyleDeclaration);
    span.remove();
  });

  it('should return styles for elements with CSS classes', () => {
    const style = document.createElement('style');
    style.textContent = '.test-class { margin: 10px; }';
    document.head.appendChild(style);

    testElement.className = 'test-class';
    const styles = getComputedStyle(testElement);
    expect(styles.margin).toBe('10px');

    style.remove();
  });
});
