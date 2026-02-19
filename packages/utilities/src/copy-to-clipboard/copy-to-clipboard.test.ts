import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyToClipboard } from '.';

describe('copyToClipboard', () => {
  let mockClipboard: { writeText: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };

    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should copy text to clipboard successfully', async () => {
    const onSuccess = vi.fn();
    const value = 'Hello World';

    await copyToClipboard({ value, onSuccess });

    expect(mockClipboard.writeText).toHaveBeenCalledWith(value);
    expect(mockClipboard.writeText).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should call onSuccess callback when copy succeeds', async () => {
    const onSuccess = vi.fn();

    await copyToClipboard({ value: 'test', onSuccess });

    expect(onSuccess).toHaveBeenCalled();
  });

  it('should not call onError when copy succeeds', async () => {
    const onError = vi.fn();

    await copyToClipboard({ value: 'test', onError });

    expect(onError).not.toHaveBeenCalled();
  });

  it('should call onError with NOT_SUPPORTED when clipboard API is not available', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const onError = vi.fn();

    await copyToClipboard({ value: 'test', onError });

    expect(onError).toHaveBeenCalledWith({ type: 'NOT_SUPPORTED' });
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('should call onError with NOT_SUPPORTED when writeText is not available', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {},
      writable: true,
      configurable: true,
    });

    const onError = vi.fn();

    await copyToClipboard({ value: 'test', onError });

    expect(onError).toHaveBeenCalledWith({ type: 'NOT_SUPPORTED' });
  });

  it('should not call onSuccess when clipboard API is not supported', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const onSuccess = vi.fn();

    await copyToClipboard({ value: 'test', onSuccess });

    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('should call onError with COPY_FAILED when writeText throws an error', async () => {
    const errorMessage = 'Permission denied';
    mockClipboard.writeText.mockRejectedValue(new Error(errorMessage));

    const onError = vi.fn();

    await copyToClipboard({ value: 'test', onError });

    expect(onError).toHaveBeenCalledWith({
      type: 'COPY_FAILED',
      message: errorMessage,
    });
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('should handle non-Error objects in catch block', async () => {
    mockClipboard.writeText.mockRejectedValue('String error');

    const onError = vi.fn();

    await copyToClipboard({ value: 'test', onError });

    expect(onError).toHaveBeenCalledWith({
      type: 'COPY_FAILED',
      message: 'String error',
    });
  });

  it('should not call onSuccess when writeText fails', async () => {
    mockClipboard.writeText.mockRejectedValue(new Error('Failed'));

    const onSuccess = vi.fn();

    await copyToClipboard({ value: 'test', onSuccess });

    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('should work without any callbacks', async () => {
    await expect(copyToClipboard({ value: 'test' })).resolves.toBeUndefined();

    expect(mockClipboard.writeText).toHaveBeenCalledWith('test');
  });

  it('should copy empty string', async () => {
    const onSuccess = vi.fn();

    await copyToClipboard({ value: '', onSuccess });

    expect(mockClipboard.writeText).toHaveBeenCalledWith('');
    expect(onSuccess).toHaveBeenCalled();
  });

  it('should copy multiline text', async () => {
    const multilineText = 'Line 1\nLine 2\nLine 3';
    const onSuccess = vi.fn();

    await copyToClipboard({ value: multilineText, onSuccess });

    expect(mockClipboard.writeText).toHaveBeenCalledWith(multilineText);
    expect(onSuccess).toHaveBeenCalled();
  });
});
