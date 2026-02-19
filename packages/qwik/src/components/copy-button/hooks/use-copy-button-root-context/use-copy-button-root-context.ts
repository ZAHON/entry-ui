import type { UseCopyButtonRootContextReturnValue } from './use-copy-button-root-context.types';
import { useContext } from '@qwik.dev/core';
import { CopyButtonRootContext } from '../../contexts/copy-button-root-context';

/**
 * A hook that provides access to the `CopyButton.Root` component's internal state.
 * It exposes readonly signals to interact with the copy button's state,
 * allowing descendant components to react to its `copied`, `error`, or `disabled` state.
 */
export const useCopyButtonRootContext = (): UseCopyButtonRootContextReturnValue => {
  const { copied, error, disabled } = useContext(CopyButtonRootContext);

  return { copied, error, disabled };
};
