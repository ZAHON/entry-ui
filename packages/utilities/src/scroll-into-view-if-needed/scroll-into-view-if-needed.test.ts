import type { HTMLElementWithScrollIntoViewIfNeeded } from '.';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { scrollIntoViewIfNeeded } from '.';

describe('scrollIntoViewIfNeeded', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
  });

  it('should use scrollIntoViewIfNeeded when available in Chromium/WebKit browsers', () => {
    const scrollIntoViewIfNeededMock = vi.fn();
    (mockElement as HTMLElementWithScrollIntoViewIfNeeded).scrollIntoViewIfNeeded = scrollIntoViewIfNeededMock;

    scrollIntoViewIfNeeded({ element: mockElement });

    expect(scrollIntoViewIfNeededMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewIfNeededMock).toHaveBeenCalledWith(true);
  });

  it('should pass center parameter to scrollIntoViewIfNeeded when center is true', () => {
    const scrollIntoViewIfNeededMock = vi.fn();
    (mockElement as HTMLElementWithScrollIntoViewIfNeeded).scrollIntoViewIfNeeded = scrollIntoViewIfNeededMock;

    scrollIntoViewIfNeeded({ element: mockElement, center: true });

    expect(scrollIntoViewIfNeededMock).toHaveBeenCalledWith(true);
  });

  it('should pass center parameter to scrollIntoViewIfNeeded when center is false', () => {
    const scrollIntoViewIfNeededMock = vi.fn();
    (mockElement as HTMLElementWithScrollIntoViewIfNeeded).scrollIntoViewIfNeeded = scrollIntoViewIfNeededMock;

    scrollIntoViewIfNeeded({ element: mockElement, center: false });

    expect(scrollIntoViewIfNeededMock).toHaveBeenCalledWith(false);
  });

  it('should fall back to scrollIntoView when scrollIntoViewIfNeeded is not available', () => {
    const scrollIntoViewMock = vi.fn();
    mockElement.scrollIntoView = scrollIntoViewMock;

    scrollIntoViewIfNeeded({ element: mockElement });

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'center',
      inline: 'nearest',
    });
  });

  it('should use "center" block alignment when center is true with scrollIntoView fallback', () => {
    const scrollIntoViewMock = vi.fn();
    mockElement.scrollIntoView = scrollIntoViewMock;

    scrollIntoViewIfNeeded({ element: mockElement, center: true });

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'center',
      inline: 'nearest',
    });
  });

  it('should use "nearest" block alignment when center is false with scrollIntoView fallback', () => {
    const scrollIntoViewMock = vi.fn();
    mockElement.scrollIntoView = scrollIntoViewMock;

    scrollIntoViewIfNeeded({ element: mockElement, center: false });

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'nearest',
      inline: 'nearest',
    });
  });

  it('should default center parameter to true when not provided', () => {
    const scrollIntoViewIfNeededMock = vi.fn();
    (mockElement as HTMLElementWithScrollIntoViewIfNeeded).scrollIntoViewIfNeeded = scrollIntoViewIfNeededMock;

    scrollIntoViewIfNeeded({ element: mockElement });

    expect(scrollIntoViewIfNeededMock).toHaveBeenCalledWith(true);
  });

  it('should not call scrollIntoView when scrollIntoViewIfNeeded is available', () => {
    const scrollIntoViewMock = vi.fn();
    const scrollIntoViewIfNeededMock = vi.fn();

    mockElement.scrollIntoView = scrollIntoViewMock;
    (mockElement as HTMLElementWithScrollIntoViewIfNeeded).scrollIntoViewIfNeeded = scrollIntoViewIfNeededMock;

    scrollIntoViewIfNeeded({ element: mockElement });

    expect(scrollIntoViewIfNeededMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });
});
