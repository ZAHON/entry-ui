import type { UseDirectionProviderContextReturnValue } from './use-direction-provider-context.types';
import { useContext, useComputed$ } from '@qwik.dev/core';
import { DirectionProviderContext } from '../../contexts/direction-provider-context';

/**
 * A hook that provides access to the `<Direction.Provider>` component's internal state.
 *
 * It exposes a readonly signal containing the active reading direction,
 * allowing descendant components to adapt their behavior to the active text flow.
 */
export const useDirectionProviderContext = (): UseDirectionProviderContextReturnValue => {
  // Provides a default fallback value if the hook is invoked outside of a `<Direction.Provider>` component.
  // Wrapping `"ltr"`` inside `useComputed$` ensures consuming components always receive a consistent signal API.
  // Explicitly passing the `<"ltr">`` generic prevents inferring a broad `string` type,
  // eliminating the need for type assertions in the return statement.
  const { direction } = useContext(DirectionProviderContext, { direction: useComputed$<'ltr'>(() => 'ltr') });

  return { direction };
};

export namespace useDirectionProviderContext {
  /**
   * The value returned by the `useDirectionProviderContext` hook.
   *
   * Provides access to the provider direction's readonly signal for descendant components.
   */
  export type ReturnValue = UseDirectionProviderContextReturnValue;
}
