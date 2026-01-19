import { describe, beforeEach, vi, it, expect } from 'vitest';
import { warn } from '.';

const mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

describe('warn', () => {
  beforeEach(() => {
    mockConsoleWarn.mockClear();
  });

  it('should format the message correctly with a prefix and a single message', () => {
    warn({
      prefix: '[Auth]',
      messages: ['Invalid login attempt.'],
    });

    expect(mockConsoleWarn).toHaveBeenCalledWith('[Auth] Invalid login attempt.');
  });

  it('should join multiple message segments with a space', () => {
    warn({
      prefix: '[UI]',
      messages: ['Button', 'component', 'is', 'deprecated.'],
    });

    expect(mockConsoleWarn).toHaveBeenCalledWith('[UI] Button component is deprecated.');
  });

  it('should handle an empty messages array by only printing the prefix', () => {
    warn({
      prefix: 'Core:',
      messages: [],
    });

    expect(mockConsoleWarn).toHaveBeenCalledWith('Core: ');
  });
});
