import { describe, it, expect } from 'vitest';
import { isShallowSubset } from './is-shallow-subset';

describe('isShallowSubset', () => {
  it('should return true when source is empty object', () => {
    expect(isShallowSubset({ source: {}, target: { id: 1 } })).toBe(true);
  });

  it('should return true when source and target are both empty objects', () => {
    expect(isShallowSubset({ source: {}, target: {} })).toBe(true);
  });

  it('should return true when source is a single-key subset of target', () => {
    expect(isShallowSubset({ source: { id: 1 }, target: { id: 1, name: 'John' } })).toBe(true);
  });

  it('should return true when source and target have exactly the same keys and values', () => {
    expect(isShallowSubset({ source: { id: 1, name: 'John' }, target: { id: 1, name: 'John' } })).toBe(true);
  });

  it('should return true when source is a multi-key subset of target', () => {
    expect(
      isShallowSubset({
        source: { id: 1, role: 'admin' },
        target: { id: 1, role: 'admin', name: 'John', age: 30 },
      })
    ).toBe(true);
  });

  it('should return true when values are null and strictly match', () => {
    expect(isShallowSubset({ source: { value: null }, target: { value: null, extra: 1 } })).toBe(true);
  });

  it('should return true when values are undefined and strictly match', () => {
    expect(isShallowSubset({ source: { value: undefined }, target: { value: undefined } })).toBe(true);
  });

  it('should return true when values are boolean and strictly match', () => {
    expect(isShallowSubset({ source: { active: false }, target: { active: false, id: 1 } })).toBe(true);
  });

  it('should return true when values are empty strings and strictly match', () => {
    expect(isShallowSubset({ source: { name: '' }, target: { name: '', id: 1 } })).toBe(true);
  });

  it('should return false when source key is missing in target', () => {
    expect(isShallowSubset({ source: { id: 1, type: 'admin' }, target: { id: 1 } })).toBe(false);
  });

  it('should return false when values differ for a matching key', () => {
    expect(isShallowSubset({ source: { id: 1 }, target: { id: 2 } })).toBe(false);
  });

  it('should return false when value types differ (strict equality)', () => {
    expect(isShallowSubset({ source: { id: 1 }, target: { id: '1' } })).toBe(false);
  });

  it('should return false when source value is null but target value is undefined', () => {
    expect(isShallowSubset({ source: { value: null }, target: { value: undefined } })).toBe(false);
  });

  it('should return false when source value is 0 but target value is false', () => {
    expect(isShallowSubset({ source: { flag: 0 }, target: { flag: false } })).toBe(false);
  });

  it('should return false when source value is empty string but target value is false', () => {
    expect(isShallowSubset({ source: { name: '' }, target: { name: false } })).toBe(false);
  });

  it('should return false when one of multiple source keys does not match', () => {
    expect(
      isShallowSubset({
        source: { id: 1, role: 'admin' },
        target: { id: 1, role: 'user', name: 'John' },
      })
    ).toBe(false);
  });

  it('should return false when target is an empty object and source has keys', () => {
    expect(isShallowSubset({ source: { id: 1 }, target: {} })).toBe(false);
  });

  it('should return true when object reference values are strictly equal', () => {
    const ref = { nested: true };
    expect(isShallowSubset({ source: { data: ref }, target: { data: ref } })).toBe(true);
  });

  it('should return false when object reference values are different instances with same shape', () => {
    expect(
      isShallowSubset({
        source: { data: { nested: true } },
        target: { data: { nested: true } },
      })
    ).toBe(false);
  });
});
