import type { RovingFocusGroupItemProps } from './roving-focus-group-item.types';
import type { EntryUIQwikEventState } from '@/types';
import { component$, useComputed$, useTask$, sync$, $, useContextProvider, Slot } from '@qwik.dev/core';
import { wrapArray } from '@entry-ui/utilities/wrap-array';
import { getWindow } from '@entry-ui/utilities/get-window';
import { focusFirstElement } from '@entry-ui/utilities/focus-first-element';
import { useId } from '@/_internal/hooks/use-id';
import { Primitive } from '@/_internal/components/primitive';
import { useRovingFocusGroupRootContext } from '../../contexts/roving-focus-group-root-context';
import { RovingFocusGroupItemContext } from '../../contexts/roving-focus-group-item-context';

/**
 * An individual item within the roving focus group.
 *
 * Renders a `<div>` element.
 */
export const RovingFocusGroupItem = component$<RovingFocusGroupItemProps>((props) => {
  const {
    as = 'div',
    tabStopId: _tabStopId,
    focusable: _focusable = true,
    onMouseDown$,
    onFocus$,
    onKeyDown$,
    ...others
  } = props;

  const { currentTabStopId, setCurrentTabStopId$, getItems$, loopFocus, dir, orientation } =
    useRovingFocusGroupRootContext();

  const fallbackTabStopId = useId({ prefix: 'entry-ui-qwik-roving-focus-group-item-' });

  const tabStopId = useComputed$(() => _tabStopId ?? fallbackTabStopId);
  const active = useComputed$(() => currentTabStopId.value === tabStopId.value);
  const focusable = useComputed$(() => _focusable);

  useTask$(() => {
    if (!currentTabStopId.value && focusable.value) {
      setCurrentTabStopId$(tabStopId.value);
    }
  });

  const handleMouseDownSync$ = sync$((event: MouseEvent, currentTarget: HTMLElement) => {
    const entryUIQwikEvent = event as typeof event & { readonly entryUIQwikHandlerPrevented?: boolean };
    const isNotFocusable = currentTarget.hasAttribute('disabled') || currentTarget.hasAttribute('data-disabled');

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented && isNotFocusable) {
      // We prevent focusing non-focusable items on `mousedown`.
      // Even though an item might have `tabIndex={-1}`, it can still receive focus
      // via a mouse click in many browsers. By calling `preventDefault`, we ensure
      // that non-focusable items don't steal focus from the currently active item
      // within the roving focus group.
      event.preventDefault();
    }
  });

  const handleMouseDown$ = $((event: MouseEvent) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented && focusable.value) {
      setCurrentTabStopId$(tabStopId.value);
    }
  });

  const handleFocus$ = $((event: FocusEvent) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented && focusable.value) {
      setCurrentTabStopId$(tabStopId.value);
    }
  });

  const handleKeyDownSync$ = sync$((event: KeyboardEvent, currentTarget: HTMLElement) => {
    const entryUIQwikEvent = event as typeof event & { readonly entryUIQwikHandlerPrevented?: boolean };
    const isNotFocusable = currentTarget.hasAttribute('disabled') || currentTarget.hasAttribute('data-disabled');

    if (entryUIQwikEvent.entryUIQwikHandlerPrevented) return;
    if (isNotFocusable) return;
    if (event.target !== currentTarget) return;
    if (event.key === 'Tab' && event.shiftKey) return;

    const ORIENTATION_KEYS: Record<string, string[]> = {
      horizontal: ['ArrowLeft', 'ArrowRight'],
      vertical: ['ArrowUp', 'ArrowDown'],
      both: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
    };

    const orientation = currentTarget.getAttribute('data-orientation');

    if (ORIENTATION_KEYS[orientation ?? '']?.includes(event.key) || ['Home', 'End'].includes(event.key)) {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;

      // We prevent the default browser behavior (such as page scrolling)
      // to ensure that directional keys are used exclusively for
      // navigating between items within the group.
      event.preventDefault();
    }
  });

  const handleKeyDown$ = $(async (event: KeyboardEvent, currentTarget: HTMLElement) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    if (entryUIQwikEvent.entryUIQwikHandlerPrevented) return;
    if (!focusable.value) return;
    if (event.target !== currentTarget) return;
    if (event.key === 'Tab' && event.shiftKey) return;

    let key: string;

    if (dir.value !== 'rtl') {
      key = event.key;
    } else {
      key = event.key === 'ArrowLeft' ? 'ArrowRight' : event.key === 'ArrowRight' ? 'ArrowLeft' : event.key;
    }

    if (orientation.value === 'horizontal' && ['ArrowUp', 'ArrowDown'].includes(key)) return;
    if (orientation.value === 'vertical' && ['ArrowLeft', 'ArrowRight'].includes(key)) return;

    // prettier-ignore
    const MAP_KEY_TO_FOCUS_INTENT: Record<string, 'first' | 'last' | 'prev' | 'next'> = {
			ArrowLeft: 'prev', ArrowUp: 'prev',
			ArrowRight: 'next', ArrowDown: 'next',
			Home: 'first',
			End: 'last',
		};

    const focusIntent = MAP_KEY_TO_FOCUS_INTENT[key];

    if (focusIntent !== undefined) {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;

      let items = await getItems$();

      if (focusIntent === 'last') {
        items.reverse();
      } else if (focusIntent === 'prev' || focusIntent === 'next') {
        if (focusIntent === 'prev') {
          items.reverse();
        }

        const currentIndex = items.indexOf(currentTarget);

        items = loopFocus.value
          ? wrapArray({ array: items, startIndex: currentIndex + 1 })
          : items.slice(currentIndex + 1);
      }

      const win = getWindow(currentTarget);

      win.setTimeout(() => {
        // We use `focusVisible: true` to ensure the focus ring is displayed immediately
        // after navigation. Since this focus change is triggered by keyboard interaction
        // (arrow keys, Home, or End), we want to maintain visual consistency with the
        // `:focus-visible` pseudo-class, helping the user track the active item.
        focusFirstElement({ candidates: items, focusVisible: true });
      }, 0);
    }
  });

  useContextProvider(RovingFocusGroupItemContext, { tabStopId, active, focusable });

  return (
    <Primitive.div
      as={as}
      tabIndex={active.value ? 0 : -1}
      data-entry-ui-qwik-roving-focus-group-item=""
      data-active={active.value ? '' : undefined}
      data-disabled={!focusable.value ? '' : undefined}
      data-orientation={orientation.value}
      onMouseDown$={[onMouseDown$, handleMouseDownSync$, handleMouseDown$]}
      onFocus$={[onFocus$, handleFocus$]}
      onKeyDown$={[onKeyDown$, handleKeyDownSync$, handleKeyDown$]}
      {...others}
    >
      <Slot />
    </Primitive.div>
  );
});
