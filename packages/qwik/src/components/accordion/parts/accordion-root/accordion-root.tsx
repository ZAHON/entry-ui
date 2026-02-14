import type { AccordionRootProps } from './accordion-root.types';
import type { EntryUIQwikEventState } from '@/types';
import { component$, useComputed$, $, sync$, useContextProvider, Slot } from '@qwik.dev/core';
import { isDev } from '@qwik.dev/core/build';
import { useControllable } from '@/hooks/use-controllable';
import { mergeStyles } from '@/utilities/merge-styles';
import { warn } from '@/_internal/utilities/warn';
import { Primitive } from '@/_internal/components/primitive';
import { AccordionRootContext } from '../../contexts/accordion-root-context';

/**
 * Groups all parts of the accordion.
 *
 * Renders a `<div>` element.
 */
export const AccordionRoot = component$<AccordionRootProps>((props) => {
  const {
    as = 'div',
    defaultValue,
    value: _value,
    onValueChange$,
    multiple = false,
    loopFocus = true,
    hiddenUntilFound: _hiddenUntilFound = false,
    disabled: _disabled = false,
    onKeyDown$,
    style,
    ...others
  } = props;

  const { state: value, setState$: setValue$ } = useControllable({
    defaultValue: defaultValue ?? [],
    controlledSignal: _value,
    onChange$: onValueChange$,
  });

  const hiddenUntilFound = useComputed$(() => _hiddenUntilFound);
  const disabled = useComputed$(() => _disabled);

  if (isDev && !multiple && value.value.length > 1) {
    warn([
      `The 'Accordion.Root' component is in single-selection mode,`,
      `but received ${value.value.length} open items in 'value' or 'defaultValue'.`,
      `This may lead to unpredictable behavior.`,
    ]);
  }

  const onItemOpen$ = $((itemValue: string) => {
    if (!multiple) {
      setValue$([itemValue]);
    }

    if (multiple) {
      setValue$([...value.value, itemValue]);
    }
  });

  const onItemClose$ = $((itemValue: string) => {
    if (!multiple) {
      setValue$([]);
    }

    if (multiple) {
      setValue$(value.value.filter((value) => value !== itemValue));
    }
  });

  const handleKeyDownSync$ = sync$((event: KeyboardEvent) => {
    const entryUIQwikEvent = event as typeof event & { readonly entryUIQwikHandlerPrevented?: boolean };

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      // Prevents the default browser behavior of scrolling the page when navigating
      // through accordion triggers using arrow keys or Home/End.
      event.preventDefault();
    }
  });

  const handleKeyDown$ = $((event: KeyboardEvent, currentTarget: HTMLElement) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      const target = event.target as HTMLElement;

      const ENABLED_TRIGGERS_SELECTOR = '[data-entry-ui-qwik-accordion-item-trigger]:not([disabled])';
      const enabledTriggers = Array.from(currentTarget.querySelectorAll<HTMLElement>(ENABLED_TRIGGERS_SELECTOR));

      const thisIndex = enabledTriggers.indexOf(target);
      const lastIndex = enabledTriggers.length - 1;

      let nextIndex = -1;

      switch (event.key) {
        case 'ArrowDown':
          if (loopFocus) {
            nextIndex = thisIndex + 1 > lastIndex ? 0 : thisIndex + 1;
          } else {
            nextIndex = Math.min(thisIndex + 1, lastIndex);
          }
          break;
        case 'ArrowUp':
          if (loopFocus) {
            nextIndex = thisIndex === 0 ? lastIndex : thisIndex - 1;
          } else {
            nextIndex = thisIndex - 1;
          }
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = lastIndex;
          break;
        default:
          break;
      }

      if (nextIndex > -1) {
        enabledTriggers[nextIndex]?.focus();
      }
    }
  });

  useContextProvider(AccordionRootContext, {
    value,
    setValue$,
    hiddenUntilFound,
    disabled,
    onItemOpen$,
    onItemClose$,
  });

  return (
    <Primitive.div
      as={as}
      data-entry-ui-qwik-accordion-root=""
      data-disabled={disabled.value ? '' : undefined}
      onKeyDown$={[onKeyDown$, handleKeyDownSync$, handleKeyDown$]}
      style={mergeStyles([
        {
          // Performance optimization
          // The `contain: layout style;` CSS property is used here to improve rendering performance.
          // `contain: layout;` tells the browser that the internal layout of this accordion
          // is self-contained and does not affect the layout of elements outside of it. This prevents
          // costly re-calculations of the entire page layout when an accordion item expands or collapses,
          // which is especially beneficial during animations.
          // `contain: style;` ensures that CSS properties that can affect the rest of the page,
          // like counters, are isolated to this element.
          // Together, these properties create a performance "bubble", allowing the browser to optimize
          // rendering by treating the accordion component as an independent unit.
          contain: 'layout style',
        },
        style,
      ])}
      {...others}
    >
      <Slot />
    </Primitive.div>
  );
});
