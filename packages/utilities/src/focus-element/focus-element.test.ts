import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { focusElement } from '.';

describe('focusElement', () => {
  let element: HTMLButtonElement;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    element = document.createElement('button');
    inputElement = document.createElement('input');
    document.body.appendChild(element);
    document.body.appendChild(inputElement);

    element.focus = vi.fn();
    inputElement.focus = vi.fn();
  });

  afterEach(() => {
    document.body.removeChild(element);
    document.body.removeChild(inputElement);
    vi.restoreAllMocks();
  });

  it('should call focus on the element', () => {
    focusElement({ element });

    expect(element.focus).toHaveBeenCalledOnce();
  });

  it('should call focus exactly once even when all options are provided', () => {
    focusElement({ element, focusVisible: true, preventScroll: true, select: false });

    expect(element.focus).toHaveBeenCalledOnce();
  });

  it('should not throw when called multiple times on the same element', () => {
    expect(() => {
      focusElement({ element });
      focusElement({ element });
      focusElement({ element });
    }).not.toThrow();
  });

  it('should call focus with preventScroll defaulting to false', () => {
    focusElement({ element });

    expect(element.focus).toHaveBeenCalledWith({ focusVisible: false, preventScroll: false });
  });

  it('should call focus with preventScroll set to true when provided', () => {
    focusElement({ element, preventScroll: true });

    expect(element.focus).toHaveBeenCalledWith({ focusVisible: false, preventScroll: true });
  });

  it('should call focus with preventScroll set to false when explicitly passed as false', () => {
    focusElement({ element, preventScroll: false });

    expect(element.focus).toHaveBeenCalledWith({ focusVisible: false, preventScroll: false });
  });

  it('should call focus with focusVisible defaulting to false', () => {
    focusElement({ element });

    expect(element.focus).toHaveBeenCalledWith({ focusVisible: false, preventScroll: false });
  });

  it('should call focus with focusVisible set to true when provided', () => {
    focusElement({ element, focusVisible: true });

    expect(element.focus).toHaveBeenCalledWith({ focusVisible: true, preventScroll: false });
  });

  it('should call focus with focusVisible set to false when explicitly passed as false', () => {
    focusElement({ element, focusVisible: false });

    expect(element.focus).toHaveBeenCalledWith({ focusVisible: false, preventScroll: false });
  });

  it('should pass both focusVisible and preventScroll as true when both are provided', () => {
    focusElement({ element, focusVisible: true, preventScroll: true });

    expect(element.focus).toHaveBeenCalledWith({ focusVisible: true, preventScroll: true });
  });

  it('should not focus an element that does not have a focus method', () => {
    const nonFocusable = {} as HTMLElement;

    expect(() => focusElement({ element: nonFocusable })).not.toThrow();
  });

  it('should not throw when element is null-like object without focus', () => {
    const noFocusMethod = { id: 'fake' } as unknown as HTMLElement;

    expect(() => focusElement({ element: noFocusMethod })).not.toThrow();
  });

  it('should not call any focus-like method on a non-focusable element', () => {
    const focusMock = vi.fn();
    const nonFocusable = { notFocus: focusMock } as unknown as HTMLElement;

    focusElement({ element: nonFocusable });

    expect(focusMock).not.toHaveBeenCalled();
  });

  it('should focus an anchor element', () => {
    const anchor = document.createElement('a');
    anchor.focus = vi.fn();
    document.body.appendChild(anchor);

    focusElement({ element: anchor });

    expect(anchor.focus).toHaveBeenCalledOnce();
    document.body.removeChild(anchor);
  });

  it('should focus a div element with tabIndex', () => {
    const div = document.createElement('div');
    div.tabIndex = 0;
    div.focus = vi.fn();
    document.body.appendChild(div);

    focusElement({ element: div });

    expect(div.focus).toHaveBeenCalledOnce();
    document.body.removeChild(div);
  });

  it('should focus a textarea element', () => {
    const textarea = document.createElement('textarea');
    textarea.focus = vi.fn();
    document.body.appendChild(textarea);

    focusElement({ element: textarea });

    expect(textarea.focus).toHaveBeenCalledOnce();
    document.body.removeChild(textarea);
  });

  it('should focus a select element', () => {
    const selectEl = document.createElement('select');
    selectEl.focus = vi.fn();
    document.body.appendChild(selectEl);

    focusElement({ element: selectEl });

    expect(selectEl.focus).toHaveBeenCalledOnce();
    document.body.removeChild(selectEl);
  });

  it('should select text in an input element when select is true and element was not previously focused', () => {
    inputElement.select = vi.fn();
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(element);

    focusElement({ element: inputElement, select: true });

    expect(inputElement.select).toHaveBeenCalledOnce();
  });

  it('should select text only once per focusElement call', () => {
    inputElement.select = vi.fn();
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(element);

    focusElement({ element: inputElement, select: true });

    expect(inputElement.select).toHaveBeenCalledTimes(1);
  });

  it('should select text when active element is document.body', () => {
    inputElement.select = vi.fn();
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(document.body);

    focusElement({ element: inputElement, select: true });

    expect(inputElement.select).toHaveBeenCalledOnce();
  });

  it('should select text when active element is null', () => {
    inputElement.select = vi.fn();
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(null);

    focusElement({ element: inputElement, select: true });

    expect(inputElement.select).toHaveBeenCalledOnce();
  });

  it('should not select text when select is false', () => {
    inputElement.select = vi.fn();
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(element);

    focusElement({ element: inputElement, select: false });

    expect(inputElement.select).not.toHaveBeenCalled();
  });

  it('should not select text when select defaults to false', () => {
    inputElement.select = vi.fn();
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(element);

    focusElement({ element: inputElement });

    expect(inputElement.select).not.toHaveBeenCalled();
  });

  it('should not select text when the input element is already the active element', () => {
    inputElement.select = vi.fn();
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(inputElement);

    focusElement({ element: inputElement, select: true });

    expect(inputElement.select).not.toHaveBeenCalled();
  });

  it('should not select text when element is not an HTMLInputElement', () => {
    const selectMock = vi.fn();
    (element as unknown as { select: () => void }).select = selectMock;

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(document.body);

    focusElement({ element, select: true });

    expect(selectMock).not.toHaveBeenCalled();
  });

  it('should not select text on a textarea even when select is true', () => {
    const textarea = document.createElement('textarea');
    textarea.focus = vi.fn();
    const selectMock = vi.fn();
    (textarea as unknown as { select: () => void }).select = selectMock;
    document.body.appendChild(textarea);

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(document.body);

    focusElement({ element: textarea, select: true });

    expect(selectMock).not.toHaveBeenCalled();
    document.body.removeChild(textarea);
  });

  it('should not select text on a div with a select method even when select is true', () => {
    const div = document.createElement('div');
    div.focus = vi.fn();
    const selectMock = vi.fn();
    (div as unknown as { select: () => void }).select = selectMock;
    document.body.appendChild(div);

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(document.body);

    focusElement({ element: div, select: true });

    expect(selectMock).not.toHaveBeenCalled();
    document.body.removeChild(div);
  });

  it('should select text on second call if input was not previously active', () => {
    inputElement.select = vi.fn();

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(element);
    focusElement({ element: inputElement, select: true });

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(element);
    focusElement({ element: inputElement, select: true });

    expect(inputElement.select).toHaveBeenCalledTimes(2);
  });

  it('should focus but not select on second call when input becomes the active element', () => {
    inputElement.select = vi.fn();

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(element);
    focusElement({ element: inputElement, select: true });

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(inputElement);
    focusElement({ element: inputElement, select: true });

    expect(inputElement.select).toHaveBeenCalledTimes(1);
    expect(inputElement.focus).toHaveBeenCalledTimes(2);
  });

  it('should still call focus even when select is skipped due to element being already active', () => {
    inputElement.select = vi.fn();
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(inputElement);

    focusElement({ element: inputElement, select: true });

    expect(inputElement.focus).toHaveBeenCalledOnce();
    expect(inputElement.select).not.toHaveBeenCalled();
  });

  it('should still call focus on a non-input element even when select is true', () => {
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(document.body);

    focusElement({ element, select: true });

    expect(element.focus).toHaveBeenCalledOnce();
  });
});
