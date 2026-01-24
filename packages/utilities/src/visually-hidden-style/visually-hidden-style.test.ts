import { describe, it, expect } from 'vitest';
import { visuallyHiddenStyle } from '.';

describe('visuallyHiddenStyle', () => {
  it('should have all required CSS properties with correct values', () => {
    expect(visuallyHiddenStyle.clipPath).toBe('inset(50%)');
    expect(visuallyHiddenStyle.overflow).toBe('hidden');
    expect(visuallyHiddenStyle.whiteSpace).toBe('nowrap');
    expect(visuallyHiddenStyle.border).toBe(0);
    expect(visuallyHiddenStyle.padding).toBe(0);
    expect(visuallyHiddenStyle.width).toBe(1);
    expect(visuallyHiddenStyle.height).toBe(1);
    expect(visuallyHiddenStyle.margin).toBe(-1);
    expect(visuallyHiddenStyle.position).toBe('fixed');
    expect(visuallyHiddenStyle.top).toBe(0);
    expect(visuallyHiddenStyle.left).toBe(0);
  });

  it('should be a frozen object', () => {
    expect(Object.isFrozen(visuallyHiddenStyle)).toBe(true);
  });
});
