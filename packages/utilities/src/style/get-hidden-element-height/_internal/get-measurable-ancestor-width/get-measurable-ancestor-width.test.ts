import { describe, it, expect } from 'vitest';
import { getMeasurableAncestorWidth } from '.';

describe('getMeasurableAncestorWidth', () => {
  const setClientWidth = (element: Element, width: number) => {
    Object.defineProperty(element, 'clientWidth', { value: width, configurable: true });
  };

  it('should return the element own width when it is measurable', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    setClientWidth(div, 200);

    expect(getMeasurableAncestorWidth(div)).toBe(200);

    div.remove();
  });

  it('should subtract the element own padding when returning its own width', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    setClientWidth(div, 200);
    div.style.paddingLeft = '10px';
    div.style.paddingRight = '20px';

    expect(getMeasurableAncestorWidth(div)).toBe(170);

    div.remove();
  });

  it('should walk up to the parent when the element own width is 0', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);

    setClientWidth(parent, 300);
    setClientWidth(child, 0);

    expect(getMeasurableAncestorWidth(child)).toBe(300);

    parent.remove();
  });

  it('should subtract the parent padding when falling back to it', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);

    setClientWidth(parent, 300);
    parent.style.paddingLeft = '15px';
    parent.style.paddingRight = '15px';
    setClientWidth(child, 0);

    expect(getMeasurableAncestorWidth(child)).toBe(270);

    parent.remove();
  });

  it('should walk up multiple levels until a measurable ancestor is found', () => {
    const grandparent = document.createElement('div');
    const parent = document.createElement('div');
    const child = document.createElement('div');

    grandparent.appendChild(parent);
    parent.appendChild(child);
    document.body.appendChild(grandparent);

    setClientWidth(grandparent, 400);
    setClientWidth(parent, 0);
    setClientWidth(child, 0);

    expect(getMeasurableAncestorWidth(child)).toBe(400);

    grandparent.remove();
  });

  it('should stop at the nearest measurable ancestor instead of continuing further up', () => {
    const grandparent = document.createElement('div');
    const parent = document.createElement('div');
    const child = document.createElement('div');

    grandparent.appendChild(parent);
    parent.appendChild(child);
    document.body.appendChild(grandparent);

    setClientWidth(grandparent, 500);
    setClientWidth(parent, 250);
    setClientWidth(child, 0);

    expect(getMeasurableAncestorWidth(child)).toBe(250);

    grandparent.remove();
  });

  it('should return null when the element and all ancestors have a width of 0', () => {
    const grandparent = document.createElement('div');
    const parent = document.createElement('div');
    const child = document.createElement('div');

    grandparent.appendChild(parent);
    parent.appendChild(child);
    document.body.appendChild(grandparent);

    setClientWidth(grandparent, 0);
    setClientWidth(parent, 0);
    setClientWidth(child, 0);

    expect(getMeasurableAncestorWidth(child)).toBeNull();

    grandparent.remove();
  });

  it('should return null when the element has no parent and its own width is 0', () => {
    const div = document.createElement('div');
    setClientWidth(div, 0);

    expect(getMeasurableAncestorWidth(div)).toBeNull();
  });

  it('should return null when the element is detached from the document and unmeasurable', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);

    setClientWidth(parent, 0);
    setClientWidth(child, 0);

    expect(getMeasurableAncestorWidth(child)).toBeNull();
  });

  it('should not traverse past the document root when no ancestor is measurable', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    setClientWidth(div, 0);
    setClientWidth(document.body, 0);
    setClientWidth(document.documentElement, 0);

    expect(getMeasurableAncestorWidth(div)).toBeNull();

    div.remove();
  });

  it('should treat a negative content-box width (padding exceeding clientWidth) as not measurable and continue walking up', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');

    parent.appendChild(child);
    document.body.appendChild(parent);

    setClientWidth(parent, 300);
    setClientWidth(child, 10);
    child.style.paddingLeft = '20px';
    child.style.paddingRight = '20px';

    expect(getMeasurableAncestorWidth(child)).toBe(300);

    parent.remove();
  });
});
