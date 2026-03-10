import { describe, it, expect, vi } from 'vitest';
import { getDocument } from '.';

describe('getDocument', () => {
  it('should return the owner document of a given DOM node', () => {
    const node = { ownerDocument: document };
    expect(getDocument(node)).toBe(document);
  });

  it('should return the global document when node is null', () => {
    expect(getDocument(null)).toBe(document);
  });

  it('should return the global document when node is undefined', () => {
    expect(getDocument(undefined)).toBe(document);
  });

  it('should return the global document when node has no ownerDocument', () => {
    const node = {};
    expect(getDocument(node)).toBe(document);
  });

  it('should return a different document when node belongs to an iframe', () => {
    const iframeDocument = { body: {}, createElement: vi.fn() } as unknown as Document;
    const node = { ownerDocument: iframeDocument };
    expect(getDocument(node)).toBe(iframeDocument);
  });

  it('should return the global document when node ownerDocument is null', () => {
    const node = { ownerDocument: null };
    expect(getDocument(node)).toBe(document);
  });

  it('should return the global document when node ownerDocument is undefined', () => {
    const node = { ownerDocument: undefined };
    expect(getDocument(node)).toBe(document);
  });

  it('should return the global document when called with a falsy value like 0', () => {
    expect(getDocument(0)).toBe(document);
  });

  it('should return the global document when called with an empty string', () => {
    expect(getDocument('')).toBe(document);
  });

  it('should return the owner document when node is a real DOM element', () => {
    const element = window.document.createElement('div');
    expect(getDocument(element)).toBe(document);
  });
});
