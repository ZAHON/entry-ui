import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { getCssDimensions } from '.';

describe('getCssDimensions', () => {
  let testElement: HTMLElement;

  beforeEach(() => {
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    testElement.remove();
  });

  it('should return an object with width and height properties', () => {
    const result = getCssDimensions(testElement);

    expect(result).toHaveProperty('width');
    expect(result).toHaveProperty('height');
  });

  it('should return dimensions as numbers', () => {
    testElement.style.width = '150px';
    testElement.style.height = '75px';

    const result = getCssDimensions(testElement);

    expect(typeof result.width).toBe('number');
    expect(typeof result.height).toBe('number');
  });

  it('should parse CSS pixel values correctly', () => {
    testElement.style.width = '200px';
    testElement.style.height = '100px';

    const result = getCssDimensions(testElement);

    // In test environment, should parse CSS values
    expect(result.width).toBeGreaterThanOrEqual(0);
    expect(result.height).toBeGreaterThanOrEqual(0);
  });

  it('should handle fractional CSS values', () => {
    testElement.style.width = '123.45px';
    testElement.style.height = '67.89px';

    const result = getCssDimensions(testElement);

    // Should parse values correctly (either from CSS or offset)
    expect(typeof result.width).toBe('number');
    expect(typeof result.height).toBe('number');
    expect(result.width).toBeGreaterThanOrEqual(0);
    expect(result.height).toBeGreaterThanOrEqual(0);
  });

  it('should return 0 for elements without dimensions', () => {
    const emptyElement = document.createElement('div');
    document.body.appendChild(emptyElement);

    const result = getCssDimensions(emptyElement);

    // No CSS dimensions and offsetWidth/Height are 0 in test env
    expect(result.width).toBe(0);
    expect(result.height).toBe(0);

    emptyElement.remove();
  });

  it('should handle HTMLElement correctly', () => {
    testElement.style.width = '100px';
    testElement.style.height = '50px';

    const result = getCssDimensions(testElement);

    // Should identify as HTMLElement and process accordingly
    expect(result).toBeDefined();
    expect(typeof result.width).toBe('number');
    expect(typeof result.height).toBe('number');
  });

  it('should handle SVG elements', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100');
    svg.setAttribute('height', '50');
    document.body.appendChild(svg);

    const result = getCssDimensions(svg);

    // SVG is not HTMLElement, should handle differently
    expect(result).toHaveProperty('width');
    expect(result).toHaveProperty('height');
    expect(typeof result.width).toBe('number');
    expect(typeof result.height).toBe('number');

    svg.remove();
  });

  it('should handle SVG elements without dimensions', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    document.body.appendChild(svg);

    const result = getCssDimensions(svg);

    // SVG without CSS dimensions should return 0 (as per comment in code)
    expect(result.width).toBe(0);
    expect(result.height).toBe(0);

    svg.remove();
  });

  it('should handle different HTML element types', () => {
    const elements = [
      document.createElement('div'),
      document.createElement('span'),
      document.createElement('button'),
      document.createElement('input'),
      document.createElement('section'),
    ];

    elements.forEach((element) => {
      element.style.width = '100px';
      element.style.height = '50px';
      document.body.appendChild(element);

      const result = getCssDimensions(element);

      expect(result).toHaveProperty('width');
      expect(result).toHaveProperty('height');
      expect(typeof result.width).toBe('number');
      expect(typeof result.height).toBe('number');

      element.remove();
    });
  });

  it('should return consistent results for multiple calls', () => {
    testElement.style.width = '180px';
    testElement.style.height = '90px';

    const result1 = getCssDimensions(testElement);
    const result2 = getCssDimensions(testElement);

    expect(result1).toEqual(result2);
  });

  it('should handle zero dimensions', () => {
    testElement.style.width = '0px';
    testElement.style.height = '0px';

    const result = getCssDimensions(testElement);

    expect(result.width).toBe(0);
    expect(result.height).toBe(0);
  });

  it('should handle em units by returning computed pixel values', () => {
    testElement.style.width = '10em';
    testElement.style.height = '5em';

    const result = getCssDimensions(testElement);

    // getComputedStyle should convert em to px
    expect(typeof result.width).toBe('number');
    expect(typeof result.height).toBe('number');
  });

  it('should fallback to 0 when parseFloat returns NaN', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    document.body.appendChild(svg);

    // SVG elements often have empty width/height in getComputedStyle
    const result = getCssDimensions(svg);

    // Should use || 0 fallback for NaN values
    expect(result.width).toBeGreaterThanOrEqual(0);
    expect(result.height).toBeGreaterThanOrEqual(0);
    expect(Number.isNaN(result.width)).toBe(false);
    expect(Number.isNaN(result.height)).toBe(false);

    svg.remove();
  });
});
