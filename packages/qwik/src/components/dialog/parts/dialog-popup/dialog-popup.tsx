import type { DialogPopupProps } from './dialog-popup.types';
import type { EntryUIQwikEventState } from '@/types';
import { component$, useSignal, useComputed$, $, sync$, useTask$, useContextProvider, Slot } from '@qwik.dev/core';
import { isBrowser, isDev } from '@qwik.dev/core';
import { getDocument } from '@entry-ui/utilities/get-document';
import { getComputedStyle } from '@entry-ui/utilities/get-computed-style';
import { addEventListenerOnce } from '@entry-ui/utilities/add-event-listener-once';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { useLifecycle } from '@/hooks/use-lifecycle';
import { mergeStyles } from '@/utilities/merge-styles';
import { mergeRefs } from '@/utilities/merge-refs';
import { useIdManager } from '@/_internal/hooks/use-id-manager';
import { fail } from '@/_internal/utilities/fail';
import { warn } from '@/_internal/utilities/warn';
import { Primitive } from '@/_internal/components/primitive';
import { useDialogRootContext } from '../../contexts/dialog-root-context';
import { DialogPopupContext } from '../../contexts/dialog-popup-context';

/**
 * A container for the dialog contents.
 *
 * Renders a `<dialog>` element.
 */
