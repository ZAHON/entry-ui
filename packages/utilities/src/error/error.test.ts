import { vi, describe, beforeEach, it, expect } from 'vitest';
import { error } from '.';

const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('error', () => {
  beforeEach(() => {
    mockConsoleError.mockClear();
  });

  it('should log an error with the correctly formatted message', () => {
    error({
      prefix: '[AuthService]',
      messages: ['Invalid', 'password', 'provided'],
    });

    expect(mockConsoleError).toHaveBeenCalledWith('[AuthService] Invalid password provided');
  });

  it('should call console.error exactly once', () => {
    error({
      prefix: '[Core]',
      messages: ['Unexpected failure'],
    });

    expect(mockConsoleError).toHaveBeenCalledTimes(1);
  });

  it('should handle an empty messages array by showing only the prefix', () => {
    error({
      prefix: 'Database:',
      messages: [],
    });

    expect(mockConsoleError).toHaveBeenCalledWith('Database: ');
  });

  it('should handle multiple message segments correctly', () => {
    error({
      prefix: '[API]',
      messages: ['Failed', 'to', 'connect', 'to', 'server'],
    });

    expect(mockConsoleError).toHaveBeenCalledWith('[API] Failed to connect to server');
  });
});
