import type { UseRovingFocusGroupRootContextReturnValue } from './use-roving-focus-group-root-context.types';
import { useContext } from '@qwik.dev/core';
import { RovingFocusGroupRootContext } from '../../contexts/roving-focus-group-root-context';

/**
 * A hook that provides access to the `RovingFocusGroup.Root` component's internal state.
 * It exposes readonly signals and a `QRL` function to interact with the roving focus state,
 * allowing descendant components to synchronize with or programmatically control
 * which item currently holds the tab stop and is eligible for focus.
 */
export const useRovingFocusGroupRootContext = (): UseRovingFocusGroupRootContextReturnValue => {
  const { currentTabStopId, setCurrentTabStopId$, orientation } = useContext(RovingFocusGroupRootContext);

  return { currentTabStopId, setCurrentTabStopId$, orientation };
};
