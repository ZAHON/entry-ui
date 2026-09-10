import { describe, it, expect } from 'vitest';
import { hasNonZeroDuration } from '.';

describe('hasNonZeroDuration', () => {
  it('should return true for a single positive duration in seconds', () => {
    expect(hasNonZeroDuration('0.3s')).toBe(true);
  });

  it('should return true for a single positive duration in milliseconds', () => {
    expect(hasNonZeroDuration('300ms')).toBe(true);
  });

  it('should return false for a zero duration in seconds', () => {
    expect(hasNonZeroDuration('0s')).toBe(false);
  });

  it('should return false for a zero duration in milliseconds', () => {
    expect(hasNonZeroDuration('0ms')).toBe(false);
  });

  it('should return false for a bare zero without a unit', () => {
    expect(hasNonZeroDuration('0')).toBe(false);
  });

  it('should return false for an empty string', () => {
    expect(hasNonZeroDuration('')).toBe(false);
  });

  it('should return false for a string containing only whitespace', () => {
    expect(hasNonZeroDuration('   ')).toBe(false);
  });

  it('should trim whitespace before parsing a valid duration', () => {
    expect(hasNonZeroDuration('  0.5s  ')).toBe(true);
  });

  it('should return true when at least one of multiple comma-separated durations is non-zero', () => {
    expect(hasNonZeroDuration('0s, 0.3s, 0s')).toBe(true);
  });

  it('should return false when all comma-separated durations are zero', () => {
    expect(hasNonZeroDuration('0s, 0ms, 0')).toBe(false);
  });

  it('should return true when multiple non-zero durations are provided', () => {
    expect(hasNonZeroDuration('0.2s, 0.4s')).toBe(true);
  });

  it('should return false for a string with only commas and no values', () => {
    expect(hasNonZeroDuration(',,')).toBe(false);
  });

  it('should skip empty segments between consecutive commas and still detect a non-zero value', () => {
    expect(hasNonZeroDuration(',,0.3s,,')).toBe(true);
  });

  it('should return false for a string with commas and whitespace only', () => {
    expect(hasNonZeroDuration(' , , ')).toBe(false);
  });

  it('should return false for a negative duration', () => {
    expect(hasNonZeroDuration('-0.3s')).toBe(false);
  });

  it('should return true for a duration without a unit suffix parsed as a plain number', () => {
    expect(hasNonZeroDuration('1')).toBe(true);
  });

  it('should return false for a non-numeric, unparsable value', () => {
    expect(hasNonZeroDuration('none')).toBe(false);
  });

  it('should return true for a mixed list where the non-zero duration appears last', () => {
    expect(hasNonZeroDuration('0s, 0s, 0.6s')).toBe(true);
  });

  it('should return true for a mixed list where the non-zero duration appears first', () => {
    expect(hasNonZeroDuration('0.6s, 0s, 0s')).toBe(true);
  });

  it('should return true for a very small positive duration close to zero', () => {
    expect(hasNonZeroDuration('0.001s')).toBe(true);
  });

  it('should return true for a duration expressed in a decimal form without a leading digit', () => {
    expect(hasNonZeroDuration('.5s')).toBe(true);
  });
});
