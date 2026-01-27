import type { EntryUIQwikEvent } from '@/types';
import { describe, it, expect, vi } from 'vitest';
import { makeEventPreventable } from '.';

describe('makeEventPreventable', () => {
  it('should return an event with preventEntryUIQwikHandler method', () => {
    const event = new Event('click');
    const preventableEvent = makeEventPreventable(event);

    expect(preventableEvent.preventEntryUIQwikHandler).toBeDefined();
    expect(typeof preventableEvent.preventEntryUIQwikHandler).toBe('function');
  });

  it('should set entryUIQwikHandlerPrevented to true when preventEntryUIQwikHandler is called', () => {
    const event = new Event('click');
    const preventableEvent = makeEventPreventable(event);

    preventableEvent.preventEntryUIQwikHandler();

    expect(preventableEvent.entryUIQwikHandlerPrevented).toBe(true);
  });

  it('should have entryUIQwikHandlerPrevented as undefined initially', () => {
    const event = new Event('click');
    const preventableEvent = makeEventPreventable(event);

    expect(preventableEvent.entryUIQwikHandlerPrevented).toBeUndefined();
  });

  it('should preserve original event properties', () => {
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventableEvent = makeEventPreventable(event);

    expect(preventableEvent.type).toBe('click');
    expect(preventableEvent.bubbles).toBe(true);
    expect(preventableEvent.cancelable).toBe(true);
  });

  it('should work with different event types', () => {
    const keyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const preventableKeyboardEvent = makeEventPreventable(keyboardEvent);

    preventableKeyboardEvent.preventEntryUIQwikHandler();

    expect(preventableKeyboardEvent.entryUIQwikHandlerPrevented).toBe(true);
    expect(preventableKeyboardEvent.key).toBe('Enter');
  });

  it('should allow multiple calls to preventEntryUIQwikHandler', () => {
    const event = new Event('input');
    const preventableEvent = makeEventPreventable(event);

    preventableEvent.preventEntryUIQwikHandler();
    preventableEvent.preventEntryUIQwikHandler();

    expect(preventableEvent.entryUIQwikHandlerPrevented).toBe(true);
  });

  it('should return the same event object reference', () => {
    const event = new Event('focus');
    const preventableEvent = makeEventPreventable(event);

    expect(preventableEvent).toBe(event);
  });

  it('should correctly type the returned event as EntryUIQwikEvent', () => {
    const event = new Event('blur');
    const preventableEvent: EntryUIQwikEvent<Event> = makeEventPreventable(event);

    expect(preventableEvent.preventEntryUIQwikHandler).toBeDefined();
    expect(typeof preventableEvent.entryUIQwikHandlerPrevented).toBe('undefined');
  });

  it('should work with custom events', () => {
    const customEvent = new CustomEvent('custom', { detail: { data: 'test' } });
    const preventableEvent = makeEventPreventable(customEvent);

    expect(preventableEvent.detail).toEqual({ data: 'test' });
    preventableEvent.preventEntryUIQwikHandler();
    expect(preventableEvent.entryUIQwikHandlerPrevented).toBe(true);
  });

  it('should not interfere with preventDefault method', () => {
    const event = new Event('click', { cancelable: true });
    const preventableEvent = makeEventPreventable(event);

    preventableEvent.preventDefault();
    preventableEvent.preventEntryUIQwikHandler();

    expect(preventableEvent.defaultPrevented).toBe(true);
    expect(preventableEvent.entryUIQwikHandlerPrevented).toBe(true);
  });

  it('should not interfere with stopPropagation method', () => {
    const event = new Event('click', { bubbles: true });
    const preventableEvent = makeEventPreventable(event);
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

    preventableEvent.stopPropagation();
    preventableEvent.preventEntryUIQwikHandler();

    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(preventableEvent.entryUIQwikHandlerPrevented).toBe(true);
  });

  it('should not interfere with stopImmediatePropagation method', () => {
    const event = new Event('click', { bubbles: true });
    const preventableEvent = makeEventPreventable(event);
    const stopImmediatePropagationSpy = vi.spyOn(event, 'stopImmediatePropagation');

    preventableEvent.stopImmediatePropagation();
    preventableEvent.preventEntryUIQwikHandler();

    expect(stopImmediatePropagationSpy).toHaveBeenCalled();
    expect(preventableEvent.entryUIQwikHandlerPrevented).toBe(true);
  });

  it('should preserve event timestamp', () => {
    const event = new Event('click');
    const preventableEvent = makeEventPreventable(event);

    expect(preventableEvent.timeStamp).toBe(event.timeStamp);
  });

  it('should preserve event target', () => {
    const button = document.createElement('button');
    const event = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(event, 'target', { value: button, writable: false });

    const preventableEvent = makeEventPreventable(event);

    expect(preventableEvent.target).toBe(button);
  });

  it('should preserve event currentTarget', () => {
    const div = document.createElement('div');
    const event = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(event, 'currentTarget', { value: div, writable: true });

    const preventableEvent = makeEventPreventable(event);

    expect(preventableEvent.currentTarget).toBe(div);
  });

  it('should work when applied to the same event multiple times', () => {
    const event = new Event('click');
    const preventableEvent1 = makeEventPreventable(event);
    const preventableEvent2 = makeEventPreventable(preventableEvent1);

    preventableEvent2.preventEntryUIQwikHandler();

    expect(preventableEvent1.entryUIQwikHandlerPrevented).toBe(true);
    expect(preventableEvent2.entryUIQwikHandlerPrevented).toBe(true);
  });

  it('should maintain flag state after being set', () => {
    const event = new Event('change');
    const preventableEvent = makeEventPreventable(event);

    preventableEvent.preventEntryUIQwikHandler();
    const firstCheck = preventableEvent.entryUIQwikHandlerPrevented;
    const secondCheck = preventableEvent.entryUIQwikHandlerPrevented;

    expect(firstCheck).toBe(true);
    expect(secondCheck).toBe(true);
    expect(firstCheck).toBe(secondCheck);
  });

  it('should work with events that have complex data structures', () => {
    const complexEvent = new CustomEvent('complex', {
      detail: {
        nested: {
          deeply: {
            value: 'test',
          },
        },
        array: [1, 2, 3],
      },
    });

    const preventableEvent = makeEventPreventable(complexEvent);
    preventableEvent.preventEntryUIQwikHandler();

    expect(preventableEvent.detail.nested.deeply.value).toBe('test');
    expect(preventableEvent.detail.array).toEqual([1, 2, 3]);
    expect(preventableEvent.entryUIQwikHandlerPrevented).toBe(true);
  });

  it('should be callable from within event handler context', () => {
    const event = new Event('click');
    const preventableEvent = makeEventPreventable(event);

    const handler = (e: EntryUIQwikEvent<Event>) => {
      e.preventEntryUIQwikHandler();
      return e.entryUIQwikHandlerPrevented;
    };

    const result = handler(preventableEvent);

    expect(result).toBe(true);
  });

  it('should handle rapid consecutive calls correctly', () => {
    const event = new Event('scroll');
    const preventableEvent = makeEventPreventable(event);

    for (let i = 0; i < 100; i++) {
      preventableEvent.preventEntryUIQwikHandler();
    }

    expect(preventableEvent.entryUIQwikHandlerPrevented).toBe(true);
  });

  it('should preserve isTrusted property', () => {
    const event = new Event('click');
    const preventableEvent = makeEventPreventable(event);

    expect(preventableEvent.isTrusted).toBe(event.isTrusted);
  });

  it('should work correctly in conditional logic scenarios', () => {
    const event = new Event('submit');
    const preventableEvent = makeEventPreventable(event);

    const shouldPrevent = true;

    if (shouldPrevent) {
      preventableEvent.preventEntryUIQwikHandler();
    }

    const shouldExecuteHandler = !preventableEvent.entryUIQwikHandlerPrevented;

    expect(shouldExecuteHandler).toBe(false);
  });
});
