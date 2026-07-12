import type { UseTabsTabContextReturnValue } from './use-tabs-tab-context.types';
import { useContext } from '@qwik.dev/core';
import { TabsTabContext } from '../../contexts/tabs-tab-context';

/**
 * A hook that provides access to the `Tabs.Tab` component's internal state.
 *
 * It exposes readonly signals that allow descendant components to react to the tab's
 * unique value, its current activation state, and its disabled status.
 */
export const useTabsTabContext = (): UseTabsTabContextReturnValue => {
  const { value, active, disabled } = useContext(TabsTabContext);

  return { value, active, disabled };
};
