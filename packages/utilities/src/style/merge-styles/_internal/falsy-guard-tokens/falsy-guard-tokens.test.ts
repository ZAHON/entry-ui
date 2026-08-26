import { describe, it, expect } from 'vitest';
import { FALSY_GUARD_TOKENS } from '.';

describe('FALSY_GUARD_TOKENS', () => {
  it('should be an instance of Set', () => {
    expect(FALSY_GUARD_TOKENS).toBeInstanceOf(Set);
  });

  it('should contain exactly 4 tokens', () => {
    expect(FALSY_GUARD_TOKENS.size).toBe(4);
  });

  it('should contain the string "false"', () => {
    expect(FALSY_GUARD_TOKENS.has('false')).toBe(true);
  });

  it('should contain the string "true"', () => {
    expect(FALSY_GUARD_TOKENS.has('true')).toBe(true);
  });

  it('should contain the string "undefined"', () => {
    expect(FALSY_GUARD_TOKENS.has('undefined')).toBe(true);
  });

  it('should contain the string "null"', () => {
    expect(FALSY_GUARD_TOKENS.has('null')).toBe(true);
  });

  it('should not contain an empty string', () => {
    expect(FALSY_GUARD_TOKENS.has('')).toBe(false);
  });

  it('should not contain the number zero as a string', () => {
    expect(FALSY_GUARD_TOKENS.has('0')).toBe(false);
  });

  it('should not contain a valid CSS value like "red"', () => {
    expect(FALSY_GUARD_TOKENS.has('red')).toBe(false);
  });

  it('should match the stringified result of a falsy template literal interpolation', () => {
    const isActive = false;
    const interpolated = `${isActive && 'red'}`;
    expect(FALSY_GUARD_TOKENS.has(interpolated)).toBe(true);
  });

  it('should match the stringified result of an undefined template literal interpolation', () => {
    const value: string | undefined = undefined;
    const interpolated = `${value}`;
    expect(FALSY_GUARD_TOKENS.has(interpolated)).toBe(true);
  });

  it('should not match a truthy interpolated CSS value', () => {
    const isActive = true;
    const interpolated = `${isActive && 'red'}`;
    expect(FALSY_GUARD_TOKENS.has(interpolated)).toBe(false);
  });
});
