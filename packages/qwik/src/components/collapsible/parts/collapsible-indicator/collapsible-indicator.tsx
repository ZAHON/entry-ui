import type { CollapsibleIndicatorProps } from './collapsible-indicator.types';
import { component$, Slot } from '@qwik.dev/core';
import { Indicator } from '@/_internal/components/indicator';
import { useCollapsibleRootContext } from '../../contexts/collapsible-root-context';

/**
 * An optional visual indicator that reflects the collapsible's open or closed state.
 * It typically displays an icon or other visual cue to show the current status.
 *
 * Renders a `<span>` element.
 */
export const CollapsibleIndicator = component$<CollapsibleIndicatorProps>((props) => {
  const { as = 'span', ...others } = props;

  const { open, disabled } = useCollapsibleRootContext();

  return (
    <Indicator
      as={as}
      data-entry-ui-qwik-collapsible-indicator=""
      data-state={open.value ? 'open' : 'closed'}
      data-disabled={disabled.value ? '' : undefined}
      {...others}
    >
      <Slot />
    </Indicator>
  );
});
