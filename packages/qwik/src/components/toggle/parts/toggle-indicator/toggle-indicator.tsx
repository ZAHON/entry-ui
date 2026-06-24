import type { ToggleIndicatorProps } from './toggle-indicator.types';
import { component$, Slot } from '@qwik.dev/core';
import { Indicator } from '@/_internal/components/indicator';
import { useToggleRootContext } from '../../contexts/toggle-root-context';

/**
 * An optional visual indicator that reflects the toggle's pressed or unpressed state.
 * It typically displays an icon or other visual cue to show the current status.
 *
 * Renders a `<span>` element.
 */
export const ToggleIndicator = component$<ToggleIndicatorProps>((props) => {
  const { as = 'span', ...others } = props;

  const { pressed, disabled } = useToggleRootContext();

  return (
    <Indicator
      as={as}
      data-entry-ui-qwik-toggle-indicator=""
      data-state={pressed.value ? 'on' : 'off'}
      data-disabled={disabled.value ? '' : undefined}
      {...others}
    >
      <Slot />
    </Indicator>
  );
});
