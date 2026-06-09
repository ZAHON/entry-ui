import type { DialogDescriptionProps } from './dialog-description.types';
import { component$, useSignal, $, Slot } from '@qwik.dev/core';
import { useLifecycle } from '@/hooks/use-lifecycle';
import { mergeRefs } from '@/utilities/merge-refs';
import { Primitive } from '@/_internal/components/primitive';
import { useDialogPopupContext } from '../../contexts/dialog-popup-context';

/**
 * A paragraph with additional information about the dialog.
 *
 * Renders a `<p>` element.
 */
export const DialogDescription = component$((props: DialogDescriptionProps) => {
  const { as = 'p', ref: _ref, id, ...others } = props;

  const { descriptionId } = useDialogPopupContext();

  const ref = useSignal<HTMLElement | undefined>(undefined);

  useLifecycle({
    element: ref,
    onMount$: $(() => descriptionId.set$(id)),
    onUnmount$: $(() => descriptionId.delete$()),
  });

  return (
    <Primitive.p
      as={as}
      ref={mergeRefs([_ref, ref])}
      id={descriptionId.id.value}
      data-entry-ui-qwik-dialog-description=""
      {...others}
    >
      <Slot />
    </Primitive.p>
  );
});
