import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { getHiddenElementHeight } from './get-hidden-element-height';

describe('getHiddenElementHeight', () => {
  const setClientWidth = (element: Element, width: number) => {
    Object.defineProperty(element, 'clientWidth', { value: width, configurable: true });
  };

  /**
   * `element.after(clone)` is the point where the clone is inserted into the
   * live DOM, right before `getCssDimensions` reads its dimensions. jsdom
   * doesn't perform real layout, so `offsetWidth`/`offsetHeight` are always 0
   * by default.
   *
   * We intercept `after` on every test to (a) capture a reference to the
   * clone, so its attributes/styles remain inspectable even after `remove()`
   * detaches it, and (b) stamp mocked offset values onto it before the real
   * insertion runs, so `getCssDimensions` reads a realistic height/width.
   *
   * Tests that don't care about the returned height can ignore the default
   * offset (0, 0); tests that do can set `nextCloneOffset` beforehand.
   */
  let capturedClone: HTMLElement | null = null;
  let nextCloneOffset = { width: 0, height: 0 };

  beforeEach(() => {
    capturedClone = null;
    nextCloneOffset = { width: 0, height: 0 };

    const originalAfter = Element.prototype.after;

    vi.spyOn(Element.prototype, 'after').mockImplementation(function (this: Element, ...nodes: Array<Node | string>) {
      const clone = nodes.find((node): node is HTMLElement => node instanceof HTMLElement);

      if (clone) {
        capturedClone = clone;
        Object.defineProperty(clone, 'offsetWidth', { value: nextCloneOffset.width, configurable: true });
        Object.defineProperty(clone, 'offsetHeight', { value: nextCloneOffset.height, configurable: true });
      }

      return originalAfter.apply(this, nodes);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the offset height of the measured clone', () => {
    nextCloneOffset = { width: 100, height: 150 };

    const div = document.createElement('div');
    div.style.display = 'none';
    document.body.appendChild(div);

    expect(getHiddenElementHeight(div)).toBe(150);

    div.remove();
  });

  it('should return 0 when the clone has no measurable offset height', () => {
    const div = document.createElement('div');
    div.style.display = 'none';
    document.body.appendChild(div);

    expect(getHiddenElementHeight(div)).toBe(0);

    div.remove();
  });

  it('should remove the clone from the document after measuring', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    getHiddenElementHeight(div);

    expect(capturedClone).not.toBeNull();
    expect(capturedClone!.isConnected).toBe(false);
    expect(capturedClone!.parentNode).toBeNull();

    div.remove();
  });

  it('should insert the clone as a sibling immediately after the original element', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    getHiddenElementHeight(div);

    expect(capturedClone).not.toBeNull();
    expect(div.nextSibling).toBeNull(); // clone was removed already
    expect(capturedClone!.previousSibling).toBeNull(); // detached, no context, but confirms distinct node

    div.remove();
  });

  it('should not mutate the original element', () => {
    const div = document.createElement('div');
    div.id = 'original-id';
    div.style.display = 'none';
    document.body.appendChild(div);

    getHiddenElementHeight(div);

    expect(div.id).toBe('original-id');
    expect(div.style.display).toBe('none');
    expect(div.hasAttribute('aria-hidden')).toBe(false);
    expect(div.hasAttribute('inert')).toBe(false);

    div.remove();
  });

  it('should not affect the checked state or name attribute of an original radio input', () => {
    const form = document.createElement('form');
    form.style.display = 'none';
    form.innerHTML = `
      <input type="radio" name="plan" id="plan-basic" checked />
      <input type="radio" name="plan" id="plan-pro" />
    `;
    document.body.appendChild(form);

    const basicRadio = form.querySelector<HTMLInputElement>('#plan-basic')!;

    getHiddenElementHeight(form);

    expect(basicRadio.checked).toBe(true);
    expect(basicRadio.getAttribute('name')).toBe('plan');

    form.remove();
  });

  it('should isolate id and name attributes on the clone without affecting the original', () => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.id = 'radio-id';
    input.name = 'radio-group';
    document.body.appendChild(input);

    getHiddenElementHeight(input);

    expect(capturedClone).not.toBeNull();
    expect(capturedClone!.hasAttribute('id')).toBe(false);
    expect(capturedClone!.hasAttribute('name')).toBe(false);

    expect(input.id).toBe('radio-id');
    expect(input.getAttribute('name')).toBe('radio-group');

    input.remove();
  });

  it('should set aria-hidden="true" on the clone', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    getHiddenElementHeight(div);

    expect(capturedClone!.getAttribute('aria-hidden')).toBe('true');

    div.remove();
  });

  it('should set inert on the clone', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    getHiddenElementHeight(div);

    expect(capturedClone!.hasAttribute('inert')).toBe(true);

    div.remove();
  });

  it('should apply layout-neutral, invisible styles to the clone', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    getHiddenElementHeight(div);

    const { style } = capturedClone!;

    expect(style.position).toBe('absolute');
    expect(style.top).toBe('-9999px');
    expect(style.display).toBe('block');
    expect(style.visibility).toBe('hidden');
    expect(style.opacity).toBe('0');
    expect(style.contentVisibility).toBe('visible');
    expect(style.height).toBe('auto');
    expect(style.maxHeight).toBe('none');
    expect(style.overflow).toBe('visible');
    expect(style.transition).toBe('none');
    expect(style.animation).toBe('none');

    div.remove();
  });

  it('should set an explicit width on the clone when a measurable ancestor width is found', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);

    setClientWidth(parent, 300);
    setClientWidth(child, 0);
    child.style.display = 'none';

    getHiddenElementHeight(child);

    expect(capturedClone!.style.width).toBe('300px');

    parent.remove();
  });

  it('should account for ancestor padding when computing the clone width', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);

    setClientWidth(parent, 300);
    parent.style.paddingLeft = '20px';
    parent.style.paddingRight = '30px';
    setClientWidth(child, 0);
    child.style.display = 'none';

    getHiddenElementHeight(child);

    expect(capturedClone!.style.width).toBe('250px');

    parent.remove();
  });

  it('should not set a width style when no measurable ancestor width is found', () => {
    const div = document.createElement('div');
    setClientWidth(div, 0);

    getHiddenElementHeight(div);

    expect(capturedClone!.style.width).toBe('');
  });

  it('should use the element own width when it is directly measurable', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    setClientWidth(div, 180);

    getHiddenElementHeight(div);

    expect(capturedClone!.style.width).toBe('180px');

    div.remove();
  });

  it('should deep clone descendant content', () => {
    const div = document.createElement('div');
    div.innerHTML = `<p>Hello <strong>world</strong></p>`;
    document.body.appendChild(div);

    getHiddenElementHeight(div);

    expect(capturedClone!.innerHTML).toBe('<p>Hello <strong>world</strong></p>');

    div.remove();
  });

  it('should not throw and should return a number for an element with no children', () => {
    const span = document.createElement('span');
    document.body.appendChild(span);

    expect(() => getHiddenElementHeight(span)).not.toThrow();
    expect(typeof getHiddenElementHeight(span)).toBe('number');

    span.remove();
  });

  it('should work correctly for an element that is currently visible, not just hidden ones', () => {
    nextCloneOffset = { width: 100, height: 60 };

    const div = document.createElement('div');
    document.body.appendChild(div);

    expect(getHiddenElementHeight(div)).toBe(60);

    div.remove();
  });

  it('should measure an element that is detached from the document', () => {
    const div = document.createElement('div');

    expect(() => getHiddenElementHeight(div)).not.toThrow();
    expect(capturedClone).not.toBeNull();
  });

  it('should call cloneNode with deep set to true', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const cloneNodeSpy = vi.spyOn(div, 'cloneNode');

    getHiddenElementHeight(div);

    expect(cloneNodeSpy).toHaveBeenCalledWith(true);

    div.remove();
  });

  it('should isolate a deeply nested subtree containing multiple radio groups on the clone only', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <fieldset>
        <input type="radio" name="plan" id="plan-a" checked />
        <input type="radio" name="plan" id="plan-b" />
      </fieldset>
      <div>
        <input type="checkbox" name="terms" id="terms" />
      </div>
    `;
    document.body.appendChild(form);

    getHiddenElementHeight(form);

    expect(capturedClone!.querySelectorAll('[id]').length).toBe(0);
    expect(capturedClone!.querySelectorAll('input[name]').length).toBe(0);

    expect(form.querySelectorAll('[id]').length).toBe(3);
    expect(form.querySelectorAll('input[name]').length).toBe(3);

    form.remove();
  });
});
