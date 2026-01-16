import type { SeparatorRootProps } from './separator-root.types';
import { component$, Slot } from '@qwik.dev/core';
import { Primitive } from '@/_internal/components/primitive';

/**
 * A horizontal or vertical line that visually and semantically separates content.
 *
 * Renders a `<div>` element.
 */
export const SeparatorRoot = component$<SeparatorRootProps>((props) => {
  const { as = 'div', orientation = 'horizontal', decorative = false, ...others } = props;

  return (
    <Primitive.div
      as={as}
      /*
       * When `decorative` is `true`, we use `aria-hidden="true"` and remove the `role` entirely
       * to ensure the element is completely invisible to the accessibility tree.
       * This is preferred over `role="none"` as it provides a more robust guarantee
       * that assistive technologies will ignore the element and its potential children.
       */
      role={decorative ? undefined : 'separator'}
      aria-hidden={decorative ? 'true' : undefined}
      /*
       * According to WAI-ARIA, the `"separator"` role has an implicit `aria-orientation` of `"horizontal"`.
       * We explicitly set it here to ensure consistency with the component's internal state.
       * When `decorative` is `true`, we remove it as the element no longer has a semantic role.
       */
      aria-orientation={decorative ? undefined : orientation}
      data-entry-ui-qwik-separator-root=""
      data-orientation={orientation}
      {...others}
    >
      <Slot />
    </Primitive.div>
  );
});
