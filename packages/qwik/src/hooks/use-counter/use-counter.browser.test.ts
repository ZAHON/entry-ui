import { describe, it, expect } from 'vitest';
import { renderHook } from 'vitest-browser-qwik';
import { useCounter } from '.';

describe('useCounter', () => {
  it('should initialize with default value of 0', async () => {
    const { result } = await renderHook(() => useCounter());

    expect(result.count.value).toBe(0);
  });

  it('should initialize with provided initialCount', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 10 }));

    expect(result.count.value).toBe(10);
  });

  it('should clamp initialCount to min boundary', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 5, min: 10 }));

    expect(result.count.value).toBe(10);
  });

  it('should clamp initialCount to max boundary', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 100, max: 50 }));

    expect(result.count.value).toBe(50);
  });

  it('should increment by default step of 1', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 5 }));

    await result.increment$();
    expect(result.count.value).toBe(6);
  });

  it('should increment by custom step', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 0, step: 5 }));

    await result.increment$();
    expect(result.count.value).toBe(5);
  });

  it('should not exceed max value when incrementing', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 9, max: 10 }));

    await result.increment$();
    expect(result.count.value).toBe(10);

    await result.increment$();
    expect(result.count.value).toBe(10);
  });

  it('should decrement by default step of 1', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 5 }));

    await result.decrement$();
    expect(result.count.value).toBe(4);
  });

  it('should decrement by custom step', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 10, step: 3 }));

    await result.decrement$();
    expect(result.count.value).toBe(7);
  });

  it('should not go below min value when decrementing', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 1, min: 0 }));

    await result.decrement$();
    expect(result.count.value).toBe(0);

    await result.decrement$();
    expect(result.count.value).toBe(0);
  });

  it('should set count to specific value', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 0 }));

    await result.set$(42);
    expect(result.count.value).toBe(42);
  });

  it('should clamp value when setting below min', async () => {
    const { result } = await renderHook(() => useCounter({ min: 10 }));

    await result.set$(5);
    expect(result.count.value).toBe(10);
  });

  it('should clamp value when setting above max', async () => {
    const { result } = await renderHook(() => useCounter({ max: 100 }));

    await result.set$(200);
    expect(result.count.value).toBe(100);
  });

  it('should reset to initial value', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 50 }));

    await result.increment$();
    await result.increment$();
    expect(result.count.value).toBe(52);

    await result.reset$();
    expect(result.count.value).toBe(50);
  });

  it('should reset to clamped initial value', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 100, max: 50 }));

    await result.set$(30);
    expect(result.count.value).toBe(30);

    await result.reset$();
    expect(result.count.value).toBe(50);
  });

  it('should handle multiple increments correctly', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 0, step: 2 }));

    await result.increment$();
    expect(result.count.value).toBe(2);

    await result.increment$();
    expect(result.count.value).toBe(4);

    await result.increment$();
    expect(result.count.value).toBe(6);
  });

  it('should handle multiple decrements correctly', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 10, step: 2 }));

    await result.decrement$();
    expect(result.count.value).toBe(8);

    await result.decrement$();
    expect(result.count.value).toBe(6);

    await result.decrement$();
    expect(result.count.value).toBe(4);
  });

  it('should handle combination of increment and decrement', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 5 }));

    await result.increment$();
    expect(result.count.value).toBe(6);

    await result.increment$();
    expect(result.count.value).toBe(7);

    await result.decrement$();
    expect(result.count.value).toBe(6);

    await result.decrement$();
    expect(result.count.value).toBe(5);
  });

  it('should work with negative numbers', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: -10, step: 3 }));

    expect(result.count.value).toBe(-10);

    await result.increment$();
    expect(result.count.value).toBe(-7);

    await result.decrement$();
    expect(result.count.value).toBe(-10);
  });

  it('should work with decimal step values', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 0, step: 0.5 }));

    await result.increment$();
    expect(result.count.value).toBe(0.5);

    await result.increment$();
    expect(result.count.value).toBe(1);
  });

  it('should handle min and max at the same value', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 5, min: 5, max: 5 }));

    expect(result.count.value).toBe(5);

    await result.increment$();
    expect(result.count.value).toBe(5);

    await result.decrement$();
    expect(result.count.value).toBe(5);
  });

  it('should maintain state after calling reset$ multiple times', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 25 }));

    await result.reset$();
    await result.reset$();
    expect(result.count.value).toBe(25);
  });

  it('should handle large step values', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 0, step: 100 }));

    await result.increment$();
    expect(result.count.value).toBe(100);

    await result.increment$();
    expect(result.count.value).toBe(200);
  });

  it('should work within custom range', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 50, min: 0, max: 100, step: 10 }));

    expect(result.count.value).toBe(50);

    await result.increment$();
    expect(result.count.value).toBe(60);

    await result.set$(95);
    expect(result.count.value).toBe(95);

    await result.increment$();
    expect(result.count.value).toBe(100);

    await result.increment$();
    expect(result.count.value).toBe(100);
  });

  it('should initialize with decimal initialCount', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 3.14 }));

    expect(result.count.value).toBe(3.14);
  });

  it('should handle decimal increment operations', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 1.5, step: 0.25 }));

    await result.increment$();
    expect(result.count.value).toBe(1.75);

    await result.increment$();
    expect(result.count.value).toBe(2);

    await result.increment$();
    expect(result.count.value).toBe(2.25);
  });

  it('should handle decimal decrement operations', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 5.5, step: 0.5 }));

    await result.decrement$();
    expect(result.count.value).toBe(5);

    await result.decrement$();
    expect(result.count.value).toBe(4.5);

    await result.decrement$();
    expect(result.count.value).toBe(4);
  });

  it('should set decimal values correctly', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 0 }));

    await result.set$(3.14159);
    expect(result.count.value).toBe(3.14159);

    await result.set$(2.71828);
    expect(result.count.value).toBe(2.71828);
  });

  it('should clamp decimal values to decimal min boundary', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 0, min: 1.5 }));

    await result.set$(1.2);
    expect(result.count.value).toBe(1.5);

    await result.set$(0.5);
    expect(result.count.value).toBe(1.5);
  });

  it('should clamp decimal values to decimal max boundary', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 0, max: 10.5 }));

    await result.set$(10.8);
    expect(result.count.value).toBe(10.5);

    await result.set$(15.3);
    expect(result.count.value).toBe(10.5);
  });

  it('should handle very small decimal steps', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 0, step: 0.01 }));

    await result.increment$();
    expect(result.count.value).toBeCloseTo(0.01);

    await result.increment$();
    expect(result.count.value).toBeCloseTo(0.02);

    await result.increment$();
    expect(result.count.value).toBeCloseTo(0.03);
  });

  it('should handle decimal range with decimal step', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 2.5, min: 0.5, max: 5.5, step: 0.5 }));

    expect(result.count.value).toBe(2.5);

    await result.increment$();
    expect(result.count.value).toBe(3);

    await result.set$(5.2);
    expect(result.count.value).toBe(5.2);

    await result.increment$();
    expect(result.count.value).toBe(5.5);

    await result.increment$();
    expect(result.count.value).toBe(5.5);
  });

  it('should handle negative decimal values', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: -2.5, step: 0.5 }));

    expect(result.count.value).toBe(-2.5);

    await result.increment$();
    expect(result.count.value).toBe(-2);

    await result.decrement$();
    expect(result.count.value).toBe(-2.5);

    await result.decrement$();
    expect(result.count.value).toBe(-3);
  });

  it('should reset to decimal initial value', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 7.25, step: 0.5 }));

    await result.increment$();
    await result.increment$();
    expect(result.count.value).toBe(8.25);

    await result.reset$();
    expect(result.count.value).toBe(7.25);
  });

  it('should handle multiple decimal operations in sequence', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 10.1, step: 0.3 }));

    await result.increment$();
    expect(result.count.value).toBeCloseTo(10.4);

    await result.increment$();
    expect(result.count.value).toBeCloseTo(10.7);

    await result.decrement$();
    expect(result.count.value).toBeCloseTo(10.4);

    await result.set$(9.9);
    expect(result.count.value).toBeCloseTo(9.9);
  });

  it('should clamp decimal initialCount to decimal boundaries', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 3.7, min: 5.2, max: 10.8 }));

    expect(result.count.value).toBe(5.2);
  });

  it('should not exceed decimal max when incrementing with decimal step', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 9.7, max: 10.1, step: 0.3 }));

    await result.increment$();
    expect(result.count.value).toBe(10);

    await result.increment$();
    expect(result.count.value).toBe(10.1);

    await result.increment$();
    expect(result.count.value).toBe(10.1);
  });

  it('should not go below decimal min when decrementing with decimal step', async () => {
    const { result } = await renderHook(() => useCounter({ initialCount: 0.5, min: 0.1, step: 0.3 }));

    await result.decrement$();
    expect(result.count.value).toBeCloseTo(0.2);

    await result.decrement$();
    expect(result.count.value).toBe(0.1);

    await result.decrement$();
    expect(result.count.value).toBe(0.1);
  });
});
