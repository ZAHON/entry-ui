import type { QRL } from '@qwik.dev/core';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { wait } from '@entry-ui/utilities/wait';
import { createGlobalUnmountObserver } from '.';

vi.mock('@qwik.dev/core/build', () => ({
  isDev: true,
}));

describe('createGlobalUnmountObserver', () => {
  const makeQrl = <T extends () => void | Promise<void>>(fn: T) => {
    return fn as unknown as QRL<T>;
  };

  let container: HTMLElement;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    // Suppress real console output without mocking the internal `error` utility itself.
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    container.remove();
    document.body.innerHTML = '';
    consoleErrorSpy.mockRestore();
  });

  it('should register an element and qrl when add is called', () => {
    const observer = createGlobalUnmountObserver();
    const el = document.createElement('span');
    container.appendChild(el);
    const qrl = makeQrl(vi.fn());

    expect(() => observer.add({ element: el, qrl })).not.to.throw();
  });

  it('should call onUnmount qrl when the tracked element is removed from the DOM', async () => {
    const observer = createGlobalUnmountObserver();
    const el = document.createElement('span');
    container.appendChild(el);
    const qrl = makeQrl(vi.fn());

    observer.add({ element: el, qrl });
    el.remove();

    await wait(10);

    expect(qrl).toHaveBeenCalledTimes(1);
  });

  it('should call all registered qrls when the same element has multiple cleanup callbacks', async () => {
    const observer = createGlobalUnmountObserver();
    const el = document.createElement('span');
    container.appendChild(el);
    const qrlA = makeQrl(vi.fn());
    const qrlB = makeQrl(vi.fn());

    observer.add({ element: el, qrl: qrlA });
    observer.add({ element: el, qrl: qrlB });
    el.remove();

    await wait(10);

    expect(qrlA).toHaveBeenCalledTimes(1);
    expect(qrlB).toHaveBeenCalledTimes(1);
  });

  it('should not call the qrl when the element remains in the DOM', async () => {
    const observer = createGlobalUnmountObserver();
    const el = document.createElement('span');
    container.appendChild(el);
    const qrl = makeQrl(vi.fn());

    observer.add({ element: el, qrl });

    const sibling = document.createElement('span');
    container.appendChild(sibling);

    await wait(10);

    expect(qrl).not.toHaveBeenCalled();
  });

  it('should not call the qrl again after remove is called before the element is detached', async () => {
    const observer = createGlobalUnmountObserver();
    const el = document.createElement('span');
    container.appendChild(el);
    const qrl = makeQrl(vi.fn());

    observer.add({ element: el, qrl });
    observer.remove({ element: el, qrl });
    el.remove();

    await wait(10);

    expect(qrl).not.toHaveBeenCalled();
  });

  it('should only remove the specified qrl and keep other qrls tracked for the same element', async () => {
    const observer = createGlobalUnmountObserver();
    const el = document.createElement('span');
    container.appendChild(el);
    const qrlA = makeQrl(vi.fn());
    const qrlB = makeQrl(vi.fn());

    observer.add({ element: el, qrl: qrlA });
    observer.add({ element: el, qrl: qrlB });
    observer.remove({ element: el, qrl: qrlA });
    el.remove();

    await wait(10);

    expect(qrlA).not.toHaveBeenCalled();
    expect(qrlB).toHaveBeenCalledTimes(1);
  });

  it('should not throw when remove is called for an element that was never added', () => {
    const observer = createGlobalUnmountObserver();
    const el = document.createElement('span');
    const qrl = makeQrl(vi.fn());

    expect(() => observer.remove({ element: el, qrl })).not.to.throw();
  });

  it('should not throw when remove is called twice for the same element and qrl', () => {
    const observer = createGlobalUnmountObserver();
    const el = document.createElement('span');
    container.appendChild(el);
    const qrl = makeQrl(vi.fn());

    observer.add({ element: el, qrl });
    observer.remove({ element: el, qrl });

    expect(() => observer.remove({ element: el, qrl })).not.to.throw();
  });

  it('should await async qrls and resolve without throwing when they succeed', async () => {
    const observer = createGlobalUnmountObserver();
    const el = document.createElement('span');
    container.appendChild(el);
    const qrl = makeQrl(
      vi.fn(async () => {
        await Promise.resolve();
      })
    );

    observer.add({ element: el, qrl });
    el.remove();

    await wait(10);

    expect(qrl).toHaveBeenCalledTimes(1);
  });

  it('should invoke the qrl and not crash the test runner when an async qrl rejects', async () => {
    const observer = createGlobalUnmountObserver();
    const el = document.createElement('span');
    container.appendChild(el);
    const qrl = makeQrl(
      vi.fn(async () => {
        throw new Error('boom');
      })
    );

    observer.add({ element: el, qrl });
    el.remove();

    await wait(10);

    // The rejection is caught internally via Promise.all(...).catch(...),
    // so it must not surface as an unhandled rejection or throw here.
    expect(qrl).toHaveBeenCalledTimes(1);
  });

  it('should immediately invoke the qrl when adding an element that is already detached from the DOM', async () => {
    const observer = createGlobalUnmountObserver();
    const el = document.createElement('span');
    // Never appended to document.body, simulating a race where the element
    // was removed before `add` was called (e.g. on qresume).
    const qrl = makeQrl(vi.fn());

    observer.add({ element: el, qrl });

    await wait(10);

    expect(qrl).toHaveBeenCalledTimes(1);
  });

  it('should track multiple independent elements and only invoke qrls for the ones actually removed', async () => {
    const observer = createGlobalUnmountObserver();
    const elA = document.createElement('span');
    const elB = document.createElement('span');
    container.appendChild(elA);
    container.appendChild(elB);
    const qrlA = makeQrl(vi.fn());
    const qrlB = makeQrl(vi.fn());

    observer.add({ element: elA, qrl: qrlA });
    observer.add({ element: elB, qrl: qrlB });

    elA.remove();

    await wait(10);

    expect(qrlA).toHaveBeenCalledTimes(1);
    expect(qrlB).not.toHaveBeenCalled();
  });

  it('should handle removal of multiple tracked elements within the same mutation batch', async () => {
    const observer = createGlobalUnmountObserver();
    const elA = document.createElement('span');
    const elB = document.createElement('span');
    container.appendChild(elA);
    container.appendChild(elB);
    const qrlA = makeQrl(vi.fn());
    const qrlB = makeQrl(vi.fn());

    observer.add({ element: elA, qrl: qrlA });
    observer.add({ element: elB, qrl: qrlB });

    container.innerHTML = '';

    await wait(10);

    expect(qrlA).toHaveBeenCalledTimes(1);
    expect(qrlB).toHaveBeenCalledTimes(1);
  });

  it('should allow tracking a new element again after the observer has fully cleaned up', async () => {
    const observer = createGlobalUnmountObserver();
    const elA = document.createElement('span');
    container.appendChild(elA);
    const qrlA = makeQrl(vi.fn());

    observer.add({ element: elA, qrl: qrlA });
    elA.remove();

    await wait(10);

    expect(qrlA).toHaveBeenCalledTimes(1);

    const elB = document.createElement('span');
    container.appendChild(elB);
    const qrlB = makeQrl(vi.fn());

    observer.add({ element: elB, qrl: qrlB });
    elB.remove();

    await wait(10);

    expect(qrlB).toHaveBeenCalledTimes(1);
  });

  it('should not invoke qrls belonging to a different element that was never removed', async () => {
    const observer = createGlobalUnmountObserver();
    const elA = document.createElement('span');
    const elB = document.createElement('span');
    container.appendChild(elA);
    container.appendChild(elB);
    const qrlA = makeQrl(vi.fn());
    const qrlB = makeQrl(vi.fn());

    observer.add({ element: elA, qrl: qrlA });
    observer.add({ element: elB, qrl: qrlB });

    elA.remove();

    await wait(10);

    expect(qrlB).not.toHaveBeenCalled();

    elB.remove();

    await wait(10);

    expect(qrlB).toHaveBeenCalledTimes(1);
  });
});
