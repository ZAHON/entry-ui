import { beforeEach, describe, expect, it } from 'vitest';
import { createAnimationFrameScheduler } from '../create-animation-frame-scheduler';
import { getAnimationFrameScheduler, setAnimationFrameScheduler } from '.';

describe('getAnimationFrameScheduler', () => {
  beforeEach(() => {
    // Reset to a fresh instance before each test so tests don't leak
    // scheduler state (pending callbacks, id sequence) into one another.
    setAnimationFrameScheduler(createAnimationFrameScheduler());
  });

  it('should return a scheduler instance', () => {
    const scheduler = getAnimationFrameScheduler();

    expect(scheduler).toBeDefined();
  });

  it('should return an object exposing the full scheduler interface', () => {
    const scheduler = getAnimationFrameScheduler();

    expect(typeof scheduler.request).toBe('function');
    expect(typeof scheduler.cancel).toBe('function');
    expect(typeof scheduler.getNextId).toBe('function');
    expect(typeof scheduler.setNextId).toBe('function');
    expect(typeof scheduler.getStartId).toBe('function');
    expect(typeof scheduler.setStartId).toBe('function');
    expect(typeof scheduler.clearCallbacks).toBe('function');
  });

  it('should return the same instance on repeated calls without a set in between', () => {
    const first = getAnimationFrameScheduler();
    const second = getAnimationFrameScheduler();

    expect(first).toBe(second);
  });

  it('should reflect state changes made on the instance across separate get calls', () => {
    getAnimationFrameScheduler().setNextId(50);

    expect(getAnimationFrameScheduler().getNextId()).toBe(50);
  });
});

describe('setAnimationFrameScheduler', () => {
  beforeEach(() => {
    setAnimationFrameScheduler(createAnimationFrameScheduler());
  });

  it('should make getAnimationFrameScheduler return the exact instance passed in', () => {
    const customScheduler = createAnimationFrameScheduler();

    setAnimationFrameScheduler(customScheduler);

    expect(getAnimationFrameScheduler()).toBe(customScheduler);
  });

  it('should replace a previously set instance with a subsequent call', () => {
    const firstScheduler = createAnimationFrameScheduler();
    const secondScheduler = createAnimationFrameScheduler();

    setAnimationFrameScheduler(firstScheduler);
    expect(getAnimationFrameScheduler()).toBe(firstScheduler);

    setAnimationFrameScheduler(secondScheduler);
    expect(getAnimationFrameScheduler()).toBe(secondScheduler);
  });

  it('should not merge state from the previous instance into the new one', () => {
    const firstScheduler = createAnimationFrameScheduler();
    firstScheduler.setNextId(999);
    setAnimationFrameScheduler(firstScheduler);

    const secondScheduler = createAnimationFrameScheduler();
    setAnimationFrameScheduler(secondScheduler);

    expect(getAnimationFrameScheduler().getNextId()).toBe(1);
  });

  it('should not affect callbacks already scheduled on the previous instance', () => {
    const previousScheduler = getAnimationFrameScheduler();

    previousScheduler.request(() => {});
    expect(previousScheduler.getNextId()).toBe(2);

    setAnimationFrameScheduler(createAnimationFrameScheduler());

    // The previous scheduler instance itself is untouched by the swap —
    // only the module-level reference returned by getAnimationFrameScheduler changes.
    expect(previousScheduler.getNextId()).toBe(2);
    expect(getAnimationFrameScheduler().getNextId()).toBe(1);
  });

  it('should accept the same instance being set again without throwing', () => {
    const scheduler = getAnimationFrameScheduler();

    expect(() => setAnimationFrameScheduler(scheduler)).not.toThrow();
    expect(getAnimationFrameScheduler()).toBe(scheduler);
  });
});
