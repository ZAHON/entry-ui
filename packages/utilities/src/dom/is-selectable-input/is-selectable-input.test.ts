import { describe, expect, it } from 'vitest';

import { isSelectableInput } from './is-selectable-input';

describe('isSelectableInput', () => {
  it('should return true for input type="text"', () => {
    const input = document.createElement('input');
    input.type = 'text';

    expect(isSelectableInput(input)).toBe(true);
  });

  it('should return true for input with no type attribute (defaults to text)', () => {
    const input = document.createElement('input');

    expect(isSelectableInput(input)).toBe(true);
  });

  it('should return true for input type="password"', () => {
    const input = document.createElement('input');
    input.type = 'password';

    expect(isSelectableInput(input)).toBe(true);
  });

  it('should return true for input type="search"', () => {
    const input = document.createElement('input');
    input.type = 'search';

    expect(isSelectableInput(input)).toBe(true);
  });

  it('should return true for input type="url"', () => {
    const input = document.createElement('input');
    input.type = 'url';

    expect(isSelectableInput(input)).toBe(true);
  });

  it('should return true for input type="tel"', () => {
    const input = document.createElement('input');
    input.type = 'tel';

    expect(isSelectableInput(input)).toBe(true);
  });

  it('should return true for input type="number"', () => {
    const input = document.createElement('input');
    input.type = 'number';

    expect(isSelectableInput(input)).toBe(true);
  });

  it('should return false for an object that is not an HTMLInputElement even if it has a select method', () => {
    const fakeInput = Object.assign(document.createElement('div'), { select: () => {} }) as unknown as HTMLElement;

    expect(isSelectableInput(fakeInput)).toBe(false);
  });

  it('should return false for a button element', () => {
    const button = document.createElement('button');

    expect(isSelectableInput(button)).toBe(false);
  });

  it('should return false for a textarea element', () => {
    const textarea = document.createElement('textarea');

    expect(isSelectableInput(textarea)).toBe(false);
  });

  it('should return false for a div element', () => {
    const div = document.createElement('div');

    expect(isSelectableInput(div)).toBe(false);
  });

  it('should return false for an anchor element', () => {
    const anchor = document.createElement('a');

    expect(isSelectableInput(anchor)).toBe(false);
  });

  it('should return false for a select element', () => {
    const selectEl = document.createElement('select');

    expect(isSelectableInput(selectEl)).toBe(false);
  });

  it('should return false for a span element', () => {
    const span = document.createElement('span');

    expect(isSelectableInput(span)).toBe(false);
  });
});
