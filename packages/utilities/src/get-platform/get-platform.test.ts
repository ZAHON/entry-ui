import { describe, it, expect, afterEach } from 'vitest';
import { getPlatform } from '.';

describe('getPlatform', () => {
  // Helper to stub `navigator.userAgentData` for a single test, since it is not defined
  // by default in jsdom and the real `navigator` object properties are non-writable.
  const stubUserAgentData = (value: unknown) => {
    Object.defineProperty(navigator, 'userAgentData', {
      value,
      configurable: true,
    });
  };

  // Helper to stub the legacy `navigator.platform` string for a single test.
  const stubPlatform = (value: string) => {
    Object.defineProperty(navigator, 'platform', {
      value,
      configurable: true,
    });
  };

  afterEach(() => {
    // Remove both stubbed properties after every test so nothing leaks into the next one,
    // regardless of execution order or which properties a given test actually touched.
    // @ts-expect-error - cleaning up a property that may not exist on the base type
    delete navigator.userAgentData;
    // @ts-expect-error - restoring the original, non-configurable-by-default descriptor
    delete navigator.platform;
  });

  it('should return the platform from userAgentData when available', () => {
    stubUserAgentData({ platform: 'Windows' });

    expect(getPlatform()).toBe('Windows');
  });

  it('should return the correct platform for Linux via userAgentData', () => {
    stubUserAgentData({ platform: 'Linux' });

    expect(getPlatform()).toBe('Linux');
  });

  it('should return the correct platform for Android via userAgentData', () => {
    stubUserAgentData({ platform: 'Android' });

    expect(getPlatform()).toBe('Android');
  });

  it('should handle userAgentData with additional properties besides platform', () => {
    stubUserAgentData({ platform: 'Windows', brands: [], mobile: false });

    expect(getPlatform()).toBe('Windows');
  });

  it('should return navigator.platform when userAgentData is undefined', () => {
    stubUserAgentData(undefined);
    stubPlatform('MacIntel');

    expect(getPlatform()).toBe('MacIntel');
  });

  it('should return navigator.platform when userAgentData is null', () => {
    stubUserAgentData(null);
    stubPlatform('Win32');

    expect(getPlatform()).toBe('Win32');
  });

  it('should return navigator.platform when userAgentData.platform is undefined', () => {
    stubUserAgentData({});
    stubPlatform('Linux x86_64');

    expect(getPlatform()).toBe('Linux x86_64');
  });

  it('should return navigator.platform when userAgentData has no platform key', () => {
    stubUserAgentData({ brands: [], mobile: false });
    stubPlatform('Win32');

    expect(getPlatform()).toBe('Win32');
  });

  it('should return navigator.platform when userAgentData.platform is not a string (e.g. null)', () => {
    stubUserAgentData({ platform: null });
    stubPlatform('Win32');

    expect(getPlatform()).toBe('Win32');
  });

  it('should return the correct platform for iOS via navigator.platform', () => {
    stubUserAgentData(undefined);
    stubPlatform('iPhone');

    expect(getPlatform()).toBe('iPhone');
  });

  it('should prefer userAgentData.platform over navigator.platform', () => {
    stubUserAgentData({ platform: 'macOS' });
    stubPlatform('MacIntel');

    expect(getPlatform()).toBe('macOS');
  });

  it('should return an empty string when userAgentData.platform is an empty string, without falling back', () => {
    stubUserAgentData({ platform: '' });
    stubPlatform('MacIntel');

    expect(getPlatform()).toBe('');
  });

  it('should return navigator.platform unmodified even when it is an empty string', () => {
    stubUserAgentData(undefined);
    stubPlatform('');

    expect(getPlatform()).toBe('');
  });

  it('should return an empty string when neither userAgentData nor navigator.platform is available', () => {
    stubUserAgentData(undefined);
    stubPlatform(undefined as unknown as string);

    expect(getPlatform()).toBe('');
  });

  it('should return an empty string when userAgentData.platform is null and navigator.platform is null', () => {
    stubUserAgentData({ platform: null });
    stubPlatform(null as unknown as string);

    expect(getPlatform()).toBe('');
  });

  it('should fall back to the environment default navigator.platform when nothing was stubbed', () => {
    // No stubbing at all - relies on jsdom's own defaults, confirming the utility works
    // correctly even without any Client Hints support configured.
    expect(getPlatform()).toBe(navigator.platform);
    expect(typeof getPlatform()).toBe('string');
  });

  it('should return a string type regardless of the source', () => {
    stubUserAgentData({ platform: 'Windows' });

    expect(typeof getPlatform()).toBe('string');
  });

  it('should return a string type when falling back to navigator.platform', () => {
    stubUserAgentData(undefined);
    stubPlatform('MacIntel');

    expect(typeof getPlatform()).toBe('string');
  });

  it('should not throw when called multiple times in a row', () => {
    stubUserAgentData({ platform: 'Windows' });

    expect(() => {
      getPlatform();
      getPlatform();
      getPlatform();
    }).not.toThrow();
  });

  it('should return a consistent result on repeated calls with the same environment', () => {
    stubUserAgentData({ platform: 'Windows' });

    expect(getPlatform()).toBe(getPlatform());
  });

  it('should not mutate the navigator object as a side effect', () => {
    stubUserAgentData({ platform: 'Windows' });
    const navigatorWithUAData = navigator as Navigator & { userAgentData?: unknown };
    const snapshotBefore = JSON.stringify(navigatorWithUAData.userAgentData);

    getPlatform();

    expect(JSON.stringify(navigatorWithUAData.userAgentData)).toBe(snapshotBefore);
  });
});
