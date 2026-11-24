import type { PropsOf } from '@qwik.dev/core';
import { component$ } from '@qwik.dev/core';
import { useDirectionProviderContext } from '../..';

/**
 * A test fixture component used to verify the behavior of the `useDirectionProviderContext` hook.
 *
 * Although `vitest-browser-qwik` provides a `renderHook` utility, it does not support passing a
 * `wrapper` option to supply ancestor context providers (such as `<Direction.Provider>`). Rendering
 * this component via `render` allows the hook to resolve `DirectionProviderContext` within a real
 * component tree and exposes the `direction` signal value in the DOM for assertions.
 */
export const UseDirectionProviderContextTest = component$<PropsOf<'div'>>((props) => {
  const { direction } = useDirectionProviderContext();

  return <div {...props}>{direction}</div>;
});