export const DialogPopup = component$<DialogPopupProps>((props) => {
  const {
    as = 'dialog',
    ref: _ref,
    id,
    preventScroll = true,
    closeOnEscapeKeyDown = true,
    closeOnClickOutside = true,
    onOpenChangeComplete$,
    onCancel$,
    onKeyDown$,
    onPointerDown$,
    onPointerUp$,
    style,
    ...others
  } = props;

  const { open, setOpen$, popupId } = useDialogRootContext();

  const ref = useSignal<HTMLElement | undefined>(undefined);
  const hidden = useSignal(true);
  const state = useSignal<'open' | 'closed'>('closed');
  const pointerDownOutside = useSignal(false);

  const mergedStyles = useComputed$(() =>
    mergeStyles([{ display: hidden.value ? 'none !important' : undefined }, style])
  );

  const titleId = useIdManager({ prefix: 'entry-ui-qwik-dialog-title-' });
  const descriptionId = useIdManager({ prefix: 'entry-ui-qwik-dialog-description-' });

  const scrollLock = useScrollLock(
    $(() => {
      if (ref.value) {
        return getDocument(ref.value);
      } else {
        return document;
      }
    })
  );

  useLifecycle({
    element: ref,
    onMount$: $(() => popupId.set$(id)),
    onUnmount$: $(() => popupId.delete$()),
  });

  useTask$(async ({ track, cleanup }) => {
    const isOpen = track(() => open.value);

    const popupRef = ref.value;

    if (isDev && isBrowser && popupRef && !(popupRef instanceof HTMLDialogElement)) {
      fail([`The 'Dialog.Popup' component must render a native HTML <dialog> element.`]);
    }

    if (isBrowser && popupRef && popupRef instanceof HTMLDialogElement) {
      if (isOpen) {
        if (preventScroll) {
          await scrollLock.lock$();
        }

        hidden.value = false;
        popupRef.style.removeProperty('display');

        popupRef.showModal();

        state.value = 'open';
        popupRef.setAttribute('data-state', 'open');
      } else {
        state.value = 'closed';
        popupRef.setAttribute('data-state', 'closed');
      }

      const applyFinalState = () => {
        if (!isOpen) {
          popupRef.close();

          hidden.value = true;
          popupRef.style.setProperty('display', 'none !important');

          if (preventScroll) {
            scrollLock.unlock$();
          }
        }

        if (onOpenChangeComplete$) {
          onOpenChangeComplete$(isOpen);
        }
      };

      const { transitionDuration, animationDuration } = getComputedStyle(popupRef);

      if (isDev && transitionDuration !== '0s' && animationDuration !== '0s') {
        warn([
          `Both CSS transitions and CSS animations are detected on 'Dialog.Popup' component.`,
          `Using both at the same time may cause unpredictable behavior.`,
          `Please use only one animation method.`,
        ]);

        applyFinalState();
      } else if (transitionDuration !== '0s') {
        const removeTransitionEndListener = addEventListenerOnce({
          target: popupRef,
          type: 'transitionend',
          listener: applyFinalState,
        });

        cleanup(() => {
          removeTransitionEndListener();
        });
      } else if (animationDuration !== '0s') {
        const removeAnimationEndListener = addEventListenerOnce({
          target: popupRef,
          type: 'animationend',
          listener: applyFinalState,
        });

        cleanup(() => {
          removeAnimationEndListener();
        });
      } else {
        applyFinalState();
      }
    }
  });

  const handleCancelSync$ = sync$((event: Event) => {
    const entryUIQwikEvent = event as typeof event & { readonly entryUIQwikHandlerPrevented?: boolean };

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented) {
      // Intercepts the native `cancel` event, which Chromium-based browsers trigger
      // when the mobile back button is pressed while a `<dialog>` element is open.
      // This prevents the browser from closing the `<dialog>` element independently of our state.
      event.preventDefault();
    }
  });

  const handleCancel$ = $((event: Event) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented) {
      // Ensures the internal state is updated when the `<dialog>` element is canceled via
      // browser-specific actions (like the back button in Chrome/Edge).
      // Unlike Chromium, browsers like Firefox will navigate to the previous
      // page instead of triggering this event.
      setOpen$(false);
    }
  });

  const handleKeyDownSync$ = sync$((event: KeyboardEvent) => {
    const entryUIQwikEvent = event as typeof event & { readonly entryUIQwikHandlerPrevented?: boolean };
    const isEscapeKey = event.key === 'Escape';

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented && isEscapeKey) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  const handleKeyDown$ = $((event: KeyboardEvent) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;
    const isOpen = open.value;
    const isEscapeKey = event.key === 'Escape';

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented && isOpen && isEscapeKey && closeOnEscapeKeyDown) {
      setOpen$(false);
    }
  });

  const handlePointerDown$ = $((event: PointerEvent, currentTarget: HTMLElement) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;
    const isOpen = open.value;
    const isCurrentTarget = (event.target as HTMLElement) === currentTarget;
    const isMainButton = event.button === 0;
    const isPointerDownOutside = pointerDownOutside.value;

    if (
      !entryUIQwikEvent.entryUIQwikHandlerPrevented &&
      isOpen &&
      isCurrentTarget &&
      isMainButton &&
      closeOnClickOutside &&
      !isPointerDownOutside
    ) {
      const { clientX, clientY } = event;
      const { left, right, top, bottom } = currentTarget.getBoundingClientRect();

      if (!(clientX >= left && clientX <= right && clientY >= top && clientY <= bottom)) {
        pointerDownOutside.value = true;
      }
    }
  });

  const handlePointerUp$ = $((event: PointerEvent, currentTarget: HTMLElement) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;
    const isOpen = open.value;
    const isCurrentTarget = (event.target as HTMLElement) === currentTarget;
    const isPointerDownOutside = pointerDownOutside.value;

    if (
      !entryUIQwikEvent.entryUIQwikHandlerPrevented &&
      isOpen &&
      isCurrentTarget &&
      isPointerDownOutside &&
      closeOnClickOutside
    ) {
      const { clientX, clientY } = event;
      const { left, right, top, bottom } = currentTarget.getBoundingClientRect();

      if (!(clientX >= left && clientX <= right && clientY >= top && clientY <= bottom)) {
        setOpen$(false);
      }

      pointerDownOutside.value = false;
    }
  });

  useContextProvider(DialogPopupContext, { titleId, descriptionId });

  return (
    <Primitive.dialog
      as={as}
      ref={mergeRefs([_ref, ref])}
      role="dialog"
      id={popupId.id.value}
      aria-labelledby={titleId.id.value}
      aria-describedby={descriptionId.id.value}
      data-entry-ui-qwik-dialog-popup=""
      data-state={state.value}
      onCancel$={[onCancel$, handleCancelSync$, handleCancel$]}
      onKeyDown$={[onKeyDown$, handleKeyDownSync$, handleKeyDown$]}
      onPointerDown$={[onPointerDown$, handlePointerDown$]}
      onPointerUp$={[onPointerUp$, handlePointerUp$]}
      style={mergedStyles.value}
      {...others}
    >
      <Slot />
    </Primitive.dialog>
  );
});
