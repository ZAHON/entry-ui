import type { UseCollapsibleRootContextReturnValue } from './use-collapsible-root-context.types';
import { useContext } from '@qwik.dev/core';
import { CollapsibleRootContext } from '../../contexts/collapsible-root-context';

/**
 * A hook that provides access to the `Collapsible.Root` component's internal state.
 * It exposes readonly signals and `QRL` function to interact with the collapsible's state,
 * allowing descendant components to control or react to its expanded/collapsed state.
 */
export const useCollapsibleRootContext = (): UseCollapsibleRootContextReturnValue => {
  const { open, setOpen$, disabled } = useContext(CollapsibleRootContext);

  return { open, setOpen$, disabled };
};
