import { describe, it, expect } from 'vitest';
import { visuallyHiddenInputStyle } from '.';

describe('visuallyHiddenInputStyle', () => {
  it('should have all required CSS properties with correct values', () => {
    expect(visuallyHiddenInputStyle.clipPath).toBe('inset(50%)');
    expect(visuallyHiddenInputStyle.overflow).toBe('hidden');
    expect(visuallyHiddenInputStyle.whiteSpace).toBe('nowrap');
    expect(visuallyHiddenInputStyle.border).toBe(0);
    expect(visuallyHiddenInputStyle.padding).toBe(0);
    expect(visuallyHiddenInputStyle.width).toBe(1);
    expect(visuallyHiddenInputStyle.height).toBe(1);
    expect(visuallyHiddenInputStyle.margin).toBe(-1);
    expect(visuallyHiddenInputStyle.position).toBe('absolute');
  });

  it('should be a frozen object', () => {
    expect(Object.isFrozen(visuallyHiddenInputStyle)).toBe(true);
  });
});
