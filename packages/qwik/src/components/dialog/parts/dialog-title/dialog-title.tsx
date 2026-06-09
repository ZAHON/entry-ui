import type { DialogTitleProps } from './dialog-title.types';
import { component$, useSignal, $, Slot } from '@qwik.dev/core';
import { useLifecycle } from '@/hooks/use-lifecycle';
import { mergeRefs } from '@/utilities/merge-refs';
import { Primitive } from '@/_internal/components/primitive';
import { useDialogPopupContext } from '../../contexts/dialog-popup-context';

/**
 * A heading that labels the dialog.
 *
 * Renders an `<h2>` element.
 */
export const DialogTitle = component$((props: DialogTitleProps) => {
  const { as = 'h2', ref: _ref, id, ...others } = props;

  const { titleId } = useDialogPopupContext();

  const ref = useSignal<HTMLElement | undefined>(undefined);

  useLifecycle({
    element: ref,
    onMount$: $(() => titleId.set$(id)),
    onUnmount$: $(() => titleId.delete$()),
  });

  return (
    <Primitive.h2
      as={as}
      ref={mergeRefs([_ref, ref])}
      id={titleId.id.value}
      data-entry-ui-qwik-dialog-title=""
      {...others}
    >
      <Slot />
    </Primitive.h2>
  );
});
