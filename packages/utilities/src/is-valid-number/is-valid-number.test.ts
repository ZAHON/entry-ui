import { describe, it, expect } from 'vitest';
import { isValidNumber } from '.';

describe('isValidNumber', () => {
  it('should return true for valid positive integers', () => {
    expect(isValidNumber(42)).toBe(true);
    expect(isValidNumber(0)).toBe(true);
    expect(isValidNumber(1000000)).toBe(true);
  });

  it('should return true for valid negative integers', () => {
    expect(isValidNumber(-1)).toBe(true);
    expect(isValidNumber(-999)).toBe(true);
  });

  it('should return true for valid decimal numbers', () => {
    expect(isValidNumber(3.14)).toBe(true);
    expect(isValidNumber(-2.5)).toBe(true);
    expect(isValidNumber(0.00001)).toBe(true);
  });

  it('should return false for NaN', () => {
    expect(isValidNumber(NaN)).toBe(false);
  });

  it('should return false for positive Infinity', () => {
    expect(isValidNumber(Infinity)).toBe(false);
  });

  it('should return false for negative Infinity', () => {
    expect(isValidNumber(-Infinity)).toBe(false);
  });

  it('should return false for string numbers', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isValidNumber('123' as any)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isValidNumber('3.14' as any)).toBe(false);
  });

  it('should return false for null and undefined', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isValidNumber(null as any)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isValidNumber(undefined as any)).toBe(false);
  });

  it('should return false for objects and arrays', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isValidNumber({} as any)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isValidNumber([] as any)).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(isValidNumber([1, 2, 3] as any)).toBe(false);
  });

  it('should return true for zero', () => {
    expect(isValidNumber(0)).toBe(true);
    expect(isValidNumber(-0)).toBe(true);
  });
});
