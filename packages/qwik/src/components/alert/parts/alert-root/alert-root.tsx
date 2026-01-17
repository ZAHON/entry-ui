import type { AlertRootProps } from './alert-root.types';
import { component$, Slot } from '@qwik.dev/core';
import { Primitive } from '@/_internal/components/primitive';

/**
 * Contains the content for the alert.
 *
 * Renders a `<div>` element.
 */
export const AlertRoot = component$<AlertRootProps>((props) => {
  const { as = 'div', ...others } = props;

  return (
    <Primitive.div as={as} role="alert" data-entry-ui-qwik-alert-root="" {...others}>
      <Slot />
    </Primitive.div>
  );
});
