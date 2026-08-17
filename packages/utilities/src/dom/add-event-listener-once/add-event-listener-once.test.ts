import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { addEventListenerOnce } from '.';

describe('addEventListenerOnce', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should add event listener to the target element', () => {
    const listener = vi.fn();
    const addEventListenerSpy = vi.spyOn(mockElement, 'addEventListener');

    addEventListenerOnce({
      target: mockElement,
      type: 'click',
      listener,
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', listener, { once: true });
  });

  it('should call listener when event is triggered', () => {
    const listener = vi.fn();

    addEventListenerOnce({
      target: mockElement,
      type: 'click',
      listener,
    });

    mockElement.click();

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should automatically remove listener after first invocation', () => {
    const listener = vi.fn();

    addEventListenerOnce({
      target: mockElement,
      type: 'click',
      listener,
    });

    mockElement.click();
    mockElement.click();
    mockElement.click();

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should pass event object to listener', () => {
    const listener = vi.fn();

    addEventListenerOnce({
      target: mockElement,
      type: 'click',
      listener,
    });

    const clickEvent = new MouseEvent('click');
    mockElement.dispatchEvent(clickEvent);

    expect(listener).toHaveBeenCalledWith(clickEvent);
  });

  it('should merge provided options with once: true', () => {
    const listener = vi.fn();
    const addEventListenerSpy = vi.spyOn(mockElement, 'addEventListener');

    addEventListenerOnce({
      target: mockElement,
      type: 'click',
      listener,
      options: { capture: true, passive: false },
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', listener, {
      capture: true,
      passive: false,
      once: true,
    });
  });

  it('should return cleanup function', () => {
    const listener = vi.fn();

    const cleanup = addEventListenerOnce({
      target: mockElement,
      type: 'click',
      listener,
    });

    expect(cleanup).toBeInstanceOf(Function);
  });

  it('should remove listener when cleanup function is called before event fires', () => {
    const listener = vi.fn();

    const cleanup = addEventListenerOnce({
      target: mockElement,
      type: 'click',
      listener,
    });

    cleanup();
    mockElement.click();

    expect(listener).not.toHaveBeenCalled();
  });

  it('should call removeEventListener with correct parameters when cleanup is invoked', () => {
    const listener = vi.fn();
    const removeEventListenerSpy = vi.spyOn(mockElement, 'removeEventListener');

    const cleanup = addEventListenerOnce({
      target: mockElement,
      type: 'click',
      listener,
      options: { capture: true },
    });

    cleanup();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', listener, {
      capture: true,
      once: true,
    });
  });

  it('should work with Document as target', () => {
    const listener = vi.fn();
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

    addEventListenerOnce({
      target: document,
      type: 'DOMContentLoaded',
      listener,
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith('DOMContentLoaded', listener, { once: true });
  });

  it('should work with Window as target', () => {
    const listener = vi.fn();
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    addEventListenerOnce({
      target: window,
      type: 'resize',
      listener,
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', listener, { once: true });
  });

  it('should not invoke listener if cleanup is called after event fires', () => {
    const listener = vi.fn();

    const cleanup = addEventListenerOnce({
      target: mockElement,
      type: 'click',
      listener,
    });

    mockElement.click();
    cleanup();
    mockElement.click();

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
