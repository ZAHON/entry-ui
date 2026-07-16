import type { TabsTabProps } from './tabs-tab.types';
import type { EntryUIQwikEventState } from '@/types';
import { component$, useComputed$, useTask$, sync$, $, useContextProvider, Slot } from '@qwik.dev/core';
import { isDev } from '@qwik.dev/core/build';
import { wrapArray } from '@entry-ui/utilities/wrap-array';
import { getWindow } from '@entry-ui/utilities/get-window';
import { focusFirstElement } from '@entry-ui/utilities/focus-first-element';
import { fail } from '@/_internal/utilities/fail';
import { Primitive } from '@/_internal/components/primitive';
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
    onFocus$,
    onKeyDown$,
    ...others
  } = props;

  if (isDev && !_value) {
    fail([
      `The 'Tabs.Tab' component requires a 'value' prop to function correctly.`,
      `Without a unique value, the tab cannot be associated with its corresponding 'Tabs.Panel' component.`,
      `Please provide a non-empty string as the 'value' prop.`,
    ]);
  }

  const { value: activeTabValue, setValue$: setActiveTabValue$, id, dir, orientation } = useTabsRootContext();
  const { currentTabStopId, setCurrentTabStopId$, listRef, activationMode, loopFocus } = useTabsListContext();

  const tabId = useComputed$(() => getPartId({ id: id, value: _value, part: 'tab' }));
  const panelId = useComputed$(() => getPartId({ id: id, value: _value, part: 'panel' }));
  const value = useComputed$(() => _value);
  const active = useComputed$(() => activeTabValue.value === _value);
  const activeTabStopId = useComputed$(() => currentTabStopId.value === _value);
  const disabled = useComputed$(() => _disabled);

  useTask$(() => {
    // If the `Tabs` component was initialized without an active value, no tab stop will be set.
    // This fallback ensures that the first enabled tab we mount is assigned the tab stop (`tabIndex="0"`),
    // allowing keyboard users to focus the tab list.
    if (!currentTabStopId.value && !disabled.value) {
      setCurrentTabStopId$(value.value);
    }
  });

  const handleMouseDownSync$ = sync$((event: MouseEvent, currentTarget: HTMLElement) => {
    // Cast the event to inspect custom prevention state. This intersection type
    // is required because `sync$` runs in a isolated, browser-only context where
    // importing external TypeScript types directly is not fully supported.
    const entryUIQwikEvent = event as typeof event & { readonly entryUIQwikHandlerPrevented?: boolean };

    // Abort early if a developer's custom `onMouseDown$` handler requested to prevent
    // the default component logic by setting the internal prevention flag.
    if (entryUIQwikEvent.entryUIQwikHandlerPrevented) return;

    // Retrieve the disabled state directly from the DOM attributes of the tab element.
    // Inside a synchronous handler (`sync$`), we cannot safely read Qwik's reactive signal values,
    // so we must inspect the rendered DOM state instead.
    const isDisabled = currentTarget.hasAttribute('disabled') || currentTarget.hasAttribute('data-disabled');

    // Prevent focusing disabled tabs or activating them via non-left clicks (and Ctrl+click on macOS).
    // Even though an inactive tab has `tabIndex="-1"`, browsers can still focus it on click.
    // Calling `preventDefault` prevents disabled tabs from stealing focus, avoiding accidental
    // activation and maintaining consistent keyboard/mouse focus behavior within the tab list.
    if (isDisabled || event.button !== 0 || event.ctrlKey !== false) {
      event.preventDefault();
    }
  });

  const handleMouseDown$ = $((event: MouseEvent) => {
    // Cast the event to the standard Entry UI event state structure. Since this is
    // a standard `QRL` handler, we can safely use the imported `EntryUIQwikEventState` type.
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    // Abort early if a preceding custom handler in the execution chain requested
    // to prevent default library behavior.
    if (entryUIQwikEvent.entryUIQwikHandlerPrevented) return;

    // Only activate the tab and update the tab stop on a valid left-click.
    // We ignore other mouse buttons (since mousedown triggers for all of them)
    // and block Ctrl+click (which behaves as a right-click/context menu on macOS).
    if (!disabled.value && event.button === 0 && event.ctrlKey === false) {
      setActiveTabValue$(value.value);
      setCurrentTabStopId$(value.value);
    }
  });

  const handleFocus$ = $((event: FocusEvent) => {
    // Cast the event to the standard Entry UI event state structure. Since this is
    // a standard `QRL` handler, we can safely use the imported `EntryUIQwikEventState` type.
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    // Abort early if a preceding custom handler in the execution chain requested
    // to prevent default library behavior.
    if (entryUIQwikEvent.entryUIQwikHandlerPrevented) return;

    // Abort focus handling if the tab is disabled to prevent accidental selection or tab stop updates.
    if (disabled.value) return;

    // Automatically select/activate the tab on focus if the activation mode is set to `"automatic"``.
    if (!active.value && activationMode.value === 'automatic') {
      setActiveTabValue$(value.value);
    }

    // Always update the tab stop when a tab receives focus. This ensures that the focused tab
    // is marked as the new entry point (`tabIndex="0"`) for subsequent keyboard interactions.
    setCurrentTabStopId$(value.value);
  });

  const handleKeyDownSync$ = sync$((event: KeyboardEvent, currentTarget: HTMLElement) => {
    // Cast the event to inspect custom prevention state. This intersection type
    // is required because `sync$` runs in an isolated, browser-only context where
    // importing external TypeScript types directly is not fully supported.
    const entryUIQwikEvent = event as typeof event & { readonly entryUIQwikHandlerPrevented?: boolean };

    // Abort early if a developer's custom `onKeyDown$` handler requested to prevent
    // the default component logic by setting the internal prevention flag.
    if (entryUIQwikEvent.entryUIQwikHandlerPrevented) return;

    // Do nothing if the tab is disabled.
    // Retrieve the disabled state directly from the DOM attributes of the tab element.
    // Inside a synchronous handler (`sync$`), we cannot safely read Qwik's reactive signal values,
    // so we must inspect the rendered DOM state instead.
    if (currentTarget.hasAttribute('disabled') || currentTarget.hasAttribute('data-disabled')) return;

    // Only handle keyboard events targeting the tab button directly, ignoring bubbled events from children.
    if (event.target !== currentTarget) return;

    // Let the browser handle standard Shift+Tab navigation to exit the tab list backwards.
    if (event.key === 'Tab' && event.shiftKey) return;

    // Define which directional arrow keys are active for each layout orientation.
    const ORIENTATION_KEYS: Record<string, string[]> = {
      horizontal: ['ArrowLeft', 'ArrowRight'],
      vertical: ['ArrowUp', 'ArrowDown'],
    };

    // Retrieve the active orientation from the HTML attribute to determine the correct navigation axis.
    const orientation = currentTarget.getAttribute('data-orientation');

    // If the pressed key matches the orientation axis or is Home/End:
    if (ORIENTATION_KEYS[orientation ?? '']?.includes(event.key) || ['Home', 'End'].includes(event.key)) {
      // Allow system shortcuts or browser zoom modifiers to bypass navigation logic.
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;

      // Prevent default browser actions (such as page scrolling) so that these keys
      // are used exclusively for navigating between tabs.
      event.preventDefault();
    }
  });

  const handleKeyDown$ = $((event: KeyboardEvent, currentTarget: HTMLElement) => {
    // Cast the event to the standard Entry UI event state structure. Since this is
    // a standard `QRL` handler, we can safely use the imported `EntryUIQwikEventState` type.
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    // Abort early if a preceding custom handler in the execution chain requested
    // to prevent default library behavior.
    if (entryUIQwikEvent.entryUIQwikHandlerPrevented) return;

    // Do nothing if the tab is disabled.
    if (disabled.value) return;

    // Only handle keyboard events targeting the tab button directly, ignoring bubbled events from children.
    if (event.target !== currentTarget) return;

    // Manually select/activate the tab when pressing Space or Enter.
    if ([' ', 'Enter'].includes(event.key)) {
      setActiveTabValue$(value.value);
    }

    // Let the browser handle standard Shift+Tab navigation to exit the tab list backwards.
    if (event.key === 'Tab' && event.shiftKey) return;

    // Stores the normalized key name, accounting for RTL (Right-to-Left) direction adjustments.
    let key: string;

    // Normalize horizontal arrow keys if the document reading direction is Right-to-Left (RTL).
    if (dir.value !== 'rtl') {
      key = event.key;
    } else {
      key = event.key === 'ArrowLeft' ? 'ArrowRight' : event.key === 'ArrowRight' ? 'ArrowLeft' : event.key;
    }

    // Ignore vertical arrows when horizontal layout is active, and vice versa.
    if (orientation.value === 'horizontal' && ['ArrowUp', 'ArrowDown'].includes(key)) return;
    if (orientation.value === 'vertical' && ['ArrowLeft', 'ArrowRight'].includes(key)) return;

    // prettier-ignore
    // Map the pressed key to a specific focus movement target.
    const MAP_KEY_TO_FOCUS_INTENT: Record<string, 'first' | 'last' | 'prev' | 'next'> = {
			ArrowLeft: 'prev', ArrowUp: 'prev',
			ArrowRight: 'next', ArrowDown: 'next',
			Home: 'first',
			End: 'last',
		};

    // Determines the target direction ("first", "last", "prev", "next") based on the normalized key.
    const focusIntent = MAP_KEY_TO_FOCUS_INTENT[key];

    // If the key corresponds to a valid navigation intent:
    if (focusIntent !== undefined) {
      // Allow system shortcuts or browser zoom modifiers to bypass navigation logic.
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;

      // Holds the flat list of focusable (non-disabled) tab elements inside the tab list container.
      let items: HTMLElement[] = [];

      // Query all tab elements within the list and filter out disabled ones to build a list of focusable candidates.
      if (listRef.value) {
        const orderedNodes = Array.from(listRef.value.querySelectorAll<HTMLElement>('[data-entry-ui-qwik-tabs-tab]'));
        items = orderedNodes.filter((item) => !(item.hasAttribute('disabled') || item.hasAttribute('data-disabled')));
      }

      // Reorder and slice the candidates array depending on the computed focus intent.
      if (focusIntent === 'last') {
        // Reverse to find the last focusable element first.
        items.reverse();
      } else if (focusIntent === 'prev' || focusIntent === 'next') {
        if (focusIntent === 'prev') {
          // Reverse to traverse backwards.
          items.reverse();
        }

        // Find the index of the currently focused tab within our filtered, focusable candidates array.
        const currentIndex = items.indexOf(currentTarget);

        // Slice the array starting from the element after the current one.
        // Wrap around the array if `loopFocus` is enabled, otherwise stop at the boundary.
        items = loopFocus.value
          ? wrapArray({ array: items, startIndex: currentIndex + 1 })
          : items.slice(currentIndex + 1);
      }

      // Retrieve the window object associated with the current tab's DOM node.
      // This ensures we target the correct global context and window-level APIs (like `setTimeout`),
      // which is critical if the tabs are rendered inside an iframe or multiple windows.
      const win = getWindow(currentTarget);

      win.setTimeout(() => {
        // We use `focusVisible: true` to ensure the focus ring is displayed immediately
        // after navigation. Since this focus change is triggered by keyboard interaction
        // (arrow keys, Home, or End), we want to maintain visual consistency with the
        // `:focus-visible` pseudo-class, helping the user track the active tab.
        focusFirstElement({ candidates: items, focusVisible: true });
      }, 0);
    }
  });

  useContextProvider(TabsTabContext, { value, active, disabled });

  return (
    <Primitive.button
      as={as}
      id={tabId.value}
      type="button"
      role="tab"
      disabled={disabled.value}
      tabIndex={activeTabStopId.value ? 0 : -1}
      aria-selected={active.value}
      aria-controls={panelId.value}
      data-entry-ui-qwik-tabs-tab=""
      data-state={active.value ? 'active' : 'inactive'}
      data-disabled={disabled.value ? '' : undefined}
      data-orientation={orientation.value}
      onMouseDown$={[onMouseDown$, handleMouseDownSync$, handleMouseDown$]}
      onFocus$={[onFocus$, handleFocus$]}
      onKeyDown$={[onKeyDown$, handleKeyDownSync$, handleKeyDown$]}
      {...others}
    >
      <Slot />
    </Primitive.button>
  );
});
