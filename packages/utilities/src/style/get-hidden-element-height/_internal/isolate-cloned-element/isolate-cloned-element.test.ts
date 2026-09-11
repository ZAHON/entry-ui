import { describe, it, expect } from 'vitest';
import { isolateClonedElement } from '.';

describe('isolateClonedElement', () => {
  it('should remove the id attribute from the root element', () => {
    const div = document.createElement('div');
    div.id = 'root-id';

    isolateClonedElement(div);

    expect(div.hasAttribute('id')).toBe(false);
  });

  it('should remove id attributes from nested descendants at any depth', () => {
    const root = document.createElement('div');
    root.id = 'root';
    root.innerHTML = `
      <section id="section-id">
        <span id="span-id">
          <b id="deep-id">text</b>
        </span>
      </section>
    `;

    isolateClonedElement(root);

    expect(root.hasAttribute('id')).toBe(false);
    expect(root.querySelectorAll('[id]').length).toBe(0);
  });

  it('should remove the name attribute from a radio input', () => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'group-a';
    input.checked = true;

    isolateClonedElement(input);

    expect(input.hasAttribute('name')).toBe(false);
  });

  it('should remove the name attribute from a checkbox input', () => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'agree';

    isolateClonedElement(input);

    expect(input.hasAttribute('name')).toBe(false);
  });

  it('should not remove the name attribute from a text input', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'username';

    isolateClonedElement(input);

    expect(input.getAttribute('name')).toBe('username');
  });

  it('should not remove the name attribute from a select element', () => {
    const select = document.createElement('select');
    select.name = 'country';

    isolateClonedElement(select);

    expect(select.getAttribute('name')).toBe('country');
  });

  it('should remove name attributes from radio/checkbox inputs nested inside a form', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="radio" name="plan" value="basic" checked />
      <input type="radio" name="plan" value="pro" />
      <input type="checkbox" name="terms" />
      <input type="text" name="email" />
    `;

    isolateClonedElement(form);

    const inputs = form.querySelectorAll('input');
    expect(inputs[0].hasAttribute('name')).toBe(false);
    expect(inputs[1].hasAttribute('name')).toBe(false);
    expect(inputs[2].hasAttribute('name')).toBe(false);
    expect(inputs[3].getAttribute('name')).toBe('email');
  });

  it('should keep other attributes untouched', () => {
    const div = document.createElement('div');
    div.id = 'root-id';
    div.setAttribute('class', 'box');
    div.setAttribute('data-testid', 'my-box');
    div.setAttribute('aria-label', 'A box');

    isolateClonedElement(div);

    expect(div.getAttribute('class')).toBe('box');
    expect(div.getAttribute('data-testid')).toBe('my-box');
    expect(div.getAttribute('aria-label')).toBe('A box');
  });

  it('should handle an element with no id and no children without throwing', () => {
    const span = document.createElement('span');

    expect(() => isolateClonedElement(span)).not.toThrow();
  });

  it('should handle an element with no children gracefully', () => {
    const div = document.createElement('div');
    div.id = 'leaf';

    isolateClonedElement(div);

    expect(div.hasAttribute('id')).toBe(false);
  });

  it('should not descend into text node children', () => {
    const p = document.createElement('p');
    p.id = 'paragraph';
    p.textContent = 'Hello world';

    expect(() => isolateClonedElement(p)).not.toThrow();
    expect(p.hasAttribute('id')).toBe(false);
    expect(p.textContent).toBe('Hello world');
  });

  it('should mutate the element in place rather than returning a new node', () => {
    const div = document.createElement('div');
    div.id = 'mutate-me';

    const result = isolateClonedElement(div);

    expect(result).toBeUndefined();
    expect(div.hasAttribute('id')).toBe(false);
  });

  it('should isolate a deeply nested tree containing mixed elements and inputs', () => {
    const root = document.createElement('div');
    root.id = 'form-wrapper';
    root.innerHTML = `
      <form id="signup-form">
        <fieldset id="plan-fieldset">
          <input type="radio" name="plan" id="plan-basic" checked />
          <input type="radio" name="plan" id="plan-pro" />
        </fieldset>
        <div id="terms-wrapper">
          <input type="checkbox" name="terms" id="terms-checkbox" />
        </div>
      </form>
    `;

    isolateClonedElement(root);

    expect(root.querySelectorAll('[id]').length).toBe(0);
    expect(root.querySelectorAll('input[name]').length).toBe(0);
    expect(root.hasAttribute('id')).toBe(false);
  });

  it('should visit siblings at the same depth independently', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <input type="radio" name="a" id="a1" />
      <input type="radio" name="a" id="a2" />
      <input type="radio" name="b" id="b1" />
    `;

    isolateClonedElement(root);

    const inputs = root.querySelectorAll('input');
    inputs.forEach((input) => {
      expect(input.hasAttribute('name')).toBe(false);
      expect(input.hasAttribute('id')).toBe(false);
    });
  });
});
