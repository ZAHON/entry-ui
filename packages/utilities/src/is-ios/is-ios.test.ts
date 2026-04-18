import { describe, it, expect, beforeEach } from 'vitest';
import { isIos } from '.';

describe('isIos', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'userAgentData', {
      value: undefined,
      configurable: true,
    });
  });

  const mockPlatform = (platform: string) =>
    Object.defineProperty(navigator, 'platform', {
      value: platform,
      configurable: true,
    });

  const mockMaxTouchPoints = (value: number) =>
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value,
      configurable: true,
    });

  it('should return true when platform is iPhone', () => {
    mockPlatform('iPhone');

    expect(isIos()).toBe(true);
  });

  it('should return true when platform is iPhone with case-insensitive match', () => {
    mockPlatform('iphone');

    expect(isIos()).toBe(true);
  });

  it('should return true when platform is iPad', () => {
    mockPlatform('iPad');

    expect(isIos()).toBe(true);
  });

  it('should return true when platform is iPad with case-insensitive match', () => {
    mockPlatform('ipad');

    expect(isIos()).toBe(true);
  });

  it('should return true when platform is Mac and maxTouchPoints is greater than 1', () => {
    mockPlatform('MacIntel');
    mockMaxTouchPoints(2);

    expect(isIos()).toBe(true);
  });

  it('should return true when platform starts with Mac case-insensitively and maxTouchPoints is greater than 1', () => {
    mockPlatform('macintel');
    mockMaxTouchPoints(5);

    expect(isIos()).toBe(true);
  });

  it('should return false when platform is Mac and maxTouchPoints is 0', () => {
    mockPlatform('MacIntel');
    mockMaxTouchPoints(0);

    expect(isIos()).toBe(false);
  });

  it('should return false when platform is Mac and maxTouchPoints is exactly 1', () => {
    mockPlatform('MacIntel');
    mockMaxTouchPoints(1);

    expect(isIos()).toBe(false);
  });

  it('should return false when platform is Windows', () => {
    mockPlatform('Win32');
    mockMaxTouchPoints(0);

    expect(isIos()).toBe(false);
  });

  it('should return false when platform is Linux', () => {
    mockPlatform('Linux x86_64');
    mockMaxTouchPoints(0);

    expect(isIos()).toBe(false);
  });

  it('should return false when platform is Android', () => {
    mockPlatform('Android');
    mockMaxTouchPoints(0);

    expect(isIos()).toBe(false);
  });

  it('should return false when platform is empty string', () => {
    mockPlatform('');
    mockMaxTouchPoints(0);

    expect(isIos()).toBe(false);
  });

  it('should return false when platform contains iPhone but does not start with it', () => {
    mockPlatform('Not-iPhone');
    mockMaxTouchPoints(0);

    expect(isIos()).toBe(false);
  });

  it('should return false when platform contains iPad but does not start with it', () => {
    mockPlatform('Not-iPad');
    mockMaxTouchPoints(0);

    expect(isIos()).toBe(false);
  });

  it('should return false when platform contains Mac but does not start with it', () => {
    mockPlatform('NotMac');
    mockMaxTouchPoints(5);

    expect(isIos()).toBe(false);
  });
});
