import type { TabsTabProps } from './tabs-tab.types';
import type { EntryUIQwikEventState } from '@/types';
import { component$, useComputed$, sync$, $, useContextProvider, Slot } from '@qwik.dev/core';
import { RovingFocusGroupItem } from '@/components/roving-focus-group/parts/roving-focus-group-item';
import { getPartId } from '../../utilities/get-part-id';
import { useTabsRootContext } from '../../contexts/tabs-root-context';
import { useTabsListContext } from '../../contexts/tabs-list-context';
import { TabsTabContext } from '../../contexts/tabs-tab-context';

/**
 * An individual interactive tab button that toggles the corresponding panel.
 *
 * Renders a `<button>` element.
 */
export const TabsTab = component$<TabsTabProps>((props) => {
  const {
    as = 'button',
    value: _value,
    disabled: _disabled = false,
    onMouseDown$,
    onKeyDown$,
    onFocus$,
    ...others
  } = props;

  const { value: activeTabValue, setValue$: setActiveTabValue$, id } = useTabsRootContext();
  const { activationMode } = useTabsListContext();

  const tabId = useComputed$(() => getPartId({ id: id, value: _value, part: 'tab' }));
  const panelId = useComputed$(() => getPartId({ id: id, value: _value, part: 'panel' }));
  const value = useComputed$(() => _value);
  const active = useComputed$(() => activeTabValue.value === _value);
  const disabled = useComputed$(() => _disabled);

  const handleMouseDownSync$ = sync$((event: MouseEvent, currentTarget: HTMLElement) => {
    const entryUIQwikEvent = event as typeof event & { readonly entryUIQwikHandlerPrevented?: boolean };
    const isDisabled = currentTarget.hasAttribute('disabled') || currentTarget.hasAttribute('data-disabled');

    if (entryUIQwikEvent.entryUIQwikHandlerPrevented) return;

    // Prevent focus to avoid accidental activation.
    if (isDisabled || event.button !== 0 || event.ctrlKey !== false) {
      event.preventDefault();
    }
  });

  const handleMouseDown$ = $((event: MouseEvent) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    if (entryUIQwikEvent.entryUIQwikHandlerPrevented) return;

    // Only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
    // but not when the control key is pressed (avoiding MacOS right click).
    if (!disabled.value && event.button === 0 && event.ctrlKey === false) {
      setActiveTabValue$(value.value);
    }
  });

  const handleKeyDown$ = $((event: KeyboardEvent) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    if (entryUIQwikEvent.entryUIQwikHandlerPrevented) return;

    if (!disabled.value && [' ', 'Enter'].includes(event.key)) {
      setActiveTabValue$(value.value);
    }
  });

  const handleFocus$ = $((event: FocusEvent) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    if (entryUIQwikEvent.entryUIQwikHandlerPrevented) return;

    if (!active.value && !disabled.value && activationMode.value === 'automatic') {
      setActiveTabValue$(value.value);
    }
  });

  useContextProvider(TabsTabContext, { value, active, disabled });

  return (
    <RovingFocusGroupItem
      as={as}
      tabStopId={value.value}
      focusable={!disabled.value}
      id={tabId.value}
      role="tab"
      disabled={disabled.value}
      aria-selected={active.value}
      aria-controls={panelId.value}
      data-entry-ui-qwik-tabs-tab=""
      data-state={active.value ? 'active' : 'inactive'}
      data-active={undefined}
      // @ts-expect-error - The event handler element types differ, but the runtime correctly handles the `as` prop polymorphism.
      onMouseDown$={[onMouseDown$, handleMouseDownSync$, handleMouseDown$]}
      // @ts-expect-error - The event handler element types differ, but the runtime correctly handles the `as` prop polymorphism.
      onKeyDown$={[onKeyDown$, handleKeyDown$]}
      // @ts-expect-error - The event handler element types differ, but the runtime correctly handles the `as` prop polymorphism.
      onFocus$={[onFocus$, handleFocus$]}
      {...others}
    >
      <Slot />
    </RovingFocusGroupItem>
  );
});
