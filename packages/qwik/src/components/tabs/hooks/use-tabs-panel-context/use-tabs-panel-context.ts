import type { UseTabsPanelContextReturnValue } from './use-tabs-panel-context.types';
import { useContext } from '@qwik.dev/core';
import { TabsPanelContext } from '../../contexts/tabs-panel-context';

/**
 * A hook that provides access to the `Tabs.Panel` component's internal state.
 *
 * It exposes a readonly signal that allows descendant components to react to
 * the panel's activation state, synchronizing their behavior or styles based
 * on whether the panel is currently visible.
 */
export const useTabsPanelContext = (): UseTabsPanelContextReturnValue => {
  const { active } = useContext(TabsPanelContext);

  return { active };
};
