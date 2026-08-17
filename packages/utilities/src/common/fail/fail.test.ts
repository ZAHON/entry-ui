import { describe, it, expect } from 'vitest';
import { fail } from '.';

describe('fail', () => {
  it('should throw an error with prefix and joined messages', () => {
    expect(() => {
      fail({ prefix: '[Core]', messages: ['Critical', 'failure', 'detected.'] });
    }).toThrowError('[Core] Critical failure detected.');
  });

  it('should throw an error with single message', () => {
    expect(() => {
      fail({ prefix: '[Auth]', messages: ['Unauthorized'] });
    }).toThrowError('[Auth] Unauthorized');
  });

  it('should throw an error with empty messages array', () => {
    expect(() => {
      fail({ prefix: '[Error]', messages: [] });
    }).toThrowError('[Error] ');
  });

  it('should throw an error with multiple word messages', () => {
    expect(() => {
      fail({
        prefix: '[Database]',
        messages: ['Connection failed', 'to server', 'localhost:5432'],
      });
    }).toThrowError('[Database] Connection failed to server localhost:5432');
  });

  it('should throw an error with special characters in messages', () => {
    expect(() => {
      fail({
        prefix: '[Validation]',
        messages: ['Invalid input:', 'expected <string>', 'got null'],
      });
    }).toThrowError('[Validation] Invalid input: expected <string> got null');
  });

  it('should throw an Error instance', () => {
    expect(() => {
      fail({ prefix: '[Test]', messages: ['Error'] });
    }).toThrow(Error);
  });
});
