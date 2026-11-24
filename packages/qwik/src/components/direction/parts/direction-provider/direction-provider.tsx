import type { DirectionProviderProps } from './direction-provider.types';
import { component$, useComputed$, useContextProvider, Slot } from '@qwik.dev/core';
import { DirectionProviderContext } from '../../contexts/direction-provider-context';

/**
 * Provides reading direction context for localized applications requiring right-to-left (RTL) support.
 *
 * Wrapping your application ensures that all Entry UI Qwik components adjust their behavior based on the `direction` prop.
 * This only affects component behavior and does not modify HTML or CSS.
 * The `dir="rtl"` HTML attribute or `direction: rtl` CSS style must be set additionally by your own application code.
 *
 * Doesn’t render its own HTML element.
 */
export const DirectionProvider = component$<DirectionProviderProps>((props) => {
  const { direction: _direction = 'ltr' } = props;

  const direction = useComputed$(() => _direction);

  useContextProvider(DirectionProviderContext, { direction });

  return <Slot />;
});

export namespace DirectionProvider {
  /**
   * Props for the `<Direction.Provider>` component.
   */
  export type Props = DirectionProviderProps;
}
