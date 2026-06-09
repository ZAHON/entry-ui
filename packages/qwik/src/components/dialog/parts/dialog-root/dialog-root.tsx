import type { DialogRootProps } from './dialog-root.types';
import { component$, useSignal, useTask$, useContextProvider, Slot } from '@qwik.dev/core';
import { isDev } from '@qwik.dev/core/build';
import { useControllable } from '@/hooks/use-controllable';
import { useIdManager } from '@/_internal/hooks/use-id-manager';
import { fail } from '@/_internal/utilities/fail';
import { DialogRootContext } from '../../contexts/dialog-root-context';

/**
 * Groups all parts of the dialog.
 *
 * Doesn’t render its own HTML element.
 */
export const DialogRoot = component$((props: DialogRootProps) => {
  const { open: _open, onOpenChange$ } = props;

  const { state: open, setState$: setOpen$ } = useControllable({
    defaultValue: false,
    controlledSignal: _open,
    onChange$: onOpenChange$,
  });

  const triggerRef = useSignal<HTMLElement | undefined>(undefined);
  const triggerId = useIdManager({ prefix: 'entry-ui-qwik-dialog-trigger-' });
  const popupId = useIdManager({ prefix: 'entry-ui-qwik-dialog-popup-' });

  useTask$(() => {
    if (isDev && open.value) {
      fail([
        `The 'Dialog' component cannot be initialized in an open state.`,
        `Because it relies on the native HTML <dialog> element, it must be opened via client-side logic to properly trigger its internal methods.`,
        `Please ensure the 'open' signal is initialized as 'false' and only changed to 'true' after the component has mounted.`,
      ]);
    }
  });

  useContextProvider(DialogRootContext, { open, setOpen$, triggerRef, triggerId, popupId });

  return <Slot />;
});
