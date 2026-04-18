import { hasStableScrollbarGutter } from '../has-stable-scrollbar-gutter';
import { setStyleProperty } from '../set-style-property';
import { setStyle } from '../set-style';
import { isIos } from '../is-ios';

/**
 * Prevents page scrolling by locking the body and compensating for layout shifts across different platforms.
 *
 * This utility applies a robust scroll lock by setting `overflow: hidden` on the body.
 * It automatically detects and compensates for the scrollbar width to prevent "jumping"
 * content, while respecting modern CSS properties like `scrollbar-gutter: stable`.
 * For iOS devices, it implements a specialized `position: fixed` strategy to bypass
 * Safari's unique background scrolling behavior, ensuring a consistent experience
 * across all platforms.
 *
 * @example
 * ```ts
 * const unlock = preventBodyScroll();
 *
 * // Later, when closing a modal or overlay:
 * unlock();
 * ```
 */
export const preventBodyScroll = (doc?: Document) => {
  const _document = doc ?? document;
  const _window = _document.defaultView ?? window;

  const { documentElement, body } = _document;

  if (body.hasAttribute('data-scroll-lock')) {
    return () => void 0;
  }

  // Determine if the layout already reserves space for the scrollbar via `scrollbar-gutter: stable`.
  // This CSS property can be applied to either the `html` (documentElement) or `body` element.
  // If enabled, we must skip adding manual padding to prevent a "double-gap" effect or
  // unnecessary layout shifts when the scroll is locked.
  const hasStableGutter = hasStableScrollbarGutter(documentElement) || hasStableScrollbarGutter(body);

  const scrollbarWidth = _window.innerWidth - documentElement.clientWidth;

  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  const paddingProperty = scrollbarX ? 'paddingLeft' : 'paddingRight';

  const setLockAttribute = () => {
    body.setAttribute('data-scroll-lock', '');

    return () => {
      body.removeAttribute('data-scroll-lock');
    };
  };

  const setScrollbarWidthProperty = () => {
    return setStyleProperty({
      element: documentElement,
      property: '--scrollbar-width',
      value: `${scrollbarWidth}px`,
    });
  };

  const setBodyStyle = () => {
    const style: Record<string, string> = {
      overflow: 'hidden',
    };

    // Prevent layout shifting by compensating for the hidden scrollbar's width.
    // Manual padding is applied only when the layout does not already reserve space via
    // `scrollbar-gutter: stable` and an actual scrollbar is present (width > 0).
    // This ensures that applying `overflow: hidden` does not cause the content to
    // horizontally jump into the newly available space, while simultaneously
    // avoiding the "double-padding" effect in modern browsers where the gutter
    // is already preserved by CSS rules.
    if (!hasStableGutter && scrollbarWidth > 0) {
      style[paddingProperty] = `${scrollbarWidth}px`;
    }

    return setStyle({ element: body, style });
  };

  // Address a long-standing iOS Safari behavior where `overflow: hidden` on the
  // document body fails to prevent background scrolling. To bypass this, we
  // switch to a `position: fixed` strategy, which effectively locks the viewport.
  // We calculate and apply negative `top` and `left` values based on the current
  // scroll position and `visualViewport` offsets to ensure the page doesn't
  // snap to the top when the lock is engaged, while also maintaining layout
  // integrity by applying the calculated scrollbar padding if necessary.
  const setBodyStyleIOS = () => {
    const { scrollX, scrollY, visualViewport } = _window;

    // Account for legacy environments such as iOS 12 and earlier where the
    // `visualViewport` API is not available. In these cases, we fall back to
    // zero offsets, as standard scroll coordinates are usually sufficient.
    // For modern browsers, utilizing `visualViewport.offsetLeft` and `offsetTop`
    // is essential to correctly calculate the body's fixed position, especially
    // when the user is zoomed in or when an on-screen keyboard is active,
    // ensuring the background remains perfectly static and aligned.
    const offsetLeft = visualViewport?.offsetLeft ?? 0;
    const offsetTop = visualViewport?.offsetTop ?? 0;

    const style: Record<string, string> = {
      position: 'fixed',
      overflow: 'hidden',
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: '0',
    };

    // Maintain visual alignment and prevent horizontal layout shifts while the
    // body is in a fixed position. Even when using the fixed positioning
    // strategy for iOS, we must manually compensate for the scrollbar width
    // if the browser does not already reserve that space. This ensures that
    // the background content remains perfectly static and perfectly aligned
    // with its original horizontal position, preventing any jarring sideways
    // movement that would otherwise occur when the scrollbar is removed from
    // the rendering calculation.
    if (!hasStableGutter && scrollbarWidth > 0) {
      style[paddingProperty] = `${scrollbarWidth}px`;
    }

    const restoreStyle = setStyle({ element: body, style });

    return () => {
      restoreStyle();

      // Restore the exact scroll coordinates after removing the fixed positioning.
      // Since position: fixed forces the body to stay at the viewport's top,
      // the browser naturally loses track of the original scroll offset.
      // By manually scrolling back to the stored scrollX and scrollY values
      // with an instant behavior, we ensure the transition is invisible to
      // the user, maintaining their context and position on the page.
      _window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
    };
  };

  const cleanups = [setLockAttribute(), setScrollbarWidthProperty(), isIos() ? setBodyStyleIOS() : setBodyStyle()];

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
};
