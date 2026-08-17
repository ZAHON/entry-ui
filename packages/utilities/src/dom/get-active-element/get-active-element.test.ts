import { describe, it, expect } from 'vitest';
import { getActiveElement } from '.';

describe('getActiveElement', () => {
  it('should return the active element from the document', () => {
    const activeElement = document.createElement('input');
    const doc = { activeElement } as unknown as Document;

    expect(getActiveElement(doc)).toBe(activeElement);
  });

  it('should return null when there is no active element', () => {
    const doc = { activeElement: null } as unknown as Document;

    expect(getActiveElement(doc)).toBeNull();
  });

  it('should return the active element inside a shadow root', () => {
    const shadowInput = document.createElement('input');
    const shadowRoot = { activeElement: shadowInput } as unknown as ShadowRoot;
    const hostElement = { shadowRoot } as unknown as Element;
    const doc = { activeElement: hostElement } as unknown as Document;

    expect(getActiveElement(doc)).toBe(shadowInput);
  });

  it('should recursively resolve active element through nested shadow roots', () => {
    const deepInput = document.createElement('input');

    const deepShadowRoot = { activeElement: deepInput } as unknown as ShadowRoot;
    const middleElement = { shadowRoot: deepShadowRoot } as unknown as Element;

    const shallowShadowRoot = { activeElement: middleElement } as unknown as ShadowRoot;
    const hostElement = { shadowRoot: shallowShadowRoot } as unknown as Element;

    const doc = { activeElement: hostElement } as unknown as Document;

    expect(getActiveElement(doc)).toBe(deepInput);
  });

  it('should return the host element when shadow root has no active element', () => {
    const shadowRoot = { activeElement: null } as unknown as ShadowRoot;
    const hostElement = { shadowRoot } as unknown as Element;
    const doc = { activeElement: hostElement } as unknown as Document;

    expect(getActiveElement(doc)).toBe(hostElement);
  });

  it('should return the active element when it has no shadow root', () => {
    const activeElement = { shadowRoot: null } as unknown as Element;
    const doc = { activeElement } as unknown as Document;

    expect(getActiveElement(doc)).toBe(activeElement);
  });

  it('should return the active element when shadow root is undefined', () => {
    const activeElement = { shadowRoot: undefined } as unknown as Element;
    const doc = { activeElement } as unknown as Document;

    expect(getActiveElement(doc)).toBe(activeElement);
  });

  it('should handle a real focused DOM element', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    expect(getActiveElement(document)).toBe(input);

    document.body.removeChild(input);
  });
});
