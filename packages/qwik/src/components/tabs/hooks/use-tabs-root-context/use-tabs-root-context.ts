import type { UseTabsRootContextReturnValue } from './use-tabs-root-context.types';
import { useContext } from '@qwik.dev/core';
import { TabsRootContext } from '../../contexts/tabs-root-context';

/**
 * A hook that provides access to the `Tabs.Root` component's internal state.
 * It exposes readonly signals and a `QRL` function to interact with the tabs state,
 * allowing descendant components to synchronize with or programmatically control
 * which tab is currently active, while respecting the defined orientation.
 */
export const useTabsRootContext = (): UseTabsRootContextReturnValue => {
  const { value, setValue$, orientation } = useContext(TabsRootContext);

  return { value, setValue$, orientation };
};
