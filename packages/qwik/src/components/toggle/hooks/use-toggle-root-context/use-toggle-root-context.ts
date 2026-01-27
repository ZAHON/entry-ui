import type { UseToggleRootContextReturnValue } from './use-toggle-root-context.types';
import { useContext } from '@qwik.dev/core';
import { ToggleRootContext } from '../../contexts/toggle-root-context';

/**
 * A hook that provides access to the `Toggle.Root` component's internal state.
 * It exposes readonly signals and `QRL` functions to interact with the toggle's state,
 * allowing descendant components to control or react to its pressed/unpressed state.
 */
export const useToggleRootContext = (): UseToggleRootContextReturnValue => {
  const { pressed, setPressed$, disabled } = useContext(ToggleRootContext);

  return { pressed, setPressed$, disabled };
};
