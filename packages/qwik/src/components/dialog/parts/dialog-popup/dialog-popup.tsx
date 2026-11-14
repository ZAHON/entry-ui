import type { DialogPopupProps } from './dialog-popup.types';
import type { EntryUIQwikEventState } from '@/types';
import { component$, useSignal, useComputed$, $, sync$, useTask$, useContextProvider, Slot } from '@qwik.dev/core';
import { isBrowser, isDev } from '@qwik.dev/core';
import { getWindow } from '@entry-ui/utilities/get-window';
import { getDocument } from '@entry-ui/utilities/get-document';
import { createAnimationFrame } from '@entry-ui/utilities/create-animation-frame';
import { createAnimationsFinished } from '@entry-ui/utilities/create-animations-finished';
import { getAnimationType } from '@entry-ui/utilities/get-animation-type';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { useLifecycle } from '@/hooks/use-lifecycle';
import { mergeStyles } from '@/utilities/merge-styles';
import { mergeRefs } from '@/utilities/merge-refs';
import { useIdManager } from '@/_internal/hooks/use-id-manager';
import { fail } from '@/_internal/utilities/fail';
import { warn } from '@/_internal/utilities/warn';
import { runIfHandlerNotPrevented } from '@/_internal/utilities/run-if-handler-not-prevented';
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
  const transitionStatus = useSignal<'starting' | 'ending' | undefined>(undefined);
  const shouldPreventOpenAnimation = useSignal(true);
  const pointerDownOutside = useSignal(false);

  const mergedStyles = useComputed$(() =>
    mergeStyles([
      {
        display: hidden.value ? 'none !important' : undefined,
        animationName: shouldPreventOpenAnimation.value ? 'none' : undefined,
      },
      style,
    ])
  );

  const titleId = useIdManager({ prefix: 'entry-ui-qwik-dialog-title-' });
  const descriptionId = useIdManager({ prefix: 'entry-ui-qwik-dialog-description-' });

  const scrollLock = useScrollLock(
    $(() => {
      const popupRef = ref.value as HTMLElement;

      const win = getWindow(popupRef);
      const doc = getDocument(popupRef);
      const html = doc.documentElement;
      const body = doc.body;

      return { win, doc, html, body };
    })
  );

  useLifecycle({
    element: ref,
    onMount$: $(() => popupId.set$(id)),
    onUnmount$: $(() => popupId.delete$()),
  });

  useTask$(
    async ({ track, cleanup }) => {
      const isOpen = track(open);

      const popupRef = ref.value;

      if (isBrowser && isDev && popupRef && !(popupRef instanceof HTMLDialogElement)) {
        fail([`The '<Dialog.Popup>' component must render a native HTML '<dialog>' element.`]);
      }

      if (isBrowser && popupRef && popupRef instanceof HTMLDialogElement) {
        const frame = createAnimationFrame();
        const animationsFinished = createAnimationsFinished();
        const abortController = new AbortController();

        if (isOpen) {
          if (preventScroll) {
            await scrollLock.lock$();
          }

          if (shouldPreventOpenAnimation.value) {
            shouldPreventOpenAnimation.value = false;
          }

          hidden.value = false;
          state.value = 'open';

          const applyFinalOpenState = () => {
            if (onOpenChangeComplete$) {
              onOpenChangeComplete$(true);
            }
          };

          frame.request(() => {
            const animationType = getAnimationType({
              element: popupRef,
              ignoreAnimationName: shouldPreventOpenAnimation.value,
            });

            if (isDev && animationType === 'both') {
              warn([
                `Both CSS transitions and CSS animations are detected on '<Dialog.Popup>' component.`,
                `Using both at the same time may cause unpredictable behavior.`,
                `Please use only one animation method.`,
              ]);
            }

            if (animationType === 'none') {
              popupRef.showModal();

              applyFinalOpenState();
            }

            if (animationType === 'css-transition') {
              transitionStatus.value = 'starting';
              popupRef.setAttribute('data-starting-style', '');
              popupRef.style.setProperty('transition-duration', '0s');

              popupRef.showModal();

              frame.request(() => {
                transitionStatus.value = undefined;
                popupRef.removeAttribute('data-starting-style');
                popupRef.style.removeProperty('transition-duration');

                animationsFinished.waitForAnimations({
                  element: popupRef,
                  signal: abortController.signal,
                  callback: applyFinalOpenState,
                });
              });
            }

            if (animationType === 'css-animation') {
              popupRef.showModal();

              animationsFinished.waitForAnimations({
                element: popupRef,
                signal: abortController.signal,
                callback: applyFinalOpenState,
              });
            }
          });
        } else {
          state.value = 'closed';

          const applyFinalClosedState = () => {
            popupRef.close();

            hidden.value = true;

            if (transitionStatus.value) {
              transitionStatus.value = undefined;
            }

            if (preventScroll) {
              scrollLock.unlock$();
            }

            if (onOpenChangeComplete$) {
              onOpenChangeComplete$(false);
            }
          };

          frame.request(() => {
            const animationType = getAnimationType({ element: popupRef });

            if (isDev && animationType === 'both') {
              warn([
                `Both CSS transitions and CSS animations are detected on '<Dialog.Popup>' component.`,
                `Using both at the same time may cause unpredictable behavior.`,
                `Please use only one animation method.`,
              ]);
            }

            if (animationType === 'none') {
              applyFinalClosedState();
            }

            if (animationType === 'css-transition') {
              transitionStatus.value = 'ending';

              frame.request(() => {
                animationsFinished.waitForAnimations({
                  element: popupRef,
                  signal: abortController.signal,
                  callback: applyFinalClosedState,
                });
              });
            }

            if (animationType === 'css-animation') {
              animationsFinished.waitForAnimations({
                element: popupRef,
                signal: abortController.signal,
                callback: applyFinalClosedState,
              });
            }
          });
        }

        cleanup(() => {
          frame.cancel();
          animationsFinished.cancel();
          abortController.abort();
        });
      }
    },
    { deferUpdates: false }
  );

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
    runIfHandlerNotPrevented({
      event,
      callback: () => {
        // Ensures the internal state is updated when the `<dialog>` element is canceled via
        // browser-specific actions (like the back button in Chrome/Edge).
        // Unlike Chromium, browsers like Firefox will navigate to the previous
        // page instead of triggering this event.
        setOpen$(false);
      },
    });
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
    runIfHandlerNotPrevented({
      event,
      callback: () => {
        const isOpen = open.value;
        const isEscapeKey = event.key === 'Escape';

        if (isOpen && isEscapeKey && closeOnEscapeKeyDown) {
          setOpen$(false);
        }
      },
    });
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
      data-open={state.value === 'open' ? '' : undefined}
      data-closed={state.value === 'closed' ? '' : undefined}
      data-starting-style={transitionStatus.value === 'starting' ? '' : undefined}
      data-ending-style={transitionStatus.value === 'ending' ? '' : undefined}
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

export namespace DialogPopup {
  /**
   * Props for the `<Dialog.Popup>` component.
   *
   * Extends the standard HTML attributes for a `<dialog>` element.
   */
  export type Props = DialogPopupProps;
}
