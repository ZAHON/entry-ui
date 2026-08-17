import { describe, beforeEach, it, expect } from 'vitest';
import { getWindow } from '.';

describe('getWindow', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
  });

  it('should return the window object for a valid DOM element', () => {
    const result = getWindow(mockElement);
    expect(result).toBe(window);
  });

  it('should return the global window when node is null', () => {
    const result = getWindow(null);
    expect(result).toBe(window);
  });

  it('should return the global window when node is undefined', () => {
    const result = getWindow(undefined);
    expect(result).toBe(window);
  });

  it('should return the owner document defaultView when available', () => {
    const result = getWindow(mockElement);
    expect(result).toBe(mockElement.ownerDocument.defaultView);
  });

  it('should return the global window for text nodes', () => {
    const textNode = document.createTextNode('test');
    const result = getWindow(textNode);
    expect(result).toBe(window);
  });

  it('should return the global window for comment nodes', () => {
    const commentNode = document.createComment('test comment');
    const result = getWindow(commentNode);
    expect(result).toBe(window);
  });

  it('should return the global window when passed an object without ownerDocument', () => {
    const invalidNode = { someProperty: 'value' };
    const result = getWindow(invalidNode);
    expect(result).toBe(window);
  });

  it('should return the global window when ownerDocument is null', () => {
    const mockNode = {
      ownerDocument: null,
    };
    const result = getWindow(mockNode);
    expect(result).toBe(window);
  });

  it('should return the global window when defaultView is null', () => {
    const mockNode = {
      ownerDocument: {
        defaultView: null,
      },
    };
    const result = getWindow(mockNode);
    expect(result).toBe(window);
  });
});
