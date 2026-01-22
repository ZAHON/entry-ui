import { vi, describe, beforeEach, it, expect } from 'vitest';
import { error } from '.';

const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('error', () => {
  beforeEach(() => {
    mockConsoleError.mockClear();
  });

  it('should call console.error with "[Entry UI Qwik]" prefix', () => {
    error(['Test message']);

    expect(mockConsoleError).toHaveBeenCalledWith('[Entry UI Qwik] Test message');
  });

  it('should pass through messages array correctly', () => {
    error(['Part 1', 'Part 2', 'Part 3']);

    expect(mockConsoleError).toHaveBeenCalledWith('[Entry UI Qwik] Part 1 Part 2 Part 3');
  });
});
