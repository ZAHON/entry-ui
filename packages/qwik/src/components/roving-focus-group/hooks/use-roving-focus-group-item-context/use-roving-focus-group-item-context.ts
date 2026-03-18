import type { UseRovingFocusGroupItemContextReturnValue } from './use-roving-focus-group-item-context.types';
import { useContext } from '@qwik.dev/core';
import { RovingFocusGroupItemContext } from '../../contexts/roving-focus-group-item-context';

/**
 * A hook that provides access to the `RovingFocusGroup.Item` component's internal state.
 * It exposes readonly signals that allow descendant components to react to the item's
 * active state, its identifier, and whether it is currently focusable within the group.
 */
export const useRovingFocusGroupItemContext = (): UseRovingFocusGroupItemContextReturnValue => {
  const { tabStopId, active, focusable } = useContext(RovingFocusGroupItemContext);

  return { tabStopId, active, focusable };
};
