import type { CopyButtonIndicatorProps } from './copy-button-indicator.types';
import { component$, Slot } from '@qwik.dev/core';
import { Indicator } from '@/_internal/components/indicator';
import { useCopyButtonRootContext } from '../../contexts/copy-button-root-context';

/**
 * An optional visual indicator that reflects the copy button's state.
 * It typically displays an icon or other visual cue to show
 * whether the content has been successfully copied or if an error occurred.
 *
 * Renders a `<span>` element.
 */
export const CopyButtonIndicator = component$<CopyButtonIndicatorProps>((props) => {
  const { as = 'span', ...others } = props;

  const { copied, error, disabled } = useCopyButtonRootContext();

  return (
    <Indicator
      as={as}
      data-entry-ui-qwik-copy-button-indicator=""
      data-copied={copied.value ? '' : undefined}
      data-error={error.value ? '' : undefined}
      data-disabled={disabled.value ? '' : undefined}
      {...others}
    >
      <Slot />
    </Indicator>
  );
});
