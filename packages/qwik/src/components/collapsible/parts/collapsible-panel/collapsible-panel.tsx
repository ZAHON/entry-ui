import type { CollapsiblePanelProps } from './collapsible-panel.types';
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
import { useCollapsibleRootContext } from '../../contexts/collapsible-root-context';

/**
 * A panel with the collapsible contents.
 *
 * Renders a `<div>` element.
 */
export const CollapsiblePanel = component$<CollapsiblePanelProps>((props) => {
  const {
    as = 'div',
    ref: _ref,
    id,
    hiddenUntilFound = false,
    onOpenChangeComplete$,
    onBeforematch$,
    style,
    ...others
  } = props;

  const { open, setOpen$, disabled, panelId, triggerId } = useCollapsibleRootContext();

  const ref = useSignal<HTMLElement | undefined>(undefined);
  const hidden = useSignal(!open.value);
  const state = useSignal<'open' | 'closed'>(open.value ? 'open' : 'closed');
  const height = useSignal(open.value ? 'auto' : '0px');
  const preventInitialAnimation = useSignal(true);
  const mergedStyles = useComputed$(() =>
    mergeStyles([
      {
        display: hidden.value ? (hiddenUntilFound ? undefined : 'none') : undefined,
        contentVisibility: hidden.value ? (hiddenUntilFound ? 'hidden' : undefined) : undefined,
        // When using hidden="until-found", the panel automatically opens when a search
        // match occurs. However, Chromium-based browsers (like Chrome) will fail to
        // highlight the matched text if the element has an overflow value other than
        // "visible". Firefox handles this regardless of the overflow setting, but we force
        // visible here to ensure cross-browser consistency for the "Find-in-page" feature.
        overflow: hidden.value ? (hiddenUntilFound ? 'visible' : undefined) : undefined,
        transitionDuration: preventInitialAnimation.value ? '0s' : undefined,
        animationDuration: preventInitialAnimation.value ? '0s' : undefined,
        '--entry-ui-qwik-collapsible-panel-height': height.value,
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
      if (preventInitialAnimation.value) {
        preventInitialAnimation.value = false;

        panelRef.style.removeProperty('transition-duration');
        panelRef.style.removeProperty('animation-duration');
      }

      if (isOpen) {
        hidden.value = false;
        panelRef.removeAttribute('hidden');

        if (hiddenUntilFound) {
          panelRef.style.removeProperty('content-visibility');
          panelRef.style.removeProperty('overflow');
        } else {
          panelRef.style.removeProperty('display');
        }

        state.value = 'open';
        panelRef.setAttribute('data-state', 'open');

        const panelHeight = getHiddenElementHeight(panelRef);

        height.value = `${panelHeight}px`;
        panelRef.style.setProperty('--entry-ui-qwik-collapsible-panel-height', `${panelHeight}px`);
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
            panelRef.style.setProperty('--entry-ui-qwik-collapsible-panel-height', `${panelHeight}px`);

            setTimeout(() => {
              height.value = '0px';
              panelRef.style.setProperty('--entry-ui-qwik-collapsible-panel-height', '0px');
            }, 0);
          } else {
            // If height is already numeric (e.g., interrupted opening animation),
            // we can transition to "0px" immediately without forcing a reflow.
            height.value = '0px';
            panelRef.style.setProperty('--entry-ui-qwik-collapsible-panel-height', '0px');
          }
        } else {
          // When using CSS animations (@keyframes), this CSS variable serves as the
          // starting point for the animation (e.g., in the "from" block). We set
          // it to the current measured height so the animation can smoothly
          // transition from the current state to "0px".
          height.value = `${panelHeight}px`;
          panelRef.style.setProperty('--entry-ui-qwik-collapsible-panel-height', `${panelHeight}px`);
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
          panelRef.style.setProperty('--entry-ui-qwik-collapsible-panel-height', 'auto');
        } else {
          hidden.value = true;

          height.value = '0px';
          panelRef.style.setProperty('--entry-ui-qwik-collapsible-panel-height', '0px');
        }

        if (onOpenChangeComplete$) {
          onOpenChangeComplete$(isOpen);
        }
      };

      const { transitionDuration, animationDuration } = getComputedStyle(panelRef);

      if (isDev && transitionDuration !== '0s' && animationDuration !== '0s') {
        warn([
          `Both CSS transitions and CSS animations are detected on 'Collapsible.Panel' component.`,
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
    event.preventDefault();
  });

  const handleBeforeMatch$ = $((_: Event, currentTarget: HTMLElement) => {
    setOpen$(true);

    // When the browser finds a match within a hidden panel (using "until-found"),
    // it triggers the "beforematch" event. We manually scroll the element into
    // view to ensure the matched content is visible and centered for the user.
    // We prefer the non-standard `scrollIntoViewIfNeeded` (supported in Chromium/Safari)
    // to prevent unnecessary jumping if the element is already within the viewport,
    // providing a smoother "Find-in-page" experience with a standard fallback.
    if ('scrollIntoViewIfNeeded' in currentTarget) {
      /**
       * Internal type helper to support the non-standard `scrollIntoViewIfNeeded`
       * method available in Chromium and WebKit-based browsers.
       */
      type ElementWithScrollIntoViewIfNeeded = HTMLElement & {
        /**
         * Scrolls the element into the visible area of the browser window if it
         * is not already within the visible area.
         */
        scrollIntoViewIfNeeded: (centerIfNeeded?: boolean) => void;
      };

      (currentTarget as ElementWithScrollIntoViewIfNeeded).scrollIntoViewIfNeeded(true);
    } else {
      currentTarget.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'nearest' });
    }
  });

  return (
    <Primitive.div
      as={as}
      ref={mergeRefs([_ref, ref])}
      id={panelId.id.value}
      hidden={hidden.value ? (hiddenUntilFound ? 'until-found' : 'hidden') : undefined}
      aria-labelledby={triggerId.id.value}
      data-entry-ui-qwik-collapsible-panel=""
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
