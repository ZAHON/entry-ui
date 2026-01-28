import { describe, it, expect } from 'vitest';
import { clamp } from '.';

describe('clamp', () => {
  it('should return value when it is within the range', () => {
    expect(clamp({ value: 5, min: 0, max: 10 })).toBe(5);
    expect(clamp({ value: 0, min: -10, max: 10 })).toBe(0);
    expect(clamp({ value: -5, min: -10, max: 0 })).toBe(-5);
  });

  it('should return min when value is below the minimum', () => {
    expect(clamp({ value: -5, min: 0, max: 10 })).toBe(0);
    expect(clamp({ value: -100, min: -50, max: 50 })).toBe(-50);
  });

  it('should return max when value is above the maximum', () => {
    expect(clamp({ value: 15, min: 0, max: 10 })).toBe(10);
    expect(clamp({ value: 100, min: -50, max: 50 })).toBe(50);
  });

  it('should return min when value equals min', () => {
    expect(clamp({ value: 0, min: 0, max: 10 })).toBe(0);
    expect(clamp({ value: -10, min: -10, max: 5 })).toBe(-10);
  });

  it('should return max when value equals max', () => {
    expect(clamp({ value: 10, min: 0, max: 10 })).toBe(10);
    expect(clamp({ value: 5, min: -10, max: 5 })).toBe(5);
  });

  it('should handle case when min equals max', () => {
    expect(clamp({ value: 5, min: 10, max: 10 })).toBe(10);
    expect(clamp({ value: 15, min: 10, max: 10 })).toBe(10);
    expect(clamp({ value: 10, min: 10, max: 10 })).toBe(10);
  });

  it('should work with decimal numbers', () => {
    expect(clamp({ value: 5.5, min: 0, max: 10 })).toBe(5.5);
    expect(clamp({ value: 3.14, min: 0, max: 3 })).toBe(3);
    expect(clamp({ value: -2.7, min: -2, max: 2 })).toBe(-2);
  });

  it('should handle precise decimal clamping at boundaries', () => {
    expect(clamp({ value: 5.999, min: 0, max: 6 })).toBe(5.999);
    expect(clamp({ value: 6.001, min: 0, max: 6 })).toBe(6);
    expect(clamp({ value: -0.001, min: 0, max: 10 })).toBe(0);
  });

  it('should work with very small decimal numbers', () => {
    expect(clamp({ value: 0.0001, min: 0, max: 1 })).toBe(0.0001);
    expect(clamp({ value: 0.00001, min: 0.0001, max: 1 })).toBe(0.0001);
    expect(clamp({ value: -0.0001, min: -1, max: 0 })).toBe(-0.0001);
  });

  it('should work with decimal min and max boundaries', () => {
    expect(clamp({ value: 5, min: 2.5, max: 7.5 })).toBe(5);
    expect(clamp({ value: 1, min: 2.5, max: 7.5 })).toBe(2.5);
    expect(clamp({ value: 10, min: 2.5, max: 7.5 })).toBe(7.5);
  });

  it('should handle floating point precision edge cases', () => {
    expect(clamp({ value: 0.1 + 0.2, min: 0, max: 1 })).toBeCloseTo(0.3);
    expect(clamp({ value: 1.1 + 1.2, min: 0, max: 2 })).toBe(2);
  });

  it('should work with all decimal parameters', () => {
    expect(clamp({ value: 3.7, min: 1.2, max: 5.8 })).toBe(3.7);
    expect(clamp({ value: 0.5, min: 1.2, max: 5.8 })).toBe(1.2);
    expect(clamp({ value: 6.9, min: 1.2, max: 5.8 })).toBe(5.8);
  });

  it('should handle negative decimal ranges', () => {
    expect(clamp({ value: -3.5, min: -5.5, max: -1.5 })).toBe(-3.5);
    expect(clamp({ value: -6.7, min: -5.5, max: -1.5 })).toBe(-5.5);
    expect(clamp({ value: -0.5, min: -5.5, max: -1.5 })).toBe(-1.5);
  });

  it('should work with negative ranges', () => {
    expect(clamp({ value: -5, min: -10, max: -1 })).toBe(-5);
    expect(clamp({ value: 0, min: -10, max: -1 })).toBe(-1);
    expect(clamp({ value: -15, min: -10, max: -1 })).toBe(-10);
  });

  it('should throw error when value is NaN', () => {
    expect(() => clamp({ value: NaN, min: 0, max: 10 })).toThrow(
      "[Entry UI Utilities] Invalid 'value' parameter in 'clamp' utility. Expected a finite number, but received: NaN"
    );
  });

  it('should throw error when value is Infinity', () => {
    expect(() => clamp({ value: Infinity, min: 0, max: 10 })).toThrow(
      "[Entry UI Utilities] Invalid 'value' parameter in 'clamp' utility. Expected a finite number, but received: Infinity"
    );
  });

  it('should throw error when value is negative Infinity', () => {
    expect(() => clamp({ value: -Infinity, min: 0, max: 10 })).toThrow(
      "[Entry UI Utilities] Invalid 'value' parameter in 'clamp' utility. Expected a finite number, but received: -Infinity"
    );
  });

  it('should throw error when min is NaN', () => {
    expect(() => clamp({ value: 5, min: NaN, max: 10 })).toThrow(
      "[Entry UI Utilities] Invalid 'min' parameter in 'clamp' utility. Expected a finite number, but received: NaN"
    );
  });

  it('should throw error when min is Infinity', () => {
    expect(() => clamp({ value: 5, min: Infinity, max: 10 })).toThrow(
      "[Entry UI Utilities] Invalid 'min' parameter in 'clamp' utility. Expected a finite number, but received: Infinity"
    );
  });

  it('should throw error when max is NaN', () => {
    expect(() => clamp({ value: 5, min: 0, max: NaN })).toThrow(
      "[Entry UI Utilities] Invalid 'max' parameter in 'clamp' utility. Expected a finite number, but received: NaN"
    );
  });

  it('should throw error when max is Infinity', () => {
    expect(() => clamp({ value: 5, min: 0, max: Infinity })).toThrow(
      "[Entry UI Utilities] Invalid 'max' parameter in 'clamp' utility. Expected a finite number, but received: Infinity"
    );
  });

  it('should throw error when min is greater than max', () => {
    expect(() => clamp({ value: 5, min: 10, max: 0 })).toThrow(
      "[Entry UI Utilities] Invalid range for 'clamp' utility. The 'min' parameter (10) must be less than or equal to the 'max' parameter (0)."
    );
  });

  it('should throw error when min is greater than max with negative numbers', () => {
    expect(() => clamp({ value: -5, min: -1, max: -10 })).toThrow(
      "[Entry UI Utilities] Invalid range for 'clamp' utility. The 'min' parameter (-1) must be less than or equal to the 'max' parameter (-10)."
    );
  });
});
