import { describe, it, expect } from 'vitest';
import { fail } from '.';

describe('fail', () => {
  it('should throw an error with "[Entry UI Qwik]" prefix', () => {
    expect(() => {
      fail(['Component initialization failed']);
    }).toThrowError('[Entry UI Qwik] Component initialization failed');
  });

  it('should pass through messages array correctly', () => {
    expect(() => {
      fail(['Usage', 'of', 'this', 'API', 'is', 'discouraged']);
    }).toThrowError('[Entry UI Qwik] Usage of this API is discouraged');
  });
});
