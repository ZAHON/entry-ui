import { describe, beforeEach, vi, it, expect } from 'vitest';
import { warn } from '.';

const mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

describe('warn', () => {
  beforeEach(() => {
    mockConsoleWarn.mockClear();
  });

  it('should call console.warn with "[Entry UI Qwik]" prefix', () => {
    warn(['Component is deprecated']);

    expect(mockConsoleWarn).toHaveBeenCalledWith('[Entry UI Qwik] Component is deprecated');
  });

  it('should pass through messages array correctly', () => {
    warn(['Usage', 'of', 'this', 'API', 'is', 'discouraged']);

    expect(mockConsoleWarn).toHaveBeenCalledWith('[Entry UI Qwik] Usage of this API is discouraged');
  });
});
