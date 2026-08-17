import { describe, it, expect } from 'vitest';
import { isNumber } from '.';

describe('isNumber', () => {
  it('should return true for a positive integer', () => {
    expect(isNumber(42)).toBe(true);
  });

  it('should return true for a negative integer', () => {
    expect(isNumber(-42)).toBe(true);
  });

  it('should return true for zero', () => {
    expect(isNumber(0)).toBe(true);
  });

  it('should return true for a floating point number', () => {
    expect(isNumber(3.14)).toBe(true);
  });

  it('should return true for Infinity', () => {
    expect(isNumber(Infinity)).toBe(true);
  });

  it('should return true for -Infinity', () => {
    expect(isNumber(-Infinity)).toBe(true);
  });

  it('should return false for NaN', () => {
    expect(isNumber(NaN)).toBe(false);
  });

  it('should return false for a numeric string', () => {
    expect(isNumber('42')).toBe(false);
  });

  it('should return false for a non-numeric string', () => {
    expect(isNumber('hello')).toBe(false);
  });

  it('should return false for null', () => {
    expect(isNumber(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isNumber(undefined)).toBe(false);
  });

  it('should return false for a boolean', () => {
    expect(isNumber(true)).toBe(false);
  });

  it('should return false for an object', () => {
    expect(isNumber({})).toBe(false);
  });

  it('should return false for an array', () => {
    expect(isNumber([])).toBe(false);
  });

  it('should return false for a function', () => {
    expect(isNumber(() => {})).toBe(false);
  });

  it('should return false for a Symbol', () => {
    expect(isNumber(Symbol('42'))).toBe(false);
  });

  it('should return false for a BigInt', () => {
    expect(isNumber(BigInt(42))).toBe(false);
  });
});
