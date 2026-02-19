import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from 'vitest-browser-qwik';
import { useSignal, $ } from '@qwik.dev/core';
import { wait } from '@entry-ui/utilities/wait';
import { useClipboard } from '.';

describe('useClipboard', () => {
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

  it('should initialize with "copied" set to false', async () => {
    const { result } = await renderHook(() => useClipboard());
    expect(result.copied.value).toBe(false);
  });

  it('should initialize with "error" set to null', async () => {
    const { result } = await renderHook(() => useClipboard());
    expect(result.error.value).toBe(null);
  });

  it('should set "copied" to true after successful copy', async () => {
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(result.copied.value).toBe(true);
  });

  it('should set "error" to null after successful copy', async () => {
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(result.error.value).toBe(null);
  });

  it('should not log to console when copy succeeds', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should automatically revert "copied" to false after "timeoutMs"', async () => {
    const { result } = await renderHook(() => useClipboard({ timeoutMs: 500 }));
    await result.copy$('Hello World');
    expect(result.copied.value).toBe(true);
    await wait(600);
    expect(result.copied.value).toBe(false);
  });

  it('should automatically clear "error" after "timeoutMs"', async () => {
    const { result } = await renderHook(() => useClipboard({ timeoutMs: 500 }));
    await result.copy$('Hello World');
    await wait(600);
    expect(result.error.value).toBe(null);
  });

  it('should use default "timeoutMs" of "3000ms"', async () => {
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    await wait(2900);
    expect(result.copied.value).toBe(true);
    await wait(200);
    expect(result.copied.value).toBe(false);
  });

  it('should set "error" to "NOT_SUPPORTED" when clipboard API is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(result.error.value).toBe('NOT_SUPPORTED');
  });

  it('should set "copied" to false when clipboard API is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(result.copied.value).toBe(false);
  });

  it('should log "NOT_SUPPORTED" error to console when clipboard API is unavailable in dev mode', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy.mock.calls[0][0]).toContain('Clipboard API is not supported in this browser.');
  });

  it('should set "error" to "COPY_FAILED" when writeText throws', async () => {
    mockClipboard.writeText.mockRejectedValue(new Error('Permission denied'));
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(result.error.value).toBe('COPY_FAILED');
  });

  it('should set "copied" to false when writeText throws', async () => {
    mockClipboard.writeText.mockRejectedValue(new Error('Permission denied'));
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(result.copied.value).toBe(false);
  });

  it('should log "COPY_FAILED" error to console when writeText throws in dev mode', async () => {
    mockClipboard.writeText.mockRejectedValue(new Error('Permission denied'));
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy.mock.calls[0][0]).toContain('The copy operation failed.');
  });

  it('should log "COPY_FAILED" error with permission details to console when writeText throws in dev mode', async () => {
    const errorMessage = 'Permission denied';
    mockClipboard.writeText.mockRejectedValue(new Error(errorMessage));
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy.mock.calls[0][0]).toContain(`Check clipboard permissions: ${errorMessage}`);
  });

  it('should clear previous "error" on successful copy', async () => {
    mockClipboard.writeText.mockRejectedValueOnce(new Error('Permission denied'));
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(result.error.value).toBe('COPY_FAILED');
    mockClipboard.writeText.mockResolvedValue(undefined);
    await result.copy$('Hello World');
    expect(result.error.value).toBe(null);
  });

  it('should reset "copied" to false when "reset$" is called', async () => {
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(result.copied.value).toBe(true);
    await result.reset$();
    expect(result.copied.value).toBe(false);
  });

  it('should reset "error" to null when "reset$" is called', async () => {
    mockClipboard.writeText.mockRejectedValue(new Error('Permission denied'));
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(result.error.value).toBe('COPY_FAILED');
    await result.reset$();
    expect(result.error.value).toBe(null);
  });

  it('should cancel pending timeout when "reset$" is called', async () => {
    const { result } = await renderHook(() => useClipboard({ timeoutMs: 500 }));
    await result.copy$('Hello World');
    await result.reset$();
    await wait(600);
    expect(result.copied.value).toBe(false);
  });

  it('should cancel pending timeout when "copy$" is called again before timeout elapses', async () => {
    const { result } = await renderHook(() => useClipboard({ timeoutMs: 500 }));
    await result.copy$('First');
    await wait(300);
    await result.copy$('Second');
    await wait(300);
    expect(result.copied.value).toBe(true);
    await wait(300);
    expect(result.copied.value).toBe(false);
  });

  it('should invoke "onStatusChange$" with { copied: true, error: null } after successful copy', async () => {
    const { result } = await renderHook(() => {
      const callbackDetails = useSignal<{ copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null } | undefined>(
        undefined
      );
      const onStatusChange$ = $((details: { copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null }) => {
        callbackDetails.value = details;
      });
      return {
        hook: useClipboard({ onStatusChange$ }),
        callbackDetails,
      };
    });
    await result.hook.copy$('Hello World');
    await wait(500);
    expect(result.callbackDetails.value).toEqual({ copied: true, error: null });
  });

  it('should invoke "onStatusChange$" with { copied: false, error: null } after timeout elapses', async () => {
    const { result } = await renderHook(() => {
      const callbackDetails = useSignal<{ copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null } | undefined>(
        undefined
      );
      const onStatusChange$ = $((details: { copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null }) => {
        callbackDetails.value = details;
      });
      return {
        hook: useClipboard({ timeoutMs: 500, onStatusChange$ }),
        callbackDetails,
      };
    });
    await result.hook.copy$('Hello World');
    await wait(600);
    expect(result.callbackDetails.value).toEqual({ copied: false, error: null });
  });

  it('should invoke "onStatusChange$" with { copied: false, error: "COPY_FAILED" } when copy fails', async () => {
    mockClipboard.writeText.mockRejectedValue(new Error('Permission denied'));
    const { result } = await renderHook(() => {
      const callbackDetails = useSignal<{ copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null } | undefined>(
        undefined
      );
      const onStatusChange$ = $((details: { copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null }) => {
        callbackDetails.value = details;
      });
      return {
        hook: useClipboard({ onStatusChange$ }),
        callbackDetails,
      };
    });
    await result.hook.copy$('Hello World');
    await wait(500);
    expect(result.callbackDetails.value).toEqual({ copied: false, error: 'COPY_FAILED' });
  });

  it('should invoke "onStatusChange$" with { copied: false, error: "NOT_SUPPORTED" } when clipboard API is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    const { result } = await renderHook(() => {
      const callbackDetails = useSignal<{ copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null } | undefined>(
        undefined
      );
      const onStatusChange$ = $((details: { copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null }) => {
        callbackDetails.value = details;
      });
      return {
        hook: useClipboard({ onStatusChange$ }),
        callbackDetails,
      };
    });
    await result.hook.copy$('Hello World');
    await wait(500);
    expect(result.callbackDetails.value).toEqual({ copied: false, error: 'NOT_SUPPORTED' });
  });

  it('should invoke "onStatusChange$" with { copied: false, error: null } when "reset$" is called', async () => {
    const { result } = await renderHook(() => {
      const callbackDetails = useSignal<{ copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null } | undefined>(
        undefined
      );
      const onStatusChange$ = $((details: { copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null }) => {
        callbackDetails.value = details;
      });
      return {
        hook: useClipboard({ onStatusChange$ }),
        callbackDetails,
      };
    });
    await result.hook.copy$('Hello World');
    await result.hook.reset$();
    await wait(500);
    expect(result.callbackDetails.value).toEqual({ copied: false, error: null });
  });

  it('should invoke "onStatusChange$" with { copied: false, error: null } when "reset$" is called after a failed copy', async () => {
    mockClipboard.writeText.mockRejectedValue(new Error('Permission denied'));
    const { result } = await renderHook(() => {
      const callbackDetails = useSignal<{ copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null } | undefined>(
        undefined
      );
      const onStatusChange$ = $((details: { copied: boolean; error: 'NOT_SUPPORTED' | 'COPY_FAILED' | null }) => {
        callbackDetails.value = details;
      });
      return {
        hook: useClipboard({ onStatusChange$ }),
        callbackDetails,
      };
    });
    await result.hook.copy$('Hello World');
    await result.hook.reset$();
    await wait(500);
    expect(result.callbackDetails.value).toEqual({ copied: false, error: null });
  });

  it('should call clipboard writeText with the provided value', async () => {
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(mockClipboard.writeText).toHaveBeenCalledWith('Hello World');
  });

  it('should call clipboard writeText with an empty string when empty string is provided', async () => {
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('');
    expect(mockClipboard.writeText).toHaveBeenCalledWith('');
  });

  it('should call clipboard writeText with special characters', async () => {
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello & <World> "Test" \'quote\'');
    expect(mockClipboard.writeText).toHaveBeenCalledWith('Hello & <World> "Test" \'quote\'');
  });

  it('should call clipboard writeText with a multiline string', async () => {
    const multiline = 'line one\nline two\nline three';
    const { result } = await renderHook(() => useClipboard());
    await result.copy$(multiline);
    expect(mockClipboard.writeText).toHaveBeenCalledWith(multiline);
  });

  it('should call clipboard writeText with a very long string', async () => {
    const longString = 'a'.repeat(10_000);
    const { result } = await renderHook(() => useClipboard());
    await result.copy$(longString);
    expect(mockClipboard.writeText).toHaveBeenCalledWith(longString);
  });

  it('should call clipboard writeText exactly once per copy$ call', async () => {
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(mockClipboard.writeText).toHaveBeenCalledTimes(1);
  });

  it('should call clipboard writeText with the latest value when copy$ is called multiple times', async () => {
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('First');
    await result.copy$('Second');
    await result.copy$('Third');
    expect(mockClipboard.writeText).toHaveBeenCalledTimes(3);
    expect(mockClipboard.writeText).toHaveBeenLastCalledWith('Third');
  });

  it('should not call clipboard writeText when clipboard API is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(mockClipboard.writeText).not.toHaveBeenCalled();
  });

  it('should work without any params provided', async () => {
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('Hello World');
    expect(result.copied.value).toBe(true);
    expect(result.error.value).toBe(null);
  });

  it('should handle copying an empty string', async () => {
    const { result } = await renderHook(() => useClipboard());
    await result.copy$('');
    expect(result.copied.value).toBe(true);
    expect(result.error.value).toBe(null);
  });
});
