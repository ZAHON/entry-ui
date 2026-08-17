import { describe, it, expect, afterEach } from 'vitest';
import { isTestEnvironmentDOM } from '.';

describe('isTestEnvironmentDOM', () => {
  // Helper to stub `navigator.userAgent` for a single test, since the real `navigator` object
  // property is non-writable by default. `getUserAgent` (used internally) falls back to this
  // value whenever `navigator.userAgentData` is unavailable, which is the default in jsdom.
  const stubUserAgent = (value: string) => {
    Object.defineProperty(navigator, 'userAgent', {
      value,
      configurable: true,
    });
  };

  // Helper to stub `navigator.userAgentData`, giving Client Hints priority over `userAgent`.
  const stubUserAgentData = (value: unknown) => {
    Object.defineProperty(navigator, 'userAgentData', {
      value,
      configurable: true,
    });
  };

  afterEach(() => {
    // @ts-expect-error - cleaning up a property that may not exist on the base type
    delete navigator.userAgentData;
  });

  it('should return true in the current jsdom test environment without any stubbing', () => {
    // jsdom's default `navigator.userAgent` includes a "jsdom/<version>" signature,
    // so this confirms real, unmodified behavior in the actual test runtime.
    expect(isTestEnvironmentDOM()).toBe(true);
  });

  it('should return true when navigator.userAgent contains "jsdom"', () => {
    stubUserAgent('Mozilla/5.0 (linux) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/24.0.0');

    expect(isTestEnvironmentDOM()).toBe(true);
  });

  it('should return true when navigator.userAgent contains "jsdom" in a different letter case', () => {
    stubUserAgent('Mozilla/5.0 JSDOM/24.0.0');

    expect(isTestEnvironmentDOM()).toBe(true);
  });

  it('should return true when navigator.userAgent contains "happydom"', () => {
    stubUserAgent('Mozilla/5.0 HappyDOM/12.0.0');

    expect(isTestEnvironmentDOM()).toBe(true);
  });

  it('should return true when navigator.userAgent contains "happydom" in a different letter case', () => {
    stubUserAgent('Mozilla/5.0 HAPPYDOM/12.0.0');

    expect(isTestEnvironmentDOM()).toBe(true);
  });

  it('should return true when the "jsdom" signature appears anywhere within a longer user agent string', () => {
    stubUserAgent('Some prefix text before the signature jsdom and some suffix text after it');

    expect(isTestEnvironmentDOM()).toBe(true);
  });

  it('should return false for a regular desktop Chrome user agent string', () => {
    stubUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    );

    expect(isTestEnvironmentDOM()).toBe(false);
  });

  it('should return false for a regular Firefox user agent string', () => {
    stubUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0');

    expect(isTestEnvironmentDOM()).toBe(false);
  });

  it('should return false for a regular Safari user agent string', () => {
    stubUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'
    );

    expect(isTestEnvironmentDOM()).toBe(false);
  });

  it('should return false for a mobile Safari (iPhone) user agent string', () => {
    stubUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    );

    expect(isTestEnvironmentDOM()).toBe(false);
  });

  it('should return false when navigator.userAgent is an empty string', () => {
    stubUserAgent('');

    expect(isTestEnvironmentDOM()).toBe(false);
  });

  it('should return false when navigator.userAgentData.brands is available and contains no DOM-simulator signatures', () => {
    stubUserAgentData({
      brands: [
        { brand: 'Chromium', version: '122' },
        { brand: 'Google Chrome', version: '122' },
      ],
    });

    expect(isTestEnvironmentDOM()).toBe(false);
  });

  it('should return true when navigator.userAgentData.brands contains a jsdom-like brand signature', () => {
    stubUserAgentData({
      brands: [{ brand: 'jsdom', version: '24' }],
    });

    expect(isTestEnvironmentDOM()).toBe(true);
  });

  it('should not falsely match unrelated substrings that merely resemble the target signatures', () => {
    stubUserAgent('Mozilla/5.0 SomeBrowserWithoutTheSignature/1.0');

    expect(isTestEnvironmentDOM()).toBe(false);
  });
});
