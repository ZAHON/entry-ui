import type { EntryUIQwikEventState } from '@/types';
import { describe, it, expect, vi } from 'vitest';
import { runIfHandlerNotPrevented } from '.';

interface CustomAppEvent extends Event {
  customPayload: string;
}

describe('runIfHandlerNotPrevented', () => {
  it('should call the callback when entryUIQwikHandlerPrevented is false', () => {
    const callback = vi.fn();
    const event = { entryUIQwikHandlerPrevented: false } as EntryUIQwikEventState<Event>;

    runIfHandlerNotPrevented({ event, callback });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call the callback when entryUIQwikHandlerPrevented is undefined', () => {
    const callback = vi.fn();
    const event = {} as EntryUIQwikEventState<Event>;

    runIfHandlerNotPrevented({ event, callback });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback when entryUIQwikHandlerPrevented is true', () => {
    const callback = vi.fn();
    const event = { entryUIQwikHandlerPrevented: true } as EntryUIQwikEventState<Event>;

    runIfHandlerNotPrevented({ event, callback });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not throw when callback is a no-op function', () => {
    const callback = vi.fn(() => {});
    const event = { entryUIQwikHandlerPrevented: false } as EntryUIQwikEventState<Event>;

    expect(() => runIfHandlerNotPrevented({ event, callback })).not.toThrow();
  });

  it('should not mutate the original event object', () => {
    const callback = vi.fn();
    const event = { entryUIQwikHandlerPrevented: false } as EntryUIQwikEventState<Event>;
    const eventCopy = { ...event };

    runIfHandlerNotPrevented({ event, callback });

    expect(event).toEqual(eventCopy);
  });

  it('should work correctly with a MouseEvent instance', () => {
    const callback = vi.fn();
    const rawEvent = new MouseEvent('click') as MouseEvent & { entryUIQwikHandlerPrevented: boolean };
    rawEvent.entryUIQwikHandlerPrevented = false;
    const event = rawEvent as EntryUIQwikEventState<MouseEvent>;

    runIfHandlerNotPrevented({ event, callback });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback for a prevented MouseEvent instance', () => {
    const callback = vi.fn();
    const rawEvent = new MouseEvent('click') as MouseEvent & { entryUIQwikHandlerPrevented: boolean };
    rawEvent.entryUIQwikHandlerPrevented = true;
    const event = rawEvent as EntryUIQwikEventState<MouseEvent>;

    runIfHandlerNotPrevented({ event, callback });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should call the callback exactly once even if invoked multiple times with the same params', () => {
    const callback = vi.fn();
    const event = { entryUIQwikHandlerPrevented: false } as EntryUIQwikEventState<Event>;

    runIfHandlerNotPrevented({ event, callback });
    runIfHandlerNotPrevented({ event, callback });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should invoke different callbacks independently based on their own event state', () => {
    const callbackAllowed = vi.fn();
    const callbackPrevented = vi.fn();
    const allowedEvent = { entryUIQwikHandlerPrevented: false } as EntryUIQwikEventState<Event>;
    const preventedEvent = { entryUIQwikHandlerPrevented: true } as EntryUIQwikEventState<Event>;

    runIfHandlerNotPrevented({ event: allowedEvent, callback: callbackAllowed });
    runIfHandlerNotPrevented({ event: preventedEvent, callback: callbackPrevented });

    expect(callbackAllowed).toHaveBeenCalledTimes(1);
    expect(callbackPrevented).not.toHaveBeenCalled();
  });

  it('should not pass any arguments to the callback when invoked', () => {
    const callback = vi.fn();
    const event = { entryUIQwikHandlerPrevented: false } as EntryUIQwikEventState<Event>;

    runIfHandlerNotPrevented({ event, callback });

    expect(callback).toHaveBeenCalledWith();
  });

  it('should work correctly with a custom event type extending Event', () => {
    const callback = vi.fn();
    const event = {
      entryUIQwikHandlerPrevented: false,
      customPayload: 'test-payload',
    } as EntryUIQwikEventState<CustomAppEvent>;

    runIfHandlerNotPrevented<CustomAppEvent>({ event, callback });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback for a prevented custom event type extending Event', () => {
    const callback = vi.fn();
    const event = {
      entryUIQwikHandlerPrevented: true,
      customPayload: 'test-payload',
    } as EntryUIQwikEventState<CustomAppEvent>;

    runIfHandlerNotPrevented<CustomAppEvent>({ event, callback });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should return undefined when the callback is invoked', () => {
    const callback = vi.fn();
    const event = { entryUIQwikHandlerPrevented: false } as EntryUIQwikEventState<Event>;

    const result = runIfHandlerNotPrevented({ event, callback });

    expect(result).toBeUndefined();
  });

  it('should return undefined when the callback is not invoked', () => {
    const callback = vi.fn();
    const event = { entryUIQwikHandlerPrevented: true } as EntryUIQwikEventState<Event>;

    const result = runIfHandlerNotPrevented({ event, callback });

    expect(result).toBeUndefined();
  });
});
