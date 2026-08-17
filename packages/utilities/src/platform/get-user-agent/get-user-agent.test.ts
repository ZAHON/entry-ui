import { describe, it, expect, afterEach } from 'vitest';
import { getUserAgent } from '.';

describe('getUserAgent', () => {
  // Helper to stub `navigator.userAgentData` for a single test, since it is not defined
  // by default in jsdom and the real `navigator` object properties are non-writable.
  const stubUserAgentData = (value: unknown) => {
    Object.defineProperty(navigator, 'userAgentData', {
      value,
      configurable: true,
    });
  };

  // Helper to stub the legacy `navigator.userAgent` string for a single test.
  const stubUserAgent = (value: string) => {
    Object.defineProperty(navigator, 'userAgent', {
      value,
      configurable: true,
    });
  };

  afterEach(() => {
    // Remove the stubbed `userAgentData` property so it doesn't leak between tests,
    // restoring the environment to a state where Client Hints are unsupported.
    // @ts-expect-error - cleaning up a property that may not exist on the base type
    delete navigator.userAgentData;
  });

  it('should return a single "brand/version" string when userAgentData.brands contains one entry', () => {
    stubUserAgentData({
      brands: [{ brand: 'Google Chrome', version: '122' }],
    });

    expect(getUserAgent()).toBe('Google Chrome/122');
  });

  it('should return a space-separated string of all brand/version pairs when userAgentData.brands contains multiple entries', () => {
    stubUserAgentData({
      brands: [
        { brand: 'Chromium', version: '122' },
        { brand: 'Not(A:Brand', version: '24' },
        { brand: 'Google Chrome', version: '122' },
      ],
    });

    expect(getUserAgent()).toBe('Chromium/122 Not(A:Brand/24 Google Chrome/122');
  });

  it('should correctly join more than three brand entries in the original order', () => {
    stubUserAgentData({
      brands: [
        { brand: 'A', version: '1' },
        { brand: 'B', version: '2' },
        { brand: 'C', version: '3' },
        { brand: 'D', version: '4' },
      ],
    });

    expect(getUserAgent()).toBe('A/1 B/2 C/3 D/4');
  });

  it('should return an empty string when userAgentData.brands is an empty array', () => {
    stubUserAgentData({
      brands: [],
    });

    expect(getUserAgent()).toBe('');
  });

  it('should fall back to navigator.userAgent when userAgentData is undefined', () => {
    stubUserAgentData(undefined);
    stubUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');

    expect(getUserAgent()).toBe('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
  });

  it('should fall back to navigator.userAgent when userAgentData is null', () => {
    stubUserAgentData(null);
    stubUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    expect(getUserAgent()).toBe('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  });

  it('should fall back to navigator.userAgent when userAgentData.brands is not an array', () => {
    stubUserAgentData({ brands: 'not-an-array' });
    stubUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36');

    expect(getUserAgent()).toBe('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36');
  });

  it('should fall back to navigator.userAgent when userAgentData.brands is undefined', () => {
    stubUserAgentData({});
    stubUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');

    expect(getUserAgent()).toBe('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');
  });

  it('should fall back to navigator.userAgent when userAgentData object itself has no brands property at all', () => {
    stubUserAgentData({ mobile: false, platform: 'macOS' });
    stubUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');

    expect(getUserAgent()).toBe('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');
  });

  it('should fall back to the environment default navigator.userAgent when userAgentData was never set', () => {
    // No stubbing at all - relies on jsdom's default `navigator.userAgent`, confirming
    // the utility works correctly even without any Client Hints support configured.
    expect(getUserAgent()).toBe(navigator.userAgent);
    expect(typeof getUserAgent()).toBe('string');
  });

  it('should not add a trailing or leading space when formatting multiple brand entries', () => {
    stubUserAgentData({
      brands: [
        { brand: 'Chromium', version: '122' },
        { brand: 'Google Chrome', version: '122' },
      ],
    });

    const result = getUserAgent();

    expect(result.startsWith(' ')).toBe(false);
    expect(result.endsWith(' ')).toBe(false);
  });

  it('should preserve special characters present in brand names without escaping or stripping them', () => {
    stubUserAgentData({
      brands: [{ brand: 'Not/A)Brand', version: '99' }],
    });

    expect(getUserAgent()).toBe('Not/A)Brand/99');
  });
});
