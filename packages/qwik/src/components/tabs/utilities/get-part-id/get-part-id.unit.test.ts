import { describe, it, expect } from 'vitest';
import { getPartId } from '.';

describe('getPartId', () => {
  it('should generate a tab id using the provided id and value', () => {
    expect(getPartId({ id: 'tabs-1', value: 'general', part: 'tab' })).toBe('entry-ui-qwik-tabs-tabs-1-tab-general');
  });

  it('should generate a panel id using the provided id and value', () => {
    expect(getPartId({ id: 'tabs-1', value: 'general', part: 'panel' })).toBe(
      'entry-ui-qwik-tabs-tabs-1-panel-general'
    );
  });

  it('should produce different ids for tab and panel parts with the same id and value', () => {
    const tabId = getPartId({ id: 'tabs-1', value: 'general', part: 'tab' });
    const panelId = getPartId({ id: 'tabs-1', value: 'general', part: 'panel' });

    expect(tabId).not.toBe(panelId);
  });

  it('should produce different ids for different tab values with the same id', () => {
    const first = getPartId({ id: 'tabs-1', value: 'general', part: 'tab' });
    const second = getPartId({ id: 'tabs-1', value: 'advanced', part: 'tab' });

    expect(first).not.toBe(second);
  });

  it('should produce different ids for different root ids with the same value and part', () => {
    const first = getPartId({ id: 'tabs-1', value: 'general', part: 'tab' });
    const second = getPartId({ id: 'tabs-2', value: 'general', part: 'tab' });

    expect(first).not.toBe(second);
  });

  it('should correctly handle numeric-like string values', () => {
    expect(getPartId({ id: '1', value: '0', part: 'panel' })).toBe('entry-ui-qwik-tabs-1-panel-0');
  });

  it('should correctly handle empty string id and value', () => {
    expect(getPartId({ id: '', value: '', part: 'tab' })).toBe('entry-ui-qwik-tabs--tab-');
  });

  it('should preserve special characters present in id or value', () => {
    expect(getPartId({ id: 'my_id', value: 'val-ue.1', part: 'panel' })).toBe(
      'entry-ui-qwik-tabs-my_id-panel-val-ue.1'
    );
  });

  it('should return a string', () => {
    const result = getPartId({ id: 'a', value: 'b', part: 'tab' });

    expect(typeof result).toBe('string');
  });

  it('should be deterministic for the same input', () => {
    const params = { id: 'x', value: 'y', part: 'tab' as const };

    expect(getPartId(params)).toBe(getPartId(params));
  });
});
