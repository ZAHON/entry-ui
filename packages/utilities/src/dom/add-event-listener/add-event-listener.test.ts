import { describe, it, expect, expectTypeOf, vi, beforeEach } from 'vitest';
import { addEventListener } from '.';

describe('addEventListener', () => {
  let target: HTMLDivElement;

  beforeEach(() => {
    target = document.createElement('div');
    vi.spyOn(target, 'addEventListener');
    vi.spyOn(target, 'removeEventListener');
  });

  it('should call target.addEventListener with the correct type and listener', () => {
    const listener = vi.fn();

    addEventListener({ target, type: 'click', listener });

    expect(target.addEventListener).toHaveBeenCalledWith('click', listener, undefined);
  });

  it('should call target.addEventListener with provided options', () => {
    const listener = vi.fn();
    const options = { once: true, passive: true };

    addEventListener({ target, type: 'click', listener, options });

    expect(target.addEventListener).toHaveBeenCalledWith('click', listener, options);
  });

  it('should call target.addEventListener with boolean options (capture)', () => {
    const listener = vi.fn();

    addEventListener({ target, type: 'click', listener, options: true });

    expect(target.addEventListener).toHaveBeenCalledWith('click', listener, true);
  });

  it('should return a cleanup function', () => {
    const listener = vi.fn();

    const cleanup = addEventListener({ target, type: 'click', listener });

    expect(cleanup).toBeTypeOf('function');
  });

  it('should call target.removeEventListener with the same arguments when cleanup is invoked', () => {
    const listener = vi.fn();
    const options = { capture: true };

    const cleanup = addEventListener({ target, type: 'click', listener, options });
    cleanup();

    expect(target.removeEventListener).toHaveBeenCalledWith('click', listener, options);
  });

  it('should not call removeEventListener before cleanup is invoked', () => {
    const listener = vi.fn();

    addEventListener({ target, type: 'click', listener });

    expect(target.removeEventListener).not.toHaveBeenCalled();
  });

  it('should trigger the listener when the event is dispatched', () => {
    const listener = vi.fn();

    addEventListener({ target, type: 'click', listener });
    target.dispatchEvent(new Event('click'));

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should not trigger the listener after cleanup has been called', () => {
    const listener = vi.fn();

    const cleanup = addEventListener({ target, type: 'click', listener });
    cleanup();
    target.dispatchEvent(new Event('click'));

    expect(listener).not.toHaveBeenCalled();
  });

  it('should allow calling cleanup multiple times without throwing', () => {
    const listener = vi.fn();

    const cleanup = addEventListener({ target, type: 'click', listener });

    expect(() => {
      cleanup();
      cleanup();
    }).not.toThrow();
  });

  it('should support attaching multiple independent listeners to the same target', () => {
    const listenerA = vi.fn();
    const listenerB = vi.fn();

    addEventListener({ target, type: 'click', listener: listenerA });
    addEventListener({ target, type: 'click', listener: listenerB });
    target.dispatchEvent(new Event('click'));

    expect(listenerA).toHaveBeenCalledTimes(1);
    expect(listenerB).toHaveBeenCalledTimes(1);
  });

  it('should only remove the specific listener when its cleanup is called, leaving others active', () => {
    const listenerA = vi.fn();
    const listenerB = vi.fn();

    const cleanupA = addEventListener({ target, type: 'click', listener: listenerA });
    addEventListener({ target, type: 'click', listener: listenerB });

    cleanupA();
    target.dispatchEvent(new Event('click'));

    expect(listenerA).not.toHaveBeenCalled();
    expect(listenerB).toHaveBeenCalledTimes(1);
  });

  it('should work correctly when the target is window', () => {
    const listener = vi.fn();
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const cleanup = addEventListener({ target: window, type: 'resize', listener });

    expect(addSpy).toHaveBeenCalledWith('resize', listener, undefined);

    cleanup();

    expect(removeSpy).toHaveBeenCalledWith('resize', listener, undefined);

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('should work correctly when the target is document', () => {
    const listener = vi.fn();
    const addSpy = vi.spyOn(document, 'addEventListener');
    const removeSpy = vi.spyOn(document, 'removeEventListener');

    const cleanup = addEventListener({ target: document, type: 'visibilitychange', listener });

    expect(addSpy).toHaveBeenCalledWith('visibilitychange', listener, undefined);

    cleanup();

    expect(removeSpy).toHaveBeenCalledWith('visibilitychange', listener, undefined);

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('should pass the correct event object to the listener', () => {
    const listener = vi.fn();
    const event = new MouseEvent('click', { clientX: 10, clientY: 20 });

    addEventListener({ target, type: 'click', listener });
    target.dispatchEvent(event);

    expect(listener).toHaveBeenCalledWith(event);
  });

  it('should infer exactly PointerEvent as the listener parameter type for click on HTMLElement', () => {
    addEventListener({
      target,
      type: 'click',
      listener: (e) => {
        expectTypeOf(e).toEqualTypeOf<PointerEvent>();
      },
    });
  });

  it('should infer KeyboardEvent as the listener parameter type for keydown on HTMLElement', () => {
    addEventListener({
      target,
      type: 'keydown',
      listener: (e) => {
        expectTypeOf(e).toEqualTypeOf<KeyboardEvent>();
      },
    });
  });

  it('should infer UIEvent as the listener parameter type for resize on Window', () => {
    addEventListener({
      target: window,
      type: 'resize',
      listener: (e) => {
        expectTypeOf(e).toEqualTypeOf<UIEvent>();
      },
    });
  });

  it('should infer Event as the listener parameter type for visibilitychange on Document', () => {
    addEventListener({
      target: document,
      type: 'visibilitychange',
      listener: (e) => {
        expectTypeOf(e).toEqualTypeOf<Event>();
      },
    });
  });

  it('should infer a plain Event as the listener parameter type for unknown custom event names', () => {
    addEventListener({
      target,
      type: 'my-custom-event',
      listener: (e) => {
        expectTypeOf(e).toEqualTypeOf<Event>();
      },
    });
  });

  it('should infer the correct return type for the cleanup function', () => {
    const cleanup = addEventListener({ target, type: 'click', listener: vi.fn() });

    expectTypeOf(cleanup).toEqualTypeOf<() => void>();
  });

  it('should accept an HTMLDivElement as a valid target type', () => {
    expectTypeOf(target).toMatchTypeOf<EventTarget>();
  });
});
