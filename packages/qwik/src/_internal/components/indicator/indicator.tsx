import type { IndicatorProps } from './indicator.types';
import { component$, useComputed$, Slot } from '@qwik.dev/core';
import { mergeStyles } from '@/utilities/merge-styles';
import { Primitive } from '@/_internal/components/primitive';

/**
 * Internal component used as a base for various state indicators.
 * It provides common accessibility attributes, styling resets, and composition support.
 *
 * This component is intended for internal library use to ensure consistent
 * behavior across different indicator implementations.
 *
 * Renders a `<span>` element.
 */
export const Indicator = component$<IndicatorProps>((props) => {
  const { as = 'span', style, ...others } = props;

  const mergedStyles = useComputed$(() =>
    mergeStyles([
      {
        pointerEvents: 'none',
        userSelect: 'none',
        // Ensures text selection is disabled on older versions of Safari
        // and iOS browsers using the WebKit engine.
        WebkitUserSelect: 'none',
      },
      style,
    ])
  );

  return (
    <Primitive.span as={as} aria-hidden="true" style={mergedStyles.value} {...others}>
      <Slot />
    </Primitive.span>
  );
});
