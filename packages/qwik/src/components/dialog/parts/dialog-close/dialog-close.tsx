import type { DialogCloseProps } from './dialog-close.types';
import type { EntryUIQwikEventState } from '@/types';
import { component$, useComputed$, $, useContextProvider, Slot } from '@qwik.dev/core';
import { Primitive } from '@/_internal/components/primitive';
import { useDialogRootContext } from '../../contexts/dialog-root-context';
import { DialogCloseContext } from '../../contexts/dialog-close-context';

/**
 * A button that closes the dialog.
 *
 * Renders a `<button>` element.
 */
export const DialogClose = component$((props: DialogCloseProps) => {
  const { as = 'button', disabled: _disabled = false, onClick$, ...others } = props;

  const { setOpen$ } = useDialogRootContext();

  const disabled = useComputed$(() => _disabled);

  const handleClick$ = $((event: PointerEvent) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented && !disabled.value) {
      setOpen$(false);
    }
  });

  useContextProvider(DialogCloseContext, { disabled });

  return (
    <Primitive.button
      as={as}
      type="button"
      disabled={disabled.value}
      data-entry-ui-qwik-dialog-close=""
      data-disabled={disabled.value ? '' : undefined}
      onClick$={[onClick$, handleClick$]}
      {...others}
    >
      <Slot />
    </Primitive.button>
  );
});
