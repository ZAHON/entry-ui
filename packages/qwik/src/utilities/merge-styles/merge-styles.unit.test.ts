import { describe, it, expect } from 'vitest';
import { mergeStyles } from '.';

describe('mergeStyles', () => {
  it('should return empty object for empty array', () => {
    expect(mergeStyles([])).toEqual({});
  });

  it('should handle single string style', () => {
    const result = mergeStyles(['background-color: red; font-size: 16px']);
    const expected = {
      backgroundColor: 'red',
      fontSize: '16px',
    };

    expect(result).toEqual(expected);
  });

  it('should handle single object style', () => {
    const result = mergeStyles([{ 'background-color': 'blue', 'margin-top': '10px' }]);
    const expected = {
      backgroundColor: 'blue',
      marginTop: '10px',
    };

    expect(result).toEqual(expected);
  });

  it('should merge multiple string styles', () => {
    const result = mergeStyles(['color: red; font-size: 14px', 'background-color: blue; padding: 10px']);
    const expected = {
      color: 'red',
      fontSize: '14px',
      backgroundColor: 'blue',
      padding: '10px',
    };

    expect(result).toEqual(expected);
  });

  it('should merge multiple object styles', () => {
    const result = mergeStyles([
      { 'font-size': '16px', color: 'red' },
      { 'background-color': 'blue', 'margin-top': '20px' },
    ]);
    const expected = {
      fontSize: '16px',
      color: 'red',
      backgroundColor: 'blue',
      marginTop: '20px',
    };

    expect(result).toEqual(expected);
  });

  it('should merge mixed string and object styles', () => {
    const result = mergeStyles([
      'color: red; font-size: 14px',
      { 'background-color': 'blue', padding: '10px' },
      'margin-top: 5px',
    ]);
    const expected = {
      color: 'red',
      fontSize: '14px',
      backgroundColor: 'blue',
      padding: '10px',
      marginTop: '5px',
    };

    expect(result).toEqual(expected);
  });

  it('should override properties from earlier styles with later ones', () => {
    const result = mergeStyles([
      'color: red; font-size: 14px',
      'color: blue; background-color: white',
      { color: 'green' },
    ]);
    const expected = {
      color: 'green',
      fontSize: '14px',
      backgroundColor: 'white',
    };

    expect(result).toEqual(expected);
  });

  it('should normalize kebab-case to camelCase', () => {
    const result = mergeStyles(['background-color: red; margin-top: 10px; font-size: 16px']);
    const expected = {
      backgroundColor: 'red',
      marginTop: '10px',
      fontSize: '16px',
    };

    expect(result).toEqual(expected);
  });

  it('should preserve CSS custom properties', () => {
    const result = mergeStyles(['--primary-color: #3498db; color: var(--primary-color)', { '--spacing-unit': '8px' }]);
    const expected = {
      '--primary-color': '#3498db',
      color: 'var(--primary-color)',
      '--spacing-unit': '8px',
    };

    expect(result).toEqual(expected);
  });

  it('should convert -webkit- prefix to PascalCase', () => {
    const result = mergeStyles(['-webkit-transform: rotate(45deg); -webkit-appearance: none']);
    const expected = {
      WebkitTransform: 'rotate(45deg)',
      WebkitAppearance: 'none',
    };

    expect(result).toEqual(expected);
  });

  it('should convert -moz- prefix to PascalCase', () => {
    const result = mergeStyles([{ '-moz-appearance': 'none', '-moz-border-radius': '5px' }]);
    const expected = {
      MozAppearance: 'none',
      MozBorderRadius: '5px',
    };

    expect(result).toEqual(expected);
  });

  it('should convert -o- prefix to PascalCase', () => {
    const result = mergeStyles(['-o-transform: scale(1.5)']);
    const expected = {
      OTransform: 'scale(1.5)',
    };

    expect(result).toEqual(expected);
  });

  it('should convert -ms- prefix to camelCase with lowercase ms', () => {
    const result = mergeStyles(['-ms-transform: none; -ms-flex: 1', { '-ms-accelerator': 'true' }]);
    const expected = {
      msTransform: 'none',
      msFlex: '1',
      msAccelerator: 'true',
    };

    expect(result).toEqual(expected);
  });

  it('should skip undefined values', () => {
    const result = mergeStyles(['color: red', undefined, { 'font-size': '16px' }, undefined]);
    const expected = {
      color: 'red',
      fontSize: '16px',
    };

    expect(result).toEqual(expected);
  });

  it('should handle empty string styles', () => {
    const result = mergeStyles(['', 'color: red', '']);
    const expected = {
      color: 'red',
    };

    expect(result).toEqual(expected);
  });

  it('should handle string styles without trailing semicolons', () => {
    const result = mergeStyles(['display: flex', 'color: blue']);
    const expected = {
      display: 'flex',
      color: 'blue',
    };

    expect(result).toEqual(expected);
  });

  it('should handle complex property values with commas', () => {
    const result = mergeStyles(['font-family: Arial, Helvetica, sans-serif']);
    const expected = {
      fontFamily: 'Arial, Helvetica, sans-serif',
    };

    expect(result).toEqual(expected);
  });

  it('should handle CSS custom properties with fallback values', () => {
    const result = mergeStyles([
      '--primary: #000; --secondary: #fff',
      { color: 'var(--primary, black)', backgroundColor: 'var(--secondary, white)' },
      '--primary: #333',
    ]);
    const expected = {
      '--primary': '#333',
      '--secondary': '#fff',
      color: 'var(--primary, black)',
      backgroundColor: 'var(--secondary, white)',
    };

    expect(result).toEqual(expected);
  });

  it('should handle important declarations', () => {
    const result = mergeStyles(['color: red !important; margin: 10px']);
    const expected = {
      color: 'red !important',
      margin: '10px',
    };

    expect(result).toEqual(expected);
  });

  it('should handle calc() expressions', () => {
    const result = mergeStyles(['width: calc(100% - 20px); height: calc(100vh - var(--header-height))']);
    const expected = {
      width: 'calc(100% - 20px)',
      height: 'calc(100vh - var(--header-height))',
    };

    expect(result).toEqual(expected);
  });

  it('should handle url() values with complex content', () => {
    const result = mergeStyles(['background-image: url("test.png"); background: url(data:image/svg+xml;base64,ABC)']);
    const expected = {
      backgroundImage: 'url("test.png")',
      background: 'url(data:image/svg+xml;base64,ABC)',
    };

    expect(result).toEqual(expected);
  });

  it('should handle multiple semicolons in string styles', () => {
    const result = mergeStyles(['color: red;;; margin: 10px']);
    const expected = {
      color: 'red',
      margin: '10px',
    };

    expect(result).toEqual(expected);
  });

  it('should handle extra whitespace in string styles', () => {
    const result = mergeStyles(['  color  :  red  ;   margin  :  10px  ']);
    const expected = {
      color: 'red',
      margin: '10px',
    };

    expect(result).toEqual(expected);
  });

  it('should handle properties that are already in camelCase', () => {
    const result = mergeStyles([{ backgroundColor: 'red', fontSize: '16px' }]);
    const expected = {
      backgroundColor: 'red',
      fontSize: '16px',
    };

    expect(result).toEqual(expected);
  });

  it('should handle single-word properties', () => {
    const result = mergeStyles(['color: blue; display: block']);
    const expected = {
      color: 'blue',
      display: 'block',
    };

    expect(result).toEqual(expected);
  });

  it('should handle all vendor prefixes together', () => {
    const result = mergeStyles([
      '-webkit-appearance: none; -moz-appearance: none; -ms-appearance: none; -o-appearance: none',
      { appearance: 'none' },
    ]);
    const expected = {
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      msAppearance: 'none',
      OAppearance: 'none',
      appearance: 'none',
    };

    expect(result).toEqual(expected);
  });

  it('should handle mixed vendor prefixes with standard properties', () => {
    const result = mergeStyles([
      'transform: rotate(45deg); -webkit-transform: rotate(30deg)',
      { '-moz-transform': 'rotate(60deg)', transform: 'rotate(90deg)' },
      '-ms-transform: rotate(120deg)',
    ]);
    const expected = {
      transform: 'rotate(90deg)',
      WebkitTransform: 'rotate(30deg)',
      MozTransform: 'rotate(60deg)',
      msTransform: 'rotate(120deg)',
    };

    expect(result).toEqual(expected);
  });

  it('should handle complex merge scenario with multiple types', () => {
    const result = mergeStyles([
      'background-color: red; font-size: 14px; padding: 10px',
      { 'font-size': '16px', color: 'blue', '-webkit-transform': 'scale(1.2)' },
      'padding: 20px; --custom-var: 5px',
      undefined,
      { backgroundColor: 'green' },
    ]);
    const expected = {
      backgroundColor: 'green',
      fontSize: '16px',
      padding: '20px',
      color: 'blue',
      WebkitTransform: 'scale(1.2)',
      '--custom-var': '5px',
    };

    expect(result).toEqual(expected);
  });

  it('should handle multiple overrides of the same property', () => {
    const result = mergeStyles(['color: red', { color: 'blue' }, 'color: green', { color: 'yellow' }, 'color: purple']);
    const expected = {
      color: 'purple',
    };

    expect(result).toEqual(expected);
  });

  it('should handle box-shadow with multiple values', () => {
    const result = mergeStyles(['box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.2)']);
    const expected = {
      boxShadow: '0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.2)',
    };

    expect(result).toEqual(expected);
  });

  it('should handle grid properties', () => {
    const result = mergeStyles([
      'display: grid; grid-template-columns: repeat(3, 1fr)',
      { gridGap: '20px', gridAutoRows: 'minmax(100px, auto)' },
      'grid-template-areas: "header header header" "main main sidebar" "footer footer footer"',
    ]);
    const expected = {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: '20px',
      gridAutoRows: 'minmax(100px, auto)',
      gridTemplateAreas: '"header header header" "main main sidebar" "footer footer footer"',
    };

    expect(result).toEqual(expected);
  });

  it('should handle numeric values', () => {
    const result = mergeStyles(['opacity: 0.5; z-index: 100; flex: 1']);
    const expected = {
      opacity: '0.5',
      zIndex: '100',
      flex: '1',
    };

    expect(result).toEqual(expected);
  });

  it('should handle interleaved undefined values', () => {
    const result = mergeStyles([
      'color: red',
      undefined,
      { fontSize: '14px' },
      undefined,
      'background-color: blue',
      undefined,
      { padding: '10px' },
      'margin: 5px',
      undefined,
    ]);
    const expected = {
      color: 'red',
      fontSize: '14px',
      backgroundColor: 'blue',
      padding: '10px',
      margin: '5px',
    };

    expect(result).toEqual(expected);
  });

  it('should handle long merge chain with alternating types', () => {
    const result = mergeStyles([
      'color: red',
      { fontSize: '12px' },
      'background: white',
      { padding: '5px' },
      'margin: 10px',
      { border: '1px solid black' },
      'display: flex',
      { alignItems: 'center' },
      'justify-content: space-between',
      { gap: '10px' },
    ]);
    const expected = {
      color: 'red',
      fontSize: '12px',
      background: 'white',
      padding: '5px',
      margin: '10px',
      border: '1px solid black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
    };

    expect(result).toEqual(expected);
  });

  it('should handle deeply nested custom properties references', () => {
    const result = mergeStyles([
      '--base-size: 16px',
      '--large-size: calc(var(--base-size) * 2)',
      { fontSize: 'var(--large-size)' },
      '--base-size: 14px',
    ]);
    const expected = {
      '--base-size': '14px',
      '--large-size': 'calc(var(--base-size) * 2)',
      fontSize: 'var(--large-size)',
    };

    expect(result).toEqual(expected);
  });

  it('should handle transform functions', () => {
    const result = mergeStyles(['transform: translateX(10px) rotate(45deg) scale(1.2)']);
    const expected = {
      transform: 'translateX(10px) rotate(45deg) scale(1.2)',
    };

    expect(result).toEqual(expected);
  });

  it('should handle linear-gradient values', () => {
    const result = mergeStyles([{ backgroundImage: 'linear-gradient(to right, red, blue)' }]);
    const expected = {
      backgroundImage: 'linear-gradient(to right, red, blue)',
    };

    expect(result).toEqual(expected);
  });

  it('should handle various CSS units', () => {
    const result = mergeStyles([
      'width: 100px; height: 50%',
      { maxWidth: '100vw', minHeight: '10rem' },
      'line-height: 1.5',
    ]);
    const expected = {
      width: '100px',
      height: '50%',
      maxWidth: '100vw',
      minHeight: '10rem',
      lineHeight: '1.5',
    };

    expect(result).toEqual(expected);
  });
});
