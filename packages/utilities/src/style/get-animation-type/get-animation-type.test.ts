import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getAnimationType } from '.';

describe('getAnimationType', () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should return "none" when there is no animation and no transition', () => {
    element.style.animationName = 'none';
    element.style.animationDuration = '0s';
    element.style.transitionDuration = '0s';

    expect(getAnimationType({ element })).toBe('none');
  });

  it('should return "css-animation" when a named animation has a non-zero duration', () => {
    element.style.animationName = 'fade-in';
    element.style.animationDuration = '1s';
    element.style.transitionDuration = '0s';

    expect(getAnimationType({ element })).toBe('css-animation');
  });

  it('should return "css-transition" when transition-duration is non-zero and there is no animation', () => {
    element.style.animationName = 'none';
    element.style.animationDuration = '0s';
    element.style.transitionDuration = '0.3s';

    expect(getAnimationType({ element })).toBe('css-transition');
  });

  it('should return "both" when a named animation and a transition are active at the same time', () => {
    element.style.animationName = 'fade-in';
    element.style.animationDuration = '1s';
    element.style.transitionDuration = '0.3s';

    expect(getAnimationType({ element })).toBe('both');
  });

  it('should return "none" when animation-name is set but animation-duration is zero', () => {
    element.style.animationName = 'fade-in';
    element.style.animationDuration = '0s';
    element.style.transitionDuration = '0s';

    expect(getAnimationType({ element })).toBe('none');
  });

  it('should return "none" when animation-name is "none" even if animation-duration is non-zero, and ignoreAnimationName is not set', () => {
    element.style.animationName = 'none';
    element.style.animationDuration = '1s';
    element.style.transitionDuration = '0s';

    expect(getAnimationType({ element })).toBe('none');
  });

  it('should return "none" when animation-name is "none" even if animation-duration is non-zero, and ignoreAnimationName is explicitly false', () => {
    element.style.animationName = 'none';
    element.style.animationDuration = '1s';
    element.style.transitionDuration = '0s';

    expect(getAnimationType({ element, ignoreAnimationName: false })).toBe('none');
  });

  it('should return "css-animation" when animation-name is "none" but ignoreAnimationName is true and duration is non-zero', () => {
    element.style.animationName = 'none';
    element.style.animationDuration = '1s';
    element.style.transitionDuration = '0s';

    expect(getAnimationType({ element, ignoreAnimationName: true })).toBe('css-animation');
  });

  it('should return "none" when ignoreAnimationName is true but animation-duration is still zero', () => {
    element.style.animationName = 'none';
    element.style.animationDuration = '0s';
    element.style.transitionDuration = '0s';

    expect(getAnimationType({ element, ignoreAnimationName: true })).toBe('none');
  });

  it('should return "css-animation" when at least one of several comma-separated animation-duration values is non-zero', () => {
    element.style.animationName = 'fade-in, slide-in';
    element.style.animationDuration = '0s, 0.5s';
    element.style.transitionDuration = '0s';

    expect(getAnimationType({ element })).toBe('css-animation');
  });

  it('should return "css-transition" when at least one of several comma-separated transition-duration values is non-zero', () => {
    element.style.animationName = 'none';
    element.style.animationDuration = '0s';
    element.style.transitionDuration = '0s, 0s, 0.2s';

    expect(getAnimationType({ element })).toBe('css-transition');
  });

  it('should return "none" when all comma-separated animation-duration and transition-duration values are zero', () => {
    element.style.animationName = 'fade-in, slide-in';
    element.style.animationDuration = '0s, 0s';
    element.style.transitionDuration = '0s, 0s';

    expect(getAnimationType({ element })).toBe('none');
  });

  it('should treat a whitespace-padded animation-name list correctly and return "css-animation"', () => {
    element.style.animationName = '  fade-in  , none';
    element.style.animationDuration = '1s';
    element.style.transitionDuration = '0s';

    expect(getAnimationType({ element })).toBe('css-animation');
  });

  it('should default ignoreAnimationName to false when the option is omitted', () => {
    element.style.animationName = 'none';
    element.style.animationDuration = '2s';
    element.style.transitionDuration = '0s';

    expect(getAnimationType({ element })).toBe('none');
  });
});
