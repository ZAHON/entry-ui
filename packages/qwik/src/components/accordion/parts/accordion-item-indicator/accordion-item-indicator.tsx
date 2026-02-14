import type { AccordionItemIndicatorProps } from './accordion-item-indicator.types';
import { component$, Slot } from '@qwik.dev/core';
import { mergeStyles } from '@/utilities/merge-styles';
import { Primitive } from '@/_internal/components/primitive';
import { useAccordionItemContext } from '../../contexts/accordion-item-context';

/**
 * An optional visual indicator that reflects the item's open or closed state.
 * It typically displays an icon or other visual cue to show the current status.
 *
 * Renders a `<span>` element.
 */
export const AccordionItemIndicator = component$<AccordionItemIndicatorProps>((props) => {
  const { style, ...others } = props;

  const { open, disabled } = useAccordionItemContext();

  return (
    <Primitive.span
      aria-hidden="true"
      data-entry-ui-qwik-accordion-item-indicator=""
      data-state={open.value ? 'open' : 'closed'}
      data-disabled={disabled.value ? '' : undefined}
      style={mergeStyles([{ pointerEvents: 'none', userSelect: 'none' }, style])}
      {...others}
    >
      <Slot />
    </Primitive.span>
  );
});
