import type { DialogTriggerProps } from './dialog-trigger.types';
import { component$, useComputed$, $, useContextProvider, Slot } from '@qwik.dev/core';
import { useLifecycle } from '@/hooks/use-lifecycle';
import { mergeRefs } from '@/utilities/merge-refs';
import { Primitive } from '@/_internal/components/primitive';
import { useDialogRootContext } from '../../contexts/dialog-root-context';
import { DialogTriggerContext } from '../../contexts/dialog-trigger-context';

/**
 * A button that opens the dialog.
 *
 * Renders a `<button>` element.
 */
export const DialogTrigger = component$((props: DialogTriggerProps) => {
  const { as = 'button', ref, id, disabled: _disabled = false, onClick$, ...others } = props;

  const { open, setOpen$, triggerRef, triggerId, popupId } = useDialogRootContext();

  const disabled = useComputed$(() => _disabled);

  useLifecycle({
    element: triggerRef,
    onMount$: $(() => triggerId.set$(id)),
    onUnmount$: $(() => triggerId.delete$()),
  });

  const handleClick$ = $(() => {
    if (!disabled.value) {
      setOpen$(true);
    }
  });

  useContextProvider(DialogTriggerContext, { disabled });

  return (
    <Primitive.button
      as={as}
      ref={mergeRefs([ref, triggerRef])}
      type="button"
      id={triggerId.id.value}
      disabled={disabled.value}
      aria-controls={popupId.id.value && open.value ? popupId.id.value : undefined}
      aria-haspopup={popupId.id.value ? 'dialog' : undefined}
      aria-expanded={popupId.id.value ? open.value : undefined}
      data-entry-ui-qwik-dialog-trigger=""
      data-state={open.value ? 'open' : 'closed'}
      data-disabled={disabled.value ? '' : undefined}
      onClick$={[onClick$, handleClick$]}
      {...others}
    >
      <Slot />
    </Primitive.button>
  );
});
