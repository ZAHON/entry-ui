import { describe, it, expect } from 'vitest';
import { wrapArray } from '.';

describe('wrapArray', () => {
  it('should return array starting from specified index', () => {
    const array = ['a', 'b', 'c', 'd'];
    const result = wrapArray({ array, startIndex: 2 });

    expect(result).toEqual(['c', 'd', 'a', 'b']);
  });

  it('should return same array when startIndex is 0', () => {
    const array = ['a', 'b', 'c', 'd'];
    const result = wrapArray({ array, startIndex: 0 });

    expect(result).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should return array starting from last element', () => {
    const array = ['a', 'b', 'c', 'd'];
    const result = wrapArray({ array, startIndex: 3 });

    expect(result).toEqual(['d', 'a', 'b', 'c']);
  });

  it('should handle single element array', () => {
    const array = ['a'];
    const result = wrapArray({ array, startIndex: 0 });

    expect(result).toEqual(['a']);
  });

  it('should handle two element array', () => {
    const array = ['a', 'b'];
    const result = wrapArray({ array, startIndex: 1 });

    expect(result).toEqual(['b', 'a']);
  });

  it('should work with numbers', () => {
    const array = [1, 2, 3, 4, 5];
    const result = wrapArray({ array, startIndex: 3 });

    expect(result).toEqual([4, 5, 1, 2, 3]);
  });

  it('should work with objects', () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = wrapArray({ array, startIndex: 1 });

    expect(result).toEqual([{ id: 2 }, { id: 3 }, { id: 1 }]);
  });

  it('should not modify original array', () => {
    const array = ['a', 'b', 'c', 'd'];
    const original = [...array];

    wrapArray({ array, startIndex: 2 });

    expect(array).toEqual(original);
  });

  it('should handle startIndex equal to array length', () => {
    const array = ['a', 'b', 'c'];
    const result = wrapArray({ array, startIndex: 3 });

    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should handle startIndex greater than array length', () => {
    const array = ['a', 'b', 'c'];
    const result = wrapArray({ array, startIndex: 5 });

    expect(result).toEqual(['c', 'a', 'b']);
  });

  it('should handle large arrays', () => {
    const array = Array.from({ length: 100 }, (_, i) => i);
    const result = wrapArray({ array, startIndex: 50 });

    expect(result[0]).toBe(50);
    expect(result[49]).toBe(99);
    expect(result[50]).toBe(0);
    expect(result[99]).toBe(49);
  });

  it('should preserve array length', () => {
    const array = ['a', 'b', 'c', 'd', 'e'];
    const result = wrapArray({ array, startIndex: 2 });

    expect(result.length).toBe(array.length);
  });

  it('should work with mixed types in array', () => {
    const array = [1, 'two', { three: 3 }, null, undefined];
    const result = wrapArray({ array, startIndex: 2 });

    expect(result).toEqual([{ three: 3 }, null, undefined, 1, 'two']);
  });

  it('should handle empty array', () => {
    const array: string[] = [];
    const result = wrapArray({ array, startIndex: 0 });

    expect(result).toEqual([]);
  });
});
