import type { AccordionItemPanelProps } from './accordion-item-panel.types';
import type { EntryUIQwikEventState } from '@/types';
import { component$, useSignal, useComputed$, useTask$, $, sync$, Slot } from '@qwik.dev/core';
import { isBrowser, isDev } from '@qwik.dev/core';
import { getComputedStyle } from '@entry-ui/utilities/get-computed-style';
import { getHiddenElementHeight } from '@entry-ui/utilities/get-hidden-element-height';
import { addEventListenerOnce } from '@entry-ui/utilities/add-event-listener-once';
import { useLifecycle } from '@/hooks/use-lifecycle';
import { mergeStyles } from '@/utilities/merge-styles';
import { mergeRefs } from '@/utilities/merge-refs';
import { warn } from '@/_internal/utilities/warn';
import { Primitive } from '@/_internal/components/primitive';
import { useAccordionRootContext } from '../../contexts/accordion-root-context';
import { useAccordionItemContext } from '../../contexts/accordion-item-context';

/**
 * A collapsible panel with the accordion item contents.
 *
 * Renders a `<div>` element.
 */
export const AccordionItemPanel = component$<AccordionItemPanelProps>((props) => {
  const {
    as = 'div',
    ref: _ref,
    id,
    hiddenUntilFound: _hiddenUntilFound = false,
    onOpenChangeComplete$,
    onBeforematch$,
    style,
    ...others
  } = props;

  const { hiddenUntilFound: rootHiddenUntilFound } = useAccordionRootContext();
  const { open, setOpen$, disabled, panelId, triggerId } = useAccordionItemContext();

  const ref = useSignal<HTMLElement | undefined>(undefined);
  const hidden = useSignal(!open.value);
  const state = useSignal<'open' | 'closed'>(open.value ? 'open' : 'closed');
  // Due to a Chromium bug/behavior, when using hidden="until-found" for
  // search-and-reveal functionality, the panel's height cannot be set to "0px"
  // while closed if we intend to animate it via CSS transitions.
  // If the height is "0px", the browser's "Find in page" feature may fail
  // to scroll to or correctly reveal the content. To bypass this, we use
  // "height: none" (or avoid "0px") to ensure the element remains "searchable"
  // by the browser's engine while logically hidden from the user's view.
  const height = useSignal(open.value ? 'auto' : _hiddenUntilFound || rootHiddenUntilFound.value ? 'none' : '0px');
  const isBeforeMatch = useSignal(false);
  const preventInitialAnimation = useSignal(true);
  const hiddenUntilFound = useComputed$(() => _hiddenUntilFound || rootHiddenUntilFound.value);
  const mergedStyles = useComputed$(() =>
    mergeStyles([
      {
        display: hidden.value ? (hiddenUntilFound.value ? undefined : 'none !important') : undefined,
        transitionDuration: preventInitialAnimation.value ? '0s' : undefined,
        animationDuration: preventInitialAnimation.value ? '0s' : undefined,
        '--entry-ui-qwik-accordion-item-panel-height': height.value,
      },
      style,
    ])
  );

  useLifecycle({
    element: ref,
    onMount$: $(() => panelId.set$(id)),
    onUnmount$: $(() => panelId.delete$()),
  });

  useTask$(({ track, cleanup }) => {
    const isOpen = track(() => open.value);

    const panelRef = ref.value;

    if (isBrowser && panelRef) {
      if (preventInitialAnimation.value && !isBeforeMatch.value) {
        preventInitialAnimation.value = false;

        panelRef.style.removeProperty('transition-duration');
        panelRef.style.removeProperty('animation-duration');
      }

      if (isOpen) {
        hidden.value = false;
        panelRef.removeAttribute('hidden');

        if (hiddenUntilFound.value) {
          isBeforeMatch.value = false;
        } else {
          panelRef.style.removeProperty('display');
        }

        state.value = 'open';
        panelRef.setAttribute('data-state', 'open');

        const { animationDuration, transitionDuration } = getComputedStyle(panelRef);
        const panelHeight = getHiddenElementHeight(panelRef);

        if (animationDuration === '0s' && transitionDuration !== '0s') {
          // When transitioning from "until-found" state ("height: none"), we cannot
          // transition directly to a pixel value effectively. We first reset it
          // to "0px" to establish a numeric baseline, then trigger the expansion
          // to the measured height in the next frame to initiate the animation.
          if (height.value === 'none') {
            height.value = '0px';
            panelRef.style.setProperty('--entry-ui-qwik-accordion-item-panel-height', '0px');

            setTimeout(() => {
              height.value = `${panelHeight}px`;
              panelRef.style.setProperty('--entry-ui-qwik-accordion-item-panel-height', `${panelHeight}px`);
            }, 0);
          } else {
            // If the height is already numeric or in a standard closed state ("0px"),
            // we immediately update the CSS variable to the full measured height
            // to trigger the CSS transition.
            height.value = `${panelHeight}px`;
            panelRef.style.setProperty('--entry-ui-qwik-accordion-item-panel-height', `${panelHeight}px`);
          }
        } else {
          // When using CSS animations (@keyframes) instead of transitions, we set
          // this CSS variable to the element's full measured height. This allows
          // the animation to use the current height as a target (e.g., in the "to"
          // block), ensuring the panel expands precisely to the size of its content.
          height.value = `${panelHeight}px`;
          panelRef.style.setProperty('--entry-ui-qwik-accordion-item-panel-height', `${panelHeight}px`);
        }
      } else {
        state.value = 'closed';
        panelRef.setAttribute('data-state', 'closed');

        const { animationDuration, transitionDuration } = getComputedStyle(panelRef);
        const panelHeight = getHiddenElementHeight(panelRef);

        if (animationDuration === '0s' && transitionDuration !== '0s') {
          // When the panel is fully open, the CSS variable for height is set to "auto".
          // Since CSS transitions cannot animate from "auto" to a specific value (like "0px"),
          // we must first lock the variable to the current pixel height of the element.
          // Then, in the next execution tick (via setTimeout), we set it to "0px" to trigger
          // the transition
          if (height.value === 'auto') {
            height.value = `${panelHeight}px`;
            panelRef.style.setProperty('--entry-ui-qwik-accordion-item-panel-height', `${panelHeight}px`);

            setTimeout(() => {
              height.value = '0px';
              panelRef.style.setProperty('--entry-ui-qwik-accordion-item-panel-height', '0px');
            }, 0);
          } else {
            // If height is already numeric (e.g., interrupted opening animation),
            // we can transition to "0px" immediately without forcing a reflow.
            height.value = '0px';
            panelRef.style.setProperty('--entry-ui-qwik-accordion-item-panel-height', '0px');
          }
        } else {
          // When using CSS animations (@keyframes), this CSS variable serves as the
          // starting point for the animation (e.g., in the "from" block). We set
          // it to the current measured height so the animation can smoothly
          // transition from the current state to "0px".
          height.value = `${panelHeight}px`;
          panelRef.style.setProperty('--entry-ui-qwik-accordion-item-panel-height', `${panelHeight}px`);
        }
      }

      const applyFinalState = () => {
        if (isOpen) {
          // Once the animation completes, we reset the height to "auto". This
          // allows the panel to dynamically adjust its size if the internal content
          // changes (e.g., during window resizing or data updates). By returning to
          // "auto", we rely on the browser's native layout engine instead of
          // implementing a costly ResizeObserver to manually track content changes.
          height.value = 'auto';
          panelRef.style.setProperty('--entry-ui-qwik-accordion-item-panel-height', 'auto');
        } else {
          hidden.value = true;

          // If "until-found" is enabled, we revert the height to "none" instead of "0px".
          // This maintains compatibility with the browser's search-and-reveal feature
          // for the next time the user searches, avoiding the "0px" height bug
          // in Chromium-based browsers.
          if (hiddenUntilFound.value) {
            height.value = 'none';
            panelRef.style.setProperty('--entry-ui-qwik-accordion-item-panel-height', 'none');
          } else {
            // For standard hidden panels (not using "until-found"), we reset the
            // height to "0px" after the closing animation completes. This ensures
            // the element is fully collapsed and properly synchronized with the
            // "display: none" state, preventing any layout shifts.
            height.value = '0px';
            panelRef.style.setProperty('--entry-ui-qwik-accordion-item-panel-height', '0px');
          }
        }

        if (onOpenChangeComplete$) {
          onOpenChangeComplete$(isOpen);
        }
      };

      const { transitionDuration, animationDuration } = getComputedStyle(panelRef);

      if (isDev && transitionDuration !== '0s' && animationDuration !== '0s') {
        warn([
          `Both CSS transitions and CSS animations are detected on 'Accordion.ItemPanel' component.`,
          `Using both at the same time may cause unpredictable behavior.`,
          `Please use only one animation method.`,
        ]);

        applyFinalState();
      } else if (transitionDuration !== '0s') {
        const removeTransitionEndListener = addEventListenerOnce({
          target: panelRef,
          type: 'transitionend',
          listener: applyFinalState,
        });

        cleanup(() => {
          removeTransitionEndListener();
        });
      } else if (animationDuration !== '0s') {
        const removeAnimationEndListener = addEventListenerOnce({
          target: panelRef,
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

  const handleBeforeMatchSync$ = sync$((event: Event) => {
    const entryUIQwikEvent = event as typeof event & { readonly entryUIQwikHandlerPrevented?: boolean };

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented) {
      event.preventDefault();
    }
  });

  const handleBeforeMatch$ = $((event: Event) => {
    const entryUIQwikEvent = event as EntryUIQwikEventState<typeof event>;

    if (!entryUIQwikEvent.entryUIQwikHandlerPrevented) {
      // When the browser's "Find in page" feature discovers content within a
      // "hidden=until-found" panel, it fires the "beforematch" event.
      // We set `isBeforeMatch` and `preventInitialAnimation` to true to
      // bypass height transitions. This ensures the panel snaps open
      // instantly, allowing the browser to accurately scroll to and
      // highlight the matching text without being interrupted by
      // layout shifts from an ongoing animation.
      isBeforeMatch.value = true;
      preventInitialAnimation.value = true;

      setOpen$(true);
    }
  });

  return (
    <Primitive.div
      as={as}
      ref={mergeRefs([_ref, ref])}
      id={panelId.id.value}
      role={triggerId.id.value ? 'region' : undefined}
      hidden={hidden.value ? (hiddenUntilFound.value ? 'until-found' : 'hidden') : undefined}
      aria-labelledby={triggerId.id.value}
      data-entry-ui-qwik-accordion-item-panel=""
      data-state={state.value}
      data-disabled={disabled.value ? '' : undefined}
      onBeforematch$={[onBeforematch$, handleBeforeMatchSync$, handleBeforeMatch$]}
      style={mergedStyles.value}
      {...others}
    >
      <Slot />
    </Primitive.div>
  );
});
