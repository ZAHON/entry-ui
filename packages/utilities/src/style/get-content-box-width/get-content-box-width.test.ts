import { describe, it, expect, vi, afterEach } from 'vitest';
import { getContentBoxWidth } from '.';

describe('getContentBoxWidth', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return clientWidth minus horizontal padding for an element with padding', () => {
    const div = document.createElement('div');
    Object.defineProperty(div, 'clientWidth', { value: 200, configurable: true });
    document.body.appendChild(div);
    div.style.paddingLeft = '10px';
    div.style.paddingRight = '20px';

    expect(getContentBoxWidth(div)).toBe(170);

    div.remove();
  });

  it('should return the full clientWidth when there is no padding', () => {
    const div = document.createElement('div');
    Object.defineProperty(div, 'clientWidth', { value: 150, configurable: true });
    document.body.appendChild(div);

    expect(getContentBoxWidth(div)).toBe(150);

    div.remove();
  });

  it('should return 0 when clientWidth is 0', () => {
    const div = document.createElement('div');
    Object.defineProperty(div, 'clientWidth', { value: 0, configurable: true });
    document.body.appendChild(div);
    div.style.paddingLeft = '10px';
    div.style.paddingRight = '10px';

    expect(getContentBoxWidth(div)).toBe(0);

    div.remove();
  });

  it('should not call getComputedStyle when clientWidth is 0', () => {
    const div = document.createElement('div');
    Object.defineProperty(div, 'clientWidth', { value: 0, configurable: true });
    document.body.appendChild(div);

    const spy = vi.spyOn(window, 'getComputedStyle');

    getContentBoxWidth(div);

    expect(spy).not.toHaveBeenCalled();

    div.remove();
  });

  it('should handle asymmetric left and right padding correctly', () => {
    const div = document.createElement('div');
    Object.defineProperty(div, 'clientWidth', { value: 300, configurable: true });
    document.body.appendChild(div);
    div.style.paddingLeft = '5px';
    div.style.paddingRight = '45px';

    expect(getContentBoxWidth(div)).toBe(250);

    div.remove();
  });

  it('should treat unparsable padding values as 0', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    Object.defineProperty(div, 'clientWidth', { value: 100, configurable: true });

    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      paddingLeft: '',
      paddingRight: '',
    } as CSSStyleDeclaration);

    expect(getContentBoxWidth(div)).toBe(100);

    div.remove();
  });

  it('should treat only the unparsable side as 0 while still subtracting the valid side', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    Object.defineProperty(div, 'clientWidth', { value: 100, configurable: true });

    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      paddingLeft: '10px',
      paddingRight: 'not-a-number',
    } as CSSStyleDeclaration);

    expect(getContentBoxWidth(div)).toBe(90);

    div.remove();
  });

  it('should correctly parse padding values with decimal precision', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    Object.defineProperty(div, 'clientWidth', { value: 100, configurable: true });

    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      paddingLeft: '10.5px',
      paddingRight: '9.5px',
    } as CSSStyleDeclaration);

    expect(getContentBoxWidth(div)).toBe(80);

    div.remove();
  });

  it('should clamp the result to 0 when padding exceeds clientWidth', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    Object.defineProperty(div, 'clientWidth', { value: 20, configurable: true });

    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      paddingLeft: '30px',
      paddingRight: '30px',
    } as CSSStyleDeclaration);

    expect(getContentBoxWidth(div)).toBe(0);

    div.remove();
  });

  it('should work correctly regardless of box-sizing since clientWidth already includes padding', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.style.boxSizing = 'border-box';
    Object.defineProperty(div, 'clientWidth', { value: 200, configurable: true });
    div.style.paddingLeft = '15px';
    div.style.paddingRight = '15px';

    expect(getContentBoxWidth(div)).toBe(170);

    div.remove();
  });
});
