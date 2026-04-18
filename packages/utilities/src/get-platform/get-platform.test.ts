import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPlatform } from '.';

describe('getPlatform', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should return platform from userAgentData when available', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: { platform: 'Windows' },
      configurable: true,
    });

    expect(getPlatform()).toBe('Windows');
  });

  it('should return correct platform for Linux via userAgentData', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: { platform: 'Linux' },
      configurable: true,
    });

    expect(getPlatform()).toBe('Linux');
  });

  it('should return correct platform for Android via userAgentData', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: { platform: 'Android' },
      configurable: true,
    });

    expect(getPlatform()).toBe('Android');
  });

  it('should handle userAgentData with additional properties besides platform', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: { platform: 'Windows', brands: [], mobile: false },
      configurable: true,
    });

    expect(getPlatform()).toBe('Windows');
  });

  it('should return navigator.platform when userAgentData is undefined', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: undefined,
      configurable: true,
    });
    Object.defineProperty(navigator, 'platform', {
      value: 'MacIntel',
      configurable: true,
    });

    expect(getPlatform()).toBe('MacIntel');
  });

  it('should return navigator.platform when userAgentData is null', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: null,
      configurable: true,
    });
    Object.defineProperty(navigator, 'platform', {
      value: 'Win32',
      configurable: true,
    });

    expect(getPlatform()).toBe('Win32');
  });

  it('should return navigator.platform when userAgentData.platform is undefined', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: {},
      configurable: true,
    });
    Object.defineProperty(navigator, 'platform', {
      value: 'Linux x86_64',
      configurable: true,
    });

    expect(getPlatform()).toBe('Linux x86_64');
  });

  it('should return navigator.platform when userAgentData has no platform key', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: { brands: [], mobile: false },
      configurable: true,
    });
    Object.defineProperty(navigator, 'platform', {
      value: 'Win32',
      configurable: true,
    });

    expect(getPlatform()).toBe('Win32');
  });

  it('should return correct platform for iOS via navigator.platform', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: undefined,
      configurable: true,
    });
    Object.defineProperty(navigator, 'platform', {
      value: 'iPhone',
      configurable: true,
    });

    expect(getPlatform()).toBe('iPhone');
  });

  it('should prefer userAgentData.platform over navigator.platform', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: { platform: 'macOS' },
      configurable: true,
    });
    Object.defineProperty(navigator, 'platform', {
      value: 'MacIntel',
      configurable: true,
    });

    expect(getPlatform()).toBe('macOS');
  });

  it('should return an empty string when userAgentData.platform is an empty string', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: { platform: '' },
      configurable: true,
    });
    Object.defineProperty(navigator, 'platform', {
      value: 'MacIntel',
      configurable: true,
    });

    expect(getPlatform()).toBe('');
  });

  it('should return a string type regardless of the source', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: { platform: 'Windows' },
      configurable: true,
    });

    expect(typeof getPlatform()).toBe('string');
  });

  it('should return a string type when falling back to navigator.platform', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: undefined,
      configurable: true,
    });
    Object.defineProperty(navigator, 'platform', {
      value: 'MacIntel',
      configurable: true,
    });

    expect(typeof getPlatform()).toBe('string');
  });

  it('should not throw when called multiple times in a row', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: { platform: 'Windows' },
      configurable: true,
    });

    expect(() => {
      getPlatform();
      getPlatform();
      getPlatform();
    }).not.toThrow();
  });

  it('should return consistent result on repeated calls with the same environment', () => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: { platform: 'Windows' },
      configurable: true,
    });

    expect(getPlatform()).toBe(getPlatform());
  });
});
