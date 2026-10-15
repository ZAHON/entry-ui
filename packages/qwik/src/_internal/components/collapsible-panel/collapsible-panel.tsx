import type { CollapsiblePanelProps } from './collapsible-panel.types';
import { component$, useSignal, useComputed$, useTask$, $, Slot } from '@qwik.dev/core';
import { isBrowser, isDev } from '@qwik.dev/core';
import { createAnimationFrame } from '@entry-ui/utilities/create-animation-frame';
import { createAnimationsFinished } from '@entry-ui/utilities/create-animations-finished';
import { getCssDimensions } from '@entry-ui/utilities/get-css-dimensions';
import { getHiddenElementHeight } from '@entry-ui/utilities/get-hidden-element-height';
import { getAnimationType } from '@entry-ui/utilities/get-animation-type';
import { mergeStyles } from '@/utilities/merge-styles';
import { mergeRefs } from '@/utilities/merge-refs';
import { warn } from '@/_internal/utilities/warn';
import { runIfHandlerNotPrevented } from '@/_internal/utilities/run-if-handler-not-prevented';
import { Primitive } from '@/_internal/components/primitive';

/**
 * An internal component used as a base for expandable panels, such as `Collapsible` or `Accordion`.
 *
 * It provides advanced height synchronization, CSS transition support, and seamless
 * integration with the browser's native search-and-reveal (`hidden="until-found"`) functionality.
 *
 * This component is designed for internal library use to ensure consistent animation
 * behaviors, state management (open/closed), and accessibility across different
 * disclosure-pattern implementations.
 *
 * Renders a `<div>` element.
 */
export const CollapsiblePanel = component$<CollapsiblePanelProps>((props) => {
  const {
    as = 'div',
    ref: _ref,
    componentName,
    heightVariableName,
    open = false,
    setOpen$,
    hiddenUntilFound: _hiddenUntilFound = false,
    disabled = false,
    onOpenChangeComplete$,
    onBeforematch$,
    style,
    ...others
  } = props;

  const ref = useSignal<HTMLElement | undefined>(undefined);
  const hidden = useSignal(!open);
  const state = useSignal<'open' | 'closed'>(open ? 'open' : 'closed');
  const height = useSignal(open ? 'auto' : 'none');
  const transitionStatus = useSignal<'starting' | 'ending' | undefined>(undefined);
  const shouldPreventOpenAnimation = useSignal(open);
  const shouldPreventOpenTransition = useSignal(false);
  const hiddenUntilFound = useComputed$(() => (disabled ? false : _hiddenUntilFound));

  const mergedStyles = useComputed$(() =>
    mergeStyles([
      {
        display: hidden.value ? (hiddenUntilFound.value ? undefined : 'none !important') : undefined,
        animationName: shouldPreventOpenAnimation.value ? 'none' : undefined,
        transition: shouldPreventOpenTransition.value ? 'none' : undefined,
        [heightVariableName]: height.value,
      },
      style,
    ])
  );

  useTask$(
    ({ track, cleanup }) => {
      const isOpen = track(() => open);

      const panelRef = ref.value;

      if (isBrowser && panelRef) {
        const frame = createAnimationFrame();
        const animationsFinished = createAnimationsFinished();
        const abortController = new AbortController();

        const getPanelHeight = () => {
          if (height.value === 'auto') {
            return getCssDimensions(panelRef).height;
          }

          return getHiddenElementHeight(panelRef);
        };

        if (isOpen) {
          state.value = 'open';

          const applyFinalOpenState = () => {
            height.value = 'auto';

            if (onOpenChangeComplete$) {
              onOpenChangeComplete$(true);
            }
          };

          frame.request(() => {
            const animationType = getAnimationType({ element: panelRef });

            if (isDev && animationType === 'both') {
              warn([
                `Both CSS transitions and CSS animations are detected on ${componentName} component.`,
                `Using both at the same time may cause unpredictable behavior.`,
                `Please use only one animation method.`,
              ]);
            }

            if (animationType === 'none') {
              hidden.value = false;

              applyFinalOpenState();
            }

            if (animationType === 'css-transition') {
              transitionStatus.value = 'starting';

              panelRef.setAttribute('data-starting-style', '');
              panelRef.style.setProperty('transition-duration', '0s');

              const panelHeight = getPanelHeight();

              height.value = `${panelHeight}px`;

              hidden.value = false;

              frame.request(() => {
                transitionStatus.value = undefined;

                panelRef.removeAttribute('data-starting-style');
                panelRef.style.removeProperty('transition-duration');

                animationsFinished.waitForAnimations({
                  element: panelRef,
                  signal: abortController.signal,
                  callback: applyFinalOpenState,
                });
              });
            }

            if (animationType === 'css-animation') {
              const panelHeight = getPanelHeight();

              height.value = `${panelHeight}px`;

              hidden.value = false;

              animationsFinished.waitForAnimations({
                element: panelRef,
                signal: abortController.signal,
                callback: applyFinalOpenState,
              });
            }
          });
        } else {
          state.value = 'closed';

          if (shouldPreventOpenTransition.value) {
            shouldPreventOpenTransition.value = false;
          }

          const applyFinalClosedState = () => {
            height.value = 'none';

            hidden.value = true;

            if (transitionStatus.value) {
              transitionStatus.value = undefined;
            }

            if (onOpenChangeComplete$) {
              onOpenChangeComplete$(false);
            }
          };

          frame.request(() => {
            const animationType = getAnimationType({
              element: panelRef,
              ignoreAnimationName: shouldPreventOpenAnimation.value,
            });

            if (shouldPreventOpenAnimation.value) {
              shouldPreventOpenAnimation.value = false;
            }

            if (isDev && animationType === 'both') {
              warn([
                `Both CSS transitions and CSS animations are detected on '<${componentName}>' component.`,
                `Using both at the same time may cause unpredictable behavior.`,
                `Please use only one animation method.`,
              ]);
            }

            if (animationType === 'none') {
              applyFinalClosedState();
            }

            if (animationType === 'css-transition') {
              const panelHeight = getPanelHeight();

              height.value = `${panelHeight}px`;

              frame.request(() => {
                transitionStatus.value = 'ending';

                animationsFinished.waitForAnimations({
                  element: panelRef,
                  signal: abortController.signal,
                  callback: applyFinalClosedState,
                });
              });
            }

            if (animationType === 'css-animation') {
              const panelHeight = getPanelHeight();

              height.value = `${panelHeight}px`;

              animationsFinished.waitForAnimations({
                element: panelRef,
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

  const handleBeforeMatch$ = $((event: Event) => {
    runIfHandlerNotPrevented({
      event,
      callback: () => {
        hidden.value = false;
        shouldPreventOpenAnimation.value = true;
        shouldPreventOpenTransition.value = true;

        if (setOpen$) {
          setOpen$(true);
        }
      },
    });
  });

  return (
    <Primitive.div
      as={as}
      ref={mergeRefs([_ref, ref])}
      hidden={hidden.value ? (hiddenUntilFound.value ? 'until-found' : 'hidden') : undefined}
      data-open={state.value === 'open' ? '' : undefined}
      data-closed={state.value === 'closed' ? '' : undefined}
      data-starting-style={transitionStatus.value === 'starting' ? '' : undefined}
      data-ending-style={transitionStatus.value === 'ending' ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      onBeforematch$={[onBeforematch$, handleBeforeMatch$]}
      style={mergedStyles.value}
      {...others}
    >
      <Slot />
    </Primitive.div>
  );
});
