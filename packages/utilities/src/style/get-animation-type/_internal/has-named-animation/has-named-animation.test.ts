import { describe, it, expect } from 'vitest';
import { hasNamedAnimation } from '.';

describe('hasNamedAnimation', () => {
  it('should return true for a single valid animation name', () => {
    expect(hasNamedAnimation('fade-in')).toBe(true);
  });

  it('should return false for "none"', () => {
    expect(hasNamedAnimation('none')).toBe(false);
  });

  it('should return false for an empty string', () => {
    expect(hasNamedAnimation('')).toBe(false);
  });

  it('should return false for a string containing only whitespace', () => {
    expect(hasNamedAnimation('   ')).toBe(false);
  });

  it('should trim whitespace before comparing against "none"', () => {
    expect(hasNamedAnimation('  none  ')).toBe(false);
  });

  it('should trim whitespace around a valid animation name', () => {
    expect(hasNamedAnimation('  fade-in  ')).toBe(true);
  });

  it('should return true when at least one of multiple comma-separated names is valid', () => {
    expect(hasNamedAnimation('none, fade-in, none')).toBe(true);
  });

  it('should return false when all comma-separated names are "none"', () => {
    expect(hasNamedAnimation('none, none, none')).toBe(false);
  });

  it('should return true when multiple valid animation names are provided', () => {
    expect(hasNamedAnimation('fade-in, slide-up')).toBe(true);
  });

  it('should return false for a string with only commas and no names', () => {
    expect(hasNamedAnimation(',,')).toBe(false);
  });

  it('should skip empty segments between consecutive commas and still detect a valid name', () => {
    expect(hasNamedAnimation(',,fade-in,,')).toBe(true);
  });

  it('should return false for a string with commas and whitespace only', () => {
    expect(hasNamedAnimation(' , , ')).toBe(false);
  });

  it('should be case-sensitive and not treat "None" as the "none" keyword', () => {
    expect(hasNamedAnimation('None')).toBe(true);
  });

  it('should return true for a custom animation name that contains "none" as a substring', () => {
    expect(hasNamedAnimation('nonexistent-anim')).toBe(true);
  });

  it('should handle a single leading/trailing comma with a valid name', () => {
    expect(hasNamedAnimation('fade-in,')).toBe(true);
  });

  it('should return true for a mixed list where the valid name appears last', () => {
    expect(hasNamedAnimation('none, none, spin')).toBe(true);
  });

  it('should return true for a mixed list where the valid name appears first', () => {
    expect(hasNamedAnimation('spin, none, none')).toBe(true);
  });
});
