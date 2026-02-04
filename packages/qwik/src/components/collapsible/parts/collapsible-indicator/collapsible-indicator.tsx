import type { CollapsibleIndicatorProps } from './collapsible-indicator.types';
import { component$, Slot } from '@qwik.dev/core';
import { mergeStyles } from '@/utilities/merge-styles';
import { Primitive } from '@/_internal/components/primitive';
import { useCollapsibleRootContext } from '../../contexts/collapsible-root-context';

/**
 * An optional visual indicator that reflects the collapsible's open or closed state.
 * It typically displays an icon or other visual cue to show the current status.
 *
 * Renders a `<span>` element.
 */
export const CollapsibleIndicator = component$<CollapsibleIndicatorProps>((props) => {
  const { style, ...others } = props;

  const { open, disabled } = useCollapsibleRootContext();

  return (
    <Primitive.span
      aria-hidden="true"
      data-entry-ui-qwik-collapsible-indicator=""
      data-state={open.value ? 'open' : 'closed'}
      data-disabled={disabled.value ? '' : undefined}
      style={mergeStyles([{ pointerEvents: 'none', userSelect: 'none' }, style])}
      {...others}
    >
      <Slot />
    </Primitive.span>
  );
});
