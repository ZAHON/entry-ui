import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { focusFirstElement } from '.';

describe('focusFirstElement', () => {
  let elementA: HTMLButtonElement;
  let elementB: HTMLButtonElement;
  let elementC: HTMLButtonElement;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    elementA = document.createElement('button');
    elementB = document.createElement('button');
    elementC = document.createElement('button');
    inputElement = document.createElement('input');

    document.body.appendChild(elementA);
    document.body.appendChild(elementB);
    document.body.appendChild(elementC);
    document.body.appendChild(inputElement);
  });

  afterEach(() => {
    document.body.removeChild(elementA);
    document.body.removeChild(elementB);
    document.body.removeChild(elementC);
    document.body.removeChild(inputElement);
    vi.restoreAllMocks();
  });

  it('should not throw when candidates array is empty', () => {
    expect(() => focusFirstElement({ candidates: [] })).not.toThrow();
  });

  it('should not change active element when candidates array is empty', () => {
    elementA.focus();
    const previousActive = document.activeElement;

    focusFirstElement({ candidates: [] });

    expect(document.activeElement).toBe(previousActive);
  });

  it('should focus the only candidate when it is not currently active', () => {
    elementB.focus();

    focusFirstElement({ candidates: [elementA] });

    expect(document.activeElement).toBe(elementA);
  });

  it('should not change focus when the only candidate is already the active element', () => {
    elementA.focus();

    focusFirstElement({ candidates: [elementA] });

    expect(document.activeElement).toBe(elementA);
  });

  it('should focus the first candidate when no element is currently focused', () => {
    (document.activeElement as HTMLElement)?.blur?.();

    focusFirstElement({ candidates: [elementA, elementB, elementC] });

    expect(document.activeElement).toBe(elementA);
  });

  it('should focus the first candidate and not move focus to subsequent ones', () => {
    elementC.focus();

    const focusSpy = vi.spyOn(elementB, 'focus');

    focusFirstElement({ candidates: [elementA, elementB, elementC] });

    expect(document.activeElement).toBe(elementA);
    expect(focusSpy).not.toHaveBeenCalled();
  });

  it('should return early without focusing anything when a candidate is already the active element', () => {
    const spyA = vi.spyOn(elementA, 'focus');
    const spyB = vi.spyOn(elementB, 'focus');

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(elementA);

    focusFirstElement({ candidates: [elementA, elementB, elementC] });

    expect(spyA).not.toHaveBeenCalled();
    expect(spyB).not.toHaveBeenCalled();
  });

  it('should stop iterating as soon as a candidate successfully receives focus', () => {
    const spyB = vi.spyOn(elementB, 'focus');
    const spyC = vi.spyOn(elementC, 'focus');

    vi.spyOn(document, 'activeElement', 'get')
      .mockReturnValueOnce(elementA)
      .mockReturnValueOnce(elementA)
      .mockReturnValueOnce(elementB)
      .mockReturnValue(elementB);

    focusFirstElement({ candidates: [elementB, elementC] });

    expect(spyB).toHaveBeenCalledOnce();
    expect(spyC).not.toHaveBeenCalled();
  });

  it('should try all candidates if none can receive focus', () => {
    elementA.focus();

    const spyB = vi.spyOn(elementB, 'focus');
    const spyC = vi.spyOn(elementC, 'focus');

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(elementA);

    focusFirstElement({ candidates: [elementB, elementC] });

    expect(spyB).toHaveBeenCalledOnce();
    expect(spyC).toHaveBeenCalledOnce();
  });

  it('should forward preventScroll: true to the focused candidate', () => {
    elementB.focus();

    const spy = vi.spyOn(elementA, 'focus');

    focusFirstElement({ candidates: [elementA], preventScroll: true });

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ preventScroll: true }));
  });

  it('should forward preventScroll: false by default', () => {
    elementB.focus();

    const spy = vi.spyOn(elementA, 'focus');

    focusFirstElement({ candidates: [elementA] });

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ preventScroll: false }));
  });

  it('should forward focusVisible: true to the focused candidate', () => {
    elementB.focus();

    const spy = vi.spyOn(elementA, 'focus');

    focusFirstElement({ candidates: [elementA], focusVisible: true });

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ focusVisible: true }));
  });

  it('should forward focusVisible: false by default', () => {
    elementB.focus();

    const spy = vi.spyOn(elementA, 'focus');

    focusFirstElement({ candidates: [elementA] });

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ focusVisible: false }));
  });

  it('should forward both focusVisible and preventScroll when both are true', () => {
    elementB.focus();

    const spy = vi.spyOn(elementA, 'focus');

    focusFirstElement({ candidates: [elementA], focusVisible: true, preventScroll: true });

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ focusVisible: true, preventScroll: true }));
  });

  it('should select text in an input candidate when select is true', () => {
    elementA.focus();
    inputElement.select = vi.fn();

    focusFirstElement({ candidates: [inputElement], select: true });

    expect(inputElement.select).toHaveBeenCalledOnce();
  });

  it('should not select text when select defaults to false', () => {
    elementA.focus();
    inputElement.select = vi.fn();

    focusFirstElement({ candidates: [inputElement] });

    expect(inputElement.select).not.toHaveBeenCalled();
  });

  it('should not select text when select is explicitly false', () => {
    elementA.focus();
    inputElement.select = vi.fn();

    focusFirstElement({ candidates: [inputElement], select: false });

    expect(inputElement.select).not.toHaveBeenCalled();
  });

  it('should not select text on a non-input candidate even when select is true', () => {
    elementB.focus();
    const selectMock = vi.fn();
    (elementA as unknown as { select: () => void }).select = selectMock;

    focusFirstElement({ candidates: [elementA], select: true });

    expect(selectMock).not.toHaveBeenCalled();
  });

  it('should not select text in the input candidate when it is already the active element', () => {
    inputElement.focus();
    inputElement.select = vi.fn();

    focusFirstElement({ candidates: [inputElement], select: true });

    expect(inputElement.select).not.toHaveBeenCalled();
  });
});
